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
    puzzleConfig,
  } = useTrainerContext();

  // Square-1's moves aren't plain quantum turns (they're twist/slash
  // groupings), and cubing's experimentalAddMove — what visible turning
  // relies on to animate — doesn't handle them correctly, breaking the
  // puzzle's turning (see the matching override in useTrainer.js). The
  // preference itself stays untouched (it's global, shared with every other
  // puzzle) — only its effect here is suppressed.
  const visibleTurningUnsupported = puzzleConfig.id === "square1";
  const visibleTurningActive = visibleTurningEnabled && !visibleTurningUnsupported;

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
        <label htmlFor="visibleTurningToggle">
          Visible turning
          {visibleTurningUnsupported && " (unsupported on Square-1)"}
        </label>
        <input
          id="visibleTurningToggle"
          type="checkbox"
          checked={visibleTurningActive}
          disabled={visibleTurningUnsupported}
          title={visibleTurningUnsupported ? "Square-1's moves break the visible-turning animation" : undefined}
          onChange={(e) => setVisibleTurningEnabled(e.target.checked)}
        />
      </div>
      {visibleTurningActive && (
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
