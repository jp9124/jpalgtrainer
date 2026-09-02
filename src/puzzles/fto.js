import lbtSet from "./algs/ftoLbt";
import lp1Set from "./algs/fto1lp";
import tcpSet from "./algs/ftoTcp";

// U/F/R/L/D/B are the official cubing.js / Twizzle FTO keyboard layout (see
// ftoKeyMapping.ts in the cubing.js source) — reused here so keyboard
// muscle memory transfers to Twizzle. Everything else (BL/BL'/BR/BR', the
// vertex/tip moves, and the wide moves) is this project's user's own custom
// layout, not from that source.
const controls = [
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
  { label: "BL", move: "BL", code: "KeyC", keyLabel: "C" },
  { label: "BL'", move: "BL'", code: "Digit3", keyLabel: "3" },
  { label: "BR", move: "BR", code: "Digit8", keyLabel: "8" },
  { label: "BR'", move: "BR'", code: "Comma", keyLabel: "," },
  // Vertex rotations and the tip move — needed by the TCP/1LP/LBT sets.
  // Uv/Uv' reuse cubing.js's own official FTO keys; the rest have no
  // official binding.
  { label: "Uv", move: "Uv", code: "Semicolon", keyLabel: ";" },
  { label: "Uv'", move: "Uv'", code: "KeyA", keyLabel: "A" },
  { label: "Fv", move: "Fv", code: "Digit4", keyLabel: "4" },
  { label: "Fv'", move: "Fv'", code: "Digit5", keyLabel: "5" },
  { label: "Lv", move: "Lv", code: "KeyB", keyLabel: "B" },
  { label: "Lv'", move: "Lv'", code: "KeyT", keyLabel: "T" },
  { label: "Rv", move: "Rv", code: "KeyY", keyLabel: "Y" },
  { label: "Rv'", move: "Rv'", code: "KeyN", keyLabel: "N" },
  { label: "T", move: "T", code: "KeyP", keyLabel: "P" },
  { label: "T'", move: "T'", code: "KeyQ", keyLabel: "Q" },
  // Wide moves (two layers together) — needed by LBT and TCP.
  { label: "u", move: "u", code: "Digit1", keyLabel: "1" },
  { label: "u'", move: "u'", code: "Digit2", keyLabel: "2" },
  { label: "f", move: "f", code: "KeyZ", keyLabel: "Z" },
  { label: "f'", move: "f'", code: "Period", keyLabel: "." },
  { label: "l", move: "l", code: "KeyV", keyLabel: "V" },
  { label: "l'", move: "l'", code: "KeyR", keyLabel: "R" },
  { label: "r", move: "r", code: "KeyU", keyLabel: "U" },
  { label: "r'", move: "r'", code: "KeyM", keyLabel: "M" },
  { label: "bl", move: "bl", code: "KeyX", keyLabel: "X" },
  { label: "bl'", move: "bl'", code: "Digit6", keyLabel: "6" },
  { label: "br", move: "br", code: "Digit7", keyLabel: "7" },
  { label: "br'", move: "br'", code: "Slash", keyLabel: "/" },
];

// TCP, 1LP, and LBT are all verified against real, named public FTO
// references — see each set's own file for its exact source and the move
// translations applied. Add more via the Custom Set editor in the sidebar.
const builtinSets = [tcpSet, lp1Set, lbtSet];

export default {
  id: "fto",
  label: "FTO",
  fullName: "Face-Turning Octahedron",
  cubingPuzzleId: "fto",
  controlsType: "faceTurn",
  controls,
  builtinSets,
};
