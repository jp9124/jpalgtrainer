import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alg } from "cubing/alg";
import { CUSTOM_SET_ID } from "../puzzles/constants";
import { loadStorage, saveStorage } from "../lib/storage";

function emptyCustomSet() {
  return { id: CUSTOM_SET_ID, name: "Custom Set", source: "Your own algorithms", cases: [] };
}

export function useTrainer({ puzzleConfig, kpuzzle, solvedPattern, practicePlayerRef, learnPlayerRef }) {
  const initialStorage = useMemo(() => loadStorage(puzzleConfig.id), [puzzleConfig]);

  const [allSets, setAllSets] = useState(() =>
    puzzleConfig.builtinSets.length ? puzzleConfig.builtinSets : [emptyCustomSet()],
  );
  const [activeSetId, setActiveSetId] = useState(() => allSets[0].id);
  const activeSet = useMemo(
    () => allSets.find((s) => s.id === activeSetId) ?? allSets[0],
    [allSets, activeSetId],
  );

  const keyToMove = useMemo(() => {
    const map = {};
    for (const c of puzzleConfig.controls ?? []) {
      if (c.code) map[c.code] = c.move;
    }
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

  const [autoNextEnabled, setAutoNextEnabled] = useState(true);
  const [orderedEnabled, setOrderedEnabled] = useState(false);

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
    if (autoNextEnabled) {
      setTimeout(loadNewPracticeCase, 1100);
    }
  }, [stopTimer, currentCase, recordResult, autoNextEnabled, loadNewPracticeCase]);

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
      syncPracticePlayer();

      if (currentPattern().isIdentical(solvedPattern)) {
        onSolved();
      }
    },
    [currentCase, kpuzzle, timerStatus, startTimer, syncPracticePlayer, currentPattern, solvedPattern, onSolved],
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

  // Step through the algorithm's moves one at a time (each step re-sets
  // .alg to the scramble plus the moves done so far, then jumps to the end
  // of that — the same "instant jump per update" mechanism Practice uses
  // for every move you click), landing on solved.
  const playLearnAlgorithm = useCallback(() => {
    const player = learnPlayerRef.current;
    if (!player || !learnCase) return;
    const scrambleAlg = learnScrambleAlgFor(learnCase);
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
  }, [learnPlayerRef, learnCase]);

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

      const move = keyToMove[e.code];
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

    autoNextEnabled,
    setAutoNextEnabled,
    orderedEnabled,
    setOrderedEnabled,

    customSetText,
    setCustomSetText,
    customStatus,
    saveCustomSet,

    persistedStats,
    sessionStats: { ...sessionStats, avg },
  };
}
