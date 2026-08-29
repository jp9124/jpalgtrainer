import { useTrainerContext } from "../../context/TrainerContext.jsx";
import styles from "./Stage.module.css";

export default function LearnControls() {
  const { playLearnAlgorithm, learnJumpToStart, learnJumpToEnd } = useTrainerContext();

  return (
    <div className={styles.learnControlsRow}>
      <button onClick={playLearnAlgorithm}>&#9654; Play</button>
      <button onClick={learnJumpToStart} aria-label="Jump to scrambled start" title="Scrambled start">
        &#8676;
      </button>
      <button onClick={learnJumpToEnd} aria-label="Jump to solved end" title="Solved end">
        &#8677;
      </button>
    </div>
  );
}
