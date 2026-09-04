// ML4E (Left Slot) — the Left Slot column counterpart to
// pyraminxMl4eRight.js. See that file's header comment for the shared
// source, trigger-expansion, blank-cell derivation, and coverage notes —
// everything there applies here too, just for the other column.
const cases = [
  // Last 3 Edges
  { name: "Sledge", alg: "L U' R' L R L' L'", group: "Last 3 Edges" },
  { name: "Hedge", alg: "U' L U' R U R' L'", group: "Last 3 Edges" },
  { name: "Clockwise Cycle", alg: "U' L L R' L' R L'", group: "Last 3 Edges" },
  { name: "Counterclockwise Cycle", alg: "U' L R' L R L' L'", group: "Last 3 Edges" },
  { name: "Righty", alg: "L U' L'", group: "Last 3 Edges" },
  { name: "Lefty", alg: "y' L' U L y", group: "Last 3 Edges" },
  { name: "Sexy", alg: "U' L U L'", group: "Last 3 Edges" },
  { name: "Ugly", alg: "y' U L' U' L y", group: "Last 3 Edges" },
  // Flipped Edges
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
  { name: "Super Sledge", alg: "L U S L'", group: "Separated Bar" },
  { name: "Super Hedge", alg: "U' L L R' L' R L' U' R U' R'", group: "Separated Bar" },
  { name: "Bad Niky", alg: "U L U R U' R' U' L'", group: "Separated Bar" },
  { name: "Bad Sochi", alg: "L U R U R' U' L'", group: "Separated Bar" },
  // Connected Bar
  { name: "Right Spam", alg: "L U R U' R' U L'", group: "Connected Bar" },
  { name: "Left Spam", alg: "L R U' R' R' L R L' U' L'", group: "Connected Bar" },
  { name: "Bad Sledge", alg: "L R U R' U L'", group: "Connected Bar" },
  { name: "Bad Hedge", alg: "L U L R' L' R R U R' L'", group: "Connected Bar" },
  // No Bar
  { name: "Bad Sexy", alg: "U L L R' L' R R U' R' L'", group: "No Bar" },
  { name: "Bad Ugly", alg: "L R U R' R' L R L' L'", group: "No Bar" },
  { name: "Bad Righty", alg: "L U' L R' L' R U' L'", group: "No Bar" },
  { name: "Bad Lefty", alg: "L U R' L R L' U L'", group: "No Bar" },
  { name: "Double Sexy", alg: "L U' L' U' L U L'", group: "No Bar" },
  { name: "Double Ugly", alg: "U L R' L R L' L' U' L U L'", group: "No Bar" },
];

export default {
  id: "ml4e-left",
  name: "ML4E (Left Slot)",
  source: "\"The Pyraminx Sheet - ML4E\" — Left Slot column",
  cases,
};
