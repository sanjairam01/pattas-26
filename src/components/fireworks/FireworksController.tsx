"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Flame,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react";
import {
  triggerFirework,
  triggerCelebration,
  isSoundEnabled,
  toggleSound,
  setFireworkIntensity,
  getFireworkIntensity,
  FireworkIntensity,
} from "@/lib/fireworks-dispatcher";

export default function FireworksController() {
  const [isOpen, setIsOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [intensity, setIntensity] = useState<FireworkIntensity>("high");
  const [isFiring, setIsFiring] = useState(false);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    setIntensity(getFireworkIntensity());

    const handleSoundChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.soundEnabled !== undefined) {
        setSoundOn(detail.soundEnabled);
      }
    };

    const handleIntensityChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && detail.intensity) {
        setIntensity(detail.intensity);
      }
    };

    window.addEventListener("pattas:sound-change", handleSoundChange);
    window.addEventListener("pattas:intensity-change", handleIntensityChange);

    return () => {
      window.removeEventListener("pattas:sound-change", handleSoundChange);
      window.removeEventListener("pattas:intensity-change", handleIntensityChange);
    };
  }, []);

  const handleToggleSound = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  const handleChangeIntensity = (val: FireworkIntensity) => {
    setIntensity(val);
    setFireworkIntensity(val);
  };

  // Launch a special celebratory firework sequence
  const handleLaunchSpecial = () => {
    if (isFiring) return;
    setIsFiring(true);

    const patterns = [
      "brocade-crown",
      "chrysanthemum",
      "willow",
      "crackling",
      "spherical",
    ] as const;

    const chosenPattern = patterns[Math.floor(Math.random() * patterns.length)];

    // Launch multiple celebratory shells
    triggerFirework({
      x: typeof window !== "undefined" ? window.innerWidth * 0.5 : 500,
      y: 160,
      pattern: chosenPattern,
      palette: "diwali",
      count: 120,
      soundType: "burst",
    });

    setTimeout(() => {
      triggerCelebration("high", "gold");
      setIsFiring(false);
    }, 450);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      {/* Expanded Control Panel */}
      {isOpen ? (
        <div className="glass-panel p-4 rounded-3xl border border-fest-gold/50 shadow-gold-lg backdrop-blur-2xl bg-fest-midnight/95 w-72 space-y-3.5 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-fest-gold/20">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-fest-brightGold">
              <Sparkles className="w-3.5 h-3.5 text-fest-gold animate-spin-slow" />
              <span>Fireworks Engine</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-fest-cream/60 hover:text-fest-gold hover:bg-white/10 transition-colors"
              title="Collapse"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Launch Special Barrage Button */}
          <button
            onClick={handleLaunchSpecial}
            disabled={isFiring}
            className="w-full py-2.5 px-3 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-fest-gold via-fest-brightGold to-fest-orange text-fest-midnight shadow-gold-sm hover:scale-102 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <Zap className={`w-3.5 h-3.5 ${isFiring ? "animate-bounce" : ""}`} />
            <span>{isFiring ? "Igniting..." : "Ignite Sky Fireworks 🎆"}</span>
          </button>

          {/* Intensity Selector */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-fest-cream/70 uppercase tracking-wider block">
              Sky Intensity
            </span>
            <div className="grid grid-cols-4 gap-1">
              {(["subtle", "medium", "high", "grand"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleChangeIntensity(lvl)}
                  className={`py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                    intensity === lvl
                      ? "bg-fest-gold text-fest-midnight font-extrabold shadow-sm"
                      : "bg-white/5 text-fest-cream/70 hover:bg-white/10 hover:text-white border border-fest-gold/20"
                  }`}
                >
                  {lvl === "grand" ? "Grand" : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Audio Sound Toggle */}
          <div className="flex items-center justify-between pt-1 border-t border-fest-gold/15">
            <span className="text-[10px] font-mono text-fest-cream/70 uppercase tracking-wider">
              Festive Audio
            </span>
            <button
              onClick={handleToggleSound}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                soundOn
                  ? "bg-fest-royal/80 border-fest-gold text-fest-brightGold"
                  : "bg-white/5 border-fest-gold/20 text-fest-cream/60 hover:text-fest-cream"
              }`}
            >
              {soundOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-fest-gold animate-pulse" />
                  <span className="font-mono text-[10px]">Sound On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px]">Muted</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Collapsed Floating Pill */
        <button
          onClick={() => setIsOpen(true)}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border border-fest-gold/40 hover:border-fest-gold text-fest-brightGold text-xs font-bold uppercase tracking-wider shadow-gold-sm hover:scale-105 active:scale-95 transition-all bg-fest-midnight/90 backdrop-blur-xl cursor-pointer"
          title="Open Fireworks Controller"
        >
          <Flame className="w-3.5 h-3.5 text-fest-gold group-hover:text-fest-brightGold animate-flicker" />
          <span className="hidden sm:inline">Fireworks</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-fest-royal/80 border border-fest-gold/30 text-fest-gold">
            {intensity}
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-fest-gold/70 group-hover:text-fest-gold" />
        </button>
      )}
    </div>
  );
}

