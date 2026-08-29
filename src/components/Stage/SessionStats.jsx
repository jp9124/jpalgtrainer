import { useTrainerContext } from "../../context/TrainerContext.jsx";
import styles from "./Stage.module.css";

export default function SessionStats() {
  const { sessionStats } = useTrainerContext();
  const { attempts, solved, best, avg } = sessionStats;

  return (
    <section className={styles.statsSection}>
      <h2 className={styles.learnHeading}>Session Stats</h2>
      <div className={styles.statsGrid}>
        <div>
          Attempts
          <span className={styles.num}>{attempts}</span>
        </div>
        <div>
          Solved
          <span className={styles.num}>{solved}</span>
        </div>
        <div>
          Best
          <span className={styles.num}>{best != null ? best.toFixed(2) : "–"}</span>
        </div>
        <div>
          Avg
          <span className={styles.num}>{avg != null ? avg.toFixed(2) : "–"}</span>
        </div>
      </div>
    </section>
  );
}
