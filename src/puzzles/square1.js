// Square-1 doesn't turn like the other puzzles here — instead of discrete
// faces, it has a top-layer twist, a bottom-layer twist (each in twelfths,
// written "(top,bottom)"), and a middle "slash" swap ("/"). It gets its own
// dedicated control panel (Square1Pad) instead of the generic face-turn
// move pad, and no keyboard shortcuts (controls is empty).
//
// No built-in algorithm set is shipped for Square-1: real Square-1 algorithms
// are dense numeric sequences (e.g. parity fixes), and every source we could
// verify while researching this disagreed on the exact digits — the risk of
// shipping a silently-wrong "algorithm" outweighed having a starter set. Add
// your own via the Custom Set editor once you have a source you trust.
export default {
  id: "square1",
  label: "Square-1",
  fullName: "Square-1",
  cubingPuzzleId: "square1",
  controlsType: "square1",
  controls: [],
  builtinSets: [],
};
