// 5x5 L2E (Last Two Edges), one set grouped into its two natural sub-sets —
// cases that need no parity fix, and cases that do — rather than two
// separate builtin sets, so both are practiced together while still being
// checkable independently in the sidebar. Source: CubeSkills' "5x5 L2E
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
//
// Case names are prefixed per group ("No Parity 1", "Parity 1", ...) rather
// than reused across both ("Case 1" in each) — checked-case tracking and
// per-case best times are keyed by name alone, so identical names in two
// groups would collide.
const source =
  "Taken from CubeSkills' \"5x5 L2E Algorithms\" PDF";

const l2eSet = {
  id: "l2e",
  name: "L2E",
  source,
  cases: [
    { name: "No Parity 1", alg: "Rw' U' R' U (R' F R F') Rw", group: "No Parity" },
    { name: "No Parity 2", alg: "x' r U' R' U (R' F R F') Rw'", group: "No Parity" },
    { name: "No Parity 3", alg: "Rw2' F2 U2' Rw2' U2' F2 Rw2", group: "No Parity" },
    { name: "No Parity 4", alg: "Rw' Lw U' R' U (R' F R F') Rw Lw'", group: "No Parity" },
    { name: "Parity 1", alg: "Rw U2 x Rw U2 Rw U2' Rw' U2 Lw U2 x' l' U2' Rw U2 Rw' U2' Rw'", group: "Parity" },
    { name: "Parity 2", alg: "Rw U2 Rw U2' x U2 Rw U2' x' l' U2 Lw U2' Rw2", group: "Parity" },
    { name: "Parity 3", alg: "F2 Rw U2 Rw U2' Rw' F2 Rw' U2 Rw' U2' Rw U2 Rw' U2' Rw2", group: "Parity" },
    { name: "Parity 4", alg: "B2 Rw' U2 Rw' U2' Rw B2 Rw U2 Rw U2' Rw' U2 Rw U2' Rw2", group: "Parity" },
    { name: "Parity 5", alg: "Rw U2 Rw2 U2' Rw' U2 Rw U2' Rw' U2 Rw2 U2' Rw", group: "Parity" },
    { name: "Parity 6", alg: "Rw' U2' Rw2 U2' Rw U2' Rw' U2 Rw U2' Rw2 U2' Rw'", group: "Parity" },
    { name: "Parity 7", alg: "Rw' U2 Rw U2' x r' U2 Rw U2 Rw U2' Rw' U2 Rw U2' Rw2", group: "Parity" },
    { name: "Parity 8", alg: "Rw2 B2 Rw' U2 Rw' U2' x' U2 Rw' U2' Rw U2 Rw' U2' Rw2", group: "Parity" },
  ],
};

export const l2eSets = [l2eSet];
