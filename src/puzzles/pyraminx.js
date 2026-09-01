import ml4eRightSet from "./algs/pyraminx-ml4e-right";
import ml4eLeftSet from "./algs/pyraminx-ml4e-left";

// No official cubing.js keyboard layout exists for Pyraminx, so this reuses
// the same physical key positions as FTO/Megaminx for the matching face
// letters (U, L, R, B), for muscle-memory consistency across puzzles in
// this app. Tip moves are intentionally omitted — no published Pyraminx
// algorithm ever turns a tip, since tips have no orientation/permutation
// constraint.
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

// "The Pyraminx Sheet" (L4E method cheat sheet). One set, grouped by the
// sheet's main headers (Last Layer, Last 3 Edges, ...) via the `group`
// field — CaseList.jsx renders a set as grouped, collapsible sections once
// every case in it has a `group`. Only the first-listed alg is kept per
// case (the sheet gives several alternates per case). The sheet defines two
// triggers, S = R' L R L' (Sledge) and H = L R' L' R (Hedge), and writes
// later algs in terms of them — those are inlined below into plain face
// turns since the alg engine has no concept of named triggers.
const builtinSets = [
  {
    id: "l4e",
    name: "L4E",
    source: "\"The Pyraminx Sheet\" — L4E method",
    cases: [
      // Last Layer
      { name: "Sune", alg: "L' U L U L' U L", group: "Last Layer" },
      { name: "Anti-sune", alg: "R U' R' U' R U' R'", group: "Last Layer" },
      { name: "Lefty Bars", alg: "R' U' L' U L R", group: "Last Layer" },
      { name: "Righty Bars", alg: "L U R U' R' L'", group: "Last Layer" },
      // Last 3 Edges
      { name: "Sledge", alg: "R' L R L'", group: "Last 3 Edges" },
      { name: "Hedge", alg: "L R' L' R", group: "Last 3 Edges" },
      { name: "Clockwise Cycle", alg: "L R' L' R R U' R'", group: "Last 3 Edges" },
      { name: "Counterclockwise Cycle", alg: "R' L R L' L' U L", group: "Last 3 Edges" },
      // Flipped Edges
      { name: "Righty", alg: "R U' R'", group: "Flipped Edges" },
      { name: "Lefty", alg: "L' U L", group: "Flipped Edges" },
      { name: "Sexy", alg: "U' R U R'", group: "Flipped Edges" },
      { name: "Ugly", alg: "U L' U' L", group: "Flipped Edges" },
      { name: "2-Flip", alg: "L R' L' R U' R U R'", group: "Flipped Edges" },
      { name: "DR Flip", alg: "L R' L' R L' U L", group: "Flipped Edges" },
      { name: "DL Flip", alg: "R' L R L' R U' R'", group: "Flipped Edges" },
      { name: "DB Flip", alg: "R U R' U L' U' L", group: "Flipped Edges" },
      { name: "4 Flip", alg: "R U' R' L' U L R U' R' L' U L", group: "Flipped Edges" },
      // Polish Flip
      { name: "Right Polish Flip", alg: "R U' R' L' U' L", group: "Polish Flip" },
      { name: "Left Polish Flip", alg: "L' U L R U R'", group: "Polish Flip" },
      { name: "SUS", alg: "R' L R L' U' R' L R L'", group: "Polish Flip" },
      { name: "Anti-SUS", alg: "L R' L' R U L R' L' R", group: "Polish Flip" },
      // Separated Bar
      { name: "Good Niky", alg: "R U' R' L' U L", group: "Separated Bar" },
      { name: "Good Sochi", alg: "L' U L R U' R'", group: "Separated Bar" },
      { name: "Super Sledge", alg: "R U' R' R' L R L'", group: "Separated Bar" },
      { name: "Super Hedge", alg: "L' U L L R' L' R", group: "Separated Bar" },
      { name: "Bad Niky", alg: "R U' R' U' L' U L", group: "Separated Bar" },
      { name: "Bad Sochi", alg: "L' U L U R U' R'", group: "Separated Bar" },
      // Connected Bar
      { name: "Right Spam", alg: "R U R' U R' L R L'", group: "Connected Bar" },
      { name: "Left Spam", alg: "L' U' L U' L R' L' R", group: "Connected Bar" },
      { name: "Bad Sledge", alg: "L R' L' R U' R U' R'", group: "Connected Bar" },
      { name: "Bad Hedge", alg: "R' L R L' U L' U L", group: "Connected Bar" },
      // No Bar
      { name: "Bad Sexy", alg: "L' U' L U' R U' R'", group: "No Bar" },
      { name: "Bad Ugly", alg: "R U R' U L' U L", group: "No Bar" },
      { name: "Bad Righty", alg: "L' U L U' R U R'", group: "No Bar" },
      { name: "Bad Lefty", alg: "R U' R' U L' U' L", group: "No Bar" },
      { name: "Double Sexy", alg: "R U' R' U' R U R'", group: "No Bar" },
      { name: "Double Ugly", alg: "L' U L U L' U' L", group: "No Bar" },
    ],
  },
  ml4eRightSet,
  ml4eLeftSet,
];

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
