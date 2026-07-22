"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import DeleteSweepRounded from "@mui/icons-material/DeleteSweepRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRounded from "@mui/icons-material/VisibilityOffRounded";

type Letter = { id: string; name: string; arabic: string; audio: string };

const SIZE = 420;

export default function LetterTraceCanvas({ letter }: { letter: Letter }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [showGuide, setShowGuide] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);

  function drawGuide(ctx: CanvasRenderingContext2D) {
    if (!showGuide) return;
    ctx.save();
    ctx.font = "280px 'Amiri', 'Scheherazade New', serif";
    ctx.fillStyle = "rgba(23,79,71,0.16)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter.arabic, SIZE / 2, SIZE / 2 + 20);
    ctx.restore();
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, SIZE, SIZE);
    drawGuide(ctx);
    setHasDrawn(false);
  }

  useEffect(() => {
    clearCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter.id, showGuide]);

  function getPoint(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = SIZE / rect.width;
    const scaleY = SIZE / rect.height;
    return { x: (event.clientX - rect.left) * scaleX, y: (event.clientY - rect.top) * scaleY };
  }

  function start(event: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    drawing.current = true;
    const { x, y } = getPoint(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setHasDrawn(true);
  }

  function move(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPoint(event);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 14;
    ctx.strokeStyle = "#c26732";
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function end() {
    drawing.current = false;
  }

  return (
    <div>
      <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-emerald-900/10">
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className="aspect-square w-full touch-none"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <Button onClick={clearCanvas} startIcon={<DeleteSweepRounded />} variant="outlined" sx={{ borderRadius: 3, borderColor: "#174f47", color: "#174f47", fontWeight: 700 }}>
            Temizle
          </Button>
          <Button
            onClick={() => setShowGuide((v) => !v)}
            startIcon={showGuide ? <VisibilityOffRounded /> : <VisibilityRounded />}
            variant="outlined"
            sx={{ borderRadius: 3, borderColor: "#174f47", color: "#174f47", fontWeight: 700 }}
          >
            {showGuide ? "Rehberi gizle" : "Rehberi göster"}
          </Button>
        </div>
        {hasDrawn && <span className="text-sm font-bold text-emerald-700">Güzel, devam et ✍️</span>}
      </div>
    </div>
  );
}
