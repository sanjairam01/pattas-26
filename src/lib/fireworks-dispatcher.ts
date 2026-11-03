"use client";

export type FireworkPattern =
  | "chrysanthemum"
  | "spherical"
  | "peony"
  | "palm-tree"
  | "willow"
  | "brocade-crown"
  | "multi-stage"
  | "crackling"
  | "ring"
  | "starburst"
  | "fountain"
  | "meteors"
  | "golden-rain";

export type FireworkPalette =
  | "gold"
  | "diwali"
  | "royal"
  | "magical"
  | "red"
  | "blue"
  | "pink"
  | "purple"
  | "custom";

export type FireworkIntensity = "subtle" | "medium" | "high" | "grand";

let currentIntensity: FireworkIntensity = "grand";

export function getFireworkIntensity(): FireworkIntensity {
  if (typeof window !== "undefined") {
    try {
      const v2Migrated = localStorage.getItem("pattas26_intensity_v2");
      if (!v2Migrated) {
        localStorage.setItem("pattas26_firework_intensity", "grand");
        localStorage.setItem("pattas26_intensity_v2", "true");
        currentIntensity = "grand";
        return "grand";
      }
      const stored = localStorage.getItem("pattas26_firework_intensity") as FireworkIntensity;
      if (stored && ["subtle", "medium", "high", "grand"].includes(stored)) {
        currentIntensity = stored;
        return stored;
      }
    } catch {}
  }
  return currentIntensity;
}

export function setFireworkIntensity(intensity: FireworkIntensity): void {
  currentIntensity = intensity;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("pattas26_firework_intensity", intensity);
      localStorage.setItem("pattas26_intensity_v2", "true");
      window.dispatchEvent(
        new CustomEvent("pattas:intensity-change", { detail: { intensity } })
      );
    } catch {}
  }
}

export const PALETTES: Record<FireworkPalette, string[]> = {
  gold: ["#FFD700", "#FFB000", "#FFF0A0", "#FFA500", "#FFE87C"],
  diwali: ["#FF7518", "#FFD700", "#FF355E", "#FFBD35", "#E82C91", "#FF9933"],
  royal: ["#4267FF", "#A855F7", "#00D4FF", "#6366F1", "#38BDF8", "#C084FC"],
  magical: ["#FF42B3", "#A855F7", "#FFD700", "#00F5D4", "#F72585", "#7209B7"],
  red: ["#FF204E", "#FF3366", "#FF1744", "#D50000", "#FF8597"],
  blue: ["#00D4FF", "#38BDF8", "#00B4D8", "#2563EB", "#90E0EF"],
  pink: ["#FF3E9D", "#F72585", "#FF69B4", "#FF1493", "#FFA6D5"],
  purple: ["#A855F7", "#7C3AED", "#9333EA", "#C084FC", "#D8B4FE"],
  custom: ["#FFD700", "#FF7518", "#E82C91", "#00D4FF"],
};

export interface TriggerFireworkOptions {
  x?: number; // 0 to 1 relative or px
  y?: number;
  pattern?: FireworkPattern;
  palette?: FireworkPalette;
  colors?: string[];
  count?: number;
  soundType?: "launch" | "burst" | "chime" | "anar" | "grand" | "none";
  size?: number;
  velocityMultiplier?: number;
}

let audioCtx: AudioContext | null = null;
let soundEnabled = false;
let globalVolume = 0.4;

// Initialize sound preferences safely on client
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem("pattas26_firework_sound");
    if (saved !== null) {
      soundEnabled = saved === "true";
    }
    const savedVol = localStorage.getItem("pattas26_firework_volume");
    if (savedVol !== null) {
      globalVolume = parseFloat(savedVol) || 0.4;
    }
  } catch {}
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("pattas26_firework_sound", String(enabled));
      window.dispatchEvent(new CustomEvent("pattas:sound-change", { detail: { soundEnabled } }));
    } catch {}
  }
}

export function toggleSound(): boolean {
  setSoundEnabled(!soundEnabled);
  return soundEnabled;
}

export function getVolume(): number {
  return globalVolume;
}

export function setVolume(vol: number): void {
  globalVolume = Math.max(0, Math.min(1, vol));
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("pattas26_firework_volume", String(globalVolume));
    } catch {}
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Web Audio procedural rocket launch sound (whoosh / whistle upward)
 */
export function playLaunchSound(volMultiplier = 1) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.32);

    const targetGain = 0.09 * globalVolume * volMultiplier;
    gain.gain.setValueAtTime(targetGain, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.33);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.34);
  } catch {}
}

/**
 * Web Audio procedural explosion cracker sound
 */
export function playBurstSound(
  type: "chrysanthemum" | "peony" | "crackle" | "thud" = "chrysanthemum",
  volMultiplier = 1
) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Low Thud / Boom
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(type === "thud" ? 90 : 130, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.3);

    const baseGain = (type === "thud" ? 0.35 : 0.25) * globalVolume * volMultiplier;
    oscGain.gain.setValueAtTime(baseGain, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.36);

    // 2. High Cracker Noise Burst
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    const decayFactor = type === "crackle" ? 0.04 : 0.07;
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * decayFactor));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = type === "crackle" ? "highpass" : "lowpass";
    filter.frequency.setValueAtTime(type === "crackle" ? 1800 : 900, now);
    filter.frequency.linearRampToValueAtTime(200, now + 0.28);

    const noiseGain = ctx.createGain();
    const targetNoiseGain = 0.28 * globalVolume * volMultiplier;
    noiseGain.gain.setValueAtTime(targetNoiseGain, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.005, now + 0.32);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
  } catch {}
}

/**
 * Web Audio procedural celebratory chime / bell for Diya and wishes
 */
export function playCelebrationChime(volMultiplier = 1) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Diwali harmony)

    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + index * 0.04);

      const targetGain = 0.08 * globalVolume * volMultiplier;
      gain.gain.setValueAtTime(0.001, now + index * 0.04);
      gain.gain.linearRampToValueAtTime(targetGain, now + index * 0.04 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.04 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + index * 0.04);
      osc.stop(now + index * 0.04 + 0.85);
    });
  } catch {}
}

/**
 * Dispatch firework request to UniversalFireworks instances across the page
 */
export function triggerFirework(options: TriggerFireworkOptions = {}) {
  if (typeof window === "undefined") return;

  // Sound triggers
  if (options.soundType === "chime") {
    playCelebrationChime();
  } else if (options.soundType === "anar") {
    playBurstSound("crackle", 0.8);
  } else if (options.soundType !== "none") {
    if (options.soundType === "launch") {
      playLaunchSound();
    } else {
      playBurstSound("chrysanthemum");
    }
  }

  // Dispatch DOM event for UniversalFireworks canvases
  window.dispatchEvent(
    new CustomEvent("pattas:firework", {
      detail: {
        x: options.x ?? (window.innerWidth ? Math.random() * window.innerWidth : 400),
        y: options.y ?? (window.innerHeight ? Math.random() * window.innerHeight * 0.5 + 80 : 250),
        pattern: options.pattern ?? "chrysanthemum",
        palette: options.palette ?? "diwali",
        colors: options.colors,
        count: options.count,
        size: options.size,
        velocityMultiplier: options.velocityMultiplier,
      },
    })
  );
}

/**
 * Trigger an epic multi-burst celebration
 */
export function triggerCelebration(
  intensity: "subtle" | "medium" | "high" | "grand" = "high",
  palette: FireworkPalette = "diwali"
) {
  if (typeof window === "undefined") return;
  const burstCount = intensity === "subtle" ? 2 : intensity === "medium" ? 4 : intensity === "high" ? 7 : 12;
  const patterns: FireworkPattern[] = [
    "chrysanthemum",
    "peony",
    "spherical",
    "palm-tree",
    "willow",
    "ring",
    "starburst",
    "golden-rain",
    "multi-stage",
  ];

  playLaunchSound();
  setTimeout(() => playCelebrationChime(1.2), 300);

  for (let i = 0; i < burstCount; i++) {
    setTimeout(() => {
      const x = Math.random() * (window.innerWidth - 200) + 100;
      const y = Math.random() * (window.innerHeight * 0.55) + 60;
      const pattern = patterns[Math.floor(Math.random() * patterns.length)];
      triggerFirework({
        x,
        y,
        pattern,
        palette,
        soundType: i % 2 === 0 ? "burst" : "none",
        count: intensity === "grand" ? 90 : 55,
      });
    }, i * 220);
  }
}

