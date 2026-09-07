// 1LP (Left) — the second of the 3 equivalent algorithms the source lists per
// case (see fto1lp.js for the notation, source, and setupAlg mechanism this
// file reuses verbatim). fto1lp.js's Standard set uses each case's first
// listed algorithm — "the one needing no incoming AUF" — which lets every
// case share one fixed setupAlg ("H", optionally rotated) as its target.
//
// This set's algorithms (the source's 2nd line per case) do NOT resolve to
// that same shared target — round-trip-verified against the real engine, none
// of the 9 non-trivial cases' second algorithms land back on the Standard
// set's target from the Standard set's scrambled state. The source's own
// framing ("solutions are given for each puzzle orientation") indicates these
// are solutions for the case as entered from a different physical rotation,
// not alternate solves of the identical scrambled state — so each case here
// instead gets its OWN setupAlg, built the same way the Standard set's own
// setupAlg is (case's own trailing whole-puzzle rotation, if the algorithm
// ends in one, folded in front of "H"). This keeps every case here internally
// correct (scrambling via setupAlg + inverse, solving via the case's alg,
// returns to that case's own target) and pairwise-distinct from its sibling
// cases, but its scrambled picture is not guaranteed to visually match the
// same-named case in the Standard or Right sets. Case 1 and Case 7 have no
// second algorithm in the source ("all angles are the same"), so they're
// carried over unchanged from the Standard set.
const cases = [
  { name: "Case 1", alg: "(R B' R' B)", group: "1 Trigger", setupAlg: "R B' R' B" },
  { name: "Case 2", alg: "U (L R' L' R) U' (L R' L' R) U", group: "2 Triggers", setupAlg: "R B' R' B" },
  { name: "Case 3", alg: "Uv U (R' L R L') U", group: "1 Trigger", setupAlg: "R B' R' B" },
  { name: "Case 4a", alg: "Uv U (L R' L' R) U Uv'", group: "1 Trigger", setupAlg: "Uv' R B' R' B" },
  { name: "Case 4b", alg: "Uv U' (B' R B R') U' Uv'", group: "1 Trigger", setupAlg: "Uv' R B' R' B" },
  { name: "Case 4c", alg: "Uv U' (L R' L' R) U' (R' L R L') U Uv", group: "2 Triggers", setupAlg: "Uv R B' R' B" },
  { name: "Case 5", alg: "Uv U (L R' L' R) U' (L R' L' R) U Uv'", group: "2 Triggers", setupAlg: "Uv' R B' R' B" },
  { name: "Case 6a", alg: "Uv U' (L R' L' R) U", group: "1 Trigger", setupAlg: "R B' R' B" },
  { name: "Case 6b", alg: "Uv U (B' R B R') U' Uv", group: "1 Trigger", setupAlg: "Uv R B' R' B" },
  { name: "Case 7", alg: "(L R' L' R) U' (L R' L' R) U' (R' L R L') U Uv", group: "3 Triggers", setupAlg: "Uv R B' R' B" },
  { name: "Case 8", alg: "U (L R' L' R) U (L R' L' R) U Uv'", group: "2 Triggers", setupAlg: "Uv' R B' R' B" },
];

export default {
  id: "1lp-left",
  name: "1LP (Left)",
  source: "1LP-Rotationless-V3.pdf",
  cases,
};
