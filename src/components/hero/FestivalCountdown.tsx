"use client";

import { useEffect, useState, useRef, useCallback, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Calendar,
  Sparkles,
  Bell,
  Volume2,
  VolumeX,
  Flame,
  ArrowRight,
} from "lucide-react";
import {
  triggerFirework,
  isSoundEnabled,
  toggleSound,
} from "@/lib/fireworks-dispatcher";

// Official Festival Schedule Timestamps (Asia/Kolkata UTC+05:30)
const EVENT_START_ISO = "2026-11-04T13:30:00+05:30";
const EVENT_END_ISO = "2026-11-04T18:00:00+05:30";

type CelebrationStage = "idle" | "finale" | "fireworks" | "reveal" | "interactive";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
  isCompleted: boolean;
}

// Particle interface for the internal realistic celebration canvas
interface CanvasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  gravity: number;
  trail: { x: number; y: number }[];
}

export default function FestivalCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
    isCompleted: false,
  });

  const [celebrationStage, setCelebrationStage] = useState<CelebrationStage>("idle");
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const [simTargetTime, setSimTargetTime] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const celebrationContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<CanvasParticle[]>([]);
  const hasTriggeredRef = useRef(false);

  // Initialize sound preference safely (sound is strictly OFF by default per specs)
  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const handleSoundChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ soundEnabled: boolean }>;
      if (customEvent.detail) {
        setSoundOn(customEvent.detail.soundEnabled);
      }
    };
    window.addEventListener("pattas:sound-change", handleSoundChange);
    return () => window.removeEventListener("pattas:sound-change", handleSoundChange);
  }, []);

  // Check URL params for dev test mode (?testCountdown=1 or ?simulate=1)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("testCountdown") === "1" || params.get("simulate") === "1") {
        startSimulation(5);
      }
      // Check if user previously experienced the full sequence
      const prevCelebrated = localStorage.getItem("pattas26_countdown_celebrated");
      if (prevCelebrated === "true") {
        setHasCelebrated(true);
      }
    }
  }, []);

  // Realistic Fireworks Canvas Engine for the Celebration Panel
  useEffect(() => {
    if (celebrationStage === "idle" && !hasCelebrated) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isRunning = true;

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Render loop with natural gravity, trails, and fading smoke physics
    const loop = () => {
      if (!isRunning) return;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Save trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();

        // Draw trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.45;
          ctx.lineWidth = p.size * 0.6;
          ctx.stroke();
        }

        // Draw particle head
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Apply physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01) {
          particles.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [celebrationStage, hasCelebrated]);

  // Spawn realistic burst particles on the local canvas
  const spawnLocalBurst = useCallback((x: number, y: number, colorPalette: string[]) => {
    const particles: CanvasParticle[] = [];
    const count = 35 + Math.floor(Math.random() * 20);

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = 1.8 + Math.random() * 4.2;
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 0.95 + Math.random() * 0.05,
        decay: 0.012 + Math.random() * 0.016,
        color,
        size: 1.2 + Math.random() * 1.8,
        gravity: 0.045,
        trail: [],
      });
    }

    particlesRef.current.push(...particles);
  }, []);

  // Full 4-Stage Grand Celebration Orchestration
  const executeGrandCelebration = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    // Stage 1 – Countdown Finale (0s to 1.2s):
    // All 4 timer boxes glow golden, numbers scale, cinematic golden flash
    setCelebrationStage("finale");

    // Stage 2 – Fireworks Explosion (1.2s to 4.5s):
    // Layered realistic bursts with gold, red, orange, blue, and purple fireworks
    const tStage2 = setTimeout(() => {
      setCelebrationStage("fireworks");

      const goldColors = ["#FFD700", "#FFB000", "#FFF0A0", "#FFA500", "#FFE87C"];
      const diwaliColors = ["#FF7518", "#FFD700", "#FF355E", "#FFBD35", "#E82C91"];
      const royalColors = ["#4267FF", "#A855F7", "#00D4FF", "#38BDF8", "#C084FC"];

      // Wave 1: Chrysanthemum Golden Burst
      triggerFirework({
        pattern: "chrysanthemum",
        palette: "gold",
        count: 70,
        soundType: "grand",
      });
      if (canvasRef.current) {
        spawnLocalBurst(canvasRef.current.clientWidth * 0.5, 60, goldColors);
      }

      // Wave 2: Layered Red & Orange Festive Bursts (400ms later)
      setTimeout(() => {
        triggerFirework({
          pattern: "multi-stage",
          palette: "diwali",
          count: 85,
          soundType: "burst",
        });
        if (canvasRef.current) {
          spawnLocalBurst(canvasRef.current.clientWidth * 0.3, 75, diwaliColors);
          spawnLocalBurst(canvasRef.current.clientWidth * 0.7, 75, diwaliColors);
        }
      }, 450);

      // Wave 3: Royal Blue & Purple Chrysanthemum (1000ms later)
      setTimeout(() => {
        triggerFirework({
          pattern: "spherical",
          palette: "royal",
          count: 65,
          soundType: "burst",
        });
        if (canvasRef.current) {
          spawnLocalBurst(canvasRef.current.clientWidth * 0.5, 90, royalColors);
        }
      }, 1000);

      // Wave 4: Golden Willow Grand Finale with Crackling Trails (1700ms later)
      setTimeout(() => {
        triggerFirework({
          pattern: "willow",
          palette: "gold",
          count: 90,
          soundType: "grand",
        });
        if (canvasRef.current) {
          spawnLocalBurst(canvasRef.current.clientWidth * 0.25, 60, goldColors);
          spawnLocalBurst(canvasRef.current.clientWidth * 0.75, 60, goldColors);
        }
      }, 1700);
    }, 1200);

    // Stage 3 & 4 – Celebration Reveal & Interactive Celebration (3.2s onwards):
    // Smoothly transforms countdown panel into the glowing celebration panel
    const tStage3 = setTimeout(() => {
      setCelebrationStage("reveal");
      setHasCelebrated(true);

      try {
        localStorage.setItem("pattas26_countdown_celebrated", "true");
      } catch {}

      // Final celebratory flourish
      triggerFirework({
        pattern: "brocade-crown",
        palette: "diwali",
        count: 75,
        soundType: "chime",
      });
    }, 3200);

    const tStage4 = setTimeout(() => {
      setCelebrationStage("interactive");
    }, 4000);

    return () => {
      clearTimeout(tStage2);
      clearTimeout(tStage3);
      clearTimeout(tStage4);
    };
  }, [spawnLocalBurst]);

  // Main countdown calculation interval
  useEffect(() => {
    const eventStartTime = simTargetTime ?? new Date(EVENT_START_ISO).getTime();
    const eventEndTime = new Date(EVENT_END_ISO).getTime();

    const calculateTime = () => {
      const now = Date.now();

      // Past event conclusion (after 06:00 PM IST)
      if (now >= eventEndTime && !isSimulated) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false, isCompleted: true });
        return;
      }

      // Event is currently live (between 01:30 PM and 06:00 PM IST)
      if (now >= eventStartTime) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true, isCompleted: false });

        // If not yet celebrated or watching transition live, trigger celebration!
        if (!hasTriggeredRef.current && celebrationStage === "idle") {
          // If the user refreshed or loaded the page after the event started and already celebrated,
          // go directly to the beautiful interactive celebration view without repeating full flash.
          const prevCelebrated = localStorage.getItem("pattas26_countdown_celebrated");
          if (prevCelebrated === "true" && !isSimulated) {
            hasTriggeredRef.current = true;
            setCelebrationStage("interactive");
            setHasCelebrated(true);
          } else {
            executeGrandCelebration();
          }
        }
        return;
      }

      // Pre-event countdown (strictly prevent negative values with Math.max(0, ...))
      const diff = Math.max(0, eventStartTime - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isLive: false, isCompleted: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [celebrationStage, executeGrandCelebration, isSimulated, simTargetTime]);

  // Handler for clicking the celebration panel background to launch interactive mini-firework
  const handlePanelClick = (e: MouseEvent<HTMLDivElement>) => {
    // Prevent triggering when clicking buttons or links
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a") || target.closest("input")) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    const goldColors = ["#FFD700", "#FFBD35", "#FF7518", "#E82C91", "#00D4FF"];
    spawnLocalBurst(localX, localY, goldColors);

    // Also trigger realistic firework in sky
    triggerFirework({
      x: e.clientX,
      y: e.clientY,
      pattern: "spherical",
      palette: "diwali",
      count: 45,
      soundType: "burst",
    });
  };

  // Sound toggle handler
  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  // Google Calendar Add handler
  const handleAddToCalendar = () => {
    const title = encodeURIComponent("PATTAS’26 – MKCE Diwali Festival");
    const details = encodeURIComponent(
      "PATTAS’26: Celebrating Light, Tradition & Togetherness at M. Kumarasamy College of Engineering (MKCE), Karur. 10 Events, Dance Showcase, DJ & Flash Mob."
    );
    const location = encodeURIComponent("M. Kumarasamy College of Engineering, Karur, Tamilnadu, India");
    const dates = "20261104T080000Z/20261104T123000Z";
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalUrl, "_blank", "noopener,noreferrer");
  };

  // Testing & Simulation Helper: simulates countdown ending in X seconds
  const startSimulation = (secondsAhead = 5) => {
    hasTriggeredRef.current = false;
    setIsSimulated(true);
    setHasCelebrated(false);
    setCelebrationStage("idle");
    setSimTargetTime(Date.now() + secondsAhead * 1000);
  };

  // If festival has completely concluded (past 6 PM on event day)
  if (timeLeft.isCompleted && !isSimulated) {
    return (
      <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-2xl mx-auto text-center border border-fest-gold/40 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-royal/70 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-fest-gold" />
          <span>Festival Concluded</span>
        </div>
        <h3 className="font-serif font-black text-2xl sm:text-3xl text-gold-gradient">
          PATTAS’26 Has Concluded
        </h3>
        <p className="text-xs sm:text-sm text-fest-cream/75 mt-2 max-w-md mx-auto">
          Thank you for celebrating Light, Tradition &amp; Togetherness with MKCE. We look forward to seeing you at PATTAS’27!
        </p>
      </div>
    );
  }

  const isLiveOrCelebrated =
    celebrationStage === "reveal" ||
    celebrationStage === "interactive" ||
    (timeLeft.isLive && hasCelebrated);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <div
      ref={celebrationContainerRef}
      onClick={isLiveOrCelebrated ? handlePanelClick : undefined}
      className={`relative p-6 sm:p-8 rounded-3xl max-w-3xl mx-auto border transition-all duration-700 select-none overflow-hidden ${
        isLiveOrCelebrated
          ? "glass-panel-gold border-fest-gold shadow-[0_0_50px_rgba(255,189,53,0.35)] cursor-pointer group"
          : celebrationStage === "finale"
          ? "border-fest-gold shadow-[0_0_60px_rgba(255,189,53,0.8)] bg-fest-midnight/90 scale-[1.02]"
          : "glass-panel-gold border-fest-gold/40 shadow-gold-md backdrop-blur-xl"
      }`}
    >
      {/* 1. Internal Realistic Canvas Fireworks & Golden Particle Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* 2. Golden Flash Overlay (Stage 1 Finale) */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-fest-gold/60 via-white/80 to-fest-gold/60 pointer-events-none z-30 transition-opacity duration-1000 ${
          celebrationStage === "finale" ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"
        }`}
      />

      {/* 3. Subtle Golden Hover Light Sweep (Requirement 5) */}
      {isLiveOrCelebrated && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-fest-gold/10 to-transparent pointer-events-none z-10" />
      )}

      {/* TOP HEADER BAR */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pb-5 border-b border-fest-gold/25">
        <div className="flex items-center gap-2">
          {isLiveOrCelebrated ? (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-magenta/30 border border-fest-magenta text-fest-cream text-xs font-black uppercase tracking-wider animate-pulse">
              <span className="w-2 h-2 rounded-full bg-fest-gold animate-ping" />
              <span>FESTIVAL IS LIVE NOW</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-fest-gold animate-spin-slow" />
              <span className="text-xs font-bold uppercase tracking-widest text-fest-brightGold">
                Official Festival Countdown
              </span>
            </div>
          )}
        </div>

        {/* Date / Sound Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-fest-cream/80 font-mono">
            <Calendar className="w-3.5 h-3.5 text-fest-orange" />
            <span>04 NOV 2026 • 01:30 PM IST</span>
          </div>

          {/* Sound Toggle (Requirement 5: Sound OFF by default with mute/unmute button) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleSound();
            }}
            aria-label={soundOn ? "Mute Festive Sound" : "Enable Festive Sound"}
            title={soundOn ? "Mute Festive Sound" : "Enable Festive Sound (Procedural Audio)"}
            className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
              soundOn
                ? "bg-fest-gold/20 border-fest-gold text-fest-brightGold"
                : "bg-white/5 border-fest-gold/30 text-fest-cream/60 hover:text-fest-gold"
            }`}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA: COUNTDOWN vs CELEBRATION REVEAL */}
      {!isLiveOrCelebrated ? (
        /* ==================== PRE-COMPLETION COUNTDOWN ==================== */
        <div className="relative z-10 py-6 space-y-6">
          {/* 4 Digital Timer Blocks with Stage 1 Gold Glow & Scaling */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {units.map((unit) => (
              <div
                key={unit.label}
                className={`flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl border transition-all duration-300 ${
                  celebrationStage === "finale"
                    ? "bg-fest-gold/25 border-fest-gold shadow-[0_0_35px_rgba(255,189,53,0.9)] scale-105"
                    : "bg-fest-midnight/60 border-fest-gold/25 shadow-inner hover:border-fest-gold/60"
                }`}
              >
                <span
                  className={`font-serif text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-gold-gradient transition-transform duration-300 ${
                    celebrationStage === "finale" ? "scale-115 text-white" : ""
                  }`}
                >
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[9px] sm:text-[11px] font-bold text-fest-cream/60 tracking-wider mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Bar: Calendar Add */}
          <div className="pt-2 border-t border-fest-gold/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-fest-cream/75">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-fest-gold" />
              <span>Venue: M. Kumarasamy College of Engineering, Karur</span>
            </div>
            <button
              onClick={handleAddToCalendar}
              className="btn-glass-gold px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              <Bell className="w-3 h-3 text-fest-brightGold" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </div>
      ) : (
        /* ==================== STAGE 3 & 4: CELEBRATION REVEAL ==================== */
        <div className="relative z-10 py-6 text-center space-y-6 animate-in fade-in zoom-in-95 duration-700">
          {/* Traditional Illuminated Diya Flames & Grand Big Glowing Logo */}
          <div className="relative flex items-center justify-center my-1 sm:my-3">
            {/* Radial golden background aura */}
            <div className="absolute inset-0 max-w-xl mx-auto bg-gradient-to-r from-fest-orange/20 via-fest-gold/35 to-fest-orange/20 rounded-full blur-3xl pointer-events-none" />

            {/* Left Diya Flame */}
            <div className="hidden sm:flex relative w-12 h-12 items-center justify-center flex-shrink-0 mr-2 md:mr-4">
              <span className="absolute -top-2 w-3.5 h-6 rounded-full bg-gradient-to-t from-fest-orange via-fest-gold to-white animate-pulse blur-[1px]" />
              <Flame className="w-9 h-9 text-fest-gold fill-fest-brightGold drop-shadow-[0_0_20px_rgba(255,189,53,0.95)] animate-pulse" />
            </div>

            {/* Grand Sized Glowing Logo (Dominant centerpiece) */}
            <div className="relative w-full max-w-[340px] sm:max-w-[500px] md:max-w-[620px] h-36 sm:h-48 md:h-60 transition-transform duration-500 hover:scale-[1.03]">
              <Image
                src="/assets/brand/pattas26-logo.png"
                alt="PATTAS'26 Official Logo"
                fill
                sizes="(max-width: 640px) 340px, (max-width: 768px) 500px, 620px"
                className="object-contain filter drop-shadow-[0_12px_30px_rgba(255,189,53,0.4)] drop-shadow-[0_8px_25px_rgba(0,0,0,0.8)]"
                priority
              />
            </div>

            {/* Right Diya Flame */}
            <div className="hidden sm:flex relative w-12 h-12 items-center justify-center flex-shrink-0 ml-2 md:ml-4">
              <span className="absolute -top-2 w-3.5 h-6 rounded-full bg-gradient-to-t from-fest-orange via-fest-gold to-white animate-pulse blur-[1px]" />
              <Flame className="w-9 h-9 text-fest-gold fill-fest-brightGold drop-shadow-[0_0_20px_rgba(255,189,53,0.95)] animate-pulse" />
            </div>
          </div>

          {/* Golden Celebration Typography */}
          <div className="space-y-1.5">
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl tracking-wide text-gold-gradient uppercase drop-shadow-[0_2px_18px_rgba(255,189,53,0.7)] animate-in fade-in slide-in-from-bottom-2 duration-500">
              PATTAS’26 IS LIVE!
            </h2>
            <p className="font-serif font-bold text-sm sm:text-lg tracking-widest text-fest-brightGold drop-shadow-md">
              LET THE CELEBRATION BEGIN!
            </p>
            <p className="font-mono text-xs text-fest-cream/70 tracking-widest uppercase">
              04 NOVEMBER 2026 • CELEBRATING LIGHT, TRADITION &amp; TOGETHERNESS
            </p>
          </div>

          {/* Interactive Hint: Click to fire realistic bursts */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-fest-royal/40 border border-fest-gold/20 text-[10px] text-fest-gold/80">
            <Sparkles className="w-3 h-3 text-fest-gold animate-spin-slow" />
            <span>Tap anywhere on this panel to launch celebratory sparks</span>
          </div>

          {/* STAGE 4: Interactive Celebration Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* Button 1: EXPLORE THE FESTIVAL */}
            <a
              href="#events-explorer"
              onClick={(e) => {
                e.stopPropagation();
                const target = document.getElementById("events-explorer");
                if (target) {
                  e.preventDefault();
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group relative btn-gold px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-gold-md flex items-center gap-2 hover:scale-105 active:scale-95 transition-all overflow-hidden cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-fest-midnight text-fest-midnight group-hover:rotate-45 transition-transform" />
              <span>EXPLORE THE FESTIVAL</span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </a>

            {/* Button 2: VIEW EVENTS */}
            <Link
              href="/events"
              onClick={(e) => e.stopPropagation()}
              className="group relative btn-glass-gold px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:border-fest-brightGold hover:scale-105 active:scale-95 transition-all overflow-hidden cursor-pointer"
            >
              <span>VIEW EVENTS</span>
              <ArrowRight className="w-4 h-4 text-fest-gold group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
