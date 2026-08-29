import { createContext, useContext, useState } from "react";
import { PUZZLES } from "../puzzles";

const PuzzleSelectionContext = createContext(null);

export function PuzzleSelectionProvider({ children }) {
  const [puzzleId, setPuzzleId] = useState(PUZZLES[0].id);
  const puzzleConfig = PUZZLES.find((p) => p.id === puzzleId) ?? PUZZLES[0];

  const value = { puzzleId, setPuzzleId, puzzleConfig, allPuzzles: PUZZLES };

  return <PuzzleSelectionContext.Provider value={value}>{children}</PuzzleSelectionContext.Provider>;
}

export function usePuzzleSelection() {
  const ctx = useContext(PuzzleSelectionContext);
  if (!ctx) throw new Error("usePuzzleSelection must be used within a PuzzleSelectionProvider");
  return ctx;
}
