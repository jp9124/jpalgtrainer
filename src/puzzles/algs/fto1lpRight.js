// 1LP (Right) — the third of the 3 equivalent algorithms the source lists per
// case (see fto1lp.js for the notation/source, and fto1lpLeft.js for why this
// isn't simply "the same target, a different solution": the source's 3
// per-case algorithms are for 3 different physical entry rotations, not 3
// solves of one identical scrambled state).
//
// 3 of these 9 non-trivial cases (4a, 4c, 6a) happen to round-trip-verify
// against the Standard set's own target/scrambled pair — confirmed against
// the real engine, so those three reuse the Standard set's setupAlg exactly
// (their scrambled picture matches the same-named Standard case). The
// remaining 6 don't resolve to that shared target under any AUF/rotation
// correction tried, so — as in fto1lpLeft.js — they get their own setupAlg,
// built the same way as the Standard set's (the case's own trailing
// whole-puzzle rotation, if any, folded in front of "H"). Every case here is
// internally correct and pairwise-distinct, but for those 6, the scrambled
// picture isn't guaranteed to match the same-named case elsewhere. Case 1
// and Case 7 have no third algorithm in the source ("all angles are the
// same"), so they're carried over unchanged from the Standard set.
const cases = [
  { name: "Case 3", alg: "U (L R' L' R) U Uv", group: "1 Trigger", setupAlg: "R B' R' B" },
  { name: "Case 4a", alg: "U (B' R B R') U Uv'", group: "1 Trigger", setupAlg: "R B' R' B" },
  { name: "Case 4b", alg: "U' (R' L R L') U' Uv", group: "1 Trigger", setupAlg: "R B' R' B" },
  { name: "Case 6a", alg: "U' (B' R B R') U", group: "1 Trigger", setupAlg: "R B' R' B" },
  { name: "Case 6b", alg: "U (R' L R L') U'", group: "1 Trigger", setupAlg: "R B' R' B" },
  { name: "Case 2", alg: "U' (R' L R L') U (R' L R L') U'", group: "2 Triggers", setupAlg: "R B' R' B" },
  { name: "Case 4c", alg: "U (R' L R L') U (L R' L' R) U' Uv'", group: "2 Triggers", setupAlg: "R B' R' B" },
  { name: "Case 5", alg: "U' (R' L R L') U (R' L R L') U' Uv", group: "2 Triggers", setupAlg: "R B' R' B" },
  { name: "Case 8", alg: "U' (R' L R L') U' (R' L R L') U' Uv", group: "2 Triggers", setupAlg: "R B' R' B" },
];

export default {
  id: "1lp-right",
  name: "1LP (Right)",
  source: "1LP-Rotationless-V3.pdf",
  cases,
};
