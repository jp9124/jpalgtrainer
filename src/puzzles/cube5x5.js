import { cubeControls, cubeKeyAliases } from "./cubeControls";
import { l2eSets } from "./algs/cube5x5L2e";

export default {
  id: "5x5x5",
  label: "5x5",
  fullName: "5x5x5 Cube",
  cubingPuzzleId: "5x5x5",
  controlsType: "faceTurn",
  controls: cubeControls,
  keyAliases: cubeKeyAliases,
  builtinSets: l2eSets,
};
