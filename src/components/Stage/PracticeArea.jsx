import { useTrainerContext } from "../../context/TrainerContext.jsx";
import MovePad from "./MovePad.jsx";
import Square1Pad from "./Square1Pad.jsx";
import styles from "./Stage.module.css";

export default function PracticeArea() {
  const {
    timerLabel,
    timerStatus,
    statusLine,
    statusGood,
    currentCase,
    displayAlg,
    revealed,
    loadNewPracticeCase,
    revealAlg,
    undoMove,
    resetCase,
    puzzleConfig,
  } = useTrainerContext();

  const showAlg = revealed || timerStatus === "solved";

  const timerClass = [
    styles.timer,
    timerStatus === "running" && styles.timerRunning,
    timerStatus === "solved" && styles.timerSolved,
  ]
    .filter(Boolean)
    .join(" ");

  const statusClass = [styles.statusLine, statusGood && styles.statusGood].filter(Boolean).join(" ");

  const algClass = [styles.algDisplay, showAlg ? "" : styles.hiddenText].filter(Boolean).join(" ");

  return (
    <div className={styles.practiceArea}>
      <div className={timerClass}>{timerLabel}</div>
      <div className={statusClass}>{statusLine}</div>
      <div className={algClass}>{currentCase ? displayAlg : "? ? ? ? ?"}</div>
      <div className={styles.controlsRow}>
        <button className={styles.primary} onClick={loadNewPracticeCase}>
          New case (enter)
        </button>
        <button onClick={revealAlg}>Reveal (space)</button>
        <button onClick={undoMove}>Undo move</button>
        <button onClick={resetCase}>Reset case (esc)</button>
      </div>
      {puzzleConfig.controlsType === "square1" ? <Square1Pad /> : <MovePad />}
      <div className={styles.legend}>
        {puzzleConfig.controlsType === "square1"
          ? "Click a twist amount for the top and/or bottom layer, then slash to swap, or use the matching keyboard key shown under each button. Space reveals the algorithm, Enter loads a new case, Escape resets it."
          : "Click a face, or use the matching keyboard key shown under each button. Space reveals the algorithm, Enter loads a new case, Escape resets it."}
      </div>
    </div>
  );
}
