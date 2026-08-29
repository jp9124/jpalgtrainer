import { useTrainerContext } from "../../context/TrainerContext.jsx";
import styles from "./Sidebar.module.css";

function bestTimeFor(persistedStats, activeSet, c) {
  const key = `${activeSet.id}::${c.name}`;
  const best = persistedStats[key]?.best;
  return best ? `${best.toFixed(2)}s` : "";
}

function CaseRow({ c, activeSet, persistedStats, showLearnCase, checkbox }) {
  return (
    <div className={styles.caseRow}>
      {checkbox}
      <span
        className={styles.name}
        title={c.note ? `${c.note} — click to show in the reference panel` : "Show in the reference panel"}
        onClick={() => showLearnCase(c)}
      >
        {c.name}
      </span>
      <span className={styles.best}>{bestTimeFor(persistedStats, activeSet, c)}</span>
    </div>
  );
}

function FlatCaseList({ cases, activeSet, checkedCaseNames, toggleCase, persistedStats, showLearnCase }) {
  return cases.map((c) => (
    <CaseRow
      key={c.name}
      c={c}
      activeSet={activeSet}
      persistedStats={persistedStats}
      showLearnCase={showLearnCase}
      checkbox={
        <input type="checkbox" checked={checkedCaseNames.has(c.name)} onChange={() => toggleCase(c.name)} />
      }
    />
  ));
}

// Cases are checked off a whole group at a time (e.g. FTO's LBT set, which
// has 96 cases across 24 groups) — checking off individual cases one by one
// wouldn't be practical at that scale, and listing each one under its group
// added scroll length without adding anything actionable.
function GroupedCaseList({ cases, checkedCaseNames, setCasesChecked }) {
  const groups = [];
  const casesByGroup = new Map();
  for (const c of cases) {
    if (!casesByGroup.has(c.group)) {
      casesByGroup.set(c.group, []);
      groups.push(c.group);
    }
    casesByGroup.get(c.group).push(c);
  }

  return groups.map((group) => {
    const groupCases = casesByGroup.get(group);
    const names = groupCases.map((c) => c.name);
    const checkedCount = names.filter((n) => checkedCaseNames.has(n)).length;
    const allChecked = checkedCount === names.length;
    const someChecked = checkedCount > 0 && !allChecked;

    return (
      <div className={styles.groupHeader} key={group}>
        <input
          type="checkbox"
          checked={allChecked}
          ref={(el) => {
            if (el) el.indeterminate = someChecked;
          }}
          onChange={() => setCasesChecked(names, !allChecked)}
        />
        <span className={styles.groupName}>
          {group} ({names.length})
        </span>
      </div>
    );
  });
}

export default function CaseList() {
  const {
    activeSet,
    checkedCaseNames,
    toggleCase,
    setAllChecked,
    setCasesChecked,
    persistedStats,
    showLearnCase,
  } = useTrainerContext();

  const isGrouped = activeSet.cases.length > 0 && activeSet.cases.every((c) => c.group);

  return (
    <section className={styles.caseSection}>
      <h2 className={styles.sectionTitle}>Cases</h2>
      <div className={styles.rowActions}>
        <button className={styles.small} onClick={() => setAllChecked(true)}>
          All
        </button>
        <button className={styles.small} onClick={() => setAllChecked(false)}>
          None
        </button>
      </div>
      <div className={styles.caseList}>
        {isGrouped ? (
          <GroupedCaseList cases={activeSet.cases} checkedCaseNames={checkedCaseNames} setCasesChecked={setCasesChecked} />
        ) : (
          <FlatCaseList
            cases={activeSet.cases}
            activeSet={activeSet}
            checkedCaseNames={checkedCaseNames}
            toggleCase={toggleCase}
            persistedStats={persistedStats}
            showLearnCase={showLearnCase}
          />
        )}
      </div>
    </section>
  );
}
