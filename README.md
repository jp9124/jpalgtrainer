# WCA Alg Trainer (React)

## Link: https://jpalgtrainer.netlify.app/ 

A React algorithm trainer for twisty puzzles, modeled after
[tao-yu/Alg-Trainer](https://github.com/tao-yu/Alg-Trainer). Started with FTO
(Face-Turning Octahedron); now also covers Megaminx, Pyraminx, Skewb, and
Square-1. The original zero-build single-file FTO-only version is kept in
[`vanilla/`](vanilla/) for reference.

## Running it

Requires [Node.js](https://nodejs.org/) (18+).

```
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`). Requires an internet
connection — puzzle rendering and move logic come from the `cubing` npm package (the same
engine behind [alpha.twizzle.net](https://alpha.twizzle.net)).

`npm run build` produces a static production build in `dist/`; `npm run preview` serves it
locally.

## Project structure

```
src/
  main.jsx                        entry point
  App.jsx / App.css               top-level layout
  index.css                       CSS variables, reset, base element styles
  puzzles/                        one config file per puzzle
    fto.js, megaminx.js, pyraminx.js, skewb.js, square1.js
    index.js                      aggregates them into PUZZLES
  lib/storage.js                  localStorage read/write helpers (namespaced per puzzle)
  hooks/
    usePuzzleEngine.js            loads cubing.js's KPuzzle (state/move engine) for a puzzle id
    useTrainer.js                 all trainer state & actions (sets, cases, timer, moves)
  context/
    PuzzleSelectionContext.jsx    which puzzle is active (lives above the trainer)
    TrainerContext.jsx            wires the hooks together for the active puzzle
  components/
    Header/                      title + puzzle picker
    Sidebar/                     set picker, case list, options, stats, custom-set editor
    Stage/                       the 3D puzzle, case info, learn/practice controls, move pad
    Footer/
```

Each component owns a paired `.jsx` + `.module.css` (or `.css` for the top-level, non-scoped
files). Shared app state lives in `useTrainer`/`usePuzzleEngine` and is exposed via
`useTrainerContext()` so components don't need deep prop drilling. Switching puzzles remounts
the whole `TrainerProvider` (via a React `key`), so every puzzle gets a clean slate instead of
needing a dozen pieces of state manually reset.

## Adding another puzzle

Add a new file in `src/puzzles/` exporting `{ id, label, fullName, cubingPuzzleId, controlsType,
controls, builtinSets }` (see `fto.js` for the shape) and list it in `src/puzzles/index.js`.
`controlsType: "faceTurn"` gets the generic move-pad/keyboard UI for free; anything else (like
Square-1's `"square1"`) needs its own control component, wired into `PracticeArea.jsx`.

## What it does

- **Real 3D puzzles**, rendered by cubing.js's native puzzle support — two independent
  instances at once, in fact (see layout below).
- **Practice, front and center** — a random scramble (the case's algorithm, inverted), a timer
  that starts on your first move and auto-stops the instant the puzzle's real
  move-permutation state is solved. Space reveals the algorithm (and resets the cube back to
  the scramble so you can actually practice it), Enter loads a new case.
- **Reference panel on the right** — a smaller puzzle for watching an algorithm play out,
  always visible alongside Practice. Click any case in the sidebar to load it there.
- **Custom algorithm sets** — paste `Name: MOVES` lines in the sidebar; they're validated
  against the real move engine for whichever puzzle is active, and saved to `localStorage`.
- Per-case best times and session stats (attempts/solved/best/avg).

## Keyboard layout

FTO and Megaminx reuse their **official cubing.js/Twizzle keyboard layouts**. Pyraminx and
Skewb have no official layout, so they reuse the same physical key positions for their
matching face letters (U/L/R/B), for muscle-memory consistency across puzzles:

I/K=R, W/O=B, S/L=D (FTO) or FR (Megaminx), D/E=L, J/F=U, H/G=F, Q/Z=BL, ./P=BR (FTO only)

Square-1 doesn't turn like the others — it gets its own click-only control panel (top/bottom
twist amounts + a slash button) instead of a keyboard layout.

## About the built-in algorithms

None of these puzzles (except 3x3) have a standardized, widely-published algorithm-set
vocabulary the way 3x3 has OLL/PLL. Every built-in set here is a small, honestly-scoped
collection of named algorithms actually verified against a public source, not an invented or
"probably right" one:

- **FTO** — Cubelelo's beginner guide, and an FTO notes document using Michael
  Gottlieb-style notation.
- **Megaminx** — SpeedCubeShop's last-layer guide, which explicitly teaches reusing standard
  3x3 algorithms (Sune, T-perm) directly on Megaminx's last layer.
- **Pyraminx** — the Speedsolving Wiki's Pyraminx algorithms page (ELL and Last-Layer
  sections).
- **Skewb** — Sarah's Cubing Site "Speedskewbin" guide, read directly from the source PDF.
- **Square-1** — intentionally **none**. Real Square-1 algorithms are dense numeric sequences
  (e.g. `(3,3)/(1,2)/(4,-2)/...`), and every source consulted while building this disagreed on
  the exact digits for the same named algorithm — the risk of silently shipping a wrong one
  outweighed having a starter set. Square-1 still has full puzzle support and Custom Set works
  normally; add your own once you have a source you trust.
- **2x2, 5x5** — intentionally **none** for now. Added for free-turning practice via the
  Custom Set editor.
- **3x3** — **ZBLL** (`src/puzzles/zbll.js`), split into 7 sets by edge shape (T/U/L/H/Pi/S/AS,
  472 cases total), supplied directly by this project's user from a personal ZBLL reference
  (a JS object originally named `zbll_juliette`). Where that source listed alternate algorithms
  for a case (`/`-separated), only the first is kept. Every one of the 472 algorithms was
  parsed and round-trip-verified against the real `cubing` engine (applying the case's alg,
  then its inverse, returns to solved) before being included.

2x2/3x3/5x5's keyboard layout (`src/puzzles/cubeControls.js`) covers face turns, wide turns,
slice moves (M/E/S), and whole-cube rotations (x/y/z) — but unlike FTO/Megaminx's layout, it
isn't borrowed from any official cubing.js/Twizzle source, since none exists for these in this
app; it's this project's own key choices, documented as such in that file.

The Custom Set box exists precisely to fill these gaps — paste whatever method sheet you
actually use.
