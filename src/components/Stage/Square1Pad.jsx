import { useTrainerContext } from "../../context/TrainerContext.jsx";
import styles from "./Square1Pad.module.css";

// Only twist amounts (and the slash) that square1.js's `controls` actually
// binds a key to get a button — derived from `controls` instead of a fixed
// list so the pad can't drift out of sync with the real keybinds. Each
// button shows its move and the matching key(s) underneath, same as the
// generic MovePad does for other puzzles.
function twistButtons(controls, re) {
  const keysByAmount = new Map();
  for (const c of controls) {
    const m = c.move.match(re);
    if (!m) continue;
    const n = Number(m[1]);
    if (!keysByAmount.has(n)) keysByAmount.set(n, []);
    keysByAmount.get(n).push(c.keyLabel);
  }
  return [...keysByAmount.entries()].sort(([a], [b]) => a - b);
}

// Same idea as twistButtons, for the x2/y2/z2 whole-puzzle rotations —
// derived so a control change stays reflected here automatically.
function rotationButtons(controls, moves) {
  const keysByMove = new Map();
  for (const c of controls) {
    if (!moves.includes(c.move)) continue;
    if (!keysByMove.has(c.move)) keysByMove.set(c.move, []);
    keysByMove.get(c.move).push(c.keyLabel);
  }
  return moves.filter((m) => keysByMove.has(m)).map((m) => [m, keysByMove.get(m)]);
}

export default function Square1Pad() {
  const { applyMove, puzzleConfig } = useTrainerContext();
  const topButtons = twistButtons(puzzleConfig.controls, /^\((-?\d+),0\)$/);
  const bottomButtons = twistButtons(puzzleConfig.controls, /^\(0,(-?\d+)\)$/);
  const slashKeys = puzzleConfig.controls.filter((c) => c.move === "/").map((c) => c.keyLabel);
  const rotations = rotationButtons(puzzleConfig.controls, ["x2", "y2", "z2"]);

  return (
    <div className={styles.square1Pad}>
      <div className={styles.row}>
        <span className={styles.rowLabel}>Top</span>
        {topButtons.map(([n, keys]) => (
          <button key={`top-${n}`} onClick={() => applyMove(`(${n},0)`)}>
            <span className={styles.moveLabel}>{n}</span>
            <span className={styles.key}>{keys.join("/")}</span>
          </button>
        ))}
      </div>
      <div className={styles.row}>
        <span className={styles.rowLabel}>Bottom</span>
        {bottomButtons.map(([n, keys]) => (
          <button key={`bottom-${n}`} onClick={() => applyMove(`(0,${n})`)}>
            <span className={styles.moveLabel}>{n}</span>
            <span className={styles.key}>{keys.join("/")}</span>
          </button>
        ))}
      </div>
      {slashKeys.length > 0 && (
        <button className={styles.slash} onClick={() => applyMove("/")}>
          <span className={styles.moveLabel}>/ (slash)</span>
          <span className={styles.key}>{slashKeys.join("/")}</span>
        </button>
      )}
      {rotations.length > 0 && (
        <div className={styles.row}>
          <span className={styles.rowLabel}>Rotate</span>
          {rotations.map(([move, keys]) => (
            <button key={move} onClick={() => applyMove(move)}>
              <span className={styles.moveLabel}>{move}</span>
              <span className={styles.key}>{keys.join("/")}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
