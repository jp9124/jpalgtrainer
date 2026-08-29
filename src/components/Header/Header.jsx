import { usePuzzleSelection } from "../../context/PuzzleSelectionContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import styles from "./Header.module.css";

export default function Header() {
  const { puzzleId, setPuzzleId, puzzleConfig, allPuzzles } = usePuzzleSelection();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>WCA Alg Trainer</h1>
        <small>(In Beta)</small>
      </div>
      <div className={styles.controls}>
        <select
          className={styles.puzzleSelect}
          value={puzzleId}
          onChange={(e) => setPuzzleId(e.target.value)}
          aria-label="Puzzle"
        >
          {allPuzzles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          aria-label="Toggle color theme"
        >
          {theme === "dark" ? "☀️" : "\u{1F319}"}
        </button>
      </div>
    </header>
  );
}
