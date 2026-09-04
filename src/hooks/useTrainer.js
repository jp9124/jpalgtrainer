import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alg } from "cubing/alg";
import { CUSTOM_SET_ID } from "../puzzles/constants";
import { loadStorage, saveStorage, loadPracticePrefs, savePracticePrefs } from "../lib/storage";

function emptyCustomSet() {
  return { id: CUSTOM_SET_ID, name: "Custom Set", source: "Your own algorithms", cases: [] };
}

// cubing's own per-move duration on its internal (unscaled, pre-tempoScale)
// timeline — see defaultDurationForAmount in cubing/twisty's source: quarter
// turns take 1000, half turns 1500, anything else 2000. Mirrored here so
// playLearnAlgorithm can work out where the solve begins on a combined
// "scramble + solve" alg's timestamp axis, and tell <twisty-player> to start
// playback exactly there via its public `timestamp` setter — every other
// reference-panel positioning move in this file uses only jumpToStart/
// jumpToEnd (see the note above learnScrambleAlgFor), but neither of those
// can express "start from the middle of a longer alg", which is the one
// thing this needs.
function unscaledMoveDuration(amount) {
  switch (Math.abs(amount)) {
    case 0:
      return 0;
    case 1:
      return 1000;
    case 2:
      return 1500;
    default:
      return 2000;
  }
}

function unscaledAlgDuration(algString) {
  if (!algString) return 0;
  try {
    let total = 0;
    for (const move of new Alg(algString).experimentalLeafMoves()) {
      total += unscaledMoveDuration(move.amount);
    }
    return total;
  } catch {
    return 0;
  }
}

// "Color neutral" practice: rotate the whole puzzle to a random orientation
// before scrambling into a case, so cases aren't always studied from the
// same fixed color scheme. Built only from rotation tokens verified against
// the real `cubing` engine (see the research behind this feature) — cube
// puzzles get the standard 24-way x/y/z rotation group, but pyraminx only
// accepts y/y'/y2 (3 orientations, all sharing the same "up" vertex; "Bad
// move x"/"Bad move z" otherwise). Not true full color neutrality for that
// one, just the rotation variety the engine actually exposes.
const CUBE_UP_SETUPS = ["", "x", "x2", "x'", "z", "z'"];
const CUBE_SPINS = ["", "y", "y2", "y'"];
const PYRAMINX_SPINS = ["", "y", "y2"];

const COLOR_NEUTRAL_PUZZLE_IDS = ["2x2x2", "3x3x3", "5x5x5", "pyraminx"];

function pick(options) {
  return options[Math.floor(Math.random() * options.length)];
}

function randomOrientationAlg(puzzleId) {
  switch (puzzleId) {
    case "2x2x2":
    case "3x3x3":
    case "5x5x5":
      return [pick(CUBE_UP_SETUPS), pick(CUBE_SPINS)].filter(Boolean).join(" ");
    case "pyraminx":
      return pick(PYRAMINX_SPINS);
    default:
      return "";
  }
}

// "Random AUF" (Adjust U-Face) practice: fold a random U-turn onto the front
// and back of the case's own alg before computing the scramble, so the case
// isn't always met (and left) at the same U alignment — same idea as real
// AUF, just simulated instead of physically present. Unlike color-neutral,
// this needs no orientation bookkeeping at all: U is an ordinary move here,
// so folding extra U-turns into the setup/solve sequence is exactly as
// valid as the case's alg by itself, and isSolved's existing pattern
// comparison doesn't need to change to account for it.
//
// The order of U (how many distinct turns exist before it repeats back to
// no-op) varies by puzzle — verified against the real engine, not assumed:
// the standard NxN cubes are order 4 (U/U2/U'), FTO/Pyraminx are order 3
// (their faces are triangular, no "double" turn). Square-1 has no U move at
// all (twist/slash only), so it's simply absent from this map — random AUF
// isn't offered there.
const U_TURN_ORDER = { "2x2x2": 4, "3x3x3": 4, "5x5x5": 4, fto: 3, pyraminx: 3 };

// Square-1's x2/y2/z2 whole-puzzle rotations (see square1.js's controls):
// real, animated moves on its canvas renderer, but not real cubing.js
// moves — its KPuzzle has no rotation support at all (verified against the
// engine, not assumed). applyMove below skips kpuzzle validation for
// exactly these tokens instead of treating them as puzzle-agnostic.
const SQUARE1_VIEW_ROTATIONS = new Set(["x2", "y2", "z2"]);

// Fixed playback speed for the reference/learn cube, independent of the
// practice cube's user-selected turn speed — see the tempoScale sync effect.
const LEARN_TEMPO_SCALE = 1.25;

function randomAufAlg(puzzleId) {
  const order = U_TURN_ORDER[puzzleId];
  if (!order) return "";
  const amount = Math.floor(Math.random() * order); // 0..order-1, "0" = no AUF this side
  return Array(amount).fill("U").join(" ");
}

// Random AUF folds plain "U" turns onto the front/back of a case's alg (see
// loadPracticeCase), which can leave adjacent U moves sitting next to each
// other (either two runs of AUF butting up against a case alg that itself
// starts/ends with U, or the AUF run itself once amount > 1). Collapses any
// run of consecutive U-family moves into a single canonical turn (mod this
// puzzle's own U order — e.g. FTO's is 3, not the usual 4), same shorthand
// a solver would use by hand: prefer the shorter of a direct vs. inverted
// count (3 turns on a 4-order face is "U'", not "U3"), and drop the move
// entirely if the run cancels out completely.
function parseUAmount(token) {
  const m = /^U(\d*)('?)$/.exec(token);
  if (!m) return null;
  const n = m[1] ? parseInt(m[1], 10) : 1;
  return m[2] ? -n : n;
}

function formatUAmount(amount, order) {
  const normalized = ((amount % order) + order) % order;
  if (normalized === 0) return "";
  const complement = order - normalized;
  if (normalized <= complement) return normalized === 1 ? "U" : `U${normalized}`;
  return complement === 1 ? "U'" : `U${complement}'`;
}

function mergeUMoves(algText, order) {
  if (!order) return algText;
  const tokens = algText.trim().split(/\s+/).filter(Boolean);
  const merged = [];
  let i = 0;
  while (i < tokens.length) {
    const amount = parseUAmount(tokens[i]);
    if (amount === null) {
      merged.push(tokens[i]);
      i++;
      continue;
    }
    let sum = amount;
    i++;
    while (i < tokens.length && parseUAmount(tokens[i]) !== null) {
      sum += parseUAmount(tokens[i]);
      i++;
    }
    const combined = formatUAmount(sum, order);
    if (combined) merged.push(combined);
  }
  return merged.join(" ");
}

export function useTrainer({ puzzleConfig, kpuzzle, solvedPattern, practicePlayerRef, learnPlayerRef }) {
  const initialStorage = useMemo(() => loadStorage(puzzleConfig.id), [puzzleConfig]);
  const initialPracticePrefs = useMemo(() => loadPracticePrefs(), []);

  const [allSets, setAllSets] = useState(() =>
    puzzleConfig.builtinSets.length ? puzzleConfig.builtinSets : [emptyCustomSet()],
  );
  const [activeSetId, setActiveSetId] = useState(() => allSets[0].id);
  const activeSet = useMemo(
    () => allSets.find((s) => s.id === activeSetId) ?? allSets[0],
    [allSets, activeSetId],
  );

  // Most bindings are keyed by e.code alone. A control can also set
  // `shift: true` to require Shift held (used by 2x2/3x3/5x5's S/S', which
  // reuse F/F's physical keys) — those go in the map under a `shift+`
  // prefixed key, checked first so plain presses of that same physical key
  // still fall through to the unshifted binding. `keyAliases` (if present)
  // registers extra keyboard-only bindings that don't get their own move-pad
  // button (e.g. a second physical key for a move that already has one).
  const keyToMove = useMemo(() => {
    const map = {};
    const register = ({ code, move, shift }) => {
      if (!code) return;
      map[shift ? `shift+${code}` : code] = move;
    };
    for (const c of puzzleConfig.controls ?? []) register(c);
    for (const a of puzzleConfig.keyAliases ?? []) register(a);
    return map;
  }, [puzzleConfig]);

  const [learnCase, setLearnCase] = useState(null);
  const [currentCase, setCurrentCase] = useState(null);
  // The alg text the Practice panel's reveal display shows — currentCase's
  // own alg with this attempt's preAuf/postAuf (random AUF; empty otherwise)
  // folded in and merged, so what's shown is the actual sequence that solves
  // the puzzle from its current scrambled state (see loadPracticeCase).
  const [displayAlg, setDisplayAlg] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [lastSolveElapsed, setLastSolveElapsed] = useState(null);

  const [statusLine, setStatusLine] = useState("Free play — check a case in the sidebar to practice a timed case.");
  const [statusGood, setStatusGood] = useState(false);
  const [timerLabel, setTimerLabel] = useState("0.00");
  const [timerStatus, setTimerStatus] = useState("idle"); // idle | running | solved

  const [orderedEnabled, setOrderedEnabled] = useState(initialPracticePrefs.orderedEnabled);
  const [visibleTurningEnabled, setVisibleTurningEnabled] = useState(initialPracticePrefs.visibleTurningEnabled);
  const [turnsPerSecond, setTurnsPerSecond] = useState(initialPracticePrefs.turnsPerSecond);
  const [colorNeutralEnabled, setColorNeutralEnabled] = useState(initialPracticePrefs.colorNeutralEnabled);
  const [randomAufEnabled, setRandomAufEnabled] = useState(initialPracticePrefs.randomAufEnabled);

  // colorNeutralEnabled is a global preference (persisted independent of
  // puzzle, see loadPracticePrefs/savePracticePrefs), but only some puzzles
  // have rotation moves this feature can use (see randomOrientationAlg's
  // source note). Rather than clobber the user's global preference when
  // they're on an unsupported puzzle (which would also silently turn it
  // back on for other puzzles later), every place that acts on it uses this
  // puzzle-aware override instead.
  const colorNeutralActive = colorNeutralEnabled && COLOR_NEUTRAL_PUZZLE_IDS.includes(puzzleConfig.id);

  // Same shape of override again: randomAufEnabled is global, but only
  // puzzles with a U move (i.e. every one but Square-1) support it — see
  // U_TURN_ORDER's source note.
  const randomAufActive = randomAufEnabled && puzzleConfig.id in U_TURN_ORDER;

  const [persistedStats, setPersistedStats] = useState(() => initialStorage.stats);
  const [persistedChecked, setPersistedChecked] = useState(() => initialStorage.checkedCases);
  const [customSetText, setCustomSetText] = useState(() => initialStorage.customSetText);
  const [customStatus, setCustomStatus] = useState("");

  const [sessionStats, setSessionStats] = useState({ attempts: 0, solved: 0, best: null, times: [] });

  // Imperative-only bookkeeping that doesn't need to trigger re-renders.
  const scrambleAlgRef = useRef("");
  const scrambledPatternRef = useRef(null);
  // The pattern a case's moves must reach to count as solved — normally
  // just solvedPattern, but a rotated pattern when color-neutral picked an
  // orientation for the current case (see loadPracticeCase/isSolved).
  const targetPatternRef = useRef(null);
  // The orientation alg (possibly "") applied to the current case, kept
  // separate from picking a new one so Reset Case can reload the exact same
  // case+orientation instead of re-rolling it.
  const caseRotationAlgRef = useRef("");
  // The random AUF turns (possibly "") folded onto the front/back of the
  // current case's alg, kept for the same reset-reuse reason as above.
  const caseAufRef = useRef({ preAuf: "", postAuf: "" });
  const solveMovesRef = useRef([]);
  const lastCaseNameRef = useRef(null);
  const timerStartRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const initialCustomSetTextRef = useRef(initialStorage.customSetText);

  const checkedCaseNames = useMemo(() => {
    const remembered = persistedChecked[activeSet.id];
    // Cases start unchecked by default (an untouched set has nothing
    // selected) — an explicit "All" click is what turns them on.
    return new Set(remembered !== undefined ? remembered : []);
  }, [persistedChecked, activeSet]);

  // Persist stats / checked-case selections / custom set draft.
  useEffect(() => {
    saveStorage(puzzleConfig.id, { stats: persistedStats, checkedCases: persistedChecked, customSetText });
  }, [puzzleConfig, persistedStats, persistedChecked, customSetText]);

  // Persist practice options globally (not per-puzzle) so they carry over
  // when switching puzzles instead of resetting with the rest of this
  // puzzle-scoped state.
  useEffect(() => {
    savePracticePrefs({ orderedEnabled, visibleTurningEnabled, turnsPerSecond, colorNeutralEnabled, randomAufEnabled });
  }, [orderedEnabled, visibleTurningEnabled, turnsPerSecond, colorNeutralEnabled, randomAufEnabled]);

  // Sets an explicit list of case names to a given checked value in one
  // atomic update — used for toggling a single case, a whole group of
  // cases at once, or the entire set.
  const setCasesChecked = useCallback(
    (names, value) => {
      const next = new Set(checkedCaseNames);
      for (const name of names) {
        if (value) next.add(name);
        else next.delete(name);
      }
      setPersistedChecked((prev) => ({ ...prev, [activeSet.id]: [...next] }));
    },
    [checkedCaseNames, activeSet],
  );

  const toggleCase = useCallback(
    (name) => {
      setCasesChecked([name], !checkedCaseNames.has(name));
    },
    [setCasesChecked, checkedCaseNames],
  );

  const setAllChecked = useCallback(
    (value) => {
      setCasesChecked(
        activeSet.cases.map((c) => c.name),
        value,
      );
    },
    [setCasesChecked, activeSet],
  );

  const stopTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    timerStartRef.current = performance.now();
    setTimerStatus("running");
    setStatusLine("Solving…");
    setStatusGood(false);
    timerIntervalRef.current = setInterval(() => {
      const t = (performance.now() - timerStartRef.current) / 1000;
      setTimerLabel(t.toFixed(2));
    }, 30);
  }, []);

  const syncPracticePlayer = useCallback(() => {
    const player = practicePlayerRef.current;
    if (!player) return;
    const moves = solveMovesRef.current;
    const full = moves.length ? `${scrambleAlgRef.current} ${moves.join(" ")}` : scrambleAlgRef.current;
    player.alg = full;
    player.jumpToEnd();
  }, [practicePlayerRef]);

  // tempoScale is ~1:1 with quarter-turns-per-second (a tempoScale of N means
  // a single quarter turn, whose base duration is 1000ms, takes 1000/N ms) —
  // see cubing's defaultDurationForAmount. Kept in sync whenever the desired
  // speed changes, independent of whether visible turning is currently on
  // (jumpToEnd() ignores it either way). The practice player follows the
  // user's chosen speed; the reference player is pinned to LEARN_TEMPO_SCALE
  // instead — at the practice speeds this app offers (5+ turns/sec), a full
  // algorithm plays back too fast to actually watch, which defeats the
  // point of a reference demo.
  useEffect(() => {
    if (practicePlayerRef.current) practicePlayerRef.current.tempoScale = turnsPerSecond;
    if (learnPlayerRef.current) learnPlayerRef.current.tempoScale = LEARN_TEMPO_SCALE;
  }, [turnsPerSecond, practicePlayerRef, learnPlayerRef, kpuzzle]);

  // Animate a single applied move by appending it to the player's current
  // alg (cubing's mechanism for live/incremental move input — see
  // experimentalAddMove) instead of the instant "reset .alg + jumpToEnd()"
  // used everywhere else. Only used for moves the user actually turns;
  // case loads/undo/reset still snap instantly via syncPracticePlayer.
  const animateMoveOnPracticePlayer = useCallback(
    (move) => {
      const player = practicePlayerRef.current;
      if (!player) return;
      if (visibleTurningEnabled) {
        player.experimentalAddMove(move);
      } else {
        syncPracticePlayer();
      }
    },
    [practicePlayerRef, visibleTurningEnabled, syncPracticePlayer],
  );

  const currentPattern = useCallback(() => {
    const moves = solveMovesRef.current;
    const base = scrambledPatternRef.current;
    return moves.length ? base.applyAlg(moves.join(" ")) : base;
  }, []);

  // A whole-puzzle rotation (x/y/z) leaves every face visually solved but
  // isn't the literal identity pattern, so a plain isIdentical() call would
  // wrongly call that "not solved". cubing.js has a real, tested check for
  // this (KPattern.experimentalIsSolved({ ignorePuzzleOrientation: true })),
  // but it only works for plain NxNxN cubes (2x2x2/3x3x3/5x5x5) — verified
  // it throws "not supported" for FTO/Pyraminx/Square-1, none of which
  // expose the rotation moves needed to build an equivalent
  // ourselves, so those puzzles keep the exact-orientation check — but
  // against targetPatternRef (normally solvedPattern, but a specific rotated
  // pattern when color-neutral picked an orientation for this case) rather
  // than solvedPattern directly, so a color-neutral case correctly reads as
  // solved once it's back to ITS rotated target, not the canonical one.
  const isSolved = useCallback(
    (pattern) => {
      if (typeof kpuzzle?.definition?.experimentalIsPatternSolved === "function") {
        return pattern.experimentalIsSolved({ ignorePuzzleOrientation: true, ignoreCenterOrientation: false });
      }
      return pattern.isIdentical(targetPatternRef.current ?? solvedPattern);
    },
    [kpuzzle, solvedPattern],
  );

  const pickNextCase = useCallback(() => {
    const pool = activeSet.cases.filter((c) => checkedCaseNames.has(c.name));
    if (!pool.length) return null;

    if (orderedEnabled) {
      // Sequential, wrapping around — same list order shown in the sidebar.
      const lastIndex = pool.findIndex((c) => c.name === lastCaseNameRef.current);
      return pool[(lastIndex + 1) % pool.length];
    }

    if (pool.length === 1) return pool[0];
    let choice;
    do {
      choice = pool[Math.floor(Math.random() * pool.length)];
    } while (choice.name === lastCaseNameRef.current);
    return choice;
  }, [activeSet, checkedCaseNames, orderedEnabled]);

  const loadPracticeCase = useCallback(
    (c, { rotationAlg = "", preAuf = "", postAuf = "" } = {}) => {
      if (!kpuzzle || !solvedPattern) return;
      setCurrentCase(c);
      setRevealed(false);
      setLastSolveElapsed(null);
      solveMovesRef.current = [];
      caseRotationAlgRef.current = rotationAlg;
      caseAufRef.current = { preAuf, postAuf };
      stopTimer();

      setDisplayAlg(
        mergeUMoves([preAuf, c.alg, postAuf].filter(Boolean).join(" "), U_TURN_ORDER[puzzleConfig.id]),
      );

      // preAuf/postAuf (empty unless random AUF picked turns for this case)
      // fold onto the case's own alg before inverting, so the actual
      // sequence that needs solving is "preAuf + case alg + postAuf" — U is
      // an ordinary move here, so this needs no special solved-detection
      // handling the way rotationAlg does.
      let setupAlg;
      try {
        const extendedAlg = [preAuf, c.alg, postAuf].filter(Boolean).join(" ");
        setupAlg = new Alg(extendedAlg).invert().toString();
      } catch {
        setupAlg = "";
      }
      // c.setupAlg (only present on cases that need it, e.g. FTO 1LP) is a
      // fixed real move sequence the source itself says to apply BEFORE
      // inverting the case's own alg to reach that case's recognized
      // position — unlike rotationAlg/preAuf/postAuf, this isn't inverted:
      // it's prepended to the scramble as-is, and folded into what counts
      // as "solved" too, since solving the case's alg from there lands back
      // on c.setupAlg's state, not on the puzzle's true solved state (see
      // the source note in fto1lp.js for why the case data is shaped like
      // this).
      //
      // rotationAlg (empty unless color-neutral picked an orientation for
      // this case) goes first: rotate the solved reference, then scramble
      // relative to THAT — so the case's alg text and solved-check both
      // stay correct without needing to touch c.alg at all (see
      // randomOrientationAlg's source note for why this works).
      const fullSetupAlg = [rotationAlg, c.setupAlg, setupAlg].filter(Boolean).join(" ");
      scrambleAlgRef.current = fullSetupAlg;
      scrambledPatternRef.current = solvedPattern.applyAlg(fullSetupAlg);
      const targetSetupAlg = [rotationAlg, c.setupAlg].filter(Boolean).join(" ");
      targetPatternRef.current = targetSetupAlg ? solvedPattern.applyAlg(targetSetupAlg) : solvedPattern;

      setTimerLabel("0.00");
      setTimerStatus("idle");
      setStatusLine("Press any move key to start the timer.");
      setStatusGood(false);

      syncPracticePlayer();
    },
    [kpuzzle, solvedPattern, stopTimer, syncPracticePlayer, puzzleConfig],
  );

  // With no cases checked, there's nothing to scramble to or time — instead
  // of leaving the practice puzzle showing whatever it last happened to
  // display, put it in solved state and let moves still be turned freely
  // (see applyMove/resetCase), just without any timer or solved-detection.
  const loadFreePlay = useCallback(() => {
    if (!solvedPattern) return;
    setCurrentCase(null);
    setDisplayAlg("");
    setRevealed(false);
    setLastSolveElapsed(null);
    solveMovesRef.current = [];
    caseRotationAlgRef.current = "";
    caseAufRef.current = { preAuf: "", postAuf: "" };
    stopTimer();

    scrambleAlgRef.current = "";
    scrambledPatternRef.current = solvedPattern;
    targetPatternRef.current = solvedPattern;

    setTimerLabel("0.00");
    setTimerStatus("idle");
    setStatusLine("Free play — check a case in the sidebar to practice a timed case.");
    setStatusGood(false);

    syncPracticePlayer();
  }, [solvedPattern, stopTimer, syncPracticePlayer]);

  const loadNewPracticeCase = useCallback(() => {
    const c = pickNextCase();
    if (!c) {
      loadFreePlay();
      return;
    }
    lastCaseNameRef.current = c.name;
    loadPracticeCase(c, {
      rotationAlg: colorNeutralActive ? randomOrientationAlg(puzzleConfig.id) : "",
      preAuf: randomAufActive ? randomAufAlg(puzzleConfig.id) : "",
      postAuf: randomAufActive ? randomAufAlg(puzzleConfig.id) : "",
    });
  }, [pickNextCase, loadPracticeCase, loadFreePlay, colorNeutralActive, randomAufActive, puzzleConfig]);

  const recordResult = useCallback(
    (c, elapsed) => {
      const key = `${activeSet.id}::${c.name}`;
      setPersistedStats((prev) => {
        const entry = prev[key] ?? { best: null, times: [] };
        return {
          ...prev,
          [key]: {
            best: entry.best === null || elapsed < entry.best ? elapsed : entry.best,
            times: [...entry.times, elapsed],
          },
        };
      });
      setSessionStats((prev) => {
        const times = [...prev.times, elapsed];
        return {
          attempts: prev.attempts + 1,
          solved: prev.solved + 1,
          best: prev.best === null || elapsed < prev.best ? elapsed : prev.best,
          times,
        };
      });
    },
    [activeSet],
  );

  const onSolved = useCallback(() => {
    const elapsed = (performance.now() - timerStartRef.current) / 1000;
    stopTimer();
    setTimerLabel(elapsed.toFixed(2));
    setTimerStatus("solved");
    setStatusLine("Solved!");
    setStatusGood(true);
    setRevealed(true);
    setLastSolveElapsed(elapsed);
    if (currentCase) recordResult(currentCase, elapsed);
  }, [stopTimer, currentCase, recordResult]);

  const applyMove = useCallback(
    (move) => {
      // No active case (free play) still turns the puzzle — it's the timer
      // and solved-detection below that require a real case to time against.
      if (!scrambledPatternRef.current || !kpuzzle) return;
      // Only (re)start the timer from a fresh, untouched case — once solved,
      // further moves (e.g. drilling the case again after a space-triggered
      // reset) shouldn't restart the timer or disturb the "Solved!" status.
      if (currentCase && timerStatus === "idle") startTimer();

      // Square-1's x2/y2/z2 are a pure reorientation of the canvas, not a
      // real move — skip kpuzzle validation/mutation and the solved check
      // (which would just re-evaluate the same untouched pattern) but still
      // animate and record them like any other move (see
      // SQUARE1_VIEW_ROTATIONS's source note).
      const isViewRotation = puzzleConfig.id === "square1" && SQUARE1_VIEW_ROTATIONS.has(move);

      if (!isViewRotation) {
        try {
          // applyAlg (not applyMove) so compound tokens like Square-1's
          // "(3,0)" work the same way single face turns do.
          scrambledPatternRef.current.applyAlg(move);
        } catch {
          setStatusLine(`Invalid move: ${move}`);
          return;
        }
      }

      solveMovesRef.current = [...solveMovesRef.current, move];
      animateMoveOnPracticePlayer(move);

      if (!isViewRotation && currentCase && timerStatus !== "solved" && isSolved(currentPattern())) {
        onSolved();
      }
    },
    [
      currentCase,
      kpuzzle,
      timerStatus,
      isSolved,
      startTimer,
      animateMoveOnPracticePlayer,
      puzzleConfig,
      currentPattern,
      solvedPattern,
      onSolved,
    ],
  );

  const undoMove = useCallback(() => {
    if (!solveMovesRef.current.length) return;
    solveMovesRef.current = solveMovesRef.current.slice(0, -1);
    syncPracticePlayer();
  }, [syncPracticePlayer]);

  const resetCase = useCallback(() => {
    // Reuses caseRotationAlgRef/caseAufRef (not a fresh random pick) so a
    // reset gives back the exact same case+orientation+AUF for another
    // attempt.
    if (currentCase) {
      loadPracticeCase(currentCase, {
        rotationAlg: caseRotationAlgRef.current,
        preAuf: caseAufRef.current.preAuf,
        postAuf: caseAufRef.current.postAuf,
      });
    } else loadFreePlay();
  }, [currentCase, loadPracticeCase, loadFreePlay]);

  // Reference-panel scrambling uses the same plain "set .alg, then
  // jumpToEnd()" technique as the Practice panel (see syncPracticePlayer)
  // instead of the twisty-player's own experimental-setup-alg feature —
  // that combination proved unreliable in this app for reasons we couldn't
  // pin down (it worked in isolation but not once embedded here), while
  // this plain-alg approach is the one mechanism we've verified solid
  // throughout the whole app.
  function learnScrambleAlgFor(c) {
    try {
      const inverted = new Alg(c.alg).invert().toString();
      // c.setupAlg (see loadPracticeCase) goes first, un-inverted — it's a
      // fixed precondition for reaching this case's recognized position, not
      // part of the solve being demonstrated.
      return [c.setupAlg, inverted].filter(Boolean).join(" ");
    } catch {
      return "";
    }
  }

  const showLearnCase = useCallback(
    (c) => {
      const player = learnPlayerRef.current;
      if (player) {
        player.alg = learnScrambleAlgFor(c);
        player.jumpToEnd();
      }
      setLearnCase(c);
    },
    [learnPlayerRef],
  );

  const revealAlg = useCallback(() => {
    if (!currentCase) return;
    setRevealed(true);
    // displayAlg is currentCase's alg with this attempt's preAuf/postAuf
    // (random AUF; empty otherwise) already folded in and merged (see
    // loadPracticeCase) — reused here so the reference panel plays the same
    // actual solve the Practice panel's own alg display shows, rather than
    // just the bare case alg with an AUF left undone at the end.
    const revealCase = currentCase.alg === displayAlg ? currentCase : { ...currentCase, alg: displayAlg };
    showLearnCase(revealCase); // also load it into the reference panel so it can be watched

    // Reset the practice cube back to the scrambled state so the case can
    // still be practiced (now with the algorithm visible) instead of being
    // left wherever exploratory moves happened to leave it — even after it's
    // already been solved once, so space can be used to drill the same case
    // again without starting a new one via Enter. timerStatus/statusLine are
    // left untouched, so "Solved!" keeps showing until a new case is loaded.
    solveMovesRef.current = [];
    syncPracticePlayer();
  }, [currentCase, displayAlg, showLearnCase, syncPracticePlayer]);

  // Always start from the case's recognized position (scramble applied),
  // never the solved state — jumpToStart()+play() over "scramble solve"
  // would animate the scramble (the inverted alg) before the actual solve,
  // which looks like the cube solving itself then re-scrambling.
  //
  // The reference cube always turns visibly here, independent of the
  // practice-side "visible turning" toggle (see LEARN_TEMPO_SCALE, pinned
  // the same way) — an instant jump to the solved state defeats the point
  // of a reference demo. Real <twisty-player> instances hand the whole
  // "scramble + solve" alg to the player's native play() — which respects
  // tempoScale and turns smoothly — but positioned to *start* partway
  // through, right where the solve begins, via the numeric `timestamp`
  // setter (unscaledAlgDuration works out that offset). The tempting
  // alternative, animating each solve move individually via
  // experimentalAddMove (as animateMoveOnPracticePlayer does for the
  // practice cube), doesn't work here: cubing's own implementation of that
  // method is an unfinished stub (its source literally reads "TODO: Animate
  // the new move"), so calls fired in a tight loop collapse into one jump
  // with only the last move visibly turning. Square-1's canvas player is
  // the one exception: its experimentalAddMove is this app's own
  // hand-rolled, genuinely-animated implementation (see square1Renderer.js)
  // and it has no `timestamp` setter to offset into, so it uses the
  // per-move loop instead.
  const playLearnAlgorithm = useCallback(() => {
    const player = learnPlayerRef.current;
    if (!player || !learnCase) return;
    const scrambleAlg = learnScrambleAlgFor(learnCase);

    player.alg = scrambleAlg;
    player.jumpToEnd();

    if (puzzleConfig.id === "square1") {
      const moves = learnCase.alg.trim().split(/\s+/).filter(Boolean);
      moves.forEach((move) => player.experimentalAddMove(move));
    } else {
      player.alg = `${scrambleAlg} ${learnCase.alg}`;
      player.timestamp = unscaledAlgDuration(scrambleAlg);
      player.play();
    }
  }, [learnPlayerRef, learnCase, puzzleConfig]);

  const learnJumpToStart = useCallback(() => {
    if (learnCase) showLearnCase(learnCase);
  }, [learnCase, showLearnCase]);

  const learnJumpToEnd = useCallback(() => {
    const player = learnPlayerRef.current;
    if (!player || !learnCase) return;
    player.alg = `${learnScrambleAlgFor(learnCase)} ${learnCase.alg}`;
    player.jumpToEnd();
  }, [learnCase, learnPlayerRef]);

  const selectSet = useCallback((setId) => {
    setActiveSetId(setId);
  }, []);

  // Load a fresh practice case and the reference case whenever the active
  // set changes (and once the puzzle engine has finished loading). Both
  // panels are always visible, so both always need something to show.
  useEffect(() => {
    if (!kpuzzle) return;
    if (!activeSet.cases.length) {
      setLearnCase(null);
      setCurrentCase(null);
      return;
    }
    showLearnCase(activeSet.cases[0]);
    loadNewPracticeCase();
    // showLearnCase / loadNewPracticeCase intentionally omitted: they close
    // over activeSet/checkedCaseNames already, and including them would
    // cause this to also re-fire on every keystroke of a custom-set edit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSet, kpuzzle]);

  const applyCustomSetText = useCallback(
    (text, opts = {}) => {
      const lines = text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      const cases = [];
      const errors = [];

      for (const line of lines) {
        const idx = line.indexOf(":");
        if (idx === -1) {
          errors.push(`Missing ":" in "${line}"`);
          continue;
        }
        const name = line.slice(0, idx).trim();
        const algStr = line.slice(idx + 1).trim();
        if (!name || !algStr) {
          errors.push(`Empty name or alg in "${line}"`);
          continue;
        }
        try {
          if (kpuzzle) kpuzzle.defaultPattern().applyAlg(algStr); // validates move families
          cases.push({ name, alg: algStr });
        } catch (err) {
          errors.push(`"${name}": ${err.message}`);
        }
      }

      const customSet = { id: CUSTOM_SET_ID, name: "Custom Set", source: "Your own algorithms", cases };
      setAllSets(puzzleConfig.builtinSets.length ? [...puzzleConfig.builtinSets, customSet] : [customSet]);

      if (!opts.silent) {
        setCustomStatus(
          errors.length
            ? `Saved ${cases.length} case(s). Errors: ${errors.join("; ")}`
            : `Saved ${cases.length} case(s).`,
        );
      }
      return customSet;
    },
    [kpuzzle, puzzleConfig],
  );

  const saveCustomSet = useCallback(() => {
    applyCustomSetText(customSetText);
  }, [applyCustomSetText, customSetText]);

  // Restore a saved custom set once the puzzle engine is ready.
  useEffect(() => {
    if (kpuzzle && initialCustomSetTextRef.current) {
      applyCustomSetText(initialCustomSetTextRef.current, { silent: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kpuzzle]);

  // Keyboard controls, plus space to reveal the algorithm, enter to load a
  // new case, and escape to reset the current one. Always active (the
  // practice puzzle is always on screen), except while typing in a form
  // field.
  useEffect(() => {
    function onKeyDown(e) {
      const tag = document.activeElement?.tagName;
      if (tag === "TEXTAREA" || tag === "INPUT" || tag === "SELECT") return;

      if (e.code === "Space") {
        e.preventDefault();
        revealAlg();
        return;
      }
      if (e.code === "Enter") {
        e.preventDefault();
        loadNewPracticeCase();
        return;
      }
      if (e.code === "Escape") {
        e.preventDefault();
        resetCase();
        return;
      }

      const move = (e.shiftKey && keyToMove[`shift+${e.code}`]) || keyToMove[e.code];
      if (move) {
        e.preventDefault();
        applyMove(move);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [keyToMove, applyMove, revealAlg, loadNewPracticeCase, resetCase]);

  useEffect(() => () => stopTimer(), [stopTimer]);

  const avg = sessionStats.times.length
    ? sessionStats.times.reduce((a, b) => a + b, 0) / sessionStats.times.length
    : null;

  return {
    allSets,
    activeSet,
    selectSet,
    checkedCaseNames,
    toggleCase,
    setAllChecked,
    setCasesChecked,

    learnCase,
    currentCase,
    displayAlg,
    revealed,
    lastSolveElapsed,

    showLearnCase,
    playLearnAlgorithm,
    learnJumpToStart,
    learnJumpToEnd,
    applyMove,
    undoMove,
    resetCase,
    loadNewPracticeCase,
    revealAlg,

    timerLabel,
    timerStatus,
    statusLine,
    statusGood,

    orderedEnabled,
    setOrderedEnabled,
    visibleTurningEnabled,
    setVisibleTurningEnabled,
    turnsPerSecond,
    setTurnsPerSecond,
    colorNeutralEnabled,
    setColorNeutralEnabled,
    randomAufEnabled,
    setRandomAufEnabled,

    customSetText,
    setCustomSetText,
    customStatus,
    saveCustomSet,

    persistedStats,
    sessionStats: { ...sessionStats, avg },
  };
}
