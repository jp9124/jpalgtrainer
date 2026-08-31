import { useTrainerContext } from "../../context/TrainerContext.jsx";
import styles from "./Sidebar.module.css";

export default function PracticeOptions() {
  const {
    orderedEnabled,
    setOrderedEnabled,
    visibleTurningEnabled,
    setVisibleTurningEnabled,
    turnsPerSecond,
    setTurnsPerSecond,
  } = useTrainerContext();

  return (
    <section>
      <h2 className={styles.sectionTitle}>Practice Options</h2>
      <div className={styles.toggleRow}>
        <label htmlFor="orderedToggle">Practice in order</label>
        <input
          id="orderedToggle"
          type="checkbox"
          checked={orderedEnabled}
          onChange={(e) => setOrderedEnabled(e.target.checked)}
        />
      </div>
      <div className={styles.toggleRow}>
        <label htmlFor="visibleTurningToggle">Visible turning</label>
        <input
          id="visibleTurningToggle"
          type="checkbox"
          checked={visibleTurningEnabled}
          onChange={(e) => setVisibleTurningEnabled(e.target.checked)}
        />
      </div>
      {visibleTurningEnabled && (
        <div className={styles.toggleRow}>
          <label htmlFor="turnsPerSecondInput">Turn speed (turns/sec)</label>
          <input
            id="turnsPerSecondInput"
            type="number"
            min="1"
            max="60"
            step="1"
            value={turnsPerSecond}
            onChange={(e) => setTurnsPerSecond(Math.max(1, Number(e.target.value) || 1))}
            className={styles.tpsInput}
          />
        </div>
      )}
    </section>
  );
}
