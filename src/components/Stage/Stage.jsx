import TwistyPracticeStage from "./TwistyPracticeStage.jsx";
import TwistyLearnStage from "./TwistyLearnStage.jsx";
import PracticeCaseInfo from "./PracticeCaseInfo.jsx";
import LearnCaseInfo from "./LearnCaseInfo.jsx";
import LearnControls from "./LearnControls.jsx";
import PracticeArea from "./PracticeArea.jsx";
import SessionStats from "./SessionStats.jsx";
import styles from "./Stage.module.css";

export default function Stage() {
  return (
    <main className={styles.stage}>
      <section className={styles.practiceColumn}>
        <TwistyPracticeStage />
        <PracticeCaseInfo />
        <PracticeArea />
      </section>

      <aside className={styles.learnColumn}>
        <h2 className={styles.learnHeading}>Reference</h2>
        <TwistyLearnStage />
        <LearnCaseInfo />
        <LearnControls />
        <SessionStats />
      </aside>
    </main>
  );
}
