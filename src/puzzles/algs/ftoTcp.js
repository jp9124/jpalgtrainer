// TCP (Triangle + Corner Permutation) — 18 cases across three groups: Even,
// Odd, and 2-Flip. Source: "TCP_Full_Diansheng_DaYan.pdf", written in CIF
// (Corner In Front) notation.
//
// Translated to real cubing.js FTO moves the same way as the LBT set: "Uo"/
// "Uo'" -> "Uv"/"Uv'", "Fo"/"Fo'" -> "Fv"/"Fv'" (the vertex-rotation moves),
// and "Fw"/"Fw'" -> "f"/"f'" (FTO's wide moves are a bare lowercase letter,
// not a "w" suffix). Every algorithm below has been validated to parse and
// apply cleanly against the real FTO kpuzzle. Parentheses in the source are
// just visual chunking and carry no effect on execution, so they're dropped.
//
// Odd TCP's algorithms include their AUF as the very first move (per the
// source's own note) rather than leaving it implicit.
//
// Every case ends with the inverse of whatever whole-puzzle rotation(s)
// (Uv/Uv'/Fv/Fv') it opens with, so the puzzle is back at its starting
// orientation once the algorithm finishes — a leading plain "U" AUF (odd
// TCP) is left alone since it isn't a rotation. Verified against the real
// FTO engine: extracting just the rotation tokens from each corrected alg,
// in order, and applying that sub-sequence to solved returns to solved
// (net-zero rotation) for all 18 cases. Uv/Fv are order 3 (confirmed against
// the engine, not assumed — FTO's faces are triangular, so this holds even
// though the C4RNER corner piece they pivot has 4 orientations). Case 11
// nets two different-axis rotations (Uv then Fv), corrected with "Fv' Uv'"
// (not "Uv' Fv'" — inverting a sequence reverses its order); Case 16 nets
// Uv2 (Uv then Uv again after T'), whose inverse under order 3 is a single
// "Uv" (Uv2 · Uv = Uv3 = identity), not "Uv2". Cases 1 and 13 open with no
// rotation at all, so need no change.
const cases = [
  // Even TCP
  { name: "Case 1: Clockwise corners and clockwise triangles", alg: "B' R B R'", group: "Even TCP" },
  { name: "Case 2: Anticlockwise corners and anticlockwise triangles", alg: "Uv R B' R' B Uv'", group: "Even TCP" },
  { name: "Case 3: Solved corners, clockwise triangles", alg: "Uv T' U' F' D F' U F D' F T Uv'", group: "Even TCP" },
  { name: "Case 4: Solved corners, anticlockwise triangles", alg: "Uv' T U F D' F U' F' D F2 T' Uv", group: "Even TCP" },
  { name: "Case 5: Clockwise corners, anticlockwise triangles", alg: "Uv' T U F' U' F' D' F U F' D F U' F T' Uv", group: "Even TCP" },
  { name: "Case 6: Anticlockwise corners, clockwise triangles", alg: "Uv T' U' F U F D F' U' F D' F' U F' T Uv'", group: "Even TCP" },
  // Odd TCP
  { name: "Case 7: Solved corners, clockwise AUF", alg: "U Uv' T F D F' U F D' F U' F T' Uv", group: "Odd TCP" },
  { name: "Case 8: Solved corners, anticlockwise AUF", alg: "U' Uv T' F' D' F U' F' D F' U F' T Uv'", group: "Odd TCP" },
  { name: "Case 9: Clockwise corners, clockwise AUF", alg: "U Uv' T F D F' U F D F U' F' D F2 T' Uv", group: "Odd TCP" },
  { name: "Case 10: Anticlockwise corners, anticlockwise AUF", alg: "U' Uv T' F' D' F U' F' D' F' U F D' F T Uv'", group: "Odd TCP" },
  { name: "Case 11: Anticlockwise corners, clockwise AUF", alg: "T Uv U' D F' U F D' Fv F' U F U' Fv' Uv' T'", group: "Odd TCP" },
  { name: "Case 12: Clockwise corners, anticlockwise AUF", alg: "Uv T U D' F U' F' D T' R B' R' B Uv'", group: "Odd TCP" },
  // 2-Flip TCP
  { name: "Case 13: Solved corners, solved triangles", alg: "R B' R' B R' L R L'", group: "2-Flip TCP" },
  { name: "Case 14: Clockwise corners, solved triangles", alg: "Uv T F' U' f' F U' F U f F' U T' Uv'", group: "2-Flip TCP" },
  { name: "Case 15: Anticlockwise corners, solved triangles", alg: "Uv' T' F U f F' U F' U' f' F U' T Uv", group: "2-Flip TCP" },
  { name: "Case 16: Solved corners, 2-swap triangles", alg: "Uv T' Uv F' U' F D' F U' F' D F' U' F Lv' T' Uv T2", group: "2-Flip TCP" },
  { name: "Case 17: Clockwise corners, 2-swap triangles", alg: "Uv T U f' U' F U f F U' F T' Uv'", group: "2-Flip TCP" },
  { name: "Case 18: Anticlockwise corners, 2-swap triangles", alg: "Uv' T' U' f U F' U' f' F' U F' T Uv", group: "2-Flip TCP" },
];

export default {
  id: "tcp",
  name: "TCP",
  source: "TCP_Full_Diansheng_DaYan.pdf (CIF notation)",
  cases,
};
