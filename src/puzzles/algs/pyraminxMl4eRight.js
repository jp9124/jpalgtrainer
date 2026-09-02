// ML4E (Right Slot) — "The Pyraminx Sheet - ML4E" (L4E method variant where
// each case has two algorithm choices depending on which of the two
// remaining un-placed edges you route into a slot on your right vs your
// left). This file holds the Right Slot column; pyraminxMl4eLeft.js holds
// the Left Slot column for the exact same case list. Same S/H trigger
// convention as the base L4E set (S = R' L R L', H = L R' L' R), inlined
// into plain face turns below since the alg engine has no concept of named
// triggers. Grouped under the same category names as the base L4E set for
// consistency; only the first-listed alg is kept per cell (the sheet gives
// several alternates), matching that set's convention.
//
// Where the sheet left a slot's cell blank (Righty, Sexy — the two
// single-edge-flip trigger cases whose sheet only gave one slot's
// algorithm), the missing side is derived as "rotation + the base L4E
// algorithm" per this project's user's own instruction, rather than left
// unfilled. Concretely that's a y-conjugate — y <base alg> y' for a missing
// Right Slot entry — verified against the real engine to reproduce the
// sheet's OWN given value on the mirror-image cases (Lefty/Ugly, whose
// Left Slot was blank and whose GIVEN Right Slot let this be checked): for
// Righty (base "R U' R'", sheet gives Left Slot "L U' L'"), y (R U' R') y'
// reproduces "L U' L'" exactly, confirming the formula. This derivation
// only holds for these four simple single-trigger cases — it does NOT
// generalize to the longer, multi-move-trigger cases (verified: it fails
// to reproduce Sledge/Hedge/the Cycle cases' own given Left Slot from their
// given Right Slot), so it's used ONLY for Righty/Lefty/Sexy/Ugly, not
// applied elsewhere.
//
// Coverage note: the sheet's later rows (the rest of Separated Bar —
// Super Sledge/Super Hedge (included, but lower-confidence transcription
// due to multiple stacked alternates per cell) — Bad Niky, Bad Sochi — plus
// all of Connected Bar and No Bar) had enough stacked/ambiguous alternate
// lines per cell in the extracted text that they could not be transcribed
// with confidence and are deliberately left out rather than guessed. Also
// absent: "2-Flip", which the base L4E set has but this ML4E sheet doesn't
// cover at all. Add the missing cases via the Custom Set editor, or ask to
// have them filled in once the source text can be double-checked.
const cases = [
  // Last 3 Edges
  { name: "Sledge", alg: "U R' U L' U' L R", group: "Last 3 Edges" },
  { name: "Hedge", alg: "R' U L R' L' R R", group: "Last 3 Edges" },
  { name: "Clockwise Cycle", alg: "U R' L R' L' R R", group: "Last 3 Edges" },
  { name: "Counterclockwise Cycle", alg: "U R' R' L R L' R", group: "Last 3 Edges" },
  // Flipped Edges
  { name: "Righty", alg: "y R U' R' y'", group: "Flipped Edges" },
  { name: "Lefty", alg: "R' U R", group: "Flipped Edges" },
  { name: "Sexy", alg: "y U' R U R' y'", group: "Flipped Edges" },
  { name: "Ugly", alg: "U R' U' R", group: "Flipped Edges" },
  { name: "DR Flip", alg: "R' U' L' U' L2 R' L' R2", group: "Flipped Edges" },
  { name: "DL Flip", alg: "R' U R' L R L' R", group: "Flipped Edges" },
  { name: "DB Flip", alg: "R' L R' L' R U' R", group: "Flipped Edges" },
  { name: "4 Flip", alg: "R' L' U L R U' R' L' U L R", group: "Flipped Edges" },
  // Polish Flip
  { name: "Right Polish Flip", alg: "R' L' U L R U' R' U R", group: "Polish Flip" },
  { name: "Left Polish Flip", alg: "U R' L' U L R U R' U' R", group: "Polish Flip" },
  { name: "SUS", alg: "R' R' L R L' L' U' L R L R U' R' R' L R L' L'", group: "Polish Flip" },
  { name: "Anti-SUS", alg: "R' L' U L L R' L' R R", group: "Polish Flip" },
  // Separated Bar
  { name: "Good Niky", alg: "R' L' U L R", group: "Separated Bar" },
  { name: "Good Sochi", alg: "R' L' U' L R", group: "Separated Bar" },
  { name: "Super Sledge", alg: "R' L' U L L R' L' R U' R", group: "Separated Bar" },
  { name: "Super Hedge", alg: "R' U' L R' L' R R U' L L R' L' R L' U' R U' R'", group: "Separated Bar" },
];

export default {
  id: "ml4e-right",
  name: "ML4E (Right Slot)",
  source: "\"The Pyraminx Sheet - ML4E\" — Right Slot column",
  cases,
};
