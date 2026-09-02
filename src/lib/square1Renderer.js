// A from-scratch canvas renderer + move engine for Square-1, supplied by this
// project's user (originally a standalone sq1.js/html/css page) to replace
// cubing.js's <twisty-player> for this one puzzle. cubing.js has no built-in
// 3D support for Square-1 shape changes the way it does for regular NxN
// cubes, so this renders the puzzle itself: every sticker is a flat polygon
// placed in space by a 4x4 matrix, redrawn with a plain 2D canvas painter's
// algorithm (project, depth-sort, fill back-to-front) rather than WebGL.
//
// This module only owns rendering/move-application/the camera-drag gesture.
// It deliberately does NOT own move validity or "solved" detection — same
// invariant as every other puzzle in this app (see CLAUDE.md): those still
// come from cubing.js's real Square-1 KPuzzle via usePuzzleEngine/useTrainer.
// This is wired in as a drop-in replacement for a <twisty-player> ref: it
// exposes the same subset of that element's imperative API actually used in
// useTrainer.js (`alg` get/set, `jumpToStart`/`jumpToEnd`/`play`,
// `tempoScale`, `experimentalAddMove`) so no call site there needed to
// change — see Square1Canvas.jsx for how a ref to this gets attached.
//
// Move notation matches this app's own Square-1 tokens exactly (verified,
// not assumed): "(u,d)" for a combined top/bottom twist (given as
// twelfths-of-a-turn amounts, e.g. "(-1,0)"), "/" for the slice/swap, and
// "x2"/"y2"/"z2" for the three whole-puzzle 180° rotations (see
// ROTATION_AXES below for why only these — not real cubing.js moves, so
// useTrainer.js's applyMove special-cases them to skip kpuzzle validation).
// A combined "(u,d)" with both non-zero (some EO cases need this, e.g.
// "(-1,-1)") is applied as two independent sequential moves — U-layer and
// D-layer turns never interact, so this is exactly equivalent to turning
// them "at once."

/* ==========================================================================
 * 4x4 matrix helpers. Row-major, flat 16-element arrays: m[row * 4 + col].
 * ========================================================================== */

function mMul(a, b) {
  const o = new Array(16);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      o[r * 4 + c] =
        a[r * 4] * b[c] + a[r * 4 + 1] * b[4 + c] + a[r * 4 + 2] * b[8 + c] + a[r * 4 + 3] * b[12 + c];
    }
  }
  return o;
}

function mTrans(x, y, z) {
  return [1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1];
}

function mScale(s) {
  return [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 1];
}

function mRot(ax, ang) {
  const x = ax[0],
    y = ax[1],
    z = ax[2];
  const c = Math.cos(ang),
    s = Math.sin(ang),
    t = 1 - c;
  // prettier-ignore
  return [
    t * x * x + c,     t * x * y - s * z, t * x * z + s * y, 0,
    t * x * y + s * z, t * y * y + c,     t * y * z - s * x, 0,
    t * x * z - s * y, t * y * z + s * x, t * z * z + c,     0,
    0, 0, 0, 1,
  ];
}

function mApply(m, p) {
  return [
    m[0] * p[0] + m[1] * p[1] + m[2] * p[2] + m[3],
    m[4] * p[0] + m[5] * p[1] + m[6] * p[2] + m[7],
    m[8] * p[0] + m[9] * p[1] + m[10] * p[2] + m[11],
  ];
}

// Columns of the result are v1, v2, v3: maps local x/y/z onto those axes.
function axify(v1, v2, v3) {
  // prettier-ignore
  return [
    v1[0], v2[0], v3[0], 0,
    v1[1], v2[1], v3[1], 0,
    v1[2], v2[2], v3[2], 0,
    0, 0, 0, 1,
  ];
}

// Dot of a matrix's translation column with a vector: where a sticker sits
// along an axis. This is what decides which layer a sticker belongs to.
function transDot(m, v) {
  return m[3] * v[0] + m[7] * v[1] + m[11] * v[2];
}

const TAU = Math.PI * 2;

/* ==========================================================================
 * Square-1 geometry (shared, immutable — every instance places the same
 * flat polygons, just keeps its own mutable placement matrices).
 * ========================================================================== */

const hsq3 = Math.sqrt(3) / 2;
const amp = 1.5; // overall size of the raw coordinates
const wg = 0.05; // gap between stickers
const ws = 0.6; // half-height of a top/bottom layer side
const w = 1 + hsq3; // distance from centre to a side face
const h = Math.sqrt(2) + Math.sqrt(6); // full height of the puzzle
const hh = h / 2;
const lof = (3 + Math.sqrt(3)) / 4; // offset of a corner's side sticker
const hm = hh - ws * 2; // half-height of the middle layer

// sp/lp: small (30 deg) and large (60 deg) wedges of the U and D faces.
const sp = [
  [0, 1 - wg * 2],
  [-0.5 + wg, -hsq3 + wg * hsq3],
  [0.5 - wg, -hsq3 + wg * hsq3],
];
const lp = [
  [1 - wg * 2, 1 - wg * 2],
  [-hsq3 + wg * hsq3, 0.5 - wg],
  [-hsq3 + wg * hsq3, -hsq3 + wg * hsq3],
  [0.5 - wg, -hsq3 + wg * hsq3],
];
// ss/ls: side faces of an edge and a corner in the U or D layer.
const ss = [
  [-0.5 + wg, ws - wg],
  [-0.5 + wg, -ws + wg],
  [0.5 - wg, -ws + wg],
  [0.5 - wg, ws - wg],
];
const ls = [
  [-(0.5 + hsq3) / 2 + wg, ws - wg],
  [-(0.5 + hsq3) / 2 + wg, -ws + wg],
  [(0.5 + hsq3) / 2 - wg, -ws + wg],
  [(0.5 + hsq3) / 2 - wg, ws - wg],
];
// mf/lm/sm: middle layer -- a full side, and the large/small halves of a side.
const mf = [
  [-w + wg, hm - wg],
  [-w + wg, -hm + wg],
  [w - wg, -hm + wg],
  [w - wg, hm - wg],
];
const lm = [
  [-(1.5 + hsq3) / 2 + wg, hm - wg],
  [-(1.5 + hsq3) / 2 + wg, -hm + wg],
  [(1.5 + hsq3) / 2 - wg, -hm + wg],
  [(1.5 + hsq3) / 2 - wg, hm - wg],
];
const sm = [
  [-(0.5 + hsq3) / 2 + wg, hm - wg],
  [-(0.5 + hsq3) / 2 + wg, -hm + wg],
  [(0.5 + hsq3) / 2 - wg, -hm + wg],
  [(0.5 + hsq3) / 2 - wg, hm - wg],
];

// One entry per colour group (U L F R B D). Each facelet is
// [polygon, x, y, z, quarterTurnsAboutTheFaceAxis].
const facelets = [
  [
    // U
    [sp, 0, -1, hh, 0],
    [lp, -1, -1, hh, 0],
    [sp, 0, -1, hh, 1],
    [lp, -1, -1, hh, 1],
    [sp, 0, -1, hh, 2],
    [lp, -1, -1, hh, 2],
    [sp, 0, -1, hh, 3],
    [lp, -1, -1, hh, 3],
  ],
  [
    // L
    [ss, 0, hh - ws, w, 0],
    [ls, lof, hh - ws, w, 0],
    [ls, -lof, hh - ws, w, 0],
    [ss, 0, hh - ws, w, 2],
    [ls, lof, hh - ws, w, 2],
    [ls, -lof, hh - ws, w, 2],
    [mf, 0, 0, w, 0],
  ],
  [
    // F
    [ss, 0, hh - ws, w, 0],
    [ls, lof, hh - ws, w, 0],
    [ls, -lof, hh - ws, w, 0],
    [ss, 0, hh - ws, w, 2],
    [ls, lof, hh - ws, w, 2],
    [ls, -lof, hh - ws, w, 2],
    [lm, lof - 0.5, 0, w, 0],
    [sm, -lof, 0, w, 0],
  ],
  [
    // R
    [ss, 0, hh - ws, w, 0],
    [ls, lof, hh - ws, w, 0],
    [ls, -lof, hh - ws, w, 0],
    [ss, 0, hh - ws, w, 2],
    [ls, lof, hh - ws, w, 2],
    [ls, -lof, hh - ws, w, 2],
    [mf, 0, 0, w, 0],
  ],
  [
    // B
    [ss, 0, hh - ws, w, 0],
    [ls, lof, hh - ws, w, 0],
    [ls, -lof, hh - ws, w, 0],
    [ss, 0, hh - ws, w, 2],
    [ls, lof, hh - ws, w, 2],
    [ls, -lof, hh - ws, w, 2],
    [lm, lof - 0.5, 0, w, 0],
    [sm, -lof, 0, w, 0],
  ],
  [
    // D
    [sp, 0, -1, hh, 0],
    [lp, -1, -1, hh, 0],
    [sp, 0, -1, hh, 1],
    [lp, -1, -1, hh, 1],
    [sp, 0, -1, hh, 2],
    [lp, -1, -1, hh, 2],
    [sp, 0, -1, hh, 3],
    [lp, -1, -1, hh, 3],
  ],
];

const xx = [1, 0, 0],
  yy = [0, 1, 0],
  zz = [0, 0, 1];
const xxi = [-1, 0, 0],
  yyi = [0, -1, 0],
  zzi = [0, 0, -1];

const indexSide = ["U", "L", "F", "R", "B", "D"];

// Axis each face's facelets are stepped around (the quarterTurns field).
const sidesRotAxis = { U: yyi, L: xx, F: zzi, R: xxi, B: zz, D: yy };

// Local frame of each face: local x/y span the sticker plane, local z is out.
const sidesUV = [
  axify(xx, zzi, yy), // U
  axify(zz, yy, xxi), // L
  axify(xx, yy, zz), // F
  axify(zzi, yy, xx), // R
  axify(xxi, yy, zzi), // B
  axify(xx, zz, yyi), // D
];

const faceColors = ["#ffff00", "#0000ff", "#ff0000", "#00ff00", "#ff8800", "#ffffff"];

// The solved placement of every sticker, in the order the colour groups are
// declared: step around the face, into the face's frame, then out to place.
function solvedMats() {
  const mats = [];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < facelets[i].length; j++) {
      const f = facelets[i][j];
      mats.push(
        mMul(mMul(mRot(sidesRotAxis[indexSide[i]], (TAU / 4) * f[4]), sidesUV[i]), mTrans(f[1] * amp, f[2] * amp, f[3] * amp)),
      );
    }
  }
  return mats;
}

const stickerPolys = (() => {
  const polys = [];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < facelets[i].length; j++) {
      const poly = facelets[i][j][0];
      const pts = poly.map((p) => [p[0] * amp, p[1] * amp]);
      polys.push({ face: i, pts });
    }
  }
  return polys;
})();

/* ==========================================================================
 * Moves. A move is [axis, power, min, max]:
 *   axis  -- index into axisList
 *   power -- twelfths of a turn
 *   min / max -- a sticker turns when its distance along the axis is strictly
 *                between them, so layers are recomputed from positions rather
 *                than stored.
 * ========================================================================== */

const axisList = [
  [Math.cos(TAU / 24), 0, Math.sin(TAU / 24)], // 0: the slice plane, tilted 15 deg
  yy, // 1: U
  yyi, // 2: D
  [Math.sin(TAU / 24), 0, -Math.cos(TAU / 24)], // 3: z
];

function selectLayer(mats, move) {
  const axis = axisList[move[0]];
  const sel = [];
  for (let i = 0; i < mats.length; i++) {
    const layer = transDot(mats[i], axis);
    if (layer > move[2] && layer < move[3]) sel.push(i);
  }
  return sel;
}

// The slice is blocked whenever a piece straddles the cut plane.
function isTwistable(mats) {
  const axis = axisList[0];
  for (let i = 0; i < mats.length; i++) {
    if (Math.abs(transDot(mats[i], axis)) < 0.01) return false;
  }
  return true;
}

function isSliceMove(move) {
  return move[0] === 0 && move[2] === 0;
}

function applyMoveToMats(mats, move) {
  if (isSliceMove(move) && !isTwistable(mats)) return false;
  const rot = mRot(axisList[move[0]], (-TAU / 12) * move[1]);
  const sel = selectLayer(mats, move);
  for (let i = 0; i < sel.length; i++) mats[sel[i]] = mMul(rot, mats[sel[i]]);
  return true;
}

// Whole-puzzle 180° rotations — the only rotation amount that's always
// well-defined for Square-1 regardless of its current (possibly non-cubic)
// shape. Same axes/keys as the original standalone page's T/N ("x2"), ;/A
// ("y2"), P/Q ("z2") bindings: axisList[0] is the slice-plane axis (reused
// here at full width, min/max -5/5, instead of the 0/5 the slice itself
// uses), axisList[1] is U, axisList[3] is the remaining perpendicular axis.
// cubing.js's real Square-1 KPuzzle has no rotation moves at all — verified
// directly, not assumed (see square1.js's own header note) — so unlike
// every other move here, these never reach scrambledPatternRef.applyAlg;
// useTrainer.js's applyMove special-cases them to animate on this canvas
// only. A 180° turn is its own inverse, so there's no separate "reverse"
// token to support.
const ROTATION_AXES = { x2: 0, y2: 1, z2: 3 };

// Parses this app's own Square-1 move tokens: "(u,d)", "/", and the
// rotations above (see square1.js's controls and square1EO.js's case
// algs) — same "(u,d)"/"/" regex as the original standalone page, which
// already matches this app's notation exactly (verified, not assumed).
export function parseSquare1Alg(alg) {
  const re = /(\/)|\((-?\d+), *(-?\d+)\)|(x2|y2|z2)/g;
  const ret = [];
  String(alg || "").replace(re, (m, p1, p2, p3, p4) => {
    if (p1) {
      ret.push([0, 6, 0, 5]);
    } else if (p4) {
      ret.push([ROTATION_AXES[p4], 6, -5, 5]);
    } else {
      const u = parseInt(p2, 10) || 0;
      const d = parseInt(p3, 10) || 0;
      if (u !== 0) ret.push([1, u, 1, 5]);
      if (d !== 0) ret.push([2, d, 1, 5]);
    }
    return m;
  });
  return ret;
}

/* ==========================================================================
 * Instance factory. Creates one independent, self-contained player bound to
 * one canvas — the app shows two at once (Practice + Reference), so nothing
 * here may be module-level mutable state.
 * ========================================================================== */

export function createSquare1Player(canvas) {
  const ctx = canvas.getContext("2d");

  let stickers = [];
  function buildStickers() {
    const mats = solvedMats();
    stickers = stickerPolys.map((p, i) => ({ face: p.face, pts: p.pts, base: mats[i] }));
  }
  buildStickers();

  function currentMats() {
    return stickers.map((s) => s.base);
  }

  // Camera.
  const scale = 0.15; // matches cstimer's scale * 0.5 / dimension
  const target = [0, -0.075, 0];
  const fov = (30 * Math.PI) / 180;
  let camTheta = 0,
    camPhi = 6; // in units of TAU/48, like cstimer
  const cullBackfaces = true;

  function cameraPos() {
    const z = 2 * Math.SQRT2 * Math.sin((camPhi * TAU) / 48);
    const xy = 2 * Math.SQRT2 * Math.cos((camPhi * TAU) / 48);
    return [xy * Math.sin((camTheta * TAU) / 48), z, xy * Math.cos((camTheta * TAU) / 48)];
  }
  function sub(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  }
  function cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function normalize(a) {
    const l = Math.hypot(a[0], a[1], a[2]) || 1;
    return [a[0] / l, a[1] / l, a[2] / l];
  }
  function viewMatrix() {
    const eye = cameraPos();
    const zAxis = normalize(sub(eye, target));
    const xAxis = normalize(cross([0, 1, 0], zAxis));
    const yAxis = cross(zAxis, xAxis);
    // prettier-ignore
    return [
      xAxis[0], xAxis[1], xAxis[2], -dot(xAxis, eye),
      yAxis[0], yAxis[1], yAxis[2], -dot(yAxis, eye),
      zAxis[0], zAxis[1], zAxis[2], -dot(zAxis, eye),
      0, 0, 0, 1,
    ];
  }

  // Logical (CSS-pixel) canvas size, tracked via ResizeObserver so the
  // internal drawing buffer stays crisp at any element size/DPR instead of
  // the fixed 460x460 the standalone page hardcoded.
  let logicalW = canvas.clientWidth || 300;
  let logicalH = canvas.clientHeight || 300;

  function resizeCanvasBuffer() {
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, Math.round(logicalW * dpr));
    const h = Math.max(1, Math.round(logicalH * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvasBuffer();

  let anim = null; // { move, selSet, start, dur, rot }

  function displayMatrix(index) {
    const s = stickers[index];
    if (anim && anim.selSet.has(index)) return mMul(anim.rot, s.base);
    return s.base;
  }

  function render() {
    const W = logicalW,
      H = logicalH;
    ctx.clearRect(0, 0, W, H);

    const viewScale = mMul(viewMatrix(), mScale(scale));
    const f = 1 / Math.tan(fov / 2);
    // Scaling X by W/2 and Y by H/2 independently would stretch the puzzle
    // whenever its container isn't square (e.g. squeezed by a flex layout
    // short on vertical room) — a single uniform scale from the smaller
    // dimension keeps it proportional, centered, and letterboxed instead.
    const half = Math.min(W, H) / 2;
    const polys = [];

    for (let i = 0; i < stickers.length; i++) {
      const m = mMul(viewScale, displayMatrix(i));

      // A sticker's local +z is its outward normal. In view space the camera
      // sits at the origin looking down -z, so a sticker faces us when its
      // normal leans back toward the origin.
      if (cullBackfaces && m[2] * m[3] + m[6] * m[7] + m[10] * m[11] > 0) continue;

      const pts = stickers[i].pts;
      const screen = [];
      let depth = 0;
      let ok = true;
      for (let j = 0; j < pts.length; j++) {
        const p = mApply(m, [pts[j][0], pts[j][1], 0]);
        const d = -p[2];
        if (d <= 0.001) {
          ok = false;
          break;
        }
        screen.push([W / 2 + (p[0] / d) * f * half, H / 2 - (p[1] / d) * f * half]);
        depth += d;
      }
      if (!ok) continue;
      polys.push({ screen, depth: depth / pts.length, color: faceColors[stickers[i].face] });
    }

    polys.sort((a, b) => b.depth - a.depth);

    ctx.lineJoin = "round";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";
    for (let k = 0; k < polys.length; k++) {
      const s = polys[k].screen;
      ctx.beginPath();
      ctx.moveTo(s[0][0], s[0][1]);
      for (let n = 1; n < s.length; n++) ctx.lineTo(s[n][0], s[n][1]);
      ctx.closePath();
      ctx.fillStyle = polys[k].color;
      ctx.fill();
      ctx.stroke();
    }
  }

  /* ------------------------------------------------------------------------
   * Move queue and animation.
   * ---------------------------------------------------------------------- */

  let queue = [];
  let rafId = null;
  let tempoScale = 1;

  function baseDuration(move) {
    // Same relative pacing as the standalone page's 90+25*|power| (ms at
    // tempoScale 1); tempoScale scales it down/up the same direction
    // useTrainer.js documents for <twisty-player> (higher = faster).
    return (90 + 25 * Math.abs(move[1])) / Math.max(0.05, tempoScale);
  }

  function finishAnim() {
    if (!anim) return;
    const move = anim.move;
    const rot = mRot(axisList[move[0]], (-TAU / 12) * move[1]);
    anim.selSet.forEach((i) => {
      stickers[i].base = mMul(rot, stickers[i].base);
    });
    anim = null;
  }

  function startNext() {
    anim = null;
    if (!queue.length) {
      render();
      return;
    }
    const move = queue.shift();
    const mats = currentMats();
    if (isSliceMove(move) && !isTwistable(mats)) {
      startNext();
      return;
    }
    const current = (anim = {
      move,
      selSet: new Set(selectLayer(mats, move)),
      start: performance.now(),
      dur: baseDuration(move),
      rot: mRot(axisList[move[0]], 0),
    });
    rafId = requestAnimationFrame((now) => step(now, current));
  }

  function step(now, current) {
    if (anim !== current) return;
    const t = Math.min(1, (now - current.start) / current.dur);
    const eased = t * t * (3 - 2 * t);
    current.rot = mRot(axisList[current.move[0]], (-TAU / 12) * current.move[1] * eased);
    render();
    if (t < 1) {
      rafId = requestAnimationFrame((next) => step(next, current));
      return;
    }
    finishAnim();
    startNext();
  }

  function addMoveAnimated(move) {
    finishAnim(); // snap whatever's in flight so fast input never trails
    queue.push(move);
    startNext();
  }

  function applyMovesInstant(moves) {
    const mats = currentMats();
    for (let j = 0; j < moves.length; j++) applyMoveToMats(mats, moves[j]);
    for (let k = 0; k < stickers.length; k++) stickers[k].base = mats[k];
    render();
  }

  function resetToSolved() {
    queue = [];
    anim = null;
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;
    buildStickers();
  }

  /* ------------------------------------------------------------------------
   * Camera drag-to-orbit.
   * ---------------------------------------------------------------------- */

  let drag = null;
  function pointer(e) {
    const t = e.touches ? e.touches[0] : e;
    return [t.clientX, t.clientY];
  }
  function startDrag(e) {
    e.preventDefault();
    drag = { at: pointer(e), theta: camTheta, phi: camPhi };
    canvas.classList.add("dragging");
  }
  function moveDrag(e) {
    if (!drag) return;
    const p = pointer(e);
    camTheta = drag.theta - (p[0] - drag.at[0]) * 0.08;
    camPhi = Math.max(-11, Math.min(11, drag.phi + (p[1] - drag.at[1]) * 0.08));
    render();
  }
  function endDrag() {
    drag = null;
    canvas.classList.remove("dragging");
  }
  canvas.addEventListener("mousedown", startDrag);
  canvas.addEventListener("touchstart", startDrag, { passive: false });
  window.addEventListener("mousemove", moveDrag);
  window.addEventListener("touchmove", moveDrag, { passive: false });
  window.addEventListener("mouseup", endDrag);
  window.addEventListener("touchend", endDrag);

  let resizeObserver = null;
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const box = entry.contentBoxSize?.[0];
      logicalW = box ? box.inlineSize : entry.contentRect.width;
      logicalH = box ? box.blockSize : entry.contentRect.height;
      resizeCanvasBuffer();
      render();
    });
    resizeObserver.observe(canvas);
  }

  render();

  /* ------------------------------------------------------------------------
   * The <twisty-player>-shaped API surface (see this module's header).
   * ---------------------------------------------------------------------- */

  return {
    get alg() {
      return this._algString || "";
    },
    set alg(value) {
      this._algString = value;
      this._parsedMoves = parseSquare1Alg(value);
    },
    set tempoScale(value) {
      tempoScale = Number(value) > 0 ? Number(value) : 1;
    },
    get tempoScale() {
      return tempoScale;
    },
    jumpToStart() {
      resetToSolved();
      render();
    },
    jumpToEnd() {
      resetToSolved();
      applyMovesInstant(this._parsedMoves || []);
    },
    play() {
      for (const move of this._parsedMoves || []) queue.push(move);
      startNext();
    },
    experimentalAddMove(token) {
      const moves = parseSquare1Alg(token);
      for (const move of moves) {
        addMoveAnimated(move);
        (this._parsedMoves || (this._parsedMoves = [])).push(move);
      }
      this._algString = [this._algString, token].filter(Boolean).join(" ");
    },
    destroy() {
      resetToSolved();
      canvas.removeEventListener("mousedown", startDrag);
      canvas.removeEventListener("touchstart", startDrag);
      window.removeEventListener("mousemove", moveDrag);
      window.removeEventListener("touchmove", moveDrag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchend", endDrag);
      if (resizeObserver) resizeObserver.disconnect();
    },
  };
}
