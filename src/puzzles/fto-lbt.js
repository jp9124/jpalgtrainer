// LBT ("last bottom triple") — a one-look algorithm set for the last step of
// the Bencisco FTO method, letting you solve the bottom triple with a single
// alg regardless of where the corner/triangles are, instead of the
// traditional flip-and-insert approach.
//
// Source: https://zwegner.github.io/cubing/fto/lbt-algs.html (96 cases,
// organized into 24 groups of 4). Each group is a case, its mirror, and
// those with the corner flipped.
//
// Notes on what's included here (92 of 96 cases):
// - Case 21 is skipped: the source explicitly has no algorithm for it
//   ("Uhh you probably don't need an alg here").
// - Cases 11, 65, 66 are skipped: they use a "Us" (U-slice) move that isn't
//   part of cubing.js's FTO move set, and no reliable equivalent could be
//   confirmed.
// - The source's own shorthand "Uo" (a whole-puzzle rotation) and "Xw"-style
//   wide moves ("Uw", "BLw", "BRw") were translated to the actual moves
//   cubing.js's FTO engine accepts: "Uo" -> "Uv" (the confirmed U-axis
//   vertex rotation), "Uw"/"BLw"/"BRw" -> "u"/"bl"/"br" (FTO's wide moves
//   are a bare lowercase letter, not a "w" suffix — confirmed empirically
//   against the real move engine, not guessed). Every algorithm below has
//   been validated to parse and apply cleanly against the real FTO kpuzzle.
// - Where a case listed multiple alternative algs, only the first is used
//   here — they're equally valid, so any one is a fine training target.
const lbtCases = [
  { name: "Case 1", alg: "BL R' L' R L BL'", group: "Group 1: one solved, one on top", note: "Keyhole from top" },
  { name: "Case 2", alg: "Uv' BR' L R L' R' BR", group: "Group 1: one solved, one on top", note: "Keyhole from top" },
  { name: "Case 3", alg: "F R' L R L' R B' R' B F'", group: "Group 1: one solved, one on top", note: "Join corner with tri on top, 2-flip, return" },
  { name: "Case 4", alg: "BL' R B' R' B R' L R L' BL", group: "Group 1: one solved, one on top", note: "Join corner with tri on top, 2-flip, return" },
  { name: "Case 5", alg: "u' BL L' R' L R BL'", group: "Group 2: one solved, one in middle", note: "Keyhole from middle" },
  { name: "Case 6", alg: "Uv' u BR' R L R' L' BR", group: "Group 2: one solved, one in middle", note: "Keyhole from middle" },
  { name: "Case 7", alg: "bl' U' R B' R' B U B' bl L", group: "Group 2: one solved, one in middle", note: "Both algs are the same, just notated differently for different execution styles. First alg is a bit easier but worse for lookahead" },
  { name: "Case 8", alg: "Uv' br U L' B L B' U' B br' R'", group: "Group 2: one solved, one in middle", note: "Ditto notes from case 7" },
  { name: "Case 9", alg: "L R' L R U' B' R B R' U L", group: "Group 3: one on top, one in middle" },
  { name: "Case 10", alg: "U R' L' R U R' L R L' U' L", group: "Group 3: one on top, one in middle" },
  { name: "Case 12", alg: "R' L' R L' U R B' R' B U' L'", group: "Group 3: one on top, one in middle" },
  { name: "Case 13", alg: "F' L' R U' R' U L R' F R", group: "Group 4: one in wrong slot, one on top", note: "The first alg is the same as 22 but with the R at the end. Both algs are kinda nice, the ones with D moves are easiest to do using wide moves to put the D layer on top, though that's bad for lookahead" },
  { name: "Case 14", alg: "F' BR' L' D' L D BR F", group: "Group 4: one in wrong slot, one on top", note: "Same algs but mirrored from case 13, I don't use the same alg for each case" },
  { name: "Case 15", alg: "L' R' L R U' L' R' L R", group: "Group 4: one in wrong slot, one on top" },
  { name: "Case 16", alg: "BL' L R' L' BL L' R L", group: "Group 4: one in wrong slot, one on top" },
  { name: "Case 17", alg: "R' L' R U L' B L B' U' L", group: "Group 5: one in wrong slot, one in middle" },
  { name: "Case 18", alg: "Uv' L R L' U' R B' R' B U R'", group: "Group 5: one in wrong slot, one in middle" },
  { name: "Case 19", alg: "R D R' U R' D' R", group: "Group 5: one in wrong slot, one in middle", note: "The D moves are a bit awkward to perform on current hardware, so you can do this alg by rotating to put the R face on top and D face on the right" },
  { name: "Case 20", alg: "Uv' L' D' L U' L D L'", group: "Group 5: one in wrong slot, one in middle", note: "Ditto notes for case 20, but mirrored" },
  { name: "Case 22", alg: "R F' L' R U' R' U L R' F", group: "Group 6: both in slot" },
  { name: "Case 23", alg: "BL' R B' R' B U B' R B R' U' BL", group: "Group 6: both in slot" },
  { name: "Case 24", alg: "R' L' R L' B L' B'", group: "Group 6: both in slot" },
  { name: "Case 25", alg: "U' L' U L R' L' R U' R' L R", group: "Group 7: both on top" },
  { name: "Case 26", alg: "R' L R L R' L' R U' R' L R L' U L'", group: "Group 7: both on top" },
  { name: "Case 27", alg: "R' L' R L' U L' R' L R U' L'", group: "Group 7: both on top" },
  { name: "Case 28", alg: "U' L' R' L F' L R L' R' F R", group: "Group 7: both on top" },
  { name: "Case 29", alg: "L BL' B' BL L R' L' R BL' B BL L'", group: "Group 8: both in middle" },
  { name: "Case 30", alg: "R' L' R L U' F R B' R' F' B", group: "Group 8: both in middle" },
  { name: "Case 31", alg: "R' F' R' B' R' B R' F L' R L", group: "Group 8: both in middle" },
  { name: "Case 32", alg: "u' L U L' B L' B' R' L' R U' L'", group: "Group 8: both in middle" },
  { name: "Case 33", alg: "U' F R' L R L' F'", group: "Group 9: pair on top" },
  { name: "Case 34", alg: "U BL' R B' R' B BL", group: "Group 9: pair on top" },
  { name: "Case 35", alg: "L' U' R' L R L' U R' L R", group: "Group 9: pair on top" },
  { name: "Case 36", alg: "Uv' R U L R' L' R U' L R' L'", group: "Group 9: pair on top" },
  { name: "Case 37", alg: "R B' R' F R B R' F'", group: "Group 10: pair in middle" },
  { name: "Case 38", alg: "L R' L' BL' L R L' BL", group: "Group 10: pair in middle" },
  { name: "Case 39", alg: "u F U R B' R' B U' F'", group: "Group 10: pair in middle" },
  { name: "Case 40", alg: "u' BL' U B' R B R' U' BL", group: "Group 10: pair in middle" },
  { name: "Case 41", alg: "U F U' L R' L' R U F'", group: "Group 11: triangle on top above opposite slot" },
  { name: "Case 42", alg: "U BL' U R B' R' B U' BL", group: "Group 11: triangle on top above opposite slot" },
  { name: "Case 43", alg: "Uv' U' R' U' R L R' L' U R", group: "Group 11: triangle on top above opposite slot" },
  { name: "Case 44", alg: "U L U L' R' L R U' L'", group: "Group 11: triangle on top above opposite slot" },
  { name: "Case 45", alg: "Uv' U BR U L R' L' R U' BR'", group: "Group 12: triangle on top in back" },
  { name: "Case 46", alg: "U' BL' U' R' L R L' U BL", group: "Group 12: triangle on top in back" },
  { name: "Case 47", alg: "Uv' U BR U R B' R' B U' BR'", group: "Group 12: triangle on top in back" },
  { name: "Case 48", alg: "U BL' U' R B' R' B U BL", group: "Group 12: triangle on top in back" },
  { name: "Case 49", alg: "U' L' U' R' L R L' U L", group: "Group 13: pair on top" },
  { name: "Case 50", alg: "Uv' U R U L R' L' R U' R'", group: "Group 13: pair on top" },
  { name: "Case 51", alg: "U L U B' R B R' U' L'", group: "Group 13: pair on top" },
  { name: "Case 52", alg: "U' L' U' R B' R' B U L", group: "Group 13: pair on top" },
  { name: "Case 53", alg: "L' U L R' L' R U' L", group: "Group 14: pair in middle" },
  { name: "Case 54", alg: "Uv' R U' R' L R L' U R'", group: "Group 14: pair in middle" },
  { name: "Case 55", alg: "R' L R U B' R B R' U' L'", group: "Group 14: pair in middle" },
  { name: "Case 56", alg: "Uv' L R' L' U' B L' B' L U R", group: "Group 14: pair in middle" },
  { name: "Case 57", alg: "Uv' B' R B U R' L R L' U' R'", group: "Group 15: triangle on top above opposite slot" },
  { name: "Case 58", alg: "R L U' R' L R L' U L' R'", group: "Group 15: triangle on top above opposite slot" },
  { name: "Case 59", alg: "Uv' U R U R' L R L' U' R'", group: "Group 15: triangle on top above opposite slot" },
  { name: "Case 60", alg: "U L U R B' R' B U' L'", group: "Group 15: triangle on top above opposite slot" },
  { name: "Case 61", alg: "Uv' U R' L F R F' R L' U' R'", group: "Group 16: triangle on top in back" },
  { name: "Case 62", alg: "U' L R' F' L' F L' R U L", group: "Group 16: triangle on top in back" },
  { name: "Case 63", alg: "Uv' U R U R L R' L' U' R'", group: "Group 16: triangle on top in back" },
  { name: "Case 64", alg: "U' L' U' L' R' L R U L", group: "Group 16: triangle on top in back" },
  { name: "Case 67", alg: "u L U' B' R B R' U L'", group: "Group 17: pair on top" },
  { name: "Case 68", alg: "u' L' U R B' R' B U' L", group: "Group 17: pair on top" },
  { name: "Case 69", alg: "R B' R' B U R' L' R L", group: "Group 18: pair in middle" },
  { name: "Case 70", alg: "Uv' L R' L' R U' R L R' L'", group: "Group 18: pair in middle" },
  { name: "Case 71", alg: "Uv' U L R' L' R U' R' B' R B", group: "Group 18: pair in middle" },
  { name: "Case 72", alg: "R' L R U L R' L' R U' L'", group: "Group 18: pair in middle" },
  { name: "Case 73", alg: "U L U R' L R L' U' L'", group: "Group 19: triangle on top above opposite slot" },
  { name: "Case 74", alg: "Uv' U' R' U' L R' L' R U R", group: "Group 19: triangle on top above opposite slot" },
  { name: "Case 75", alg: "Uv' u U R' U' R' L R L' U R", group: "Group 19: triangle on top above opposite slot" },
  { name: "Case 76", alg: "u' U' L U L R' L' R U' L'", group: "Group 19: triangle on top above opposite slot" },
  { name: "Case 77", alg: "U L R' L' R U' L' R' L R", group: "Group 20: triangle on top in back" },
  { name: "Case 78", alg: "U' L R' L' R U R' L' R L", group: "Group 20: triangle on top in back" },
  { name: "Case 79", alg: "Uv' L R F L' R' L R F' L' R'", group: "Group 20: triangle on top in back" },
  { name: "Case 80", alg: "R' L' F' R L R' L' F R L", group: "Group 20: triangle on top in back" },
  { name: "Case 81", alg: "Uv' R L R' L' U' R L R' L'", group: "Group 21: triangles on left" },
  { name: "Case 82", alg: "B' R B R' U L' R' L R", group: "Group 21: triangles on left" },
  { name: "Case 83", alg: "L R' L R U' R B' R' B U L", group: "Group 21: triangles on left" },
  { name: "Case 84", alg: "R L U L R' L' R U' L' R'", group: "Group 21: triangles on left" },
  { name: "Case 85", alg: "B' R B R' U' R' L' R L", group: "Group 22: triangles on right" },
  { name: "Case 86", alg: "Uv' L U L' R L R' U' L'", group: "Group 22: triangles on right" },
  { name: "Case 87", alg: "Uv' U L' R' U' R' L R L' U R L", group: "Group 22: triangles on right" },
  { name: "Case 88", alg: "U R L U' B' R B R' U L' R'", group: "Group 22: triangles on right" },
  { name: "Case 89", alg: "Uv' L U F L' R L R' F' U' L'", group: "Group 23: triangles in back" },
  { name: "Case 90", alg: "L B U' L U B L' BL L' BL' B", group: "Group 23: triangles in back" },
  { name: "Case 91", alg: "F' BL' F' B L' B' L F BL F", group: "Group 23: triangles in back" },
  { name: "Case 92", alg: "Uv' BR R' L R BR' L' U' R L R' L'", group: "Group 23: triangles in back" },
  { name: "Case 93", alg: "U BL' U BL R' L R L' BL' U' BL", group: "Group 24: both in slot, corner on top", note: "Note the second alg is not center-safe, the U layer must be aligned with the middle layer. It's the standard 'A perm' alg" },
  { name: "Case 94", alg: "L' U' R B' R L' R L B U L", group: "Group 24: both in slot, corner on top" },
  { name: "Case 95", alg: "BL' U' BL R' L R L' BL' U BL", group: "Group 24: both in slot, corner on top", note: "Second alg has same notes as case 93, standard A perm and not center safe" },
  { name: "Case 96", alg: "U L U L' R B' R' B' L B' U' L'", group: "Group 24: both in slot, corner on top" },
];

export default {
  id: "lbt",
  name: "LBT",
  source: "zwegner.github.io — Algorithmic LBT (one-look last-bottom-triple algs)",
  cases: lbtCases,
};
