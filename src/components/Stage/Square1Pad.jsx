import { useTrainerContext } from "../../context/TrainerContext.jsx";
import styles from "./Square1Pad.module.css";

const TWELFTHS = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6];

export default function Square1Pad() {
  const { applyMove } = useTrainerContext();

  return (
    <div className={styles.square1Pad}>
      <div className={styles.row}>
        <span className={styles.rowLabel}>Top</span>
        {TWELFTHS.map((n) => (
          <button key={`top-${n}`} onClick={() => applyMove(`(${n},0)`)}>
            {n}
          </button>
        ))}
      </div>
      <div className={styles.row}>
        <span className={styles.rowLabel}>Bottom</span>
        {TWELFTHS.map((n) => (
          <button key={`bottom-${n}`} onClick={() => applyMove(`(0,${n})`)}>
            {n}
          </button>
        ))}
      </div>
      <button className={styles.slash} onClick={() => applyMove("/")}>
        / (slash)
      </button>
    </div>
  );
}
