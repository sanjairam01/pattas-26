"use client";

import { useRef, useState, useEffect } from "react";
import { Download, RotateCcw, Palette, Sparkles, Trash2, Check } from "lucide-react";
import { triggerCelebration } from "@/lib/fireworks-dispatcher";

export default function RangoliCreator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [symmetry, setSymmetry] = useState<number>(8); // 8-fold or 12-fold
  const [color, setColor] = useState<string>("#FFBD35");
  const [brushSize, setBrushSize] = useState<number>(4);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  const palette = [
    { name: "Festival Gold", hex: "#FFBD35" },
    { name: "Kumkum Red", hex: "#D90429" },
    { name: "Haldi Yellow", hex: "#FFD166" },
    { name: "Peacock Blue", hex: "#00B4D8" },
    { name: "Marigold Orange", hex: "#FF7518" },
    { name: "Gulal Magenta", hex: "#E82C91" },
    { name: "White Kolam", hex: "#FFFFFF" },
    { name: "Emerald Green", hex: "#06D6A0" },
  ];

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = Math.min(canvas.parentElement?.clientWidth || 500, 520);
    canvas.width = size;
    canvas.height = size;

    // Draw dark navy backdrop with subtle concentric guidelines
    ctx.fillStyle = "#071329";
    ctx.fillRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    ctx.strokeStyle = "rgba(255, 189, 53, 0.12)";
    ctx.lineWidth = 1;

    [size * 0.15, size * 0.28, size * 0.42].forEach((r) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    for (let i = 0; i < symmetry; i++) {
      const angle = (Math.PI * 2 * i) / symmetry;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * (size / 2), cy + Math.sin(angle) * (size / 2));
      ctx.stroke();
    }

    setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  }, [symmetry]);

  const drawBackground = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.fillStyle = "#071329";
    ctx.fillRect(0, 0, size, size);

    // Subtle guidelines
    const cx = size / 2;
    const cy = size / 2;
    ctx.strokeStyle = "rgba(255, 189, 53, 0.12)";
    ctx.lineWidth = 1;

    // Concentric guide circles
    [size * 0.15, size * 0.28, size * 0.42].forEach((r) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Radial axis guide lines
    for (let i = 0; i < symmetry; i++) {
      const angle = (Math.PI * 2 * i) / symmetry;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * (size / 2), cy + Math.sin(angle) * (size / 2));
      ctx.stroke();
    }
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setHistory((prev) => [...prev.slice(-10), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  };

  const undo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // Remove current state
    const previous = newHistory[newHistory.length - 1];
    ctx.putImageData(previous, 0, 0);
    setHistory(newHistory);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawBackground(ctx, canvas.width);
    saveState();
  };

  // Draw symmetric points in all sectors
  const drawSymmetricLine = (x0: number, y0: number, x1: number, y1: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const relX0 = x0 - cx;
    const relY0 = y0 - cy;
    const relX1 = x1 - cx;
    const relY1 = y1 - cy;

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let i = 0; i < symmetry; i++) {
      const angle = (Math.PI * 2 * i) / symmetry;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // Normal rotation
      const rx0 = relX0 * cos - relY0 * sin + cx;
      const ry0 = relX0 * sin + relY0 * cos + cy;
      const rx1 = relX1 * cos - relY1 * sin + cx;
      const ry1 = relX1 * sin + relY1 * cos + cy;

      ctx.beginPath();
      ctx.moveTo(rx0, ry0);
      ctx.lineTo(rx1, ry1);
      ctx.stroke();

      // Mirror reflection
      const mx0 = relX0 * cos - -relY0 * sin + cx;
      const my0 = relX0 * sin + -relY0 * cos + cy;
      const mx1 = relX1 * cos - -relY1 * sin + cx;
      const my1 = relX1 * sin + -relY1 * cos + cy;

      ctx.beginPath();
      ctx.moveTo(mx0, my0);
      ctx.lineTo(mx1, my1);
      ctx.stroke();
    }
  };

  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    lastPos.current = { x: clientX - rect.left, y: clientY - rect.top };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPos.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const currentX = clientX - rect.left;
    const currentY = clientY - rect.top;

    drawSymmetricLine(lastPos.current.x, lastPos.current.y, currentX, currentY);
    lastPos.current = { x: currentX, y: currentY };
  };

  const endDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      lastPos.current = null;
      saveState();
    }
  };

  const downloadRangoli = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `PATTAS26-Rangoli-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    // Trigger celebratory colorful firework burst
    triggerCelebration("medium", "diwali");
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-fest-gold/30 shadow-gold-sm">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-fest-gold/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-royal/60 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-fest-gold" />
            <span>Interactive Rangoli Studio</span>
          </div>
          <h3 className="font-serif font-black text-2xl sm:text-3xl text-gold-gradient">
            Design Your Festive Kolam / Rangoli
          </h3>
          <p className="text-xs sm:text-sm text-fest-cream/75 max-w-lg mt-1">
            Draw in any sector and watch sacred symmetric geometry duplicate in 8-fold or 12-fold harmony!
          </p>
        </div>

        {/* Symmetry Selector */}
        <div className="flex items-center gap-2 bg-fest-midnight/80 p-1.5 rounded-full border border-fest-gold/30">
          <button
            onClick={() => setSymmetry(8)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              symmetry === 8 ? "bg-fest-gold text-fest-midnight shadow-sm" : "text-fest-cream/70 hover:text-white"
            }`}
          >
            8-Fold Mandala
          </button>
          <button
            onClick={() => setSymmetry(12)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              symmetry === 12 ? "bg-fest-gold text-fest-midnight shadow-sm" : "text-fest-cream/70 hover:text-white"
            }`}
          >
            12-Fold Radial
          </button>
        </div>
      </div>

      {/* Main Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
        {/* Color Palette & Tools (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-fest-brightGold flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-fest-gold" />
              <span>Festive Powder Colors</span>
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {palette.map((p) => (
                <button
                  key={p.hex}
                  onClick={() => setColor(p.hex)}
                  title={p.name}
                  className={`w-full aspect-square rounded-xl flex items-center justify-center transition-transform hover:scale-110 relative border-2 ${
                    color === p.hex ? "border-white scale-105 shadow-md" : "border-black/40"
                  }`}
                  style={{ backgroundColor: p.hex }}
                >
                  {color === p.hex && (
                    <Check
                      className={`w-4 h-4 ${p.hex === "#FFFFFF" || p.hex === "#FFD166" ? "text-black" : "text-white"}`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-fest-cream/80 flex items-center justify-between mb-2">
              <span>Powder Flow Width</span>
              <span className="text-fest-gold font-mono">{brushSize}px</span>
            </label>
            <input
              type="range"
              min="2"
              max="14"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
              className="w-full accent-fest-gold cursor-pointer"
            />
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={undo}
              disabled={history.length <= 1}
              className="btn-glass-gold w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Undo Stroke</span>
            </button>

            <button
              onClick={clearCanvas}
              className="w-full py-2.5 rounded-full text-xs font-semibold text-rose-300 hover:text-rose-200 hover:bg-rose-950/30 border border-rose-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Canvas</span>
            </button>

            <button
              onClick={downloadRangoli}
              className="btn-gold w-full py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Rangoli Art</span>
            </button>
          </div>
        </div>

        {/* Interactive Canvas (8 cols) */}
        <div className="lg:col-span-8 flex justify-center">
          <div className="relative p-2.5 rounded-3xl bg-fest-midnight border-2 border-fest-gold/60 shadow-gold-md max-w-full">
            <canvas
              ref={canvasRef}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={endDraw}
              className="rounded-2xl cursor-crosshair touch-none max-w-full h-auto block"
              aria-label="Rangoli Drawing Canvas"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
