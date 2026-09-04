// CO (Corner Orientation) — supplied by this project's user as a private
// Google Sheet ("Copy of 5 look resources", "CO" tab). The sheet lists each
// case's algorithm in two forms — a compact personal fingertrick shorthand
// ("karn") and a plain twist-pair sequence ("nonkarn"); the "nonkarn" form
// is used here since it already matches this app's own Square-1 alg syntax
// (parseSquare1Alg in square1Renderer.js) once each "u,d" pair is wrapped in
// parens — e.g. the sheet's "1,0 / -1,0" becomes "(1,0) / (-1,0)".
//
// Two rows from the sheet are omitted: the trivial already-solved case, and
// "squanflip" (a recognition note about cancelling into a specific bar
// setup, not a standalone algorithm — its own alg/nonkarn cell has no
// literal move sequence, just prose).
//
// Where the sheet listed more than one algorithm for a case (alternate
// setup angles for what's confirmed to be the same underlying case, given
// Square-1 CO's small state space), only the sheet's first-listed algorithm
// is kept, per the project's usual convention for alternates. "Adj/Opp &
// Opp/Adj" and "1c/1c" each cover two mirrored sub-cases in the sheet, kept
// here as separate numbered entries since they're distinct scrambled states.
const source = "Supplied by this project's user (private Google Sheet, \"CO\" tab)";

const cases = [
  { name: "Adj/Adj", alg: "(1,0) / (-1,0)" },
  { name: "Adj/Opp & Opp/Adj (1)", alg: "(1,0) / (0,3) / (0,3) / (-1,0)" },
  { name: "Adj/Opp & Opp/Adj (2)", alg: "(0,-1) / (-3,0) / (-3,0) / (0,1)" },
  { name: "Opp/Opp", alg: "(1,0) / (-3,-3) / (-1,0)" },
  { name: "1c/1c (1)", alg: "(1,0) / (6,-3) / (-1,0)" },
  { name: "1c/1c (2)", alg: "(1,0) / (0,3) / (-1,0)" },
];

export default {
  id: "co",
  name: "CO",
  source,
  cases,
};
