"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Volume2, VolumeX } from "lucide-react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  trail: { x: number; y: number }[];
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  trail: { x: number; y: number }[];
  pattern: "sphere" | "ring" | "willow" | "star";
}

export default function InteractiveFireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const soundEnabledRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const triggerCrackerAudio = (isLaunch = false) => {
      if (!soundEnabledRef.current) return;
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        const aCtx = audioCtxRef.current;
        if (aCtx.state === "suspended") aCtx.resume();

        if (isLaunch) {
          const osc = aCtx.createOscillator();
          const gain = aCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(450, aCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1600, aCtx.currentTime + 0.35);
          gain.gain.setValueAtTime(0.08, aCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, aCtx.currentTime + 0.35);
          osc.connect(gain);
          gain.connect(aCtx.destination);
          osc.start();
          osc.stop(aCtx.currentTime + 0.36);
        } else {
          const bufferSize = aCtx.sampleRate * 0.4;
          const buffer = aCtx.createBuffer(1, bufferSize, aCtx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (aCtx.sampleRate * 0.08));
          }
          const noise = aCtx.createBufferSource();
          noise.buffer = buffer;
          const filter = aCtx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(800, aCtx.currentTime);
          filter.frequency.linearRampToValueAtTime(200, aCtx.currentTime + 0.3);

          const gain = aCtx.createGain();
          gain.gain.setValueAtTime(0.3, aCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, aCtx.currentTime + 0.35);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(aCtx.destination);
          noise.start();
        }
      } catch {}
    };

    const colors = [
      "#FFBD35", // Festival Gold
      "#FFD76A", // Bright Gold
      "#E82C91", // Magenta
      "#00B4D8", // Royal Sky Cyan
      "#FF7518", // Orange
      "#FFF3D8", // Cream
      "#7000FF", // Violet
    ];

    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];

    const createExplosion = (x: number, y: number, color: string, pattern: Rocket["pattern"]) => {
      triggerCrackerAudio(false);
      const sparkCount = pattern === "willow" ? 140 : 90;

      for (let i = 0; i < sparkCount; i++) {
        let vx = 0;
        let vy = 0;
        const angle = (Math.PI * 2 * i) / sparkCount;
        const speed = pattern === "willow" ? Math.random() * 3 + 1 : Math.random() * 5 + 1.5;

        if (pattern === "ring") {
          vx = Math.cos(angle) * (speed * 0.8 + 2);
          vy = Math.sin(angle) * (speed * 0.8 + 2);
        } else if (pattern === "star") {
          const r = (i % 5 === 0 ? 1.8 : 0.8) * speed;
          vx = Math.cos(angle) * r;
          vy = Math.sin(angle) * r;
        } else {
          const randAngle = Math.random() * Math.PI * 2;
          const randSpeed = Math.random() * speed;
          vx = Math.cos(randAngle) * randSpeed;
          vy = Math.sin(randAngle) * randSpeed;
        }

        sparks.push({
          x,
          y,
          vx,
          vy,
          alpha: 1,
          color,
          size: Math.random() * 2.5 + 1.2,
          decay: pattern === "willow" ? 0.009 : 0.016,
          trail: [],
        });
      }
    };

    const launchRocket = (startX: number, targetY: number) => {
      triggerCrackerAudio(true);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const patterns: Rocket["pattern"][] = ["sphere", "ring", "willow", "star"];
      const pattern = patterns[Math.floor(Math.random() * patterns.length)];

      rockets.push({
        x: startX,
        y: height,
        targetY: targetY,
        vy: -(Math.random() * 3 + 9),
        color,
        trail: [],
        pattern,
      });
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a") || target.closest("input")) return;
      launchRocket(e.clientX, e.clientY);
    };

    window.addEventListener("click", handleCanvasClick);

    let autoTimer = 0;
    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      autoTimer++;
      if (autoTimer > 180) {
        autoTimer = 0;
        const rx = Math.random() * (width * 0.8) + width * 0.1;
        const ry = Math.random() * (height * 0.4) + height * 0.15;
        launchRocket(rx, ry);
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 6) r.trail.shift();

        r.y += r.vy;

        ctx.beginPath();
        for (let t = 0; t < r.trail.length; t++) {
          ctx.lineTo(r.trail[t].x, r.trail[t].y);
        }
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        if (r.y <= r.targetY || r.vy >= 0) {
          createExplosion(r.x, r.y, r.color, r.pattern);
          rockets.splice(i, 1);
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 4) s.trail.shift();

        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05;
        s.vx *= 0.985;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        for (let t = 0; t < s.trail.length; t++) {
          ctx.lineTo(s.trail[t].x, s.trail[t].y);
        }
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = s.alpha * 0.4;
        ctx.lineWidth = s.size * 0.6;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleCanvasClick);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10 w-full h-full"
        aria-hidden="true"
      />

      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2">
        <div className="glass-panel px-3 py-1.5 rounded-full border border-fest-gold/30 flex items-center gap-2 text-[11px] text-fest-cream/80 shadow-gold-sm">
          <Sparkles className="w-3.5 h-3.5 text-fest-gold animate-spin-slow" />
          <span>Click anywhere to launch fireworks!</span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="ml-1 p-1 rounded-full hover:bg-white/10 text-fest-gold"
            title={soundEnabled ? "Disable Firework Sound FX" : "Enable Firework Sound FX"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-fest-brightGold" /> : <VolumeX className="w-3.5 h-3.5 text-white/50" />}
          </button>
        </div>
      </div>
    </>
  );
}
