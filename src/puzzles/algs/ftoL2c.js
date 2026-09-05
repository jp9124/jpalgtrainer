// L2C (Last 2 Centers) — a small set of R/U trigger algorithms for FTO's
// last two centers, supplied by this project's user as a screenshot (not an
// invented set). Split into three groups by how many R U(') triggers each
// algorithm chains together, matching the line breaks shown per case in the
// source image (one trigger per line). Every algorithm is built entirely
// from R/R'/U/U', so no move translation was needed.
const source = "Supplied by this project's user as a screenshot";

const cases = [
  // 1 Trigger
  { name: "Case 1", alg: "(R U R')", group: "1 Trigger" },
  { name: "Case 2", alg: "(R U' R')", group: "1 Trigger" },
  // 2 Triggers
  { name: "Case 3", alg: "(R U' R') U' (R U R')", group: "2 Triggers" },
  { name: "Case 4", alg: "(R U R') U (R U' R')", group: "2 Triggers" },
  { name: "Case 5", alg: "(R U' R') U (R U R')", group: "2 Triggers" },
  { name: "Case 6", alg: "(R U R') U' (R U' R')", group: "2 Triggers" },
  { name: "Case 7", alg: "(R U R') U (R U R')", group: "2 Triggers" },
  { name: "Case 8", alg: "(R U R') U' (R U R')", group: "2 Triggers" },
  { name: "Case 9", alg: "(R U' R') U (R U' R')", group: "2 Triggers" },
  // 3 Triggers
  { name: "Case 10", alg: "(R U' R') U (R U' R') U' (R U R')", group: "3 Triggers" },
  { name: "Case 11", alg: "(R U R') U' (R U' R') U (R U R')", group: "3 Triggers" },
  { name: "Case 12", alg: "(R U R') U' (R U' R') U (R U' R')", group: "3 Triggers" },
  { name: "Case 13", alg: "(R U R') U' (R U R') U' (R U' R')", group: "3 Triggers" },
];

export default {
  id: "l2c",
  name: "Last 2 Centers",
  source,
  cases,
};
