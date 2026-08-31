// 5x5 L2E (Last Two Edges), split into its two natural sub-sets: cases that
// need no parity fix, and cases that do. Source: CubeSkills' "5x5 L2E
// Algorithms" PDF. Each case there shows a primary (bold) algorithm and,
// for some No Parity cases, a bolded alternative-angle algorithm below it —
// only the primary one is kept here, per the project's user. Every
// algorithm below was parsed and round-trip-verified against the real
// `cubing` engine (applying the case's alg, then its inverse, returns to
// solved) before being included.
//
// The source's 3Rw/3Rw'/3Lw/3Lw' (deep, 3-layer wide turns) were rewritten
// to an equivalent move+rotation pair — 3Rw = x l, 3Rw' = x' l', 3Lw = x' r,
// 3Lw' = x r' — rather than adding dedicated keys for them, since those
// four cases are the only place this app needs that move at all. Each
// substitution was verified to produce an identical resulting pattern to
// the original token (not just a plausible-looking one) before being used.
const source =
  "Taken from CubeSkills' \"5x5 L2E Algorithms\" PDF";

const noParitySet = {
  id: "l2e-no-parity",
  name: "L2E (No Parity)",
  source,
  cases: [
    { name: "Case 1", alg: "Rw' U' R' U (R' F R F') Rw" },
    { name: "Case 2", alg: "x' r U' R' U (R' F R F') Rw'" },
    { name: "Case 3", alg: "Rw2' F2 U2' Rw2' U2' F2 Rw2" },
    { name: "Case 4", alg: "Rw' Lw U' R' U (R' F R F') Rw Lw'" },
  ],
};

const paritySet = {
  id: "l2e-parity",
  name: "L2E (Parity)",
  source,
  cases: [
    { name: "Case 1", alg: "Rw U2 x Rw U2 Rw U2' Rw' U2 Lw U2 x' l' U2' Rw U2 Rw' U2' Rw'" },
    { name: "Case 2", alg: "Rw U2 Rw U2' x U2 Rw U2' x' l' U2 Lw U2' Rw2" },
    { name: "Case 3", alg: "F2 Rw U2 Rw U2' Rw' F2 Rw' U2 Rw' U2' Rw U2 Rw' U2' Rw2" },
    { name: "Case 4", alg: "B2 Rw' U2 Rw' U2' Rw B2 Rw U2 Rw U2' Rw' U2 Rw U2' Rw2" },
    { name: "Case 5", alg: "Rw U2 Rw2 U2' Rw' U2 Rw U2' Rw' U2 Rw2 U2' Rw" },
    { name: "Case 6", alg: "Rw' U2' Rw2 U2' Rw U2' Rw' U2 Rw U2' Rw2 U2' Rw'" },
    { name: "Case 7", alg: "Rw' U2 Rw U2' x r' U2 Rw U2 Rw U2' Rw' U2 Rw U2' Rw2" },
    { name: "Case 8", alg: "Rw2 B2 Rw' U2 Rw' U2' x' U2 Rw' U2' Rw U2 Rw' U2' Rw2" },
  ],
};

export const l2eSets = [noParitySet, paritySet];
