import SetSelector from "./SetSelector.jsx";
import CaseList from "./CaseList.jsx";
import PracticeOptions from "./PracticeOptions.jsx";
import CustomSetEditor from "./CustomSetEditor.jsx";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <SetSelector />
      <CaseList />
      <PracticeOptions />
      <CustomSetEditor />
    </aside>
  );
}
