import l4eSet from "./algs/pyraminxL4e";
import ml4eRightSet from "./algs/pyraminxMl4eRight";
import ml4eLeftSet from "./algs/pyraminxMl4eLeft";

// No official cubing.js keyboard layout exists for Pyraminx, so this reuses
// the same physical key positions as FTO for the matching face letters (U,
// L, R, B), for muscle-memory consistency across puzzles in this app. Tip
// moves are intentionally omitted — no published Pyraminx algorithm ever
// turns a tip, since tips have no orientation/permutation constraint.
const controls = [
  { label: "U", move: "U", code: "KeyJ", keyLabel: "J" },
  { label: "U'", move: "U'", code: "KeyF", keyLabel: "F" },
  { label: "R", move: "R", code: "KeyI", keyLabel: "I" },
  { label: "R'", move: "R'", code: "KeyK", keyLabel: "K" },
  { label: "L", move: "L", code: "KeyD", keyLabel: "D" },
  { label: "L'", move: "L'", code: "KeyE", keyLabel: "E" },
  { label: "B", move: "B", code: "KeyW", keyLabel: "W" },
  { label: "B'", move: "B'", code: "KeyO", keyLabel: "O" },
  // Swapped relative to the literal cubing.js token: on this puzzle "y"
  // rotated the opposite way a solver would expect from every other puzzle
  // in this app, so the label now maps to the other token to match.
  { label: "y", move: "y'", code: "KeyA", keyLabel: "A" },
  { label: "y'", move: "y", code: "Semicolon", keyLabel: ";" },
];

const builtinSets = [l4eSet, ml4eRightSet, ml4eLeftSet];

export default {
  id: "pyraminx",
  label: "Pyraminx",
  fullName: "Pyraminx",
  cubingPuzzleId: "pyraminx",
  controlsType: "faceTurn",
  controls,
  builtinSets,
  cameraLongitude: 0,
  // cubing.js's default latitude (~26.6°) is a fairly low, side-on angle.
  // Raising it gives a top-down view of the U layer, which is what last-layer
  // recognition is actually looking at. This must exceed the default
  // camera-latitude-limit of 35° (see cameraLatitudeLimit below), or the
  // player silently clamps the requested latitude back down to 35°.
  cameraLatitude: 90,
  cameraLatitudeLimit: 90,
};
