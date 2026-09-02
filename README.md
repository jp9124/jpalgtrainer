# WCA Alg Trainer (React)

## Link: https://jpalgtrainer.netlify.app/ 

A React algorithm trainer for twisty puzzles, modeled after
[tao-yu/Alg-Trainer](https://github.com/tao-yu/Alg-Trainer). Started with FTO
(Face-Turning Octahedron); now also covers Megaminx, Pyraminx, Skewb, and
Square-1.

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
  Gottlieb-style notation, plus **1LP** (`src/puzzles/algs/fto1lp.js`, 11 cases), from
  "1LP-Rotationless-V3.pdf". H/S ("hedge"/"sledge") triggers and the "Uo" whole-puzzle
  rotation notation are translated to real moves (`R B' R' B`, `R' L R L'`, `Uv`); where a
  case listed multiple equivalent algorithms (one per recognition angle), only the one
  needing no incoming AUF is kept. The 12th listed case ("6c") is the already-solved state
  and is omitted.
- **Megaminx** — **OLL** (`src/puzzles/algs/megaminxOll.js`, 178 cases) and **PLL**
  (`src/puzzles/algs/megaminxPll.js`, 151 cases), supplied by this project's user as
  `ollalgs.js`/`pllalgs.js`. Grouped by the source's own numbered/lettered groups (e.g. OLL
  "Group 1", PLL "Group C"); a group with more than 6 cases is split in half (e.g. "Group Ca"/
  "Group Cb"). The single empty "solved" PLL entry is omitted — not a practicable case. Every
  case was parsed and round-trip-verified against the real `cubing` engine. Three of the
  source's move families (BR/BL/DR) turned out to be a y-rotation conjugate of a face this app
  already has a key for (e.g. BR = y R y') and were rewritten to reuse it, each rewrite
  verified to produce the identical resulting pattern to the original token; bR/dR had no such
  equivalent, so those got two dedicated keys instead (see the source note in
  `algs/megaminxOll.js` for detail). This replaces the previous small "Corner Orientation"/"Edge
  Permutation" sets, which just pointed at reusing 3x3's own Sune/T-perm on Megaminx's last
  layer (per SpeedCubeShop's guide) — still true, but superseded by full OLL/PLL coverage.
- **Pyraminx** — the Speedsolving Wiki's Pyraminx algorithms page (ELL and Last-Layer
  sections).
- **Skewb** — Sarah's Cubing Site "Speedskewbin" guide, read directly from the source PDF.
- **Square-1** — **EO** (`src/puzzles/algs/square1EO.js`, 7 cases: the non-trivial counts of
  misoriented top-layer edges), from SpeedCubeDB. Real Square-1 algorithms are dense numeric
  sequences, and every source consulted while building this disagreed on the exact digits for
  the same named algorithm, so rather than trust the source's listed algorithm text directly,
  each one here was derived as the literal inverse of the source's own "setup" scramble — see
  the source note in `algs/square1EO.js` for why that's the more trustworthy value. Add more via the
  Custom Set editor once you have a source you trust.
- **2x2** — **CLL, EG1, EG2, LEG1** (`src/puzzles/algs/cube2x2Cll.js`, 40 cases each, 160 total),
  supplied by this project's user as `2x2algs.txt`. Each set is grouped by its 7 named shapes
  (S/AS/Pi/U/L/T/H), numbered sequentially within the group (e.g. S1..S6); H has only 4 cases
  per method, matching the source. Parenthesized AUF prefixes (e.g. `(U2)`) are kept as real
  leading moves, just with the cosmetic parens stripped; the source's one `(U/U')` (either AUF
  works) took the first option. Every case was parsed and round-trip-verified against the real
  `cubing` engine. **TCLL+/TCLL-** (`src/puzzles/algs/cube2x2Tcll.js`, 43 cases each, 86 total),
  supplied by this project's user as `tcll.txt`. Each set is grouped by its 8 named shapes
  (Hammer, Spaceship, Stollery, Pinwheel, Two-Face, Turtle, Pinwheel Poser, Gun), numbered
  within the group (e.g. Hammer 1..Hammer 6); Pinwheel has only 3 cases and Two-Face only 4,
  matching the source. The source gives multiple algorithms per shape — one per AUF/recognition
  angle, not alternates for the same case — so every one became its own case here, not just the
  first. Same AUF-paren-stripping convention as CLL above. Every case was parsed and
  round-trip-verified against the real `cubing` engine.
- **3x3** — **ZBLL** (`src/puzzles/algs/cube3x3Zbll.js`), split into 7 sets by edge shape (T/U/L/H/Pi/S/AS,
  472 cases total), supplied directly by this project's user from a personal ZBLL reference
  (a JS object originally named `zbll_juliette`). Where that source listed alternate algorithms
  for a case (`/`-separated), only the first is kept. Every one of the 472 algorithms was
  parsed and round-trip-verified against the real `cubing` engine (applying the case's alg,
  then its inverse, returns to solved) before being included.
- **5x5** — **L2E** (Last Two Edges, `src/puzzles/algs/cube5x5L2e.js`), split into "No Parity" (4 cases)
  and "Parity" (8 cases), from CubeSkills' "5x5 L2E Algorithms" PDF, supplied by this project's
  user. The PDF shows a primary (bold) algorithm per case and, for some No Parity cases, a
  bolded alternative-angle algorithm below it — only the primary one is kept. Four cases used
  3Rw/3Lw (a deep, 3-layer wide turn with no key on this app's layout); rather than inventing
  dedicated keys for a move needed nowhere else, those four were rewritten to an equivalent
  move+rotation pair (3Rw = x l, 3Rw' = x' l', 3Lw = x' r, 3Lw' = x r'), each verified to
  produce an identical resulting pattern to the original token before being used. Same
  parse-and-round-trip verification as ZBLL above.

2x2/3x3/5x5's keyboard layout (`src/puzzles/cubeControls.js`) covers face turns, r/l wide
turns, slice moves (M/E/S), and whole-cube rotations (x/y/z). It isn't from cubing.js/Twizzle
(no such official layout exists for these here), but it is a real external layout — a
`defaultKeymaps`/`KeyCombo`-style binding list from an existing cubing web app, supplied by
this project's user — not one invented for this project. It includes one modifier binding:
S/S' reuse F/F's physical keys with Shift held.

The Custom Set box exists precisely to fill these gaps — paste whatever method sheet you
actually use.
