import { useTrainerContext } from "../../context/TrainerContext.jsx";
import styles from "./Stage.module.css";

export default function LearnCaseInfo() {
  const { learnCase } = useTrainerContext();

  if (!learnCase) {
    return <div className={styles.learnCaseInfo}>Click a case in the sidebar to view it here.</div>;
  }
  return (
    <div className={styles.learnCaseInfo}>
      <strong>{learnCase.name}</strong>
      <div className={styles.algMono}>{learnCase.alg}</div>
    </div>
  );
}
