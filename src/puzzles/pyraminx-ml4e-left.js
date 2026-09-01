// ML4E (Left Slot) — the Left Slot column counterpart to
// pyraminx-ml4e-right.js. See that file's header comment for the shared
// source, trigger-expansion, blank-cell derivation, and coverage notes —
// everything there applies here too, just for the other column.
const cases = [
  // Last 3 Edges
  { name: "Sledge", alg: "L U' R' L R L' L'", group: "Last 3 Edges" },
  { name: "Hedge", alg: "U' L' U R U' R' L", group: "Last 3 Edges" },
  { name: "Clockwise Cycle", alg: "U' L L R' L' R L'", group: "Last 3 Edges" },
  { name: "Counterclockwise Cycle", alg: "U' L R' L R L' L'", group: "Last 3 Edges" },
  // Flipped Edges
  { name: "Righty", alg: "L U' L'", group: "Flipped Edges" },
  { name: "Lefty", alg: "y' L' U L y", group: "Flipped Edges" },
  { name: "Sexy", alg: "U' L U L'", group: "Flipped Edges" },
  { name: "Ugly", alg: "y' U L' U' L y", group: "Flipped Edges" },
  { name: "DR Flip", alg: "L U' L R' L' R L'", group: "Flipped Edges" },
  { name: "DL Flip", alg: "L U R U R2' L R L2'", group: "Flipped Edges" },
  { name: "DB Flip", alg: "L R' L R L' U L'", group: "Flipped Edges" },
  { name: "4 Flip", alg: "L R U' R' L' U L R U' R' L'", group: "Flipped Edges" },
  // Polish Flip
  { name: "Right Polish Flip", alg: "U' L R U' R' L' U' L U L'", group: "Polish Flip" },
  { name: "Left Polish Flip", alg: "L R U' R' L' U L U' L'", group: "Polish Flip" },
  { name: "SUS", alg: "y' R' L R L' U' R' L R L' y", group: "Polish Flip" },
  { name: "Anti-SUS", alg: "L L R' L' R R U R' L'", group: "Polish Flip" },
  // Separated Bar
  { name: "Good Niky", alg: "L R U R' L'", group: "Separated Bar" },
  { name: "Good Sochi", alg: "L R U' R' L'", group: "Separated Bar" },
  { name: "Super Sledge", alg: "L R U R' R' L R L' U L'", group: "Separated Bar" },
  { name: "Super Hedge", alg: "U' R' R' L R L' U R L R U' R' R' L R L' U L'", group: "Separated Bar" },
];

export default {
  id: "ml4e-left",
  name: "ML4E (Left Slot)",
  source: "\"The Pyraminx Sheet - ML4E\" — Left Slot column",
  cases,
};
