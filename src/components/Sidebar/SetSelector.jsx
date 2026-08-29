import { useTrainerContext } from "../../context/TrainerContext.jsx";
import styles from "./Sidebar.module.css";

export default function SetSelector() {
  const { allSets, activeSet, selectSet } = useTrainerContext();

  return (
    <section>
      <h2 className={styles.sectionTitle}>Algorithm Set</h2>
      <select value={activeSet.id} onChange={(e) => selectSet(e.target.value)}>
        {allSets.map((set) => (
          <option key={set.id} value={set.id}>
            {set.name} ({set.cases.length})
          </option>
        ))}
      </select>
      <div className={styles.sourceTag}>Source: {activeSet.source}</div>
    </section>
  );
}
