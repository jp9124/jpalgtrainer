// EO (Edge Orientation) — the 7 non-trivial cases for how many of the 4 top-layer
// edges are misoriented, grouped by that count (case names use SpeedCubeDB's own
// I/L shape labels for the two distinct 2-edge arrangements: "I" = the two bad
// edges opposite each other, "L" = adjacent).
//
// Source: SpeedCubeDB (speedcubedb.com/a/SQ1/SQ1EO). Each case there lists a
// "setup" (how to scramble into the case from solved) and one or more listed
// "algorithm" options. Rather than trust the listed algorithm text directly —
// for the L-L case it was identical to its own setup, which can't be a real
// solving algorithm for a non-self-inverse setup — every alg below was instead
// derived as the literal inverse of the source's "setup" (reverse the move
// order, negate each twist's top/bottom amounts, "/" is its own inverse). That
// derivation exactly reproduced the source's separately-listed algorithm for
// every other case (6 of 7, including picking the correct one of two listed
// alternatives for 4-4), which is what gives confidence in it for L-L too.
const cases = [
  { name: "1-1", group: "1 edge", alg: "(1,0) / (3,0) / (3,0) / (-1,-1) / (-2,1) / (-3,0) / (-1,0)" },
  { name: "I-I", group: "2 edges", alg: "(1,0) / (-1,-1) / (0,1)" },
  { name: "L-L", group: "2 edges", alg: "(1,0) / (-3,0) / (-1,-1) / (4,1) / (-1,0)" },
  { name: "L-I", group: "2 edges", alg: "(1,0) / (3,0) / (3,0) / (-1,-1) / (-2,1) / (-4,-1) / (0,1)" },
  { name: "I-L", group: "2 edges", alg: "(1,0) / (-3,0) / (3,0) / (-1,-1) / (-3,0) / (3,0) / (0,1)" },
  { name: "3-3", group: "3 edges", alg: "(1,0) / (3,0) / (3,0) / (-1,-1) / (-3,0) / (-3,0) / (0,1)" },
  { name: "4-4", group: "4 edges", alg: "(1,0) / (-1,-1) / (3,3) / (1,1) / (-1,0)" },
];

export default {
  id: "eo",
  name: "EO",
  source: "SpeedCubeDB (speedcubedb.com/a/SQ1/SQ1EO)",
  cases,
};
