import lbtSet from "./fto-lbt";
import lp1Set from "./fto-1lp";
import tcpSet from "./fto-tcp";

// Official cubing.js / Twizzle FTO keyboard layout (see ftoKeyMapping.ts in
// the cubing.js source) — reused here so keyboard muscle memory transfers to
// Twizzle.
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
  { label: "BL", move: "BL", code: "KeyQ", keyLabel: "Q" },
  { label: "BL'", move: "BL'", code: "KeyZ", keyLabel: "Z" },
  { label: "BR", move: "BR", code: "Period", keyLabel: "." },
  { label: "BR'", move: "BR'", code: "KeyP", keyLabel: "P" },
  // Vertex rotations and the tip move — needed by the TCP/1LP/LBT sets.
  // Uv/Uv' reuse cubing.js's own official FTO keys; the rest have no
  // official binding, so reasonable free keys were picked.
  { label: "Uv", move: "Uv", code: "Semicolon", keyLabel: ";" },
  { label: "Uv'", move: "Uv'", code: "KeyA", keyLabel: "A" },
  { label: "Fv", move: "Fv", code: "KeyV", keyLabel: "V" },
  { label: "Fv'", move: "Fv'", code: "KeyC", keyLabel: "C" },
  { label: "T", move: "T", code: "KeyB", keyLabel: "B" },
  { label: "T'", move: "T'", code: "KeyN", keyLabel: "N" },
  // Wide moves (two layers together) — needed by LBT and TCP.
  { label: "u", move: "u", code: "KeyY", keyLabel: "Y" },
  { label: "u'", move: "u'", code: "KeyU", keyLabel: "U" },
  { label: "f", move: "f", code: "KeyT", keyLabel: "T" },
  { label: "f'", move: "f'", code: "KeyR", keyLabel: "R" },
  { label: "bl", move: "bl", code: "KeyX", keyLabel: "X" },
  { label: "bl'", move: "bl'", code: "Comma", keyLabel: "," },
  { label: "br", move: "br", code: "KeyM", keyLabel: "M" },
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
