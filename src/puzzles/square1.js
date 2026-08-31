import eoSet from "./square1EO";

// Square-1 doesn't turn like the other puzzles here — instead of discrete
// faces, it has a top-layer twist, a bottom-layer twist (each in twelfths,
// written "(top,bottom)"), and a middle "slash" swap ("/"). It gets its own
// dedicated control panel (Square1Pad) instead of the generic face-turn move
// pad, but the keyboard shortcuts below still work the same way as any other
// puzzle's (useTrainer's keydown handler reads `controls` regardless of
// controlsType) — this project's user's own layout, not from any official
// source. Whole-puzzle rotations (x2/y2/z2) are deliberately not bound to
// anything: verified directly against the real engine that this puzzle's
// kpuzzle definition only has moves for the two twists and the slash — "y2"
// etc. throw "Invalid move for KPuzzle (Square-1)" — so there's no rotation
// move a key could trigger.
const controls = [
  { label: "/", move: "/", code: "KeyI", keyLabel: "I" },
  { label: "/", move: "/", code: "KeyK", keyLabel: "K" },
  { label: "(-1,0)", move: "(-1,0)", code: "KeyF", keyLabel: "F" },
  { label: "(1,0)", move: "(1,0)", code: "KeyJ", keyLabel: "J" },
  { label: "(-2,0)", move: "(-3,0)", code: "KeyG", keyLabel: "G" },
  { label: "(2,0)", move: "(3,0)", code: "KeyH", keyLabel: "H" },
  { label: "(0,1)", move: "(0,1)", code: "KeyS", keyLabel: "S" },
  { label: "(0,-1)", move: "(0,-1)", code: "KeyL", keyLabel: "L" },
  { label: "(0,2)", move: "(0,3)", code: "KeyW", keyLabel: "W" },
  { label: "(0,-2)", move: "(0,-3)", code: "KeyO", keyLabel: "O" },
];

// Real Square-1 algorithms are dense numeric sequences, and most sources
// disagree on the exact digits for the same named algorithm — see
// square1EO.js for how the one built-in set here (EO) was verified instead
// of just trusted. Add your own sets via the Custom Set editor.
export default {
  id: "square1",
  label: "Square-1",
  fullName: "Square-1",
  cubingPuzzleId: "square1",
  controlsType: "square1",
  controls,
  builtinSets: [eoSet],
};
