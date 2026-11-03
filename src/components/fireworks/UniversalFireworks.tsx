"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";
import {
  FireworkPattern,
  FireworkPalette,
  PALETTES,
  playLaunchSound,
  playBurstSound,
} from "@/lib/fireworks-dispatcher";

export interface UniversalFireworksProps {
  intensity?: "subtle" | "medium" | "high" | "grand";
  colorPalette?: FireworkPalette;
  customColors?: string[];
  preset?:
    | "sky"
    | "golden-rain"
    | "sparks"
    | "celebration"
    | "grand-finale"
    | "subtle-stars"
    | "meteors"
    | "fountain";
  particleCount?: number;
  explosionFrequency?: number; // ms between ambient launches (0 = manual only)
  enableInteraction?: boolean;
  enableSound?: boolean;
  performanceMode?: "auto" | "high" | "low";
  reducedMotion?: boolean;
  patternTypes?: FireworkPattern[];
  className?: string;
  style?: CSSProperties;
  globalListener?: boolean;
  zIndex?: number;
}

// 5 Vibrant Core Palettes for Authentic Diwali Spherical & Chrysanthemum Shells
const COLOR_THEMES = {
  gold: ["#FFD700", "#FFB000", "#FFF0A0", "#FFA500", "#FFFDF0"],
  red: ["#FF204E", "#FF3366", "#FF1744", "#D50000", "#FF8597"],
  blue: ["#00D4FF", "#38BDF8", "#00B4D8", "#2563EB", "#90E0EF"],
  pink: ["#FF3E9D", "#F72585", "#FF69B4", "#FF1493", "#FFA6D5"],
  purple: ["#A855F7", "#7C3AED", "#9333EA", "#C084FC", "#D8B4FE"],
  diwali: [
    "#FFD700",
    "#FF3366",
    "#00D4FF",
    "#FF3E9D",
    "#A855F7",
    "#FFB000",
    "#FF7518",
    "#FFF0A0",
  ],
};

// Reusable pooled Particle for explosion sparks
class Particle {
  active = false;
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  color = "#FFD700";
  size = 2;
  alpha = 1;
  decay = 0.015;
  drag = 0.96;
  gravity = 0.06;
  flicker = false;
  trail: { x: number; y: number }[] = [];
  maxTrail = 4;
  subMunition = false;
  subDelay = 0;
  subPalette: string[] = [];

  init(
    x: number,
    y: number,
    vx: number,
    vy: number,
    color: string,
    size: number,
    decay: number,
    drag = 0.96,
    gravity = 0.06,
    flicker = false,
    subMunition = false,
    subPalette: string[] = [],
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
    this.subMunition = subMunition;
    this.subDelay = subMunition ? 16 + Math.floor(Math.random() * 12) : 0;
    this.subPalette = subPalette;
  }
}

// Reusable pooled Rocket Spark for exhaust trails during ascent
class RocketSpark {
  active = false;
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  alpha = 1;
  decay = 0.06;
  color = "#FFA500";
  size = 1.5;

  init(x: number, y: number, color = "#FFA500") {
    this.active = true;
    this.x = x + (Math.random() - 0.5) * 3;
    this.y = y + Math.random() * 4;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = Math.random() * 1.8 + 0.6;
    this.alpha = 1;
    this.decay = 0.045 + Math.random() * 0.035;
    this.color = color;
    this.size = Math.random() * 1.5 + 1;
  }
}

// Reusable pooled Rocket Projectile launching from bottom
class Rocket {
  active = false;
  x = 0;
  y = 0;
  targetY = 0;
  vx = 0;
  vy = 0;
  color = "#FFD700";
  palette: string[] = [];
  pattern: FireworkPattern = "chrysanthemum";
  trail: { x: number; y: number }[] = [];

  init(
    x: number,
    y: number,
    targetY: number,
    pattern: FireworkPattern,
    palette: string[],
    color: string
  ) {
    this.active = true;
    this.x = x;
    this.y = y;
    this.targetY = targetY;
    this.pattern = pattern;
    this.palette = palette;
    this.color = color;
    this.trail = [];

    const dy = targetY - y;
    // Calculate precise vertical launch velocity to reach apex with deceleration
    this.vy = -Math.sqrt(2 * 0.16 * Math.abs(dy)) - 2.2;
    this.vx = (Math.random() - 0.5) * 1.4;
  }
}

// Reusable pooled Smoke Particle for realistic post-explosion fading smoke
class SmokeParticle {
  active = false;
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  radius = 12;
  maxRadius = 38;
  alpha = 0.28;
  decay = 0.0035;

  init(x: number, y: number) {
    this.active = true;
    this.x = x + (Math.random() - 0.5) * 14;
    this.y = y + (Math.random() - 0.5) * 14;
    this.vx = (Math.random() - 0.5) * 0.4 + 0.08; // subtle wind drift
    this.vy = -(Math.random() * 0.25 + 0.12); // gentle upward convection
    this.radius = Math.random() * 6 + 10;
    this.maxRadius = this.radius * (Math.random() * 1.5 + 2.5);
    this.alpha = Math.random() * 0.12 + 0.16;
    this.decay = Math.random() * 0.002 + 0.003;
  }
}

// Reusable pooled Sky Flash for subtle glowing illumination of the night sky
class SkyFlash {
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
    this.alpha = 0.2;
    this.decay = 0.03;
  }
}

const POOL_SIZE = 1400;
const ROCKET_POOL_SIZE = 30;
const SPARK_POOL_SIZE = 250;
const SMOKE_POOL_SIZE = 120;
const FLASH_POOL_SIZE = 12;

export default function UniversalFireworks({
  intensity = "high",
  colorPalette = "diwali",
  customColors,
  preset = "sky",
  particleCount,
  explosionFrequency,
  enableInteraction = true,
  enableSound = false,
  performanceMode = "auto",
  reducedMotion = false,
  patternTypes,
  className = "",
  style,
  globalListener = true,
  zIndex = 0,
}: UniversalFireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReduced, setIsReduced] = useState(reducedMotion);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (media.matches) setIsReduced(true);
    }
  }, []);

  useEffect(() => {
    if (isReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isTabVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const effectivePoolSize =
      performanceMode === "low" || isMobile ? 700 : POOL_SIZE;

    // Allocate object pools
    const particlePool: Particle[] = Array.from(
      { length: effectivePoolSize },
      () => new Particle()
    );
    const rockets: Rocket[] = Array.from(
      { length: ROCKET_POOL_SIZE },
      () => new Rocket()
    );
    const rocketSparks: RocketSpark[] = Array.from(
      { length: SPARK_POOL_SIZE },
      () => new RocketSpark()
    );
    const smokePool: SmokeParticle[] = Array.from(
      { length: SMOKE_POOL_SIZE },
      () => new SmokeParticle()
    );
    const skyFlashes: SkyFlash[] = Array.from(
      { length: FLASH_POOL_SIZE },
      () => new SkyFlash()
    );

    // Pick vibrant palette (gold, red, blue, pink, purple, or festive multi)
    const getThemePalette = (): string[] => {
      if (customColors && customColors.length > 0) return customColors;
      if (colorPalette && PALETTES[colorPalette]) return PALETTES[colorPalette];

      // Randomized authentic Diwali palette selection
      const themes = [
        COLOR_THEMES.gold,
        COLOR_THEMES.red,
        COLOR_THEMES.blue,
        COLOR_THEMES.pink,
        COLOR_THEMES.purple,
        COLOR_THEMES.diwali,
      ];
      return themes[Math.floor(Math.random() * themes.length)];
    };

    const hexToRgb = (hex: string): string => {
      let c = hex.replace("#", "");
      if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
      const num = parseInt(c, 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      return `${r}, ${g}, ${b}`;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Trigger subtle sky ambient light flash
    const triggerSkyFlash = (x: number, y: number, colorHex: string) => {
      const flash = skyFlashes.find((f) => !f.active);
      if (!flash) return;
      const rgb = hexToRgb(colorHex);
      const radius = isMobile ? 260 : 380;
      flash.init(x, y, rgb, radius);
    };

    // Trigger realistic fading smoke puffs
    const triggerSmoke = (x: number, y: number, count = 8) => {
      const smokeCount = isMobile ? Math.floor(count * 0.5) : count;
      let spawned = 0;
      for (let i = 0; i < smokePool.length && spawned < smokeCount; i++) {
        const s = smokePool[i];
        if (!s.active) {
          s.init(x, y);
          spawned++;
        }
      }
    };

    // Detonate Firework Explosion at (x, y)
    const createExplosion = (
      x: number,
      y: number,
      pattern: FireworkPattern,
      palette: string[],
      countOverride?: number
    ) => {
      if (enableSound) {
        playBurstSound(
          pattern === "willow" || pattern === "golden-rain"
            ? "crackle"
            : "chrysanthemum"
        );
      }

      let count =
        countOverride ??
        (particleCount
          ? particleCount
          : intensity === "subtle"
          ? 40
          : intensity === "medium"
          ? 75
          : intensity === "high"
          ? 110
          : 160);

      if (isMobile) count = Math.floor(count * 0.6);

      const dominantColor =
        palette[Math.floor(Math.random() * palette.length)] || "#FFD700";

      // 1. Subtle sky illumination
      triggerSkyFlash(x, y, dominantColor);

      // 2. Realistic post-explosion smoke
      triggerSmoke(x, y, isMobile ? 5 : 9);

      let spawned = 0;
      for (let i = 0; i < particlePool.length && spawned < count; i++) {
        const p = particlePool[i];
        if (p.active) continue;

        let color =
          pattern === "willow" || pattern === "golden-rain"
            ? COLOR_THEMES.gold[Math.floor(Math.random() * COLOR_THEMES.gold.length)]
            : Math.random() < 0.8
            ? dominantColor
            : palette[Math.floor(Math.random() * palette.length)];

        let vx = 0;
        let vy = 0;
        let drag = 0.96;
        let gravity = 0.055;
        let decay = Math.random() * 0.012 + 0.012;
        let size = Math.random() * 2.2 + 1.2;
        let flicker = false;
        let subMunition = false;
        let maxTrail = 4;

        if (pattern === "chrysanthemum") {
          // Large radiating 360 flower with trailing golden sparks
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6.5 + 2.0;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
          drag = 0.965;
          gravity = 0.05;
          decay = Math.random() * 0.01 + 0.011;
          size = Math.random() * 2.4 + 1.2;
          flicker = Math.random() > 0.45;
          maxTrail = 6;
        } else if (pattern === "spherical") {
          // 3D uniform spherical dispersion projected onto 2D
          const u = Math.random();
          const v = Math.random();
          const theta = u * 2.0 * Math.PI;
          const phi = Math.acos(2.0 * v - 1.0);
          const speed = Math.random() * 5.8 + 2.2;
          vx = Math.sin(phi) * Math.cos(theta) * speed;
          vy = Math.sin(phi) * Math.sin(theta) * speed * 0.9;
          drag = 0.962;
          gravity = 0.048;
          decay = 0.013;
          size = Math.random() * 2.2 + 1.4;
          maxTrail = 5;
        } else if (pattern === "peony") {
          // Soft spherical burst with clean synchronized fade
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6.8 + 2.0;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
          drag = 0.945;
          gravity = 0.04;
          decay = Math.random() * 0.015 + 0.014;
          size = Math.random() * 2.5 + 1.5;
          maxTrail = 3;
        } else if (pattern === "willow") {
          // Golden willow / Kamuro with long weeping hanging light trails
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 4.6 + 1.2;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed * 0.7 - 0.4;
          drag = 0.976;
          gravity = 0.042; // gentle downward weeping
          decay = 0.0075; // long lingering trail
          size = Math.random() * 2.3 + 1.4;
          flicker = Math.random() > 0.35;
          maxTrail = 7;
        } else if (pattern === "palm-tree") {
          // Rising trunk followed by arching fronds
          const isTrunk = spawned < count * 0.18;
          if (isTrunk) {
            vx = (Math.random() - 0.5) * 1.0;
            vy = -(Math.random() * 4.5 + 4.0);
            drag = 0.98;
            gravity = 0.07;
            size = 3.0;
            decay = 0.016;
            color = "#FFD700";
            maxTrail = 8;
          } else {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5.2 + 2.0;
            vx = Math.cos(angle) * speed;
            vy = Math.sin(angle) * speed * 0.7 - 1.5;
            drag = 0.97;
            gravity = 0.085;
            decay = 0.012;
            size = 2.4;
            maxTrail = 5;
          }
        } else if (pattern === "ring") {
          // Symmetrical ring
          const angle = (spawned / count) * Math.PI * 2;
          const speed = 5.2 + (Math.random() - 0.5) * 0.4;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed * 0.85;
          drag = 0.952;
          decay = 0.015;
          maxTrail = 4;
        } else if (pattern === "starburst") {
          // Rapid dazzling starburst
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 8.2 + 3.0;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
          drag = 0.935;
          decay = 0.019;
          size = Math.random() * 2.8 + 1.6;
          flicker = true;
          maxTrail = 5;
        } else if (pattern === "multi-stage") {
          // Multi-stage shell with secondary mini crackles
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5.2 + 2.0;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
          drag = 0.955;
          gravity = 0.05;
          subMunition = Math.random() < 0.28; // 28% burst into secondary crackles
          decay = 0.015;
          maxTrail = 4;
        } else if (pattern === "brocade-crown") {
          // Large layered golden explosion with cascading weeping trails & delayed sparkles
          const isCore = spawned < count * 0.35;
          const angle = Math.random() * Math.PI * 2;
          const speed = isCore ? Math.random() * 3.5 + 1.5 : Math.random() * 6.5 + 2.5;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed * 0.75 - (isCore ? 0.2 : 0.6);
          drag = 0.978;
          gravity = 0.04;
          decay = isCore ? 0.014 : 0.007; // Outer crown weeps slowly
          color = COLOR_THEMES.gold[Math.floor(Math.random() * COLOR_THEMES.gold.length)];
          size = isCore ? Math.random() * 2.8 + 1.6 : Math.random() * 2.2 + 1.2;
          flicker = Math.random() > 0.3;
          subMunition = isCore && Math.random() < 0.35; // Secondary glittering sparks
          maxTrail = 8;
        } else if (pattern === "crackling") {
          // Intense crackling shell with secondary spark explosions
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5.8 + 2.2;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
          drag = 0.95;
          gravity = 0.055;
          decay = 0.018;
          flicker = true;
          size = Math.random() * 2.4 + 1.4;
          subMunition = Math.random() < 0.42; // High frequency crackle pop
          maxTrail = 4;
        } else if (pattern === "golden-rain") {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3.2 + 0.6;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed * 0.5;
          drag = 0.972;
          gravity = 0.035;
          decay = 0.007;
          flicker = Math.random() > 0.4;
          size = Math.random() * 2.0 + 1.2;
          maxTrail = 6;
        } else {
          // Default spherical fallback
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6.0 + 2.0;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
          drag = 0.96;
          gravity = 0.05;
          decay = 0.014;
        }

        p.init(
          x,
          y,
          vx,
          vy,
          color,
          size,
          decay,
          drag,
          gravity,
          flicker,
          subMunition,
          palette,
          maxTrail
        );
        spawned++;
      }
    };

    // Launch a rocket ascending from bottom
    const launchRocket = (
      targetX: number,
      targetY: number,
      pattern?: FireworkPattern,
      paletteOverride?: string[]
    ) => {
      const activeRocket = rockets.find((r) => !r.active);
      if (!activeRocket) return;

      const palette = paletteOverride || getThemePalette();
      const allowedPatterns: FireworkPattern[] = patternTypes || [
        "chrysanthemum",
        "spherical",
        "willow",
        "peony",
        "palm-tree",
        "brocade-crown",
        "multi-stage",
        "crackling",
        "ring",
        "starburst",
        "golden-rain",
      ];
      const selectedPattern =
        pattern ||
        allowedPatterns[Math.floor(Math.random() * allowedPatterns.length)];

      const startX = targetX + (Math.random() - 0.5) * 60;
      const startY = height + 15;
      const color = palette[Math.floor(Math.random() * palette.length)];

      if (enableSound) playLaunchSound();

      activeRocket.init(startX, startY, targetY, selectedPattern, palette, color);
    };

    // Launch multi-firework sequence (single, double, or triple salvo)
    const launchSalvo = () => {
      const roll = Math.random();

      if (roll < 0.65) {
        // Single majestic firework
        const x = Math.random() * (width * 0.7) + width * 0.15;
        const y = Math.random() * (height * 0.45) + height * 0.14;
        launchRocket(x, y);
      } else if (roll < 0.9) {
        // Double salvo at different heights and positions
        const x1 = Math.random() * (width * 0.35) + width * 0.12;
        const y1 = Math.random() * (height * 0.35) + height * 0.15;
        launchRocket(x1, y1);

        setTimeout(() => {
          const x2 = Math.random() * (width * 0.35) + width * 0.52;
          const y2 = Math.random() * (height * 0.35) + height * 0.18;
          launchRocket(x2, y2);
        }, 180 + Math.random() * 140);
      } else {
        // Triple celebratory salvo
        const x1 = width * 0.25 + (Math.random() - 0.5) * 80;
        const y1 = height * 0.22 + (Math.random() - 0.5) * 40;
        launchRocket(x1, y1);

        setTimeout(() => {
          const x2 = width * 0.72 + (Math.random() - 0.5) * 80;
          const y2 = height * 0.26 + (Math.random() - 0.5) * 40;
          launchRocket(x2, y2);
        }, 220);

        setTimeout(() => {
          const x3 = width * 0.48 + (Math.random() - 0.5) * 80;
          const y3 = height * 0.16 + (Math.random() - 0.5) * 30;
          launchRocket(x3, y3, "willow", COLOR_THEMES.gold);
        }, 460);
      }
    };

    // Frequency timing for ambient fireworks
    let lastAmbientTime = 0;
    const baseFreq =
      explosionFrequency !== undefined
        ? explosionFrequency
        : preset === "grand-finale"
        ? 800
        : preset === "celebration"
        ? 1400
        : preset === "golden-rain"
        ? 1800
        : preset === "sparks"
        ? 2400
        : preset === "subtle-stars"
        ? 4500
        : 2200;

    // External dispatcher trigger listener
    const handleGlobalTrigger = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) return;
      const x =
        detail.x !== undefined
          ? detail.x
          : Math.random() * (width - 200) + 100;
      const y =
        detail.y !== undefined
          ? detail.y
          : Math.random() * (height * 0.5) + 60;
      const palette =
        detail.colors ||
        (detail.palette && PALETTES[detail.palette as FireworkPalette]) ||
        getThemePalette();
      const pattern = detail.pattern || "chrysanthemum";

      if (y < height * 0.65 && Math.random() > 0.35) {
        launchRocket(x, y, pattern, palette);
      } else {
        createExplosion(x, y, pattern, palette, detail.count);
      }
    };

    if (globalListener) {
      window.addEventListener("pattas:firework", handleGlobalTrigger);
    }

    // Interactive launch on click anywhere (without blocking UI buttons/links)
    const handleWindowClick = (e: MouseEvent) => {
      if (!enableInteraction) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("select") ||
          target.closest('[role="button"]') ||
          target.closest(".interactive-element"))
      ) {
        return;
      }
      launchRocket(e.clientX, e.clientY);
    };

    if (enableInteraction) {
      window.addEventListener("click", handleWindowClick);
    }

    // Keyboard shortcut 'F' for interactive firework trigger
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!enableInteraction) return;
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }
      if (e.key === "f" || e.key === "F") {
        const x = Math.random() * (width - 200) + 100;
        const y = Math.random() * (height * 0.5) + 80;
        launchRocket(x, y);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Initial celebratory launch on page load
    setTimeout(() => {
      launchRocket(width * 0.38, height * 0.25, "chrysanthemum");
      setTimeout(() => {
        launchRocket(width * 0.64, height * 0.22, "spherical", COLOR_THEMES.gold);
      }, 350);
    }, 500);

    // Main Canvas Render Loop
    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      if (!isTabVisible) return;

      // 1. Ethereal fading clear: leaves smooth light trails
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
      ctx.fillRect(0, 0, width, height);

      // 2. Render Ambient Sky Flashes (source-over radial illumination)
      ctx.globalCompositeOperation = "source-over";
      for (let i = 0; i < skyFlashes.length; i++) {
        const f = skyFlashes[i];
        if (!f.active) continue;

        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        grad.addColorStop(0, `rgba(${f.color}, ${f.alpha})`);
        grad.addColorStop(0.5, `rgba(${f.color}, ${f.alpha * 0.35})`);
        grad.addColorStop(1, "rgba(7, 19, 41, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();

        f.alpha -= f.decay;
        if (f.alpha <= 0) f.active = false;
      }

      // 3. Render Realistic Smoke Puffs (source-over soft mist)
      for (let i = 0; i < smokePool.length; i++) {
        const s = smokePool[i];
        if (!s.active) continue;

        s.x += s.vx;
        s.y += s.vy;
        s.radius += (s.maxRadius - s.radius) * 0.025;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          s.active = false;
          continue;
        }

        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
        grad.addColorStop(0, `rgba(150, 160, 190, ${s.alpha * 0.22})`);
        grad.addColorStop(0.6, `rgba(110, 120, 150, ${s.alpha * 0.1})`);
        grad.addColorStop(1, "rgba(7, 19, 41, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Additive Blending for Radiant Diwali Sparks & Rockets
      ctx.globalCompositeOperation = "lighter";

      // 4a. Update & Render Rocket Sparks (exhaust trail)
      for (let i = 0; i < rocketSparks.length; i++) {
        const sp = rocketSparks[i];
        if (!sp.active) continue;

        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0) {
          sp.active = false;
          continue;
        }

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = Math.max(0, sp.alpha);
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4b. Update & Render Rockets
      for (let i = 0; i < rockets.length; i++) {
        const r = rockets[i];
        if (!r.active) continue;

        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 6) r.trail.shift();

        // Spawn trailing exhaust sparks
        const spark = rocketSparks.find((s) => !s.active);
        if (spark) spark.init(r.x, r.y, r.color);

        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.16; // gravity deceleration

        // Draw ascending streak
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2.4;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        if (r.trail.length > 1) {
          ctx.moveTo(r.trail[0].x, r.trail[0].y);
          for (let j = 1; j < r.trail.length; j++) {
            ctx.lineTo(r.trail[j].x, r.trail[j].y);
          }
        }
        ctx.stroke();

        // Luminous glowing rocket tip
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = 1.0;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Apex check: explode when climbing ceases or target reached
        if (r.vy >= -0.2 || r.y <= r.targetY) {
          r.active = false;
          createExplosion(r.x, r.y, r.pattern, r.palette);
        }
      }

      // 4c. Update & Render Explosion Particles
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

        // Sub-munition secondary crackles (multi-stage shells)
        if (p.subMunition) {
          p.subDelay--;
          if (p.subDelay <= 0) {
            p.subMunition = false;
            createExplosion(p.x, p.y, "peony", p.subPalette, 12);
          }
        }

        if (p.alpha <= 0) {
          p.active = false;
          continue;
        }

        // Draw motion trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let j = 1; j < p.trail.length; j++) {
            ctx.lineTo(p.trail[j].x, p.trail[j].y);
          }
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha * 0.45);
          ctx.lineWidth = p.size * 0.8;
          ctx.stroke();
        }

        // Draw spark head with festive flicker
        ctx.beginPath();
        const displayAlpha =
          p.flicker && Math.random() > 0.4 ? p.alpha * 0.35 : p.alpha;
        ctx.globalAlpha = Math.max(0, Math.min(1, displayAlpha));
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;

      // 5. Continuous Non-Repetitive Ambient Fireworks Scheduler
      if (baseFreq > 0 && time - lastAmbientTime > baseFreq) {
        lastAmbientTime = time;
        launchSalvo();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("keydown", handleKeyDown);
      if (enableInteraction) {
        window.removeEventListener("click", handleWindowClick);
      }
      if (globalListener) {
        window.removeEventListener("pattas:firework", handleGlobalTrigger);
      }
    };
  }, [
    intensity,
    colorPalette,
    customColors,
    preset,
    particleCount,
    explosionFrequency,
    enableInteraction,
    enableSound,
    performanceMode,
    isReduced,
    patternTypes,
    globalListener,
  ]);

  if (isReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex, ...style }}
      aria-hidden="true"
    />
  );
}
