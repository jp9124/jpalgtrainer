import { useState } from "react";
import { useTrainerContext } from "../../context/TrainerContext.jsx";
import Modal from "../common/Modal.jsx";
import styles from "./Sidebar.module.css";

export default function CustomSetEditor() {
  const { customSetText, setCustomSetText, saveCustomSet, customStatus } = useTrainerContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <button className={styles.small} onClick={() => setIsOpen(true)}>
        Custom Set
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Custom Set">
        <textarea
          className={styles.customTextarea}
          value={customSetText}
          onChange={(e) => setCustomSetText(e.target.value)}
          placeholder={"One per line:\nMy Alg: R U R' F'\nAnother: F' U F' D' F U' F' D F'"}
          autoFocus
        />
        <div className={styles.rowActions}>
          <button className={styles.small} onClick={saveCustomSet}>
            Save custom set
          </button>
        </div>
        <div className={styles.sourceTag}>{customStatus}</div>
      </Modal>
    </section>
  );
}
