import "cubing/twisty"; // registers the <twisty-player> custom element
import { useTrainerContext } from "../../context/TrainerContext.jsx";
import Square1Canvas from "./Square1Canvas.jsx";
import styles from "./Stage.module.css";

// The puzzle you actually solve. No control panel — it's driven entirely by
// the move pad / keyboard, not by scrubbing.
//
// Square-1 renders through its own canvas engine (Square1Canvas) instead of
// <twisty-player> — see square1Renderer.js's header for why — but is
// otherwise driven by the exact same code in useTrainer.js: that engine
// exposes the same ref API (alg/jumpToEnd/etc.) a <twisty-player> does.
export default function TwistyPracticeStage() {
  const { practicePlayerRef, puzzleConfig } = useTrainerContext();

  if (puzzleConfig.id === "square1") {
    return <Square1Canvas ref={practicePlayerRef} className={styles.practiceTwisty} />;
  }

  return (
    <twisty-player
      ref={practicePlayerRef}
      puzzle={puzzleConfig.cubingPuzzleId}
      background="none"
      hint-facelets="none"
      control-panel="none"
      camera-longitude={puzzleConfig.cameraLongitude}
      camera-latitude={puzzleConfig.cameraLatitude}
      camera-latitude-limit={puzzleConfig.cameraLatitudeLimit}
      class={styles.practiceTwisty}
    />
  );
}
