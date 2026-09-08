import { useTrainerContext } from "../../context/TrainerContext.jsx";
import { toEifDisplayAlg } from "../../hooks/useTrainer.js";
import styles from "./Stage.module.css";

export default function LearnCaseInfo() {
  const { learnCase, puzzleConfig, cifEifMode } = useTrainerContext();

  if (!learnCase) {
    return <div className={styles.learnCaseInfo}>Click a case in the sidebar to view it here.</div>;
  }
  const shownAlg =
    puzzleConfig.id === "fto" && cifEifMode === "eif" ? toEifDisplayAlg(learnCase.alg) : learnCase.alg;
  return (
    <div className={styles.learnCaseInfo}>
      <strong>{learnCase.name}</strong>
      <div className={styles.algMono}>{shownAlg}</div>
    </div>
  );
}
