// Shared keyboard layout for the plain NxNxN cubes (2x2/3x3/5x5), matching
// a real published `defaultKeymaps` layout (a `KeyCombo`-based binding list
// used by an existing cubing web app) rather than an invented one — unlike
// FTO's official cubing.js layout, this isn't from cubing.js itself, but
// it's still a real, external, previously-used layout rather than picked by
// this project.
const baseFaceControls = [
  { label: "U", move: "U", code: "KeyJ", keyLabel: "J" },
  { label: "U'", move: "U'", code: "KeyF", keyLabel: "F" },
  { label: "F", move: "F", code: "KeyH", keyLabel: "H" },
  { label: "F'", move: "F'", code: "KeyG", keyLabel: "G" },
  { label: "R", move: "R", code: "KeyI", keyLabel: "I" },
  { label: "R'", move: "R'", code: "KeyK", keyLabel: "K" },
  { label: "L", move: "L", code: "KeyD", keyLabel: "D" },
  { label: "L'", move: "L'", code: "KeyE", keyLabel: "E" },
  { label: "D", move: "D", code: "KeyS", keyLabel: "S" },
  { label: "D'", move: "D'", code: "KeyL", keyLabel: "L" },
  { label: "B", move: "B", code: "KeyW", keyLabel: "W" },
  { label: "B'", move: "B'", code: "KeyO", keyLabel: "O" },
];

// Wide (2-layer) turns — the source layout only binds r/l (not u/d/f/b), so
// that's all that's reproduced here. Only meaningful once a cube has 3+
// layers; harmless to bind everywhere since an invalid move for a given
// puzzle just surfaces as "Invalid move" instead of turning anything.
const wideControls = [
  { label: "r", move: "r", code: "KeyU", keyLabel: "U" },
  { label: "r'", move: "r'", code: "KeyM", keyLabel: "M" },
  { label: "l", move: "l", code: "KeyV", keyLabel: "V" },
  { label: "l'", move: "l'", code: "KeyR", keyLabel: "R" },
];

// Slice moves — only meaningful on odd-layered cubes (3x3, 5x5); 2x2 has no
// middle layer, so these are invalid moves there (same "Invalid move"
// fallback as above). S/S' reuse F/F's physical keys with Shift held, per
// the source layout — see the `shift` field, handled in useTrainer.js's
// keydown handler.
const sliceControls = [
  { label: "M", move: "M", code: "Quote", keyLabel: "'" },
  { label: "M'", move: "M'", code: "BracketLeft", keyLabel: "[" },
  { label: "E", move: "E", code: "KeyX", keyLabel: "X" },
  { label: "E'", move: "E'", code: "Period", keyLabel: "." },
  { label: "S", move: "S", code: "KeyH", keyLabel: "⇧H", shift: true },
  { label: "S'", move: "S'", code: "KeyG", keyLabel: "⇧G", shift: true },
];

// Keyboard-only aliases: extra physical keys for a move that already has a
// move-pad button above, so they don't need (and shouldn't get) a second,
// visually-duplicate button.
const sliceKeyAliases = [{ move: "M", code: "Backslash" }];

// Whole-cube rotations — always valid, regardless of puzzle size.
const rotationControls = [
  { label: "x", move: "x", code: "KeyT", keyLabel: "T" },
  { label: "x'", move: "x'", code: "KeyN", keyLabel: "N" },
  { label: "y", move: "y", code: "Semicolon", keyLabel: ";" },
  { label: "y'", move: "y'", code: "KeyA", keyLabel: "A" },
  { label: "z", move: "z", code: "KeyP", keyLabel: "P" },
  { label: "z'", move: "z'", code: "KeyQ", keyLabel: "Q" },
];

export const cubeControls = [...baseFaceControls, ...wideControls, ...sliceControls, ...rotationControls];
export const cubeKeyAliases = sliceKeyAliases;

// 2x2 has only 2 layers per axis: there's no middle layer for a slice move
// to turn, and no separate "wide" turn distinct from the single face turn
// that already turns half the cube — cubing.js's KPuzzle rejects both move
// families for "2x2x2" (verified by pasting them into the Custom Set editor
// and checking the resulting per-line error). Whole-cube rotations are
// unaffected by puzzle size, so those still apply.
export const cube2x2Controls = [...baseFaceControls, ...rotationControls];
