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

export default function Square1Pad() {
  const { applyMove, puzzleConfig } = useTrainerContext();
  const topButtons = twistButtons(puzzleConfig.controls, /^\((-?\d+),0\)$/);
  const bottomButtons = twistButtons(puzzleConfig.controls, /^\(0,(-?\d+)\)$/);
  const slashKeys = puzzleConfig.controls.filter((c) => c.move === "/").map((c) => c.keyLabel);

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
    </div>
  );
}
