const STORAGE_PREFIX = "twisty-alg-trainer-v1";

function keyFor(puzzleId) {
  return `${STORAGE_PREFIX}:${puzzleId}`;
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
