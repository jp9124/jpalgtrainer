// Shared keyboard layout for the plain NxNxN cubes (2x2/3x3/5x5). No
// official cubing.js keyboard layout exists for these in this app (unlike
// FTO/Megaminx — see the comment at the top of fto.js), so the base face
// moves reuse the same physical key positions as FTO/Megaminx/Pyraminx/Skewb
// for muscle-memory consistency across puzzles.
//
// Wide moves, slice moves, and rotations have no such precedent to borrow,
// so those key choices are our own, not "official" anything. Where a move's
// own letter was still free (r/u/b for wide, m for slice, x/y/z for
// rotation) we used it as a mnemonic; everything else — including every
// prime — is just a free key, documented here rather than claimed as
// standard. The on-screen move pad (driven by this same array) works
// regardless of whether a binding is memorable, so an obscure key here is a
// minor inconvenience, not a dead end.
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

// Wide (2-layer) turns — only meaningful once a cube has 3+ layers, but
// harmless to bind everywhere (an invalid move for a given puzzle just
// surfaces as "Invalid move" instead of turning anything).
const wideControls = [
  { label: "u", move: "u", code: "KeyU", keyLabel: "U" },
  { label: "u'", move: "u'", code: "KeyN", keyLabel: "N" },
  { label: "d", move: "d", code: "Comma", keyLabel: "," },
  { label: "d'", move: "d'", code: "Period", keyLabel: "." },
  { label: "l", move: "l", code: "Semicolon", keyLabel: ";" },
  { label: "l'", move: "l'", code: "Quote", keyLabel: "'" },
  { label: "r", move: "r", code: "KeyR", keyLabel: "R" },
  { label: "r'", move: "r'", code: "KeyV", keyLabel: "V" },
  { label: "f", move: "f", code: "Slash", keyLabel: "/" },
  { label: "f'", move: "f'", code: "Backslash", keyLabel: "\\" },
  { label: "b", move: "b", code: "KeyB", keyLabel: "B" },
  { label: "b'", move: "b'", code: "KeyT", keyLabel: "T" },
];

// Slice moves — only meaningful on odd-layered cubes (3x3, 5x5); 2x2 has no
// middle layer, so these are invalid moves there (same "Invalid move"
// fallback as above).
const sliceControls = [
  { label: "M", move: "M", code: "KeyM", keyLabel: "M" },
  { label: "M'", move: "M'", code: "KeyP", keyLabel: "P" },
  { label: "E", move: "E", code: "BracketLeft", keyLabel: "[" },
  { label: "E'", move: "E'", code: "BracketRight", keyLabel: "]" },
  { label: "S", move: "S", code: "Backquote", keyLabel: "`" },
  { label: "S'", move: "S'", code: "Digit1", keyLabel: "1" },
];

// Whole-cube rotations — always valid, regardless of puzzle size.
const rotationControls = [
  { label: "x", move: "x", code: "KeyX", keyLabel: "X" },
  { label: "x'", move: "x'", code: "KeyC", keyLabel: "C" },
  { label: "y", move: "y", code: "KeyY", keyLabel: "Y" },
  { label: "y'", move: "y'", code: "KeyA", keyLabel: "A" },
  { label: "z", move: "z", code: "KeyZ", keyLabel: "Z" },
  { label: "z'", move: "z'", code: "KeyQ", keyLabel: "Q" },
];

export const cubeControls = [...baseFaceControls, ...wideControls, ...sliceControls, ...rotationControls];

// 2x2 has only 2 layers per axis: there's no middle layer for a slice move
// to turn, and no separate "wide" turn distinct from the single face turn
// that already turns half the cube — cubing.js's KPuzzle rejects both move
// families for "2x2x2" (verified by pasting them into the Custom Set editor
// and checking the resulting per-line error). Whole-cube rotations are
// unaffected by puzzle size, so those still apply.
export const cube2x2Controls = [...baseFaceControls, ...rotationControls];
