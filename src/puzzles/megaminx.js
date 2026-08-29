// Reuses the same physical key positions as FTO's official layout for the
// 6 primary faces (R, B, L, U, F share identical key placements across
// puzzles in this app — only FR is megaminx-specific), matching the primary
// 12 keys from cubing.js's own megaminxKeyMapping.ts.
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
  { label: "y", move: "y", code: "KeyA", keyLabel: "A" },
  { label: "y'", move: "y'", code: "Semicolon", keyLabel: ";" },
];

// Megaminx doesn't have its own standardized OLL/PLL vocabulary the way 3x3
// does — most guides explicitly teach reusing 3x3's own last-layer
// algorithms directly, since they still work on megaminx's last layer.
// Sourced from SpeedCubeShop's Megaminx last-layer guide.
const builtinSets = [
  {
    id: "corner-orientation",
    name: "Corner Orientation",
    source: "SpeedCubeShop Megaminx last-layer guide (reused 3x3 Sune)",
    cases: [{ name: "Sune", alg: "R U R' U R U2 R'" }],
  },
  {
    id: "edge-permutation",
    name: "Edge Permutation",
    source: "SpeedCubeShop Megaminx last-layer guide (reused 3x3 T-perm)",
    cases: [{ name: "T-perm", alg: "R U R' U' R' F R2 U' R' U' R U R' F'" }],
  },
];

export default {
  id: "megaminx",
  label: "Megaminx",
  fullName: "Megaminx",
  cubingPuzzleId: "megaminx",
  controlsType: "faceTurn",
  controls,
  builtinSets,
};
