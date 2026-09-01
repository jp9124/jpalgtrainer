// No official cubing.js keyboard layout exists for Skewb either, so this
// reuses the same physical key positions as FTO/Megaminx/Pyraminx for the
// matching face letters (U, L, R, B, F), plus a y/y' whole-puzzle rotation
// binding (handy for Sarah's-method-style algorithms that reorient between
// sledgehammers/hedgeslammers).
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
  // Swapped relative to the literal cubing.js token: on this puzzle "y"
  // rotated the opposite way a solver would expect from every other puzzle
  // in this app, so the label now maps to the other token to match (same
  // fix already applied to Pyraminx and Megaminx).
  { label: "y", move: "y'", code: "KeyA", keyLabel: "A" },
  { label: "y'", move: "y", code: "Semicolon", keyLabel: ";" },
];

// Sourced from Sarah's Cubing Site — "Speedskewbin" beginner-method guide
// (sarah.cubing.net/skewb/skewb-guide.pdf), read directly from the PDF.
const builtinSets = [
  {
    id: "beginner-basics",
    name: "Beginner Basics",
    source: "Sarah's Cubing Site — Speedskewbin guide",
    cases: [
      { name: "Sledgehammer", alg: "F' L F L'" },
      { name: "Hedgeslammer", alg: "L F' L' F" },
      { name: "Corner Fix", alg: "L F' L' R' F R" },
    ],
  },
];

export default {
  id: "skewb",
  label: "Skewb",
  fullName: "Skewb",
  cubingPuzzleId: "skewb",
  controlsType: "faceTurn",
  controls,
  builtinSets,
  cameraLongitude: 45,
};
