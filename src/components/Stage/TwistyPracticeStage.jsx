import "cubing/twisty"; // registers the <twisty-player> custom element
import { useTrainerContext } from "../../context/TrainerContext.jsx";
import styles from "./Stage.module.css";

// The puzzle you actually solve. No control panel — it's driven entirely by
// the move pad / keyboard, not by scrubbing.
export default function TwistyPracticeStage() {
  const { practicePlayerRef, puzzleConfig } = useTrainerContext();

  return (
    <twisty-player
      ref={practicePlayerRef}
      puzzle={puzzleConfig.cubingPuzzleId}
      background="none"
      hint-facelets="none"
      control-panel="none"
      camera-longitude={puzzleConfig.cameraLongitude}
      class={styles.practiceTwisty}
    />
  );
}
