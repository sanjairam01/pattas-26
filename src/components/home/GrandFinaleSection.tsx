"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Flame, Share2, Calendar, ShieldCheck } from "lucide-react";
import { triggerCelebration, triggerFirework } from "@/lib/fireworks-dispatcher";

export default function GrandFinaleSection() {
  const [isIgnited, setIsIgnited] = useState(false);

  const handleIgniteFinale = () => {
    setIsIgnited(true);
    triggerCelebration("grand", "diwali");

    // Sequential multi-stage barrage
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        triggerFirework({
          x: (window.innerWidth * (0.2 + i * 0.12)),
          y: Math.random() * 200 + 100,
          pattern: i % 2 === 0 ? "golden-rain" : "multi-stage",
          palette: i % 3 === 0 ? "gold" : "royal",
          count: 85,
          soundType: "burst",
        });
      }, i * 350);
    }

    setTimeout(() => setIsIgnited(false), 4000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator
        .share({
          title: "PATTAS’26 — MKCE Diwali Festival",
          text: "Let the night glow! Celebrating Light, Tradition & Togetherness at M. Kumarasamy College of Engineering on 04 November 2026.",
          url: window.location.origin,
        })
        .catch(() => {});
    } else {
      triggerFirework({ soundType: "chime" });
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
      {/* Background radial dramatic glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#140624]/60 to-[#050b18] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-fest-gold/10 blur-[140px] pointer-events-none" />

      {/* Decorative Rotating Rangoli Base */}
      <div className="absolute bottom-[-160px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none opacity-25 animate-spin-very-slow">
        <svg viewBox="0 0 400 400" className="w-full h-full text-fest-gold">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6,6" />
          <circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
          {[...Array(16)].map((_, i) => (
            <path
              key={i}
              d={`M200,200 L${200 + 175 * Math.cos((i * Math.PI) / 8)},${200 + 175 * Math.sin((i * Math.PI) / 8)}`}
              stroke="currentColor"
              strokeWidth="0.8"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Top Flame Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fest-maroon/70 border border-fest-gold/40 text-fest-brightGold text-xs font-bold uppercase tracking-widest shadow-gold-sm">
          <Flame className="w-4 h-4 text-fest-orange animate-flicker" />
          <span>The Grand Festival Finale</span>
        </div>

        {/* 3D Master Logo with radiant aura */}
        <div className="relative max-w-lg mx-auto py-2">
          <Image
            src="/assets/brand/pattas26-logo.png"
            alt="PATTAS'26 Official Logo"
            width={520}
            height={215}
            className={`w-full h-auto object-contain mx-auto filter drop-shadow-[0_0_40px_rgba(255,189,53,0.7)] transition-transform duration-700 ${
              isIgnited ? "scale-105 brightness-125" : "hover:scale-102"
            }`}
          />
        </div>

        {/* Signature Finale Heading */}
        <div className="space-y-3">
          <h2 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-widest text-gold-gradient uppercase drop-shadow-[0_4px_30px_rgba(255,189,53,0.6)]">
            CELEBRATE THE LIGHT. SHARE THE JOY.
          </h2>
          <p className="font-serif text-base sm:text-2xl text-fest-cream/90 italic font-light tracking-wide text-gold-glow max-w-2xl mx-auto">
            “ May the radiant spirit of PATTAS’26 illuminate your path with triumph, wisdom, and eternal friendship. ”
          </p>
        </div>

        {/* Interactive Grand Spectacle Trigger */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={handleIgniteFinale}
            disabled={isIgnited}
            className="btn-gold px-8 py-4 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-gold-lg flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-fest-midnight fill-fest-midnight animate-spin-slow" />
            <span>{isIgnited ? "Fireworks Unleashed! 🎆" : "Ignite Grand Spectacle 🎆"}</span>
          </button>

          <Link
            href="/registration"
            className="btn-glass-gold px-7 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-fest-brightGold" />
            <span>Official Registration</span>
          </Link>

          <button
            onClick={handleShare}
            className="p-4 rounded-full glass-panel border border-fest-gold/30 text-fest-cream/80 hover:text-fest-gold hover:border-fest-gold hover:scale-105 transition-all"
            title="Share PATTAS'26 with Friends"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Date and Venue confirmation */}
        <div className="pt-6 border-t border-fest-gold/20 flex flex-wrap items-center justify-center gap-6 text-xs text-fest-cream/70 font-mono tracking-wider">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-fest-gold" />
            <span>04 NOVEMBER 2026</span>
          </span>
          <span>•</span>
          <span>M. KUMARASAMY COLLEGE OF ENGINEERING</span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-fest-brightGold">
            <Sparkles className="w-3.5 h-3.5 text-fest-gold" />
            <span>AGASTYA FINE ARTS CLUB</span>
          </span>
        </div>
      </div>
    </section>
  );
}

