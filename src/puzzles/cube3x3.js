import { cubeControls, cubeKeyAliases } from "./cubeControls";
import { zbllSets } from "./algs/zbll";

export default {
  id: "3x3x3",
  label: "3x3",
  fullName: "3x3x3 Cube",
  cubingPuzzleId: "3x3x3",
  controlsType: "faceTurn",
  controls: cubeControls,
  keyAliases: cubeKeyAliases,
  builtinSets: zbllSets,
};
