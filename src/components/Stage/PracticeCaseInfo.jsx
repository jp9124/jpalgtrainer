import { useTrainerContext } from "../../context/TrainerContext.jsx";
import styles from "./Stage.module.css";

export default function PracticeCaseInfo() {
  const { activeSet, currentCase, revealed, timerStatus, lastSolveElapsed } = useTrainerContext();

  if (!activeSet.cases.length) {
    return <div className={styles.caseInfo}>This set has no cases yet.</div>;
  }
  if (!currentCase) {
    return (
      <div className={styles.caseInfo}>
        Free play &mdash; check a case in the sidebar to practice a timed case.
      </div>
    );
  }
  if (timerStatus === "solved" && lastSolveElapsed != null) {
    return (
      <div className={styles.caseInfo}>
        <strong>{currentCase.name}</strong> solved in {lastSolveElapsed.toFixed(2)}s
      </div>
    );
  }
  if (revealed) {
    return (
      <div className={styles.caseInfo}>
        <strong>{currentCase.name}</strong> (revealed)
      </div>
    );
  }
  return (
    <div className={styles.caseInfo}>
      Case hidden &mdash; solve it, then press <strong>space</strong> to reveal.
    </div>
  );
}
