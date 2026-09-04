// CP (Corner Permutation) — cases named by each layer's corner-pair state after
// Cube Shape/CO/EO ("Adj" = adjacent pair swapped, "Opp" = opposite pair swapped,
// "Solved" = that layer's corners already in place), grouped by the top layer's
// state to match the source page's own three sections.
//
// Source: cubingapp.com (cubingapp.com/algorithms/SQ1-CP).
const source = "cubingapp.com (cubingapp.com/algorithms/SQ1-CP)";

const cases = [
  { name: "Adj / Adj", alg: "/ (-3,0) / (3,3) / (0,-3) /", group: "Top Adj" },
  { name: "Adj / Opp", alg: "/ (0,-3) / (0,3) / (0,-3) / (0,3) /", group: "Top Adj" },
  { name: "Adj / Solved", alg: "/ (3,-3) / (-3,0) / (0,3) / (0,-3) / (0,3) /", group: "Top Adj" },
  { name: "Opp / Opp", alg: "/ (3,-3) / (-3,3) /", group: "Top Opp" },
  { name: "Opp / Adj", alg: "/ (-3,0) / (3,0) / (-3,0) / (3,0) /", group: "Top Opp" },
  { name: "Opp / Solved", alg: "/ (-3,-3) / (-3,0) / (-3,-3) / (-3,0) / (-3,-3) /", group: "Top Opp" },
  { name: "Solved / Adj", alg: "/ (3,-3) / (0,3) / (-3,0) / (3,0) / (-3,0) /", group: "Top Solved" },
  { name: "Solved / Opp", alg: "/ (3,3) / (0,3) / (3,3) / (0,3) / (3,3) /", group: "Top Solved" },
];

export default {
  id: "cp",
  name: "CP",
  source,
  cases,
};
