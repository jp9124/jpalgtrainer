import eoSet from "./algs/square1EO";

// Square-1 doesn't turn like the other puzzles here — instead of discrete
// faces, it has a top-layer twist, a bottom-layer twist (each in twelfths,
// written "(top,bottom)"), and a middle "slash" swap ("/"). It gets its own
// dedicated control panel (Square1Pad) instead of the generic face-turn move
// pad, but the keyboard shortcuts below still work the same way as any other
// puzzle's (useTrainer's keydown handler reads `controls` regardless of
// controlsType) — this project's user's own layout, not from any official
// source.
//
// x2/y2/z2 (whole-puzzle 180° rotations — the only rotation amount that's
// always well-defined regardless of the puzzle's current, possibly
// non-cubic, shape) use the same T/N, ;/A, P/Q keys as the original
// standalone canvas page this puzzle's renderer (square1Renderer.js) was
// built from. They're real, animated moves on that canvas, but NOT real
// cubing.js moves: verified directly against the engine that this puzzle's
// kpuzzle definition only has moves for the two twists and the slash — "y2"
// etc. throw "Invalid move for KPuzzle (Square-1)". useTrainer.js's
// applyMove special-cases exactly these three tokens to skip kpuzzle
// validation (a pure reorientation can't affect solved-detection anyway)
// while still animating and recording them like any other move.
const controls = [
  { label: "/", move: "/", code: "KeyI", keyLabel: "I" },
  { label: "/", move: "/", code: "KeyK", keyLabel: "K" },
  { label: "(-1,0)", move: "(-1,0)", code: "KeyF", keyLabel: "F" },
  { label: "(1,0)", move: "(1,0)", code: "KeyJ", keyLabel: "J" },
  { label: "(-3,0)", move: "(-3,0)", code: "KeyG", keyLabel: "G" },
  { label: "(3,0)", move: "(3,0)", code: "KeyH", keyLabel: "H" },
  { label: "(0,1)", move: "(0,1)", code: "KeyS", keyLabel: "S" },
  { label: "(0,-1)", move: "(0,-1)", code: "KeyL", keyLabel: "L" },
  { label: "(0,3)", move: "(0,3)", code: "KeyW", keyLabel: "W" },
  { label: "(0,-3)", move: "(0,-3)", code: "KeyO", keyLabel: "O" },
  { label: "x2", move: "x2", code: "KeyT", keyLabel: "T" },
  { label: "x2", move: "x2", code: "KeyN", keyLabel: "N" },
  { label: "y2", move: "y2", code: "Semicolon", keyLabel: ";" },
  { label: "y2", move: "y2", code: "KeyA", keyLabel: "A" },
  { label: "z2", move: "z2", code: "KeyP", keyLabel: "P" },
  { label: "z2", move: "z2", code: "KeyQ", keyLabel: "Q" },
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
