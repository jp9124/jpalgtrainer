import { useEffect, useState } from "react";
import "./App.css";

const COLORS = {
  U: "#f7f7f2",
  R: "#ffa500",
  F: "#1010ee",
  D: "#f0c528",
  L: "#f90000",
  B: "#28a368",
};
const FACE_NAMES = {
  U: "Up",
  R: "Right",
  F: "Front",
  D: "Down",
  L: "Left",
  B: "Back",
};
const TRAINING_SETS = {
  2: ["CLL", "EG1", "EG2"],
  3: ["OLL", "PLL"],
  4: ["OLL Parity", "PLL Parity"],
  5: ["OLL Parity", "PLL Parity"],
};
const BINDINGS = [
  ["i", "R"],
  ["k", "R'"],
  ["j", "U"],
  ["f", "U'"],
  ["h", "F"],
  ["g", "F'"],
  ["w", "B"],
  ["o", "B'"],
  ["d", "L"],
  ["e", "L'"],
  ["s", "D"],
  ["l", "D'"],
  ["u", "r"],
  ["m", "r'"],
  ["v", "l"],
  ["r", "l'"],
  ["'", "M"],
  ["\\", "M"],
  ["[", "M'"],
  ["t", "x"],
  ["n", "x'"],
  [";", "y"],
  ["p", "z"],
  ["q", "z'"],
  ["a", "y'"],
  ["shift+h", "S"],
  ["shift+g", "S'"],
  ["x", "E"],
  [".", "E'"],
];

function fresh(n) {
  return Object.fromEntries(
    Object.keys(COLORS).map((f) => [
      f,
      Array.from({ length: n }, () => Array(n).fill(f)),
    ]),
  );
}
const GEOMETRY = {
  F: { normal: [0, 0, 1], pos: (r, c, n) => [c, n - 1 - r, n - 1] },
  B: { normal: [0, 0, -1], pos: (r, c, n) => [n - 1 - c, n - 1 - r, 0] },
  U: { normal: [0, 1, 0], pos: (r, c, n) => [c, n - 1, r] },
  D: { normal: [0, -1, 0], pos: (r, c, n) => [c, 0, n - 1 - r] },
  R: { normal: [1, 0, 0], pos: (r, c, n) => [n - 1, n - 1 - r, n - 1 - c] },
  L: { normal: [-1, 0, 0], pos: (r, c, n) => [0, n - 1 - r, c] },
};
const normalFace = {
  "0,0,1": "F",
  "0,0,-1": "B",
  "0,1,0": "U",
  "0,-1,0": "D",
  "1,0,0": "R",
  "-1,0,0": "L",
};
function rotatePoint(v, axis, dir, n = 2) {
  let [x, y, z] = v;
  const max = n - 1;
  if (axis === 0) return dir === 1 ? [x, max - z, y] : [x, z, max - y];
  if (axis === 1) return dir === 1 ? [z, y, max - x] : [max - z, y, x];
  return dir === 1 ? [max - y, x, z] : [y, max - x, z];
}
function moveSticker(sticker, axis, dir, n) {
  return {
    ...sticker,
    pos: rotatePoint(sticker.pos, axis, dir, n),
    normal: rotatePoint(sticker.normal, axis, dir, 1).map((v) => v),
  };
}
function toStickers(state) {
  const n = state.U.length;
  return Object.entries(state).flatMap(([face, grid]) =>
    grid.flatMap((row, r) =>
      row.map((color, c) => ({
        color,
        pos: GEOMETRY[face].pos(r, c, n),
        normal: GEOMETRY[face].normal,
      })),
    ),
  );
}
function fromStickers(stickers, n) {
  const next = fresh(n);
  stickers.forEach(({ color, pos, normal }) => {
    const face = normalFace[normal.join(",")];
    const geo = GEOMETRY[face];
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++)
        if (geo.pos(r, c, n).join(",") === pos.join(","))
          next[face][r][c] = color;
  });
  return next;
}
function applyMove(state, raw) {
  let token = raw,
    turns = 1;
  if (token.endsWith("'")) {
    turns = 3;
    token = token.slice(0, -1);
  }
  if (token.endsWith("2")) {
    turns = 2;
    token = token.slice(0, -1);
  }
  const n = state.U.length;
  const faces = {
    R: [0, 1],
    L: [0, -1],
    U: [1, 1],
    D: [1, -1],
    F: [2, 1],
    B: [2, -1],
  };
  let axis,
    sign,
    layers = 1,
    slice = false;
  if (faces[token.toUpperCase()]) {
    [axis, sign] = faces[token.toUpperCase()];
    layers = token === token.toLowerCase() ? Math.min(2, n) : 1;
  } else if (token === "M") {
    axis = 0;
    sign = -1;
    slice = true;
  } else if (token === "E") {
    axis = 1;
    sign = -1;
    slice = true;
  } else if (token === "S") {
    axis = 2;
    sign = 1;
    slice = true;
  } else if ("xyz".includes(token)) {
    axis = "xyz".indexOf(token);
    sign = 1;
    layers = n;
  } else return state;
  const layerIndexes =
    layers === n
      ? null
      : slice
        ? [Math.floor(n / 2)]
        : Array.from({ length: layers }, (_, i) =>
            sign === 1 ? n - 1 - i : i,
          );
  let stickers = toStickers(state);
  for (let t = 0; t < turns; t++)
    stickers = stickers.map((s) =>
      !layerIndexes || layerIndexes.includes(s.pos[axis])
        ? moveSticker(s, axis, -sign, n)
        : s,
    );
  return fromStickers(stickers, n);
}

function Cube({ cube }) {
  const n = cube.U.length;
  const stickers = (face) =>
    cube[face].map((row, y) =>
      row.map((color, x) => (
        <i key={`${x}-${y}`} style={{ background: COLORS[color] }} />
      )),
    );
  // Each side strip is only the visible L/R stickers touching Up (top row)
  // and Front (inner vertical edge); the Back and Down portions stay hidden.
  const side = (face) => {
    const frontEdge = face === "L" ? n - 1 : 0;
    const upEdge = face === "L" ? cube[face][0] : [...cube[face][0]].reverse();
    const front = cube[face].map((row) => row[frontEdge]);
    const visible = [
      ...upEdge.slice(0, -1).map((color) => ({ color })),
      { color: upEdge.at(-1), corner: true },
      ...front.slice(1).map((color) => ({ color })),
    ];
    return visible.map(({ color, corner }, i) => (
      <i
        className={corner ? "merged-corner" : ""}
        key={i}
        style={{ background: COLORS[color] }}
      />
    ));
  };
  return (
    <div
      className="cube-portrait"
      style={{ "--n": n }}
      aria-label="Cube top and front view"
    >
      <div
        className="portrait-face up"
        style={{
          gridTemplateColumns: `repeat(${n}, 1fr)`,
          gridTemplateRows: `repeat(${n}, 1fr)`,
        }}
      >
        {stickers("U")}
      </div>
      <div
        className="portrait-face front"
        style={{
          gridTemplateColumns: `repeat(${n}, 1fr)`,
          gridTemplateRows: `repeat(${n}, 1fr)`,
        }}
      >
        {stickers("F")}
      </div>
      <div
        className="side-strip left"
        style={{ gridTemplateRows: `repeat(${n * 2}, 1fr)` }}
      >
        {side("L")}
      </div>
      <div
        className="side-strip right"
        style={{ gridTemplateRows: `repeat(${n * 2}, 1fr)` }}
      >
        {side("R")}
      </div>
    </div>
  );
}

function App() {
  const [size, setSize] = useState(3);
  const [cube, setCube] = useState(() => fresh(3));
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(false);
  const [trainingSet, setTrainingSet] = useState("");
  const execute = (move) => setCube((c) => applyMove(c, move));
  useEffect(() => {
    const keydown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      const prefix = e.shiftKey ? "shift+" : "";
      const found = BINDINGS.find(
        ([key]) => key === prefix + e.key.toLowerCase(),
      );
      if (found) {
        e.preventDefault();
        execute(found[1]);
      }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);
  const changeSize = (n) => {
    setSize(n);
    setCube(fresh(n));
    setTrainingSet("");
  };
  const scramble = () => {
    const faces = ["U", "R", "F", "D", "L", "B"];
    const suffixes = ["", "'", "2"];
    const count = size === 2 ? 9 : size === 3 ? 20 : size === 4 ? 40 : 60;
    const moves = [];
    let previous = "";
    while (moves.length < count) {
      const face = faces[Math.floor(Math.random() * faces.length)];
      if (face === previous) continue;
      moves.push(face + suffixes[Math.floor(Math.random() * suffixes.length)]);
      previous = face;
    }
    setCube(moves.reduce((cube, move) => applyMove(cube, move), fresh(size)));
  };
  return (
    <main>
      <header className="topbar">
        <span className="brand">Cube Trainer</span>
        <label className="cube-picker">
          <span className="sr-only">Cube size</span>
          <select
            value={size}
            onChange={(e) => changeSize(Number(e.target.value))}
          >
            {[2, 3, 4, 5].map((n) => (
              <option value={n} key={n}>
                {n}x{n}
              </option>
            ))}
          </select>
        </label>
        <label className="training-picker">
          <span className="sr-only">Training set</span>
          <select
            value={trainingSet}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "scramble") {
                scramble();
                setTrainingSet("");
              } else setTrainingSet(value);
            }}
          >
            <option value="">Choose training set…</option>
            <option value="scramble">Scramble</option>
            <optgroup label={`${size}x${size} algorithms`}>
              {TRAINING_SETS[size].map((set) => (
                <option value={set} key={set}>
                  {set}
                </option>
              ))}
            </optgroup>
          </select>
        </label>
        <button className="reset" onClick={() => setCube(fresh(size))}>
          Reset
        </button>
      </header>
      <section className="workspace">
        <div className="stage">
          <Cube cube={cube} />
        </div>
        <aside>
          <p className="label">Training mode</p>
          <h3>{trainingSet || "Free practice"}</h3>
          <p className="hint">
            {trainingSet
              ? `Selected: ${trainingSet}. Algorithm cases will be added here next.`
              : "Choose Scramble or an algorithm subset from the top bar."}
          </p>
        </aside>
      </section>
      <section className="keyboard">
        <button
          className="keyboard-toggle"
          aria-expanded={showKeyboardGuide}
          onClick={() => setShowKeyboardGuide((show) => !show)}
        >
          <span>
            <p className="label">Keyboard controls</p>
            <h2>Finger tricks, on screen.</h2>
            <p className="sub">
              {showKeyboardGuide
                ? "Hide the key map."
                : "Show the key map for every move."}
            </p>
          </span>
          <strong>{showKeyboardGuide ? "−" : "+"}</strong>
        </button>
        {showKeyboardGuide && (
          <div className="keys">
            {BINDINGS.map(([key, move]) => (
              <button key={key} onClick={() => execute(move)}>
                <kbd>{key.replace("shift+", "⇧ ")}</kbd>
                <span>{move}</span>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
export default App;
