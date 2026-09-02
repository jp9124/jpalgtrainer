// 1LP ("One Look Pair Formation") — a last-step triangle-flipping set for
// L3T pair formation. 11 real cases (a 12th, "6c", is the already-solved
// state and is skipped).
//
// Source: "1LP-Rotationless-V3.pdf". Notation used there: S = R' L R L'
// (right sledge), S' = L R' L' R, H = R B' R' B (right hedge), H' = B' R B
// R'. "(U)"/"(U')" are real AUF turns; "[Uo]"/"[Uo']" are whole-puzzle
// U-axis rotations, translated here to "Uv"/"Uv'" (the actual FTO
// vertex-rotation move confirmed against the real engine) — same
// translation already used for the LBT/TCP sets. Each case in the source
// lists several equivalent algorithms, one per recognition angle; only the
// first (the one needing no incoming AUF) is used here. Every algorithm was
// parsed and round-trip-verified against the real `cubing` FTO engine, and
// all 11 produce pairwise-distinct patterns.
//
// Grouped by number of H/S trigger applications in the alg below — what the
// source itself calls a "flip" (its "Sequence of flips" column; e.g. case
// 7's comment "three flips away from a completed PF" is 3 uses of S/S').
// This gives 3 groups (1/2/3 flips), not 4 — a 4th ("0 flips") would only
// ever contain the already-solved case, which isn't included here.
//
// `setupAlg: "R B' R' B"` (= H) on every case but Case 1 matches the
// source's own footnote: "To set up the cases from a completely solved
// position, do H first, and then the inverse of the solution." Confirmed
// against the real engine — with H prepended, solving a case's alg lands
// back on the H-state (not on true solved), so the trainer treats that
// H-shifted pattern as this case's "solved" target (see loadPracticeCase's
// c.setupAlg handling in useTrainer.js). Case 1 is deliberately excluded:
// its alg IS H, so prepending H there cancels out and leaves nothing to
// scramble — round-trip-verified to break down exactly this way.
const cases = [
  { name: "Case 1", alg: "R B' R' B", group: "No Flipped Centers" },
  { name: "Case 2", alg: "Uv' R B' R' B U' R B' R' B U Uv", group: "No Flipped Centers", setupAlg: "R B' R' B" },
  { name: "Case 3", alg: "U' B' R B R' U'", group: "1 Flipped Center", setupAlg: "R B' R' B" },
  { name: "Case 4a", alg: "Uv' U R' L R L' Uv", group: "1 Flipped Center", setupAlg: "R B' R' B" },
  { name: "Case 4b", alg: "Uv U' L R' L' R Uv'", group: "1 Flipped Center", setupAlg: "R B' R' B" },
  { name: "Case 4c", alg: "Uv' U L R' L' R U R' L R L' U' Uv", group: "2 Flipped Centers", setupAlg: "R B' R' B" },
  { name: "Case 5", alg: "Uv L R' L' R U' R' L R L' U Uv'", group: "2 Flipped Centers", setupAlg: "R B' R' B" },
  { name: "Case 6a", alg: "Uv U' R' L R L' Uv'", group: "2 Flipped Centers", setupAlg: "R B' R' B" },
  { name: "Case 6b", alg: "Uv' U L R' L' R U' Uv", group: "2 Flipped Centers", setupAlg: "R B' R' B" },
  { name: "Case 7", alg: "Uv' L R' L' R U' L R' L' R U' R' L R L' U Uv", group: "3 Flipped Centers", setupAlg: "R B' R' B" },
  { name: "Case 8", alg: "R B' R' B U R B' R' B U", group: "3 Flipped Centers", setupAlg: "R B' R' B" },
];

export default {
  id: "1lp",
  name: "1LP",
  source: "1LP-Rotationless-V3.pdf",
  cases,
};
