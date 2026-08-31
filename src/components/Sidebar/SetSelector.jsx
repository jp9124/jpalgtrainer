import { useState } from "react";
import { useTrainerContext } from "../../context/TrainerContext.jsx";
import Modal from "../common/Modal.jsx";
import styles from "./Sidebar.module.css";

export default function SetSelector() {
  const { allSets, activeSet, selectSet } = useTrainerContext();
  const [sourceOpen, setSourceOpen] = useState(false);

  return (
    <section>
      <h2 className={styles.sectionTitle}>Algorithm Set</h2>
      <div className={styles.setSelectorRow}>
        <select value={activeSet.id} onChange={(e) => selectSet(e.target.value)}>
          {allSets.map((set) => (
            <option key={set.id} value={set.id}>
              {set.name} ({set.cases.length})
            </option>
          ))}
        </select>
        <button
          className={styles.infoButton}
          onClick={() => setSourceOpen(true)}
          title="Show source"
          aria-label="Show algorithm set source"
        >
          ⓘ
        </button>
      </div>

      <Modal isOpen={sourceOpen} onClose={() => setSourceOpen(false)} title="Source">
        <p>{activeSet.source}</p>
      </Modal>
    </section>
  );
}
