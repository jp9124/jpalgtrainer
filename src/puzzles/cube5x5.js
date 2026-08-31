import { cubeControls, cubeKeyAliases } from "./cubeControls";

// No built-in set yet — see README.md's "About the built-in algorithms"
// section. Paste your own via the Custom Set editor.
const builtinSets = [];

export default {
  id: "5x5x5",
  label: "5x5",
  fullName: "5x5x5 Cube",
  cubingPuzzleId: "5x5x5",
  controlsType: "faceTurn",
  controls: cubeControls,
  keyAliases: cubeKeyAliases,
  builtinSets,
};
