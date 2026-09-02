# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A React algorithm trainer for twisty puzzles (FTO, Megaminx, Pyraminx, Skewb, Square-1), modeled after
[tao-yu/Alg-Trainer](https://github.com/tao-yu/Alg-Trainer). Puzzle rendering and move/state logic come
from the `cubing` npm package (the engine behind alpha.twizzle.net) — an internet connection is required
to run it, since `cubing` fetches puzzle definitions at runtime. The one exception is Square-1: cubing.js
has no 3D support for its shape changes, so it renders through a from-scratch canvas engine instead (see
`src/lib/square1Renderer.js`) — move validity and solved-detection still come from cubing.js's real
Square-1 KPuzzle, only the rendering is custom.

## Commands

```
npm install
npm run dev       # Vite dev server, usually http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the dist/ build locally
```

There is no lint script, no test framework, and no CI config in this repo.

## Architecture

### State layering

- `PuzzleSelectionContext` — which puzzle is currently active. Lives above everything else.
- `TrainerProvider` (`src/context/TrainerContext.jsx`) — one instance covers a single puzzle. The parent
  (`App.jsx`) remounts it via `key={puzzleConfig.id}` on every puzzle switch, so all state (timers, sets,
  refs) starts fresh instead of being manually reset. It composes two hooks:
  - `usePuzzleEngine(cubingPuzzleId)` — async-loads `cubing`'s `KPuzzle` (the real state/move engine) for
    the active puzzle. Exposes `kpuzzle` and `solvedPattern`, used for authoritative solved-state
    detection (`applyAlg`/`isIdentical`), independent of whatever the 3D `<twisty-player>` is animating.
  - `useTrainer(...)` — all trainer state and actions: sets/cases, the practice timer, scrambling, move
    application, custom-set parsing, keyboard handling, localStorage persistence. This is the biggest
    file in the app and the one to read first for practice/timer/case-selection logic.
- Components read everything through `useTrainerContext()` rather than prop drilling.

### Two independent puzzle instances

The UI always shows two `<twisty-player>` instances at once: a Practice puzzle (`practicePlayerRef`) and
a Reference/Learn puzzle (`learnPlayerRef`), each driven independently. Both are updated with the same
technique: set `player.alg` to `"<inverted case alg (scramble)> <moves so far>"`, then call
`player.jumpToEnd()`. This plain-alg approach is used everywhere (including single-move-at-a-time
playback in `playLearnAlgorithm`) rather than the twisty-player's own experimental setup-alg feature,
which proved unreliable once embedded in this app — see the comment above `learnScrambleAlgFor` in
`useTrainer.js` before changing that mechanism.

Move validity and solved-state are never inferred from the 3D player; they're always checked against the
`kpuzzle`/`solvedPattern` engine from `usePuzzleEngine`.

Square-1 is the one exception to `<twisty-player>`: `Square1Canvas.jsx` (backed by
`src/lib/square1Renderer.js`) renders it instead, exposing the same subset of the twisty-player API
(`alg`, `jumpToStart`/`jumpToEnd`/`play`, `tempoScale`, `experimentalAddMove`) so `useTrainer.js` doesn't
need puzzle-specific branches for most of this mechanism. It does need one: Square-1's x2/y2/z2
whole-puzzle rotations animate on that canvas but aren't real cubing.js moves (its KPuzzle has no rotation
support at all), so `applyMove` special-cases exactly those three tokens to skip kpuzzle validation.

### Puzzle configs (`src/puzzles/`)

Each puzzle is one config file exporting `{ id, label, fullName, cubingPuzzleId, controlsType, controls,
builtinSets }` (see `fto.js`), aggregated into `PUZZLES` by `index.js`. To add a puzzle: add the file and
list it there.

- `controlsType: "faceTurn"` gets the generic move-pad/keyboard UI for free, driven by `controls` (an
  array of `{ move, code, keyLabel }` mapping a `KeyboardEvent.code` to a move token).
- Anything else needs its own control component wired into `Stage/PracticeArea.jsx` — Square-1's
  `controlsType: "square1"` is the only current example (`Stage/Square1Pad.jsx`), since Square-1 doesn't
  turn like the other puzzles and uses click-only twist/slash controls instead of a keyboard layout.
- `builtinSets` are named algorithm collections (`{ id, name, source, cases: [{ name, alg }] }`), each
  verified against a specific public source rather than invented — see README.md's "About the built-in
  algorithms" section for what's used per puzzle and why Square-1 intentionally ships with none. The
  collections themselves live in `src/puzzles/algs/` (e.g. `algs/cube3x3Zbll.js`, `algs/megaminxOll.js`), one
  file per source, imported into the owning puzzle config — kept separate so a puzzle's config file
  stays about controls/metadata, not thousands of lines of case data.
- The "Custom Set" the user pastes into the sidebar is validated live against the active puzzle's real
  `kpuzzle` (in `useTrainer.applyCustomSetText`), not just parsed — invalid move families surface as
  per-line errors.

### Persistence

`src/lib/storage.js` reads/writes one localStorage entry per puzzle (`twisty-alg-trainer-v1:<puzzleId>`),
storing `{ stats, customSetText, checkedCases }`. Session stats (attempts/solved/best/avg for the current
tab session) are separate, in-memory only, and reset on reload.

### Component structure

Each component under `src/components/` owns a paired `.jsx` + `.module.css` (top-level files like
`App.jsx`/`index.css` use plain, non-scoped CSS instead). Structure:

- `Header/` — title + puzzle picker
- `Sidebar/` — set picker, case list, practice options, session stats, custom-set editor
- `Stage/` — the two 3D puzzles, case info, learn/practice controls, move pad
- `Footer/`

## Keyboard layout

FTO and Megaminx reuse their official cubing.js/Twizzle keyboard layouts (see the comment at the top of
`src/puzzles/fto.js`). Pyraminx and Skewb have no official layout, so they reuse the same physical key
positions as FTO/Megaminx for matching face letters, for muscle-memory consistency. Square-1 has no
keyboard layout at all — it's click-only via `Square1Pad`.
