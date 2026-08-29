import { createContext, useContext, useRef } from "react";
import { usePuzzleEngine } from "../hooks/usePuzzleEngine";
import { useTrainer } from "../hooks/useTrainer";

const TrainerContext = createContext(null);

// One instance of this covers a single puzzle. The parent remounts it
// (via `key={puzzleConfig.id}`) whenever the user switches puzzles, so all
// state here — timers, sets, refs — starts fresh rather than needing to be
// manually reset.
export function TrainerProvider({ puzzleConfig, children }) {
  const practicePlayerRef = useRef(null);
  const learnPlayerRef = useRef(null);
  const engine = usePuzzleEngine(puzzleConfig.cubingPuzzleId);
  const trainer = useTrainer({
    puzzleConfig,
    kpuzzle: engine.kpuzzle,
    solvedPattern: engine.solvedPattern,
    practicePlayerRef,
    learnPlayerRef,
  });

  const value = { ...engine, ...trainer, practicePlayerRef, learnPlayerRef, puzzleConfig };

  return <TrainerContext.Provider value={value}>{children}</TrainerContext.Provider>;
}

export function useTrainerContext() {
  const ctx = useContext(TrainerContext);
  if (!ctx) throw new Error("useTrainerContext must be used within a TrainerProvider");
  return ctx;
}
