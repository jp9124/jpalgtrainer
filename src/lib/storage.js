const STORAGE_PREFIX = "twisty-alg-trainer-v1";

function keyFor(puzzleId) {
  return `${STORAGE_PREFIX}:${puzzleId}`;
}

// Practice options (order/visible-turning/speed) are how someone likes to
// practice in general, not something tied to one puzzle — stored under a
// single puzzle-agnostic key so they carry over when switching puzzles,
// unlike stats/customSetText/checkedCases below.
const PRACTICE_PREFS_KEY = `${STORAGE_PREFIX}:practice-prefs`;

export function loadPracticePrefs() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PRACTICE_PREFS_KEY));
    return {
      orderedEnabled: parsed?.orderedEnabled ?? true,
      visibleTurningEnabled: parsed?.visibleTurningEnabled ?? false,
      turnsPerSecond: parsed?.turnsPerSecond ?? 10,
      colorNeutralEnabled: parsed?.colorNeutralEnabled ?? false,
      randomAufEnabled: parsed?.randomAufEnabled ?? false,
    };
  } catch {
    return {
      orderedEnabled: true,
      visibleTurningEnabled: false,
      turnsPerSecond: 10,
      colorNeutralEnabled: false,
      randomAufEnabled: false,
    };
  }
}

export function savePracticePrefs(data) {
  localStorage.setItem(PRACTICE_PREFS_KEY, JSON.stringify(data));
}

// Which puzzle was last active, so a page refresh stays put instead of
// jumping back to the first puzzle in the list.
const SELECTED_PUZZLE_KEY = `${STORAGE_PREFIX}:selected-puzzle`;

export function loadSelectedPuzzleId() {
  try {
    return localStorage.getItem(SELECTED_PUZZLE_KEY);
  } catch {
    return null;
  }
}

export function saveSelectedPuzzleId(puzzleId) {
  localStorage.setItem(SELECTED_PUZZLE_KEY, puzzleId);
}

export function loadStorage(puzzleId) {
  try {
    const parsed = JSON.parse(localStorage.getItem(keyFor(puzzleId)));
    return {
      stats: parsed?.stats ?? {},
      customSetText: parsed?.customSetText ?? "",
      checkedCases: parsed?.checkedCases ?? {},
    };
  } catch {
    return { stats: {}, customSetText: "", checkedCases: {} };
  }
}

export function saveStorage(puzzleId, data) {
  localStorage.setItem(keyFor(puzzleId), JSON.stringify(data));
}
