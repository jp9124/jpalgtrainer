import { createContext, useContext, useEffect, useState } from "react";
import { PUZZLES } from "../puzzles";
import { loadSelectedPuzzleId, saveSelectedPuzzleId } from "../lib/storage";

const PuzzleSelectionContext = createContext(null);

export function PuzzleSelectionProvider({ children }) {
  const [puzzleId, setPuzzleId] = useState(() => {
    const remembered = loadSelectedPuzzleId();
    return PUZZLES.some((p) => p.id === remembered) ? remembered : PUZZLES[0].id;
  });
  const puzzleConfig = PUZZLES.find((p) => p.id === puzzleId) ?? PUZZLES[0];

  useEffect(() => {
    saveSelectedPuzzleId(puzzleId);
  }, [puzzleId]);

  const value = { puzzleId, setPuzzleId, puzzleConfig, allPuzzles: PUZZLES };

  return <PuzzleSelectionContext.Provider value={value}>{children}</PuzzleSelectionContext.Provider>;
}

export function usePuzzleSelection() {
  const ctx = useContext(PuzzleSelectionContext);
  if (!ctx) throw new Error("usePuzzleSelection must be used within a PuzzleSelectionProvider");
  return ctx;
}
