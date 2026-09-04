import { useTrainerContext } from "../../context/TrainerContext.jsx";
import styles from "./Sidebar.module.css";

// Puzzles color-neutral mode actually works on — it needs whole-puzzle
// rotation moves that only these four expose (see randomOrientationAlg's
// source note in useTrainer.js); it's simply hidden everywhere else rather
// than shown disabled, since it doesn't apply there at all.
const COLOR_NEUTRAL_SUPPORTED = ["2x2x2", "3x3x3", "5x5x5", "pyraminx"];
const COLOR_NEUTRAL_LIMITED = ["pyraminx"];

// Every puzzle with a U move supports random AUF — except Square-1, whose
// moves are twist/slash pairs with no discrete U turn at all (see
// U_TURN_ORDER's source note in useTrainer.js), and 5x5, whose only builtin
// set (L2E) is practiced with wide moves rather than U (see
// RANDOM_AUF_DISABLED_PUZZLE_IDS's source note in useTrainer.js).
const RANDOM_AUF_UNSUPPORTED = ["square1", "5x5x5"];

// Puzzles the "random 3x3 stage" option applies to — see
// RANDOM_STAGE_PUZZLE_IDS's source note in useTrainer.js.
const RANDOM_STAGE_SUPPORTED = ["5x5x5"];

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
    randomStageEnabled,
    setRandomStageEnabled,
    puzzleConfig,
  } = useTrainerContext();

  const colorNeutralSupported = COLOR_NEUTRAL_SUPPORTED.includes(puzzleConfig.id);
  const colorNeutralLimited = COLOR_NEUTRAL_LIMITED.includes(puzzleConfig.id);

  const randomAufSupported = !RANDOM_AUF_UNSUPPORTED.includes(puzzleConfig.id);

  const randomStageSupported = RANDOM_STAGE_SUPPORTED.includes(puzzleConfig.id);

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
      {randomStageSupported && (
        <div className={styles.toggleRow}>
          <label htmlFor="randomStageToggle">Random 3x3 stage</label>
          <input
            id="randomStageToggle"
            type="checkbox"
            checked={randomStageEnabled}
            title="Scrambles the outer layers with a random 3x3-style sequence before each case, so the rest of the cube isn't sitting solved the way it never would be mid-reduction"
            onChange={(e) => setRandomStageEnabled(e.target.checked)}
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
