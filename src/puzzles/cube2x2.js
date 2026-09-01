import { cube2x2Controls } from "./cubeControls";
import { cll2x2Sets } from "./algs/cll2x2";
import { tcll2x2Sets } from "./algs/tcll2x2";

export default {
  id: "2x2x2",
  label: "2x2",
  fullName: "2x2x2 Cube",
  cubingPuzzleId: "2x2x2",
  controlsType: "faceTurn",
  controls: cube2x2Controls,
  builtinSets: [...cll2x2Sets, ...tcll2x2Sets],
};
