// EP (Edge Permutation) — supplied by this project's user as a private
// Google Sheet ("Copy of 5 look resources", "EP" tab). Same translation as
// the CO set: the sheet's "algs (nonkarn)" column already lists each
// algorithm as a plain twist-pair sequence, so each "u,d" pair is wrapped in
// parens to match this app's own Square-1 alg syntax (parseSquare1Alg in
// square1Renderer.js) — e.g. "1,0 / 6,0 / 6,0 / -1,0" becomes
// "(1,0) / (6,0) / (6,0) / (-1,0)".
//
// Names are grouped the same way the source sheet visually separates them
// (its own section-divider rows: "cases using AdjAdj", "cases using M2s",
// etc., renamed here to Title Case; the leading ungrouped section is called
// "Basic Cases"). Grouping means cases are checked off a whole group at a
// time rather than individually — same tradeoff FTO's LBT set makes, and
// appropriate here given the size of this set (51 cases).
//
// Several names repeat across multiple sheet rows (e.g. "U perms" appears 4
// times, "O/Opp & Opp/O" 4 times) with a different algorithm each time —
// confirmed with this project's user that these are genuinely different
// scrambled states (different starting alignments needing their own
// algorithm), not alternate algorithms for one case, so every row is kept
// as its own numbered case, e.g. "U perms (1)".."U perms (4)". Where the
// sheet listed more than one algorithm within a single row's cell (a true
// same-case alternate), only the first-listed algorithm is kept, per the
// project's usual convention.
//
// The trivial already-solved case is omitted, matching the CO set.
const source = "Supplied by this project's user (private Google Sheet, \"EP\" tab)";

const cases = [
  { name: "-/-", alg: "(1,0) / (6,0) / (6,0) / (-1,0)", group: "Basic Cases" },
  { name: "Adj/Adj", alg: "(1,0) / (-1,2) / (1,1) / (0,-3) / (-1,0)", group: "Basic Cases" },
  { name: "Opp/Opp", alg: "(1,0) / (5,-1) / (-5,1) / (-1,0)", group: "Basic Cases" },
  { name: "side Opp/Opp", alg: "(-2,3) / (2,-4) / (1,1) / (-3,3) / (-1,0)", group: "Basic Cases" },
  { name: "Ul/Ur & Ur/Ul (good UU) (1)", alg: "(1,0) / (5,-1) / (-2,1) / (-1,-1) / (-2,1) / (-1,0)", group: "Basic Cases" },
  { name: "Ul/Ur & Ur/Ul (good UU) (2)", alg: "(1,0) / (2,-1) / (1,1) / (2,-1) / (-5,1) / (-1,0)", group: "Basic Cases" },
  { name: "Ul/Ul & Ur/Ur (bad UU) (1)", alg: "(1,0) / (5,-1) / (-5,1) / (0,3) / (3,0) / (-1,-1) / (-2,-1) / (-1,0)", group: "Basic Cases" },
  { name: "Ul/Ul & Ur/Ur (bad UU) (2)", alg: "(1,0) / (5,-1) / (-5,1) / (-3,0) / (3,0) / (-1,-1) / (-2,-1) / (-1,0)", group: "Basic Cases" },
  { name: "Z/Z", alg: "(1,0) / (2,-1) / (1,1) / (-4,2) / (1,1) / (0,-3) / (-1,0)", group: "Cases Using AdjAdj" },
  { name: "U perms (1)", alg: "(-2,0) / (-1,2) / (1,1) / (0,-3) / (3,0) / (-1,2) / (1,1) / (0,-3) / (-1,0)", group: "Cases Using AdjAdj" },
  { name: "U perms (2)", alg: "(1,0) / (-1,2) / (1,1) / (0,-3) / (-3,0) / (-1,2) / (1,1) / (0,-3) / (-1,0)", group: "Cases Using AdjAdj" },
  { name: "U perms (3)", alg: "(1,0) / (-1,2) / (1,1) / (0,-3) / (0,-3) / (-1,2) / (1,1) / (0,-3) / (-1,0)", group: "Cases Using AdjAdj" },
  { name: "U perms (4)", alg: "(1,-3) / (-1,2) / (1,1) / (0,-3) / (0,3) / (-1,2) / (1,1) / (0,-3) / (-1,0)", group: "Cases Using AdjAdj" },
  { name: "U/Z & Z/U (1)", alg: "(-2,0) / (-1,2) / (1,1) / (0,-3) / (-3,0) / (2,-1) / (1,1) / (-3,0) / (-1,0)", group: "Cases Using AdjAdj" },
  { name: "U/Z & Z/U (2)", alg: "(1,0) / (-1,2) / (1,1) / (0,-3) / (3,0) / (2,-1) / (1,1) / (-3,0) / (-1,0)", group: "Cases Using AdjAdj" },
  { name: "U/Z & Z/U (3)", alg: "(1,0) / (-1,2) / (1,1) / (0,-3) / (0,3) / (2,-1) / (1,1) / (-3,0) / (-1,0)", group: "Cases Using AdjAdj" },
  { name: "U/Z & Z/U (4)", alg: "(1,-3) / (-1,2) / (1,1) / (0,-3) / (0,-3) / (2,-1) / (1,1) / (-3,0) / (-1,0)", group: "Cases Using AdjAdj" },
  { name: "Z/- & -/Z (1)", alg: "(1,0) / (-1,-1) / (4,1) / (-1,-1) / (-2,1) / (-1,-1) / (0,1)", group: "Cases Using M2s" },
  { name: "Z/- & -/Z (2)", alg: "(1,0) / (-1,-1) / (1,-2) / (-1,-1) / (1,4) / (-1,-1) / (0,1)", group: "Cases Using M2s" },
  { name: "O/Opp & Opp/O (1)", alg: "(1,0) / (-1,-1) / (-2,1) / (-1,-1) / (-2,1) / (-1,-1) / (0,1)", group: "Cases Using M2s" },
  { name: "O/Opp & Opp/O (2)", alg: "(1,0) / (-1,-1) / (4,1) / (-1,-1) / (4,1) / (-1,-1) / (0,1)", group: "Cases Using M2s" },
  { name: "O/Opp & Opp/O (3)", alg: "(1,0) / (-1,-1) / (1,4) / (-1,-1) / (1,4) / (-1,-1) / (0,1)", group: "Cases Using M2s" },
  { name: "O/Opp & Opp/O (4)", alg: "(1,0) / (-1,-1) / (1,-2) / (-1,-1) / (1,-2) / (-1,-1) / (0,1)", group: "Cases Using M2s" },
  { name: "O/O (1)", alg: "(1,0) / (-1,-1) / (1,4) / (-1,-1) / (4,4) / (-1,-1) / (-2,1) / (-1,-1) / (0,1)", group: "Cases Using M2s" },
  { name: "O/O (2)", alg: "(1,0) / (-1,-1) / (1,-2) / (-1,-1) / (4,-2) / (-1,-1) / (-2,1) / (-1,-1) / (0,1)", group: "Cases Using M2s" },
  { name: "O/O (3)", alg: "(1,0) / (-1,-1) / (1,4) / (-1,-1) / (-2,4) / (-1,-1) / (4,1) / (-1,-1) / (0,1)", group: "Cases Using M2s" },
  { name: "O/O (4)", alg: "(1,0) / (-1,-1) / (1,-2) / (-1,-1) / (-2,-2) / (-1,-1) / (4,1) / (-1,-1) / (0,1)", group: "Cases Using M2s" },
  { name: "Z/H & H/Z (1)", alg: "(1,0) / (-1,-1) / (1,4) / (-1,-1) / (1,4) / (2,-4) / (1,1) / (-4,2) / (0,1)", group: "Cases Using M2s" },
  { name: "Z/H & H/Z (2)", alg: "(1,0) / (-1,-1) / (-2,1) / (-1,-1) / (-2,1) / (2,-4) / (1,1) / (-4,2) / (0,1)", group: "Cases Using M2s" },
  { name: "U/H & H/U (1)", alg: "(1,0) / (3,0) / (-3,0) / (3,0) / (-3,0) / (-1,-1) / (-3,0) / (3,0) / (-3,0) / (3,0) / (0,1)", group: "Cases Using 2 CP Algs" },
  { name: "U/H & H/U (2)", alg: "(0,-1) / (3,0) / (-3,0) / (3,0) / (-3,0) / (1,1) / (-3,0) / (3,0) / (-3,0) / (3,0) / (-1,0)", group: "Cases Using 2 CP Algs" },
  { name: "U/H & H/U (3)", alg: "(0,-1) / (0,-3) / (0,3) / (0,-3) / (0,3) / (1,1) / (0,3) / (0,-3) / (0,3) / (0,-3) / (-1,0)", group: "Cases Using 2 CP Algs" },
  { name: "U/H & H/U (4)", alg: "(1,0) / (0,-3) / (0,3) / (0,-3) / (0,3) / (-1,-1) / (0,3) / (0,-3) / (0,3) / (0,-3) / (0,1)", group: "Cases Using 2 CP Algs" },
  { name: "H/- & -/H (1)", alg: "/ (3,-3) / (-3,3) / (1,0) / (-3,3) / (3,-3) / (-1,0)", group: "Cases Using 2 CP Algs" },
  { name: "H/- & -/H (2)", alg: "/ (3,-3) / (-3,3) / (0,-1) / (-3,3) / (3,-3) / (0,1)", group: "Cases Using 2 CP Algs" },
  { name: "H/H", alg: "(1,0) / (5,-1) / (-2,-2) / (-1,-1) / (-2,4) / (-1,0)", group: "Cases Using 2 CP Algs" },
  { name: "Adj/O & O/Adj (1)", alg: "(1,0) / (-1,2) / (1,1) / (0,-3) / (3,0) / (2,-1) / (1,1) / (2,-1) / (-5,1) / (-1,0)", group: "Cases Using Good UU" },
  { name: "Adj/O & O/Adj (2)", alg: "(1,0) / (-1,2) / (1,1) / (0,-3) / (0,-3) / (5,-1) / (-2,1) / (-1,-1) / (-2,1) / (-1,0)", group: "Cases Using Good UU" },
  { name: "Adj/O & O/Adj (3)", alg: "(1,0) / (-1,2) / (1,1) / (0,-3) / (3,6) / (5,-1) / (-2,1) / (-1,-1) / (-2,1) / (-1,0)", group: "Cases Using Good UU" },
  { name: "Adj/O & O/Adj (4)", alg: "(1,0) / (-1,2) / (1,1) / (0,-3) / (0,3) / (2,-1) / (1,1) / (2,-1) / (-5,1) / (-1,0)", group: "Cases Using Good UU" },
  { name: "W/O, O/W (1)", alg: "(1,0) / (-1,2) / (1,1) / (0,-3) / (-3,0) / (2,-1) / (1,1) / (2,-1) / (-5,1) / (-1,0)", group: "Cases Using Good UU" },
  { name: "W/O, O/W (2)", alg: "(1,0) / (-1,2) / (1,1) / (0,-3) / (6,-3) / (5,-1) / (-2,1) / (-1,-1) / (-2,1) / (-1,0)", group: "Cases Using Good UU" },
  { name: "W/O, O/W (3)", alg: "(1,0) / (-1,2) / (1,1) / (0,-3) / (3,0) / (5,-1) / (-2,1) / (-1,-1) / (-2,1) / (-1,0)", group: "Cases Using Good UU" },
  { name: "W/O, O/W (4)", alg: "(1,0) / (-1,2) / (-1,-1) / (0,-3) / (0,-3) / (2,-1) / (1,1) / (2,-1) / (-5,1) / (-1,0)", group: "Cases Using Good UU" },
  { name: "W/Opp & Opp/W (1)", alg: "(1,0) / (2,-1) / (-2,1) / (2,-1) / (3,0) / (-3,0) / (-2,1) / (2,-1) / (-2,1) / (-1,0)", group: "Cases Using Good UU" },
  { name: "W/Opp & Opp/W (2)", alg: "(1,0) / (2,-1) / (1,1) / (2,-1) / (-5,1) / (3,0) / (0,3) / (-1,-1) / (1,-2) / (-1,0)", group: "Cases Using Good UU" },
  { name: "W/Adj & Adj/W (1)", alg: "(1,0) / (2,-1) / (1,1) / (2,-1) / (-2,1) / (-1,-1) / (-2,1) / (-1,0)", group: "Cases Using Good UU" },
  { name: "W/Adj & Adj/W (2)", alg: "(1,0) / (2,-1) / (1,1) / (2,-1) / (1,-2) / (-1,-1) / (-5,4) / (-1,0)", group: "Cases Using Good UU" },
  { name: "W/W", alg: "(1,0) / (2,-1) / (1,1) / (2,-1) / (-2,-2) / (-1,-1) / (-2,4) / (-1,0)", group: "Cases Using Good UU" },
  { name: "Adj/Opp & Opp/Adj (1)", alg: "(0,-1) / (-3,0) / (3,0) / (-3,0) / (1,1) / (2,-1) / (-3,0) / (3,0) / (0,1)", group: "Misc" },
  { name: "Adj/Opp & Opp/Adj (2)", alg: "(1,0) / (0,3) / (0,-3) / (-1,2) / (1,1) / (0,-3) / (0,3) / (0,-3) / (-1,0)", group: "Misc" },
];

export default {
  id: "ep",
  name: "EP",
  source,
  cases,
};
