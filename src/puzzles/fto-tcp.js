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
const cases = [
  // Even TCP
  { name: "Case 1: Clockwise corners and clockwise triangles", alg: "B' R B R'", group: "Even TCP" },
  { name: "Case 2: Anticlockwise corners and anticlockwise triangles", alg: "Uv R B' R' B", group: "Even TCP" },
  { name: "Case 3: Solved corners, clockwise triangles", alg: "Uv T' U' F' D F' U F D' F", group: "Even TCP" },
  { name: "Case 4: Solved corners, anticlockwise triangles", alg: "Uv' T U F D' F U' F' D F2", group: "Even TCP" },
  { name: "Case 5: Clockwise corners, anticlockwise triangles", alg: "Uv' T U F' U' F' D' F U F' D F U' F", group: "Even TCP" },
  { name: "Case 6: Anticlockwise corners, clockwise triangles", alg: "Uv T' U' F U F D F' U' F D' F' U F'", group: "Even TCP" },
  // Odd TCP
  { name: "Case 7: Solved corners, clockwise AUF", alg: "U Uv' T F D F' U F D' F U' F", group: "Odd TCP" },
  { name: "Case 8: Solved corners, anticlockwise AUF", alg: "U' Uv T' F' D' F U' F' D F' U F'", group: "Odd TCP" },
  { name: "Case 9: Clockwise corners, clockwise AUF", alg: "U Uv' T F D F' U F D F U' F' D F2", group: "Odd TCP" },
  { name: "Case 10: Anticlockwise corners, anticlockwise AUF", alg: "U' Uv T' F' D' F U' F' D' F' U F D' F", group: "Odd TCP" },
  { name: "Case 11: Anticlockwise corners, clockwise AUF", alg: "T Uv U' D F' U F D' Fv F' U F U'", group: "Odd TCP" },
  { name: "Case 12: Clockwise corners, anticlockwise AUF", alg: "Uv T U D' F U' F' D T' R B' R' B", group: "Odd TCP" },
  // 2-Flip TCP
  { name: "Case 13: Solved corners, solved triangles", alg: "R B' R' B R' L R L'", group: "2-Flip TCP" },
  { name: "Case 14: Clockwise corners, solved triangles", alg: "Uv T F' U' f' F U' F U f F' U", group: "2-Flip TCP" },
  { name: "Case 15: Anticlockwise corners, solved triangles", alg: "Uv' T' F U f F' U F' U' f' F U'", group: "2-Flip TCP" },
  { name: "Case 16: Solved corners, 2-swap triangles", alg: "Uv T' Uv F' U' F D' F U' F' D F' U' F", group: "2-Flip TCP" },
  { name: "Case 17: Clockwise corners, 2-swap triangles", alg: "Uv T U f' U' F U f F U' F", group: "2-Flip TCP" },
  { name: "Case 18: Anticlockwise corners, 2-swap triangles", alg: "Uv' T' U' f U F' U' f' F' U F'", group: "2-Flip TCP" },
];

export default {
  id: "tcp",
  name: "TCP",
  source: "TCP_Full_Diansheng_DaYan.pdf (CIF notation)",
  cases,
};
