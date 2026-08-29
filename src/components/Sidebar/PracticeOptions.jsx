import { useTrainerContext } from "../../context/TrainerContext.jsx";
import styles from "./Sidebar.module.css";

export default function PracticeOptions() {
  const { autoNextEnabled, setAutoNextEnabled, orderedEnabled, setOrderedEnabled } = useTrainerContext();

  return (
    <section>
      <h2 className={styles.sectionTitle}>Practice Options</h2>
      <div className={styles.toggleRow}>
        <label htmlFor="autoNextToggle">Auto-advance on solve</label>
        <input
          id="autoNextToggle"
          type="checkbox"
          checked={autoNextEnabled}
          onChange={(e) => setAutoNextEnabled(e.target.checked)}
        />
      </div>
      <div className={styles.toggleRow}>
        <label htmlFor="orderedToggle">Practice in order</label>
        <input
          id="orderedToggle"
          type="checkbox"
          checked={orderedEnabled}
          onChange={(e) => setOrderedEnabled(e.target.checked)}
        />
      </div>
    </section>
  );
}
