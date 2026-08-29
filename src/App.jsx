import { ThemeProvider } from "./context/ThemeContext.jsx";
import { PuzzleSelectionProvider, usePuzzleSelection } from "./context/PuzzleSelectionContext.jsx";
import { TrainerProvider, useTrainerContext } from "./context/TrainerContext.jsx";
import Header from "./components/Header/Header.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Stage from "./components/Stage/Stage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

function AppShell() {
  const { loading, error } = useTrainerContext();

  return (
    <div className="app">
      <Header />

      {loading && (
        <div className="loading-banner">Loading puzzle engine from cubing.js&hellip;</div>
      )}
      {error && (
        <div className="loading-banner error">
          Failed to load the puzzle engine from cubing.js ({error}). Check your network
          connection and reload.
        </div>
      )}

      <div className="layout">
        <Sidebar />
        <Stage />
      </div>

      <Footer />
    </div>
  );
}

function TrainerShell() {
  const { puzzleConfig } = usePuzzleSelection();
  // Remounting on puzzle change (via `key`) gives every puzzle a clean
  // slate — fresh state, fresh refs, fresh <twisty-player> elements —
  // instead of needing to manually reset a dozen pieces of state by hand.
  return (
    <TrainerProvider key={puzzleConfig.id} puzzleConfig={puzzleConfig}>
      <AppShell />
    </TrainerProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PuzzleSelectionProvider>
        <TrainerShell />
      </PuzzleSelectionProvider>
    </ThemeProvider>
  );
}
