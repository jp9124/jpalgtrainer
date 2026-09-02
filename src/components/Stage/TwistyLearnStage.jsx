import "cubing/twisty"; // registers the <twisty-player> custom element
import { useTrainerContext } from "../../context/TrainerContext.jsx";
import Square1Canvas from "./Square1Canvas.jsx";
import styles from "./Stage.module.css";

// The small reference puzzle in the side panel — for watching an algorithm
// solve the case. Its own native control-panel is turned off: it knows
// nothing about our scramble-then-solve trick (its "start"/"end" would just
// be the opposite of what our Play/↤/↦ buttons below mean), so having both
// visible at once made the puzzle look like it was running backwards.
//
// Square-1 renders through Square1Canvas instead — see TwistyPracticeStage.
export default function TwistyLearnStage() {
  const { learnPlayerRef, puzzleConfig } = useTrainerContext();

  if (puzzleConfig.id === "square1") {
    return <Square1Canvas ref={learnPlayerRef} className={styles.learnTwisty} />;
  }

  return (
    <twisty-player
      ref={learnPlayerRef}
      puzzle={puzzleConfig.cubingPuzzleId}
      background="none"
      hint-facelets="none"
      control-panel="none"
      camera-longitude={puzzleConfig.cameraLongitude}
      camera-latitude={puzzleConfig.cameraLatitude}
      camera-latitude-limit={puzzleConfig.cameraLatitudeLimit}
      class={styles.learnTwisty}
    />
  );
}
