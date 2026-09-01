import { megaminxOllSets } from "./algs/megaminxOll";
import { megaminxPllSets } from "./algs/megaminxPll";

// Reuses the same physical key positions as FTO's official layout for the
// 6 primary faces (R, B, L, U, F share identical key placements across
// puzzles in this app — only FR is megaminx-specific), matching the primary
// 12 keys from cubing.js's own megaminxKeyMapping.ts.
//
// bR/bR'/dR/dR' have no such official source and no y-rotation-conjugate
// equivalent to an existing face (verified against the real engine — see
// megaminxOll.js/megaminxPll.js's source note), so these four keys are this
// project's own choice, not borrowed from anywhere.
const controls = [
  { label: "U", move: "U", code: "KeyJ", keyLabel: "J" },
  { label: "U'", move: "U'", code: "KeyF", keyLabel: "F" },
  { label: "F", move: "F", code: "KeyH", keyLabel: "H" },
  { label: "F'", move: "F'", code: "KeyG", keyLabel: "G" },
  { label: "R", move: "R", code: "KeyI", keyLabel: "I" },
  { label: "R'", move: "R'", code: "KeyK", keyLabel: "K" },
  { label: "L", move: "L", code: "KeyD", keyLabel: "D" },
  { label: "L'", move: "L'", code: "KeyE", keyLabel: "E" },
  { label: "B", move: "B", code: "KeyW", keyLabel: "W" },
  { label: "B'", move: "B'", code: "KeyO", keyLabel: "O" },
  { label: "FR", move: "FR", code: "KeyS", keyLabel: "S" },
  { label: "FR'", move: "FR'", code: "KeyL", keyLabel: "L" },
  // Swapped relative to the literal cubing.js token: on this puzzle "y"
  // rotated the opposite way a solver would expect from every other puzzle
  // in this app, so the label now maps to the other token to match (same
  // fix already applied to Pyraminx).
  { label: "y", move: "y'", code: "KeyA", keyLabel: "A" },
  { label: "y'", move: "y", code: "Semicolon", keyLabel: ";" },
  { label: "bR", move: "bR", code: "KeyB", keyLabel: "B" },
  { label: "bR'", move: "bR'", code: "KeyC", keyLabel: "C" },
  { label: "dR", move: "dR", code: "KeyN", keyLabel: "N" },
  { label: "dR'", move: "dR'", code: "KeyM", keyLabel: "M" },
];

const builtinSets = [...megaminxOllSets, ...megaminxPllSets];

export default {
  id: "megaminx",
  label: "Megaminx",
  fullName: "Megaminx",
  cubingPuzzleId: "megaminx",
  controlsType: "faceTurn",
  controls,
  builtinSets,
};
