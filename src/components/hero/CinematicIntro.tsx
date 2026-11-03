"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, Volume2, VolumeX, Calendar, Flame } from "lucide-react";
import { playBurstSound } from "@/lib/fireworks-dispatcher";

interface CinematicIntroProps {
  onComplete?: () => void;
}

// Vibrant traditional color palettes for realistic Diwali fireworks (NO romantic/heart themes)
const INTRO_PALETTES = {
  gold: ["#FFD700", "#FFB000", "#FFF0A0", "#FFA500", "#FFFDF0"],
  red: ["#FF204E", "#FF3366", "#FF1744", "#D50000", "#FF8597"],
  blue: ["#00D4FF", "#38BDF8", "#00B4D8", "#2563EB", "#90E0EF"],
  pink: ["#FF3E9D", "#F72585", "#FF69B4", "#FF1493", "#FFA6D5"],
  purple: ["#A855F7", "#7C3AED", "#9333EA", "#C084FC", "#D8B4FE"],
};

// Reusable pooled Particle for explosion sparks (zero runtime allocations for 60 FPS)
class IntroParticle {
  active = false;
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  color = "#FFD700";
  size = 2;
  alpha = 1;
  decay = 0.016;
  drag = 0.96;
  gravity = 0.055;
  flicker = false;
  trail: { x: number; y: number }[] = [];
  maxTrail = 4;

  init(
    x: number,
    y: number,
    vx: number,
    vy: number,
    color: string,
    size: number,
    decay: number,
    drag = 0.96,
    gravity = 0.055,
    flicker = false,
    maxTrail = 4
  ) {
    this.active = true;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.alpha = 1;
    this.decay = decay;
    this.drag = drag;
    this.gravity = gravity;
    this.flicker = flicker;
    this.trail = [];
    this.maxTrail = maxTrail;
  }
}

// Reusable pooled Sky Flash for subtle glowing illumination of the night sky
class IntroFlash {
  active = false;
  x = 0;
  y = 0;
  radius = 320;
  color = "255, 215, 0";
  alpha = 0.22;
  decay = 0.035;

  init(x: number, y: number, colorRgb = "255, 215, 0", radius = 350) {
    this.active = true;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = colorRgb;
    this.alpha = 0.22;
    this.decay = 0.035;
  }
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  // Ultra-Fast Timeline Stages (Maximum 2.5 seconds total):
  // Stage 0 (0.0s - 0.3s): Midnight navy background appears with subtle golden glowing particles
  // Stage 1 (0.3s - 0.8s): PATTAS'26 logo smoothly zooms in with a golden glow
  // Stage 2 (0.8s - 1.3s): Realistic fireworks explode behind the logo
  // Stage 3 (1.3s - 1.7s): Diya flame illuminates with realistic flickering
  // Stage 4 (1.7s - 2.1s): Festival tagline and event date reveal
  // Stage 5 (2.1s - 2.5s): ENTER THE FESTIVAL button appears
  // Auto-enter (2.5s): Automatically enters the main website smoothly
  const [stage, setStage] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const soundRef = useRef(false);
  const isHoveringButtonRef = useRef(false);

  // Floating background ambient embers (Stage 0: 0.0s - 0.3s)
  const embers = useRef(
    Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1.2,
      duration: Math.random() * 3.5 + 2.5,
      delay: Math.random() * 1.5,
    }))
  ).current;

  useEffect(() => {
    soundRef.current = soundEnabled;
  }, [soundEnabled]);

  // Handle Enter The Festival (< 300ms GPU-accelerated smooth transition)
  const handleEnter = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    sessionStorage.setItem("pattas26_intro_seen", "true");

    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 280);
  }, [isExiting, onComplete]);

  // Handle Skip Intro (Instant < 200ms smooth transition)
  const handleSkip = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    sessionStorage.setItem("pattas26_intro_seen", "true");

    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 180);
  }, [isExiting, onComplete]);

  // Fast Navigation & Progressive 2.5-Second Timeline Setup
  useEffect(() => {
    // Check if user already saw the intro during this session or prefers reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasSeenIntro =
      typeof window !== "undefined" &&
      sessionStorage.getItem("pattas26_intro_seen") === "true" &&
      !window.location.search.includes("intro=true");

    if (prefersReducedMotion || hasSeenIntro) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Exact required timeline:
    // 0.3s: PATTAS'26 logo zooms in with golden glow
    const t1 = setTimeout(() => setStage(1), 300);
    // 0.8s: Realistic fireworks explode behind the logo
    const t2 = setTimeout(() => setStage(2), 800);
    // 1.3s: Diya flame illuminates with realistic flickering
    const t3 = setTimeout(() => setStage(3), 1300);
    // 1.7s: Festival tagline and event date reveal
    const t4 = setTimeout(() => setStage(4), 1700);
    // 2.1s: ENTER THE FESTIVAL button appears
    const t5 = setTimeout(() => setStage(5), 2100);

    // 2.5s: Automatically enter the main website smoothly
    const tAuto = setTimeout(() => {
      // If user is actively hovering the button right at 2.5s, give a brief moment to click
      if (isHoveringButtonRef.current) {
        const tGrace = setTimeout(() => {
          handleEnter();
        }, 1200);
        return () => clearTimeout(tGrace);
      }
      handleEnter();
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(tAuto);
    };
  }, [onComplete, handleEnter]);

  // High-Performance Lightweight Canvas Fireworks Simulation (Target 60 FPS)
  useEffect(() => {
    if (!isVisible || isExiting) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isTabVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const poolSize = isMobile ? 180 : 360;

    const particlePool: IntroParticle[] = Array.from(
      { length: poolSize },
      () => new IntroParticle()
    );
    const skyFlashes: IntroFlash[] = Array.from({ length: 6 }, () => new IntroFlash());

    const hexToRgb = (hex: string): string => {
      let c = hex.replace("#", "");
      if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
      const num = parseInt(c, 16);
      return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Create realistic aerial explosion
    const createExplosion = (
      x: number,
      y: number,
      pattern: "chrysanthemum" | "willow" | "spherical" | "peony",
      palette: string[],
      count = 65
    ) => {
      if (soundRef.current) {
        playBurstSound(pattern === "willow" ? "crackle" : "chrysanthemum");
      }

      const dominantColor = palette[Math.floor(Math.random() * palette.length)] || "#FFD700";

      // Subtle ambient sky flash
      if (!isMobile) {
        const flash = skyFlashes.find((f) => !f.active);
        if (flash) flash.init(x, y, hexToRgb(dominantColor), 320);
      }

      let spawned = 0;
      const targetCount = isMobile ? Math.floor(count * 0.55) : count;

      for (let i = 0; i < particlePool.length && spawned < targetCount; i++) {
        const p = particlePool[i];
        if (p.active) continue;

        const color =
          pattern === "willow"
            ? INTRO_PALETTES.gold[Math.floor(Math.random() * INTRO_PALETTES.gold.length)]
            : Math.random() < 0.75
            ? dominantColor
            : palette[Math.floor(Math.random() * palette.length)];

        let vx = 0;
        let vy = 0;
        let drag = 0.96;
        let gravity = 0.052;
        let decay = Math.random() * 0.014 + 0.016;
        const size = Math.random() * 2.0 + 1.2;
        let flicker = false;
        let maxTrail = isMobile ? 3 : 5;

        if (pattern === "chrysanthemum") {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6.2 + 1.8;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
          drag = 0.962;
          flicker = Math.random() > 0.45;
        } else if (pattern === "willow") {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 4.2 + 1.0;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed * 0.7 - 0.4;
          drag = 0.974;
          gravity = 0.046;
          decay = 0.011;
          flicker = true;
          maxTrail = isMobile ? 4 : 6;
        } else {
          // Peony / spherical
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5.6 + 1.6;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
          drag = 0.955;
          decay = 0.018;
        }

        p.init(x, y, vx, vy, color, size, decay, drag, gravity, flicker, maxTrail);
        spawned++;
      }
    };

    // Stage 2 Choreographed Fireworks (0.8s - 1.3s)
    let hasExplodedStage2 = false;

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isTabVisible) return;

      // 1. Destination-out background fade
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, width, height);

      // 2. Render Sky Flashes
      if (!isMobile) {
        ctx.globalCompositeOperation = "source-over";
        for (let i = 0; i < skyFlashes.length; i++) {
          const f = skyFlashes[i];
          if (!f.active) continue;

          const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
          grad.addColorStop(0, `rgba(${f.color}, ${f.alpha})`);
          grad.addColorStop(0.5, `rgba(${f.color}, ${f.alpha * 0.3})`);
          grad.addColorStop(1, "rgba(7, 19, 41, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          ctx.fill();

          f.alpha -= f.decay;
          if (f.alpha <= 0) f.active = false;
        }
      }

      // 3. Additive Blending for Sparkling Fireworks
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particlePool.length; i++) {
        const p = particlePool[i];
        if (!p.active) continue;

        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > p.maxTrail) p.trail.shift();

        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          p.active = false;
          continue;
        }

        // Motion trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let j = 1; j < p.trail.length; j++) {
            ctx.lineTo(p.trail[j].x, p.trail[j].y);
          }
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha * 0.4);
          ctx.lineWidth = p.size * 0.75;
          ctx.stroke();
        }

        // Particle core
        ctx.beginPath();
        const displayAlpha = p.flicker && Math.random() > 0.4 ? p.alpha * 0.35 : p.alpha;
        ctx.globalAlpha = Math.max(0, Math.min(1, displayAlpha));
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;

      // Stage 2 Explosion Trigger: exactly 0.8s - 1.3s behind the logo
      if (stage >= 2 && !hasExplodedStage2) {
        hasExplodedStage2 = true;

        // Immediate left & right bursts behind logo (0.8s)
        createExplosion(width * 0.26, height * 0.30, "peony", INTRO_PALETTES.red, 65);
        createExplosion(width * 0.74, height * 0.28, "peony", INTRO_PALETTES.blue, 65);

        // Center golden willow burst (0.95s)
        setTimeout(() => {
          createExplosion(width * 0.50, height * 0.20, "willow", INTRO_PALETTES.gold, 80);
        }, 150);

        // Secondary festive bursts (1.15s)
        setTimeout(() => {
          createExplosion(width * 0.38, height * 0.24, "chrysanthemum", INTRO_PALETTES.pink, 55);
          createExplosion(width * 0.62, height * 0.22, "chrysanthemum", INTRO_PALETTES.purple, 55);
        }, 350);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isVisible, isExiting, stage]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-fest-midnight overflow-hidden select-none will-change-transform transition-all duration-300 ease-out ${
        isExiting ? "opacity-0 scale-102 pointer-events-none blur-[1px]" : "opacity-100 scale-100"
      }`}
    >
      {/* 1. Deep Midnight Navy Background (0.0s - 0.3s) with Radial Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-[#0d1b3e] via-[#071329] to-[#030814] pointer-events-none" />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-fest-gold/10 blur-[110px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-fest-magenta/15 blur-[120px] pointer-events-none animate-pulse delay-500" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#180a33]/35 blur-[140px] pointer-events-none" />

      {/* 2. Realistic Fireworks Canvas (Behind Logo and Content at z-10) */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* 3. Stage 0 (0.0s - 0.3s): Floating Golden Ember Particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {embers.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-fest-gold animate-float"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: `0 0 ${p.size * 3}px #FFBD35`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              opacity: 0.65,
            }}
          />
        ))}
      </div>

      {/* Top Header Controls: Sound Toggle (Left) & Skip Intro (Right) */}
      <div className="absolute top-4 inset-x-5 z-40 flex items-center justify-between pointer-events-auto">
        {/* Sound Toggle Button */}
        <button
          onClick={() => setSoundEnabled((prev) => !prev)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-fest-gold/30 hover:border-fest-gold text-fest-cream/80 hover:text-fest-gold text-xs font-semibold tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title={soundEnabled ? "Mute Intro Audio" : "Enable Festive Audio"}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-fest-brightGold animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] text-fest-brightGold">Audio On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-fest-cream/60" />
              <span className="font-mono text-[10px] sm:text-[11px] text-fest-cream/70">Audio Off</span>
            </>
          )}
        </button>

        {/* Skip Intro Button */}
        <button
          onClick={handleSkip}
          className="group inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full glass-panel border border-fest-gold/40 hover:border-fest-gold text-fest-cream/90 hover:text-fest-brightGold text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-gold-sm cursor-pointer"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5 text-fest-gold group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 4. Main Focal Content Container (z-20 in front of fireworks) */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl mx-auto space-y-4 sm:space-y-5">
        {/* College Header Badge (Stage 1: 0.3s) */}
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-fest-gold/40 text-fest-brightGold text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-gold-sm transition-all duration-400 ease-out transform ${
            stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-fest-gold animate-ping" />
          <span>M. Kumarasamy College of Engineering • Karur</span>
        </div>

        {/* Stage 1 (0.3s - 0.8s): 3D PATTAS'26 Logo Smooth Zoom-In with Golden Glow */}
        <div
          className={`relative transition-all duration-500 ease-out transform ${
            stage >= 1
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-80 translate-y-4 pointer-events-none"
          }`}
        >
          {/* Ambient Radiant Glow behind Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[480px] h-[140px] sm:h-[190px] bg-gradient-to-r from-fest-gold/40 via-fest-orange/30 to-fest-magenta/25 blur-3xl rounded-full pointer-events-none animate-pulse" />

          {/* Master 3D Logo */}
          <div className="relative max-w-[270px] sm:max-w-md md:max-w-lg mx-auto py-1 group">
            <Image
              src="/assets/brand/pattas26-logo.png"
              alt="PATTAS'26 Official 3D Festival Logo"
              width={540}
              height={220}
              className="w-full h-auto object-contain filter drop-shadow-[0_0_35px_rgba(255,189,53,0.8)] hover:scale-102 transition-transform duration-300"
              priority
            />

            {/* Subtle Light Reflection Sheen Sweep across Logo */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none rounded-2xl" />
          </div>
        </div>

        {/* Stage 3 (1.3s - 1.7s): Realistic 3D Diya Flame Animation */}
        <div
          className={`transition-all duration-400 ease-out flex flex-col items-center justify-center transform ${
            stage >= 3 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-3 pointer-events-none"
          }`}
        >
          <div className="relative flex flex-col items-center">
            {/* Ambient Warm Flame Bloom */}
            <div className="absolute -inset-6 rounded-full bg-radial-gradient from-fest-gold/55 via-fest-orange/30 to-transparent blur-xl animate-pulse pointer-events-none" />

            {/* Flickering Teardrop Flame */}
            <div className="relative w-6 h-9 mb-0.5 flex items-center justify-center">
              {/* Outer Golden/Orange Flame */}
              <div className="w-5 h-8 rounded-[50%_50%_40%_40%/60%_60%_40%_40%] bg-gradient-to-t from-fest-orange via-fest-gold to-white shadow-diya-glow animate-flicker" />
              {/* Inner Blue Base of Flame */}
              <div className="absolute bottom-0.5 w-2 h-2.5 rounded-full bg-blue-400/90 blur-[0.8px]" />
              {/* Incandescent Sparkle Core */}
              <div className="absolute top-1.5 w-1 h-2 rounded-full bg-white blur-[0.4px] opacity-95" />
            </div>

            {/* Brass / Terracotta Vessel */}
            <div className="w-16 sm:w-20 h-5 sm:h-6 rounded-b-[35px] bg-gradient-to-b from-[#c45318] via-[#752405] to-[#3a1002] border-t-2 border-fest-brightGold shadow-md" />
          </div>
        </div>

        {/* Stage 4 (1.7s - 2.1s): Festival Tagline & Event Date Reveal */}
        <div
          className={`space-y-2.5 transition-all duration-400 ease-out transform ${
            stage >= 4
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          {/* Festival Tagline */}
          <p className="font-serif text-sm sm:text-xl text-fest-cream/95 italic font-light tracking-wide text-gold-glow max-w-xl mx-auto drop-shadow-sm">
            “ Celebrating Light, Tradition &amp; Togetherness ”
          </p>

          {/* Animated Date & Semester Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-[10px] sm:text-xs text-fest-gold/90 tracking-widest pt-0.5">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-fest-royal/70 border border-fest-gold/30">
              <Calendar className="w-3.5 h-3.5 text-fest-orange" />
              <span>04 NOVEMBER 2026</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-fest-maroon/70 border border-fest-gold/30">
              <Flame className="w-3.5 h-3.5 text-fest-gold" />
              <span>ODD SEMESTER (2026–2027)</span>
            </span>
          </div>
        </div>

        {/* Stage 5 (2.1s - 2.5s): Animated ENTER THE FESTIVAL Button */}
        <div
          className={`pt-1 transition-all duration-400 ease-out transform ${
            stage >= 5
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-90 pointer-events-none"
          }`}
          onMouseEnter={() => {
            isHoveringButtonRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveringButtonRef.current = false;
          }}
        >
          <button
            onClick={handleEnter}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest bg-gradient-to-r from-fest-gold via-fest-brightGold to-fest-orange text-fest-midnight shadow-gold-lg hover:scale-105 active:scale-95 transition-all overflow-hidden border-2 border-fest-brightGold cursor-pointer"
          >
            {/* Animated Sparkle Icon */}
            <Sparkles className="w-4 h-4 fill-fest-midnight text-fest-midnight animate-spin-slow group-hover:rotate-45 transition-transform" />

            <span className="relative z-10 font-sans tracking-widest font-black">
              Enter The Festival
            </span>

            <ArrowRight className="w-4 h-4 text-fest-midnight group-hover:translate-x-1.5 transition-transform" />

            {/* Moving light reflection effect across button */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
          </button>
        </div>
      </div>

      {/* Subtle Bottom Ambient Caption */}
      <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center text-[9px] sm:text-[10px] font-mono text-fest-cream/50 tracking-widest uppercase pointer-events-none">
        <span>Agastya Fine Arts Club • PATTAS’26 Grand Diwali Gala</span>
      </div>
    </div>
  );
}
