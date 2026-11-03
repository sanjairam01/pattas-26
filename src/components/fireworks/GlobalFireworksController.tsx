"use client";

import { useState, useEffect } from "react";
import { Sparkles, Volume2, VolumeX, Flame, Zap } from "lucide-react";
import {
  isSoundEnabled,
  toggleSound,
  triggerCelebration,
  triggerFirework,
  setFireworkIntensity,
  getFireworkIntensity,
  FireworkIntensity,
} from "@/lib/fireworks-dispatcher";

export default function GlobalFireworksController() {
  const [soundOn, setSoundOn] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
    const next = toggleSound();
    setSoundOn(next);
  };

  const handleChangeIntensity = (lvl: FireworkIntensity) => {
    setIntensity(lvl);
    setFireworkIntensity(lvl);
  };

  const handleLaunchBurst = () => {
    if (isFiring) return;
    setIsFiring(true);

    const patterns = [
      "brocade-crown",
      "chrysanthemum",
      "willow",
      "crackling",
      "spherical",
    ] as const;
    const chosen = patterns[Math.floor(Math.random() * patterns.length)];

    triggerFirework({
      x: typeof window !== "undefined" ? window.innerWidth * 0.5 : 500,
      y: 160,
      pattern: chosen,
      palette: "diwali",
      count: 110,
      soundType: "burst",
    });

    setTimeout(() => {
      triggerCelebration("high", "gold");
      setIsFiring(false);
    }, 400);
  };

  const handleLaunchGoldenRain = () => {
    triggerFirework({
      x: typeof window !== "undefined" ? window.innerWidth * 0.5 : 500,
      y: 130,
      pattern: "golden-rain",
      palette: "gold",
      count: 85,
      soundType: "anar",
    });
  };

  return (
    <aside
      aria-label="Festival Fireworks and Audio Controls"
      className="fixed bottom-5 right-5 z-40 select-none transition-all duration-300"
    >
      {isExpanded ? (
        <div className="glass-panel p-4 rounded-3xl border border-fest-gold/50 shadow-gold-lg backdrop-blur-2xl bg-fest-midnight/95 w-72 space-y-3 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-fest-gold/20">
            <div className="flex items-center gap-1.5 text-fest-brightGold text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-fest-gold animate-spin-slow" />
              <span>Diwali Fireworks Engine</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-fest-cream/60 hover:text-white text-xs px-1.5 py-0.5 rounded-full hover:bg-white/10"
              aria-label="Close fireworks controls"
            >
              ✕
            </button>
          </div>

          {/* Special Celebration Barrage Trigger */}
          <button
            onClick={handleLaunchBurst}
            disabled={isFiring}
            className="w-full py-2.5 px-3 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-fest-gold via-fest-brightGold to-fest-orange text-fest-midnight shadow-gold-sm hover:scale-102 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <Zap className={`w-3.5 h-3.5 ${isFiring ? "animate-bounce" : ""}`} />
            <span>{isFiring ? "Igniting..." : "Ignite Sky Fireworks 🎆"}</span>
          </button>

          {/* Golden Rain Shower */}
          <button
            onClick={handleLaunchGoldenRain}
            className="w-full btn-glass-gold py-1.5 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 hover:scale-102 transition-transform"
          >
            <Flame className="w-3 h-3 text-fest-gold" />
            <span>Golden Kamuro Rain</span>
          </button>

          {/* Intensity Selector */}
          <div className="space-y-1 pt-1">
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

          {/* Sound Effect Toggle */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-fest-midnight/60 border border-fest-gold/20">
            <span className="text-xs text-fest-cream/80 flex items-center gap-2">
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-fest-gold animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-fest-cream/40" />
              )}
              <span>Cracker Audio</span>
            </span>
            <button
              onClick={handleToggleSound}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                soundOn
                  ? "bg-fest-gold text-fest-midnight shadow-gold-sm"
                  : "bg-white/10 text-fest-cream/60 hover:bg-white/20"
              }`}
            >
              {soundOn ? "ON" : "OFF"}
            </button>
          </div>

          <p className="text-[10px] text-center text-fest-cream/50 pt-1 border-t border-fest-gold/15">
            Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-fest-gold/30 text-fest-gold font-mono text-[9px]">F</kbd> key or tap the open sky to launch rockets
          </p>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border border-fest-gold/40 shadow-gold-sm hover:border-fest-gold hover:scale-105 active:scale-95 transition-all text-fest-cream bg-fest-midnight/90 backdrop-blur-xl"
          title="Diwali Fireworks & Audio Controls (Press F to launch)"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fest-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-fest-orange" />
          </span>
          <Sparkles className="w-4 h-4 text-fest-gold group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold text-fest-brightGold tracking-wider hidden sm:inline">
            Fireworks
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-fest-royal/80 border border-fest-gold/30 text-fest-gold">
            {intensity}
          </span>
          {soundOn && <Volume2 className="w-3.5 h-3.5 text-fest-gold ml-0.5" />}
        </button>
      )}
    </aside>
  );
}
