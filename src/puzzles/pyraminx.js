// No official cubing.js keyboard layout exists for Pyraminx, so this reuses
// the same physical key positions as FTO/Megaminx for the matching face
// letters (U, L, R, B), for muscle-memory consistency across puzzles in
// this app. Tip moves are intentionally omitted — no published Pyraminx
// algorithm ever turns a tip, since tips have no orientation/permutation
// constraint.
const controls = [
  { label: "U", move: "U", code: "KeyJ", keyLabel: "J" },
  { label: "U'", move: "U'", code: "KeyF", keyLabel: "F" },
  { label: "R", move: "R", code: "KeyI", keyLabel: "I" },
  { label: "R'", move: "R'", code: "KeyK", keyLabel: "K" },
  { label: "L", move: "L", code: "KeyD", keyLabel: "D" },
  { label: "L'", move: "L'", code: "KeyE", keyLabel: "E" },
  { label: "B", move: "B", code: "KeyW", keyLabel: "W" },
  { label: "B'", move: "B'", code: "KeyO", keyLabel: "O" },
  { label: "y", move: "y", code: "KeyA", keyLabel: "A" },
  { label: "y'", move: "y'", code: "Semicolon", keyLabel: ";" },
];

// Sourced from the Speedsolving Wiki's Pyraminx algorithms page (ELL and
// Last-Layer sections).
const builtinSets = [
  {
    id: "ell-basics",
    name: "Last Layer Basics",
    source: "Speedsolving Wiki — Pyraminx algorithms (ELL)",
    cases: [
      { name: "Sledgehammer", alg: "R' L R L'" },
      { name: "Hedgeslammer", alg: "L R' L' R" },
    ],
  },
  {
    id: "ll-edge-cycles",
    name: "Last Layer Edge Cycles",
    source: "Speedsolving Wiki — Pyraminx algorithms (Last Layer)",
    cases: [
      { name: "Cycle edges, clockwise", alg: "R' U' R U' R' U' R" },
      { name: "Cycle edges, counter-clockwise", alg: "R' U R U R' U R" },
    ],
  },
];

export default {
  id: "pyraminx",
  label: "Pyraminx",
  fullName: "Pyraminx",
  cubingPuzzleId: "pyraminx",
  controlsType: "faceTurn",
  controls,
  builtinSets,
};
