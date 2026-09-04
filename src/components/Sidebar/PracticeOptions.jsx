import { useTrainerContext } from "../../context/TrainerContext.jsx";
import styles from "./Sidebar.module.css";

// Puzzles color-neutral mode actually works on — it needs whole-puzzle
// rotation moves that only these five expose (see randomOrientationAlg's
// source note in useTrainer.js); it's simply hidden everywhere else rather
// than shown disabled, since it doesn't apply there at all.
const COLOR_NEUTRAL_SUPPORTED = ["2x2x2", "3x3x3", "5x5x5", "megaminx", "pyraminx"];
const COLOR_NEUTRAL_LIMITED = ["megaminx", "pyraminx"];

// Every puzzle with a U move supports random AUF — everything except
// Square-1, whose moves are twist/slash pairs with no discrete U turn at
// all (see U_TURN_ORDER's source note in useTrainer.js).
const RANDOM_AUF_UNSUPPORTED = ["square1"];

const TURN_SPEED_OPTIONS = [5, 10, 20];

export default function PracticeOptions() {
  const {
    orderedEnabled,
    setOrderedEnabled,
    visibleTurningEnabled,
    setVisibleTurningEnabled,
    turnsPerSecond,
    setTurnsPerSecond,
    colorNeutralEnabled,
    setColorNeutralEnabled,
    randomAufEnabled,
    setRandomAufEnabled,
    puzzleConfig,
  } = useTrainerContext();

  const colorNeutralSupported = COLOR_NEUTRAL_SUPPORTED.includes(puzzleConfig.id);
  const colorNeutralLimited = COLOR_NEUTRAL_LIMITED.includes(puzzleConfig.id);

  const randomAufSupported = !RANDOM_AUF_UNSUPPORTED.includes(puzzleConfig.id);

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
      {colorNeutralSupported && (
        <div className={styles.toggleRow}>
          <label htmlFor="colorNeutralToggle">Color neutral</label>
          <input
            id="colorNeutralToggle"
            type="checkbox"
            checked={colorNeutralEnabled}
            title={
              colorNeutralLimited
                ? "Scrambles from a randomly rotated starting orientation each case (this puzzle's move set only reaches a handful of orientations, not the full set)"
                : "Scrambles from a randomly rotated starting orientation each case, instead of always the same color scheme"
            }
            onChange={(e) => setColorNeutralEnabled(e.target.checked)}
          />
        </div>
      )}
      {randomAufSupported && (
        <div className={styles.toggleRow}>
          <label htmlFor="randomAufToggle">Random AUF</label>
          <input
            id="randomAufToggle"
            type="checkbox"
            checked={randomAufEnabled}
            title="Adds a random U turn before and after each case's algorithm, so you're not always solving from the same U alignment"
            onChange={(e) => setRandomAufEnabled(e.target.checked)}
          />
        </div>
      )}
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
          <span>Turn speed (turns/sec)</span>
          <div className={styles.speedOptions}>
            {TURN_SPEED_OPTIONS.map((speed) => (
              <button
                key={speed}
                type="button"
                className={`${styles.small} ${turnsPerSecond === speed ? styles.speedOptionActive : ""}`}
                onClick={() => setTurnsPerSecond(speed)}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
