// 1LP ("rotationless" table format) — a small set for a last-step
// triangle-flipping case, with 0–3 triangles needing a flip. The source
// table lists several equivalent algorithms per case (one per symmetric
// entry angle, so you never need to physically rotate the puzzle first) —
// only the first/simplest is used here, since they're all equally valid.
//
// Source: "1LP-Rotationless-Tableformat.pdf". Notation used there: S = R' L
// R L', S' = L R' L' R, H = R B' R' B, H' = B' R B R', Uo/Uo' = a U-axis
// whole-puzzle rotation. That last one isn't a literal cubing.js move name,
// so it's translated here to "Uv"/"Uv'" (the actual FTO vertex-rotation
// move confirmed against the real engine) — same translation already used
// for the LBT set. The 0-flip case is skipped (trivially already solved).
const cases = [
  { name: "1 flip", alg: "U' B' R B R' U'" },
  { name: "2 flips", alg: "R B' R' B U' R B' R' B U Uv" },
  { name: "3 flips", alg: "L R' L' R U' L R' L' R U' R' L R L' U Uv" },
];

export default {
  id: "1lp",
  name: "1LP",
  source: "1LP-Rotationless-Tableformat.pdf",
  cases,
};
