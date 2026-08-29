# FTO Alg Trainer (prototype)

A single-file algorithm trainer for the **Face-Turning Octahedron (FTO)**, modeled after
[tao-yu/Alg-Trainer](https://github.com/tao-yu/Alg-Trainer) but built around FTO instead of 3x3.

## Running it

Just open `index.html` in a modern desktop browser (Chrome/Firefox/Edge). No build step, no
install — the puzzle rendering and move logic are loaded live from the official
[cubing.js](https://github.com/cubing/cubing.js) CDN, so **you need an internet connection**.

If your browser blocks module scripts from `file://` for any reason, serve the folder instead:

```
python3 -m http.server 8000
# then open http://localhost:8000
```

## What it does

- **Real 3D FTO puzzle**, not a mock — rendered by cubing.js's native `puzzle="fto"` support
  (the same engine behind [alpha.twizzle.net](https://alpha.twizzle.net)).
- **Learn mode** — pick any case from the sidebar to see its algorithm and watch it play out
  on the cube (uses the puzzle's built-in play/scrub controls).
- **Practice mode** (the core Alg-Trainer loop):
  - Loads a random case from whichever cases you've checked, scrambled by inverting the
    algorithm (plus an optional random pre-move so you can't just "read the scramble
    backwards" — same philosophy as the reference trainer).
  - You solve it either by clicking the on-screen move pad or using the keyboard. The
    keyboard layout is **the actual official cubing.js/Twizzle FTO layout** (I/K = R,
    W/O = B, S/L = D, D/E = L, J/F = U, H/G = F, Q/Z = BL, . /P = BR), so muscle memory
    transfers to Twizzle.
  - A timer starts on your first move and stops automatically the moment the puzzle is
    genuinely solved (checked via the puzzle's real move-permutation state, not just
    "did you replay the same moves") — same "keyboard cube" feel as the original.
  - Space bar reveals the algorithm if you get stuck.
  - Best time per case and session stats (attempts/solved/best/avg) are tracked;
    per-case bests persist in `localStorage`.
- **Custom algorithm sets** — paste your own `Name: MOVES` lines into the sidebar box to
  train any algorithm you want; they're validated against the real FTO move engine and
  saved locally.

## About the built-in algorithms

FTO doesn't have a standardized, universally-agreed algorithm-set vocabulary the way 3x3 has
OLL/PLL — there's no widely-published "FTO CLL" or "FTO ELL" sheet equivalent. The three
built-in sets are the handful of named algorithms I could verify against public sources:

- **Beginner Basics** — Sledgehammer / Hedgeslammer, from Cubelelo's beginner FTO guide.
- **L3T — Flip & Cycle** and **L3T — Corner 3-Cycle** — the four core algorithms from an
  FTO notes document using Michael Gottlieb-style notation (U/F/R/D/L/B/BL/BR faces).

These are intentionally a small, honest starting set rather than invented content. The
Custom Set box is there so you (or the community) can extend it with whatever FTO method
sheet you're actually using.

## Notation

Faces: `U R F D L B BL BR`, clockwise by default, `'` for counter-clockwise (e.g. `BR'`).
Only single outer-face turns are used/needed by the built-in algorithms; the underlying
engine also understands wide/slice moves if you want to use them in a custom algorithm.

## Known limitations of this prototype

- No physical/Bluetooth smart-cube support (the original has Giiker integration).
- No mobile-specific layout tuning.
- Solved-detection accepts *any* sequence that returns the puzzle to solved — it doesn't
  verify you executed the exact canonical algorithm, only that you solved the case. This is
  intentional (it's how real smart-cube trainers work) but means it won't catch "you solved
  it a different way."
