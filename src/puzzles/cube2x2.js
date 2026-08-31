import { cube2x2Controls } from "./cubeControls";

// No built-in set yet — see README.md's "About the built-in algorithms"
// section. Paste your own via the Custom Set editor.
const builtinSets = [];

export default {
  id: "2x2x2",
  label: "2x2",
  fullName: "2x2x2 Cube",
  cubingPuzzleId: "2x2x2",
  controlsType: "faceTurn",
  controls: cube2x2Controls,
  builtinSets,
};
