import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createSquare1Player } from "../../lib/square1Renderer";

// Drop-in replacement for <twisty-player> used only for Square-1 (see
// square1Renderer.js's header for why). Exposes the player object created by
// createSquare1Player via the forwarded ref, so existing call sites in
// useTrainer.js (practicePlayerRef.current.alg = ..., etc.) work unchanged
// whether they're holding a <twisty-player> or this canvas's player object.
const Square1Canvas = forwardRef(function Square1Canvas({ className }, ref) {
  const canvasRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const player = createSquare1Player(canvas);
    playerRef.current = player;
    return () => {
      player.destroy();
      playerRef.current = null;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    get alg() {
      return playerRef.current?.alg ?? "";
    },
    set alg(value) {
      if (playerRef.current) playerRef.current.alg = value;
    },
    get tempoScale() {
      return playerRef.current?.tempoScale ?? 1;
    },
    set tempoScale(value) {
      if (playerRef.current) playerRef.current.tempoScale = value;
    },
    jumpToStart() {
      playerRef.current?.jumpToStart();
    },
    jumpToEnd() {
      playerRef.current?.jumpToEnd();
    },
    play() {
      playerRef.current?.play();
    },
    experimentalAddMove(move) {
      playerRef.current?.experimentalAddMove(move);
    },
  }));

  return <canvas ref={canvasRef} className={className} />;
});

export default Square1Canvas;
