import { useEffect, useState } from "react";
import { puzzles } from "cubing/puzzles";

// Loads the real move/state engine (cubing.js's KPuzzle) for whichever
// puzzle id is requested. This gives us defaultPattern()/applyMove()/
// applyAlg()/isIdentical() for authoritative, puzzle-accurate solved-state
// detection — independent of whatever the 3D <twisty-player> is currently
// animating.
export function usePuzzleEngine(cubingPuzzleId) {
  const [state, setState] = useState({
    kpuzzle: null,
    solvedPattern: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ kpuzzle: null, solvedPattern: null, loading: true, error: null });
    (async () => {
      try {
        const kpuzzle = await puzzles[cubingPuzzleId].kpuzzle();
        const solvedPattern = kpuzzle.defaultPattern();
        if (!cancelled) {
          setState({ kpuzzle, solvedPattern, loading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState({ kpuzzle: null, solvedPattern: null, loading: false, error: String(err) });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [cubingPuzzleId]);

  return state;
}
