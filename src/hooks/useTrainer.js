import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alg } from "cubing/alg";
import { CUSTOM_SET_ID } from "../puzzles/constants";
import { loadStorage, saveStorage, loadPracticePrefs, savePracticePrefs } from "../lib/storage";

function emptyCustomSet() {
  return { id: CUSTOM_SET_ID, name: "Custom Set", source: "Your own algorithms", cases: [] };
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
  const [revealed, setRevealed] = useState(false);
  const [lastSolveElapsed, setLastSolveElapsed] = useState(null);

  const [statusLine, setStatusLine] = useState("Press any move key to start the timer.");
  const [statusGood, setStatusGood] = useState(false);
  const [timerLabel, setTimerLabel] = useState("0.00");
  const [timerStatus, setTimerStatus] = useState("idle"); // idle | running | solved

  const [orderedEnabled, setOrderedEnabled] = useState(initialPracticePrefs.orderedEnabled);
  const [visibleTurningEnabled, setVisibleTurningEnabled] = useState(initialPracticePrefs.visibleTurningEnabled);
  const [turnsPerSecond, setTurnsPerSecond] = useState(initialPracticePrefs.turnsPerSecond);

  const [persistedStats, setPersistedStats] = useState(() => initialStorage.stats);
  const [persistedChecked, setPersistedChecked] = useState(() => initialStorage.checkedCases);
  const [customSetText, setCustomSetText] = useState(() => initialStorage.customSetText);
  const [customStatus, setCustomStatus] = useState("");

  const [sessionStats, setSessionStats] = useState({ attempts: 0, solved: 0, best: null, times: [] });

  // Imperative-only bookkeeping that doesn't need to trigger re-renders.
  const scrambleAlgRef = useRef("");
  const scrambledPatternRef = useRef(null);
  const solveMovesRef = useRef([]);
  const lastCaseNameRef = useRef(null);
  const timerStartRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const initialCustomSetTextRef = useRef(initialStorage.customSetText);

  const checkedCaseNames = useMemo(() => {
    const remembered = persistedChecked[activeSet.id];
    // An explicit empty array (everything unchecked via "None") is a real,
    // intentional state — only fall back to "everything checked" when this
    // set has never been touched at all (undefined).
    return new Set(remembered !== undefined ? remembered : activeSet.cases.map((c) => c.name));
  }, [persistedChecked, activeSet]);

  // Persist stats / checked-case selections / custom set draft.
  useEffect(() => {
    saveStorage(puzzleConfig.id, { stats: persistedStats, checkedCases: persistedChecked, customSetText });
  }, [puzzleConfig, persistedStats, persistedChecked, customSetText]);

  // Persist practice options globally (not per-puzzle) so they carry over
  // when switching puzzles instead of resetting with the rest of this
  // puzzle-scoped state.
  useEffect(() => {
    savePracticePrefs({ orderedEnabled, visibleTurningEnabled, turnsPerSecond });
  }, [orderedEnabled, visibleTurningEnabled, turnsPerSecond]);

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
  // see cubing's defaultDurationForAmount. Kept in sync on both players
  // whenever the desired speed changes, independent of whether visible
  // turning is currently on (jumpToEnd() ignores it either way).
  useEffect(() => {
    if (practicePlayerRef.current) practicePlayerRef.current.tempoScale = turnsPerSecond;
    if (learnPlayerRef.current) learnPlayerRef.current.tempoScale = turnsPerSecond;
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
    (c) => {
      if (!kpuzzle || !solvedPattern) return;
      setCurrentCase(c);
      setRevealed(false);
      setLastSolveElapsed(null);
      solveMovesRef.current = [];
      stopTimer();

      let setupAlg;
      try {
        setupAlg = new Alg(c.alg).invert().toString();
      } catch {
        setupAlg = "";
      }
      scrambleAlgRef.current = setupAlg;
      scrambledPatternRef.current = solvedPattern.applyAlg(setupAlg);

      setTimerLabel("0.00");
      setTimerStatus("idle");
      setStatusLine("Press any move key to start the timer.");
      setStatusGood(false);

      syncPracticePlayer();
    },
    [kpuzzle, solvedPattern, stopTimer, syncPracticePlayer],
  );

  const loadNewPracticeCase = useCallback(() => {
    const c = pickNextCase();
    if (!c) {
      setCurrentCase(null);
      return;
    }
    lastCaseNameRef.current = c.name;
    loadPracticeCase(c);
  }, [pickNextCase, loadPracticeCase]);

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
      if (!currentCase || !kpuzzle) return;
      if (timerStatus !== "running") startTimer();

      try {
        // applyAlg (not applyMove) so compound tokens like Square-1's
        // "(3,0)" work the same way single face turns do.
        scrambledPatternRef.current.applyAlg(move);
      } catch {
        setStatusLine(`Invalid move: ${move}`);
        return;
      }

      solveMovesRef.current = [...solveMovesRef.current, move];
      animateMoveOnPracticePlayer(move);

      if (currentPattern().isIdentical(solvedPattern)) {
        onSolved();
      }
    },
    [
      currentCase,
      kpuzzle,
      timerStatus,
      startTimer,
      animateMoveOnPracticePlayer,
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
    if (currentCase) loadPracticeCase(currentCase);
  }, [currentCase, loadPracticeCase]);

  // Reference-panel scrambling uses the same plain "set .alg, then
  // jumpToEnd()" technique as the Practice panel (see syncPracticePlayer)
  // instead of the twisty-player's own experimental-setup-alg feature —
  // that combination proved unreliable in this app for reasons we couldn't
  // pin down (it worked in isolation but not once embedded here), while
  // this plain-alg approach is the one mechanism we've verified solid
  // throughout the whole app.
  function learnScrambleAlgFor(c) {
    try {
      return new Alg(c.alg).invert().toString();
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
    showLearnCase(currentCase); // also load it into the reference panel so it can be watched

    if (timerStatus !== "solved") {
      // Reset the practice cube back to the scrambled state so the case can
      // still be practiced (now with the algorithm visible) instead of being
      // left wherever exploratory moves happened to leave it.
      solveMovesRef.current = [];
      syncPracticePlayer();
    }
  }, [currentCase, showLearnCase, timerStatus, syncPracticePlayer]);

  // With visible turning on, hand the whole alg to the player's native
  // playback (respecting tempoScale) for smooth turning. Otherwise fall
  // back to the original behavior: step through the moves one at a time,
  // each step an instant jump to "scramble + moves done so far".
  const playLearnAlgorithm = useCallback(() => {
    const player = learnPlayerRef.current;
    if (!player || !learnCase) return;
    const scrambleAlg = learnScrambleAlgFor(learnCase);

    if (visibleTurningEnabled) {
      player.alg = `${scrambleAlg} ${learnCase.alg}`;
      player.jumpToStart();
      player.play();
      return;
    }

    const moves = learnCase.alg.trim().split(/\s+/).filter(Boolean);

    player.alg = scrambleAlg;
    player.jumpToEnd();

    moves.forEach((_, i) => {
      setTimeout(() => {
        const doneMoves = moves.slice(0, i + 1).join(" ");
        player.alg = `${scrambleAlg} ${doneMoves}`;
        player.jumpToEnd();
      }, (i + 1) * 400);
    });
  }, [learnPlayerRef, learnCase, visibleTurningEnabled]);

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

  // Keyboard controls, plus space to reveal the algorithm and enter to load
  // a new case. Always active (the practice puzzle is always on screen),
  // except while typing in a form field.
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

      const move = (e.shiftKey && keyToMove[`shift+${e.code}`]) || keyToMove[e.code];
      if (move) {
        e.preventDefault();
        applyMove(move);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [keyToMove, applyMove, revealAlg, loadNewPracticeCase]);

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

    customSetText,
    setCustomSetText,
    customStatus,
    saveCustomSet,

    persistedStats,
    sessionStats: { ...sessionStats, avg },
  };
}
