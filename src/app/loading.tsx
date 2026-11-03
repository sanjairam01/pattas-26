import Image from "next/image";
import { Flame } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-fest-midnight text-fest-cream select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 rounded-full bg-fest-gold/15 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-72 h-72 rounded-full bg-fest-maroon/20 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md mx-auto space-y-6">
        {/* College Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-fest-gold/40 text-fest-brightGold text-[11px] font-bold uppercase tracking-widest shadow-gold-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-fest-gold animate-ping" />
          <span>M. Kumarasamy College of Engineering</span>
        </div>

        {/* Master PATTAS'26 3D Logo */}
        <div className="relative w-64 sm:w-80 h-24 sm:h-28 transition-transform duration-300">
          <Image
            src="/assets/brand/pattas26-logo.png"
            alt="PATTAS’26 at MKCE Official Logo"
            fill
            className="object-contain filter drop-shadow-[0_0_25px_rgba(255,189,53,0.7)]"
            priority
          />
        </div>

        {/* Glowing Diya Flame Animation */}
        <div className="relative flex flex-col items-center">
          <div className="relative w-6 h-9 flex items-center justify-center">
            <span className="absolute -top-1 w-3 h-5 rounded-full bg-gradient-to-t from-fest-orange via-fest-gold to-white animate-pulse blur-[1px]" />
            <Flame className="w-7 h-7 text-fest-gold fill-fest-brightGold drop-shadow-[0_0_15px_rgba(255,189,53,0.95)] animate-pulse" />
          </div>
          <div className="w-12 h-3.5 rounded-b-[20px] bg-gradient-to-b from-[#c45318] to-[#3a1002] border-t border-fest-brightGold" />
        </div>

        {/* Official Brand Name & Tagline */}
        <div className="space-y-1.5">
          <h1 className="font-serif font-black text-2xl sm:text-3xl tracking-wider text-gold-gradient uppercase drop-shadow-[0_2px_15px_rgba(255,189,53,0.6)]">
            PATTAS’26 at MKCE
          </h1>
          <p className="font-serif italic text-xs sm:text-sm text-fest-brightGold tracking-wide">
            Celebrating Light, Tradition &amp; Togetherness
          </p>
        </div>

        {/* Loading Spinner Ring & Progress Pulse */}
        <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-fest-cream/60">
          <span className="w-2 h-2 rounded-full bg-fest-gold animate-ping" />
          <span>Loading festival experience...</span>
        </div>
      </div>
    </div>
  );
}

