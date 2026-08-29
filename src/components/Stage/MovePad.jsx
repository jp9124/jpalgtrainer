import { useTrainerContext } from "../../context/TrainerContext.jsx";
import styles from "./MovePad.module.css";

export default function MovePad() {
  const { applyMove, puzzleConfig } = useTrainerContext();

  return (
    <div className={styles.movepad}>
      {puzzleConfig.controls.map(({ label, move, keyLabel }) => (
        <button key={move} title={keyLabel ? `Key: ${keyLabel}` : undefined} onClick={() => applyMove(move)}>
          <span className={styles.moveLabel}>{label}</span>
          {keyLabel && <span className={styles.key}>{keyLabel}</span>}
        </button>
      ))}
    </div>
  );
}
