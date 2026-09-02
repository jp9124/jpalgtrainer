import { cube2x2Controls } from "./cubeControls";
import { cll2x2Sets } from "./algs/cube2x2Cll";
import { tcll2x2Sets } from "./algs/cube2x2Tcll";

export default {
  id: "2x2x2",
  label: "2x2",
  fullName: "2x2x2 Cube",
  cubingPuzzleId: "2x2x2",
  controlsType: "faceTurn",
  controls: cube2x2Controls,
  builtinSets: [...cll2x2Sets, ...tcll2x2Sets],
};
