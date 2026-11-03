"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles, ArrowRight, ShieldCheck, Users } from "lucide-react";
import { EventRegistrationConfig } from "@/data/registration";
import { triggerFirework } from "@/lib/fireworks-dispatcher";

interface GenderSelectionModalProps {
  config: EventRegistrationConfig;
  isOpen: boolean;
  onClose: () => void;
}

export default function GenderSelectionModal({
  config,
  isOpen,
  onClose,
}: GenderSelectionModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Lock body scroll while modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const handleGenderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerFirework({
      pattern: "golden-rain",
      palette: "gold",
      count: 45,
      soundType: "anar",
    });
    // Gracefully close dialog after navigating in new tab
    setTimeout(() => {
      onClose();
    }, 350);
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-modal-title"
      data-lenis-prevent="true"
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-black/80 transition-all duration-300 animate-in fade-in"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      onClick={onClose}
    >
      {/* Ambient background glow behind modal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-radial-gradient from-fest-gold/20 via-fest-orange/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Standalone Central Card with Rich Golden Glassmorphism */}
      <div
        data-lenis-prevent="true"
        className="relative max-w-lg w-full rounded-3xl border-2 border-fest-gold p-6 sm:p-8 space-y-6 shadow-[0_0_60px_rgba(255,189,53,0.35)] animate-in zoom-in-95 duration-200 text-center bg-gradient-to-b from-[#102347] via-[#08152e] to-[#040b17] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Diagonal Golden Sheen */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-fest-gold/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-fest-magenta/15 rounded-full blur-2xl pointer-events-none" />

        {/* Circular Close Button (Always visible at top-right) */}
        <button
          onClick={onClose}
          aria-label="Close category selection"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-fest-gold hover:text-fest-midnight border border-fest-gold/40 text-fest-cream flex items-center justify-center transition-all duration-200 cursor-pointer z-30 shadow-md group"
        >
          <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        {/* Header Motifs & Event Badge */}
        <div className="space-y-3 pt-1">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-fest-gold/25 via-fest-orange/20 to-fest-brightGold/30 mx-auto flex items-center justify-center border-2 border-fest-gold/50 shadow-gold-sm">
            <Users className="w-7 h-7 text-fest-brightGold" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fest-royal/90 border border-fest-gold/40 text-fest-brightGold text-[11px] font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3 h-3 text-fest-gold animate-spin-slow" />
            <span>Event {config.posterNumber} • Category Selection</span>
          </div>

          <h3
            id="category-modal-title"
            className="font-serif font-black text-2xl sm:text-3xl text-gold-gradient tracking-wide"
          >
            {config.eventName}
          </h3>

          <p className="text-xs sm:text-sm text-fest-cream/80 max-w-sm mx-auto leading-relaxed">
            This competition features dedicated brackets for boys and girls. Please select your participant category below to open the official registration form:
          </p>
        </div>

        {/* Category Selection Action Buttons */}
        <div className="space-y-3.5 pt-1">
          {/* BOYS REGISTRATION CARD */}
          {config.registrationLinks?.boys && (
            <a
              href={config.registrationLinks.boys}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGenderClick}
              className="group relative w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/80 via-blue-900/60 to-[#0a1a38] border-2 border-blue-500/40 hover:border-fest-brightGold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-left flex items-center justify-between gap-3 shadow-md overflow-hidden cursor-pointer"
            >
              <div className="relative z-10 flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0 text-2xl shadow-sm group-hover:scale-105 transition-transform">
                  👦
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif font-black text-sm sm:text-base text-blue-100 group-hover:text-fest-brightGold transition-colors tracking-wide truncate">
                    BOYS REGISTRATION
                  </div>
                  <div className="text-[11px] sm:text-xs text-blue-200/75 truncate mt-0.5">
                    Dedicated Google Form for Boys Squads
                  </div>
                </div>
              </div>

              <div className="relative z-10 shrink-0 px-3.5 py-1.5 rounded-full bg-fest-gold text-fest-midnight font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm group-hover:bg-fest-brightGold group-hover:scale-105 transition-all">
                <span>Open Form</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Shimmer light sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
            </a>
          )}

          {/* GIRLS REGISTRATION CARD */}
          {config.registrationLinks?.girls && (
            <a
              href={config.registrationLinks.girls}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGenderClick}
              className="group relative w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#3d0d27]/90 via-[#4f1033]/70 to-[#29071a] border-2 border-pink-500/40 hover:border-fest-brightGold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-left flex items-center justify-between gap-3 shadow-md overflow-hidden cursor-pointer"
            >
              <div className="relative z-10 flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center shrink-0 text-2xl shadow-sm group-hover:scale-105 transition-transform">
                  👧
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif font-black text-sm sm:text-base text-pink-100 group-hover:text-fest-brightGold transition-colors tracking-wide truncate">
                    GIRLS REGISTRATION
                  </div>
                  <div className="text-[11px] sm:text-xs text-pink-200/75 truncate mt-0.5">
                    Dedicated Google Form for Girls Squads
                  </div>
                </div>
              </div>

              <div className="relative z-10 shrink-0 px-3.5 py-1.5 rounded-full bg-fest-gold text-fest-midnight font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm group-hover:bg-fest-brightGold group-hover:scale-105 transition-all">
                <span>Open Form</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Shimmer light sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
            </a>
          )}
        </div>

        {/* Security & Authenticity Footer */}
        <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-fest-cream/60 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-fest-gold" />
          <span>Official Google Form • Authenticated by MKCE Agastya Arts Club</span>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
