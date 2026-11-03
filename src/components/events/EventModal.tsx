"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  X,
  MapPin,
  Users,
  Clock,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { EventData } from "@/data/events";
import { getEventRegistrationConfig } from "@/data/registration";
import RegisterNowButton from "@/components/registration/RegisterNowButton";

interface EventModalProps {
  event: EventData | null;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!event) return;

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
  }, [event, onClose]);

  if (!event || !mounted) return null;

  const regConfig = getEventRegistrationConfig(event.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${event.title} – PATTAS’26 MKCE`,
          text: `Participate in ${event.title} at PATTAS’26 on 04 November 2026 at MKCE Karur!`,
          url: window.location.origin + `/events/${event.id}`,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin + `/events/${event.id}`);
      alert("Event link copied to clipboard!");
    }
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 sm:py-6 bg-black/80 transition-all duration-300 animate-in fade-in"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      onClick={onClose}
    >
      {/* Background ambient radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient from-fest-gold/15 via-fest-orange/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Main Modal Card Container with fixed max-height & flex-col layout */}
      <div
        data-lenis-prevent="true"
        className="glass-panel max-w-3xl w-full max-h-[92vh] sm:max-h-[88vh] rounded-3xl border-2 border-fest-gold relative shadow-[0_0_60px_rgba(255,189,53,0.35)] bg-gradient-to-b from-[#102347] via-[#08152e] to-[#040b17] animate-in zoom-in-95 duration-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. FIXED TOP HEADER BAR (Always visible) */}
        <div className="p-5 sm:p-6 pb-4 border-b border-fest-gold/20 flex-shrink-0 relative z-20 bg-[#0c1c3d]/60 backdrop-blur-sm">
          {/* Prominent Circular Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Rules Modal"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-fest-gold hover:text-fest-midnight border border-fest-gold/40 text-fest-gold flex items-center justify-center transition-all cursor-pointer z-30 shadow-md group"
          >
            <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pr-10 sm:pr-12">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-40 pointer-events-none"
                style={{ backgroundColor: event.accentColor || "#FFBD35" }}
              />
              <Image
                src={event.iconImage || event.posterImage}
                alt={event.title}
                width={64}
                height={64}
                className="w-full h-full object-contain filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)]"
              />
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-fest-gold text-fest-midnight text-xs font-black uppercase tracking-wider">
                  Event {event.posterNumber}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-fest-maroon/60 border border-fest-gold/30 text-fest-brightGold text-[11px] font-bold uppercase">
                  {event.participationType} ({event.teamSize})
                </span>
                {event.posterNumber !== event.pdfNumber && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-900/60 border border-blue-400/40 text-blue-200 text-[10px]">
                    PDF Rules #{event.pdfNumber}
                  </span>
                )}
              </div>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-gold-gradient truncate">
                {event.title}
              </h2>
              <p className="text-xs sm:text-sm text-fest-gold/90 italic truncate">
                &ldquo;{event.tagline}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* 2. SCROLLABLE MIDDLE CONTENT AREA (Smooth internal scroll with mousewheel & touch isolation) */}
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="p-5 sm:p-7 overflow-y-auto overscroll-contain flex-1 space-y-6"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-fest-midnight/60 border border-fest-gold/20">
              <div className="flex items-center gap-1.5 text-fest-gold text-xs font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Venue</span>
              </div>
              <p className="text-xs text-fest-cream font-medium">{event.venue}</p>
            </div>

            <div className="p-3 rounded-xl bg-fest-midnight/60 border border-fest-gold/20">
              <div className="flex items-center gap-1.5 text-fest-brightGold text-xs font-semibold mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>Capacity</span>
              </div>
              <p className="text-xs text-fest-cream font-medium">{event.maxCapacity}</p>
            </div>

            <div className="p-3 rounded-xl bg-fest-midnight/60 border border-fest-gold/20">
              <div className="flex items-center gap-1.5 text-fest-orange text-xs font-semibold mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Duration</span>
              </div>
              <p className="text-xs text-fest-cream font-medium">{event.duration}</p>
            </div>

            <div className="p-3 rounded-xl bg-fest-midnight/60 border border-fest-gold/20">
              <div className="flex items-center gap-1.5 text-fest-magenta text-xs font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Festival Slot</span>
              </div>
              <p className="text-xs text-fest-cream font-medium">{event.timing}</p>
            </div>
          </div>

          {/* Detailed Event Description */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-fest-brightGold uppercase tracking-wider">
              About The Event
            </h4>
            <p className="text-xs sm:text-sm text-fest-cream/80 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Official Rules from PDF */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-fest-brightGold uppercase tracking-wider">
              Official Rules &amp; Regulations
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-fest-cream/80">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-fest-gold/20 text-fest-gold text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-fest-gold/30">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Permitted Materials & Restrictions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Permitted Materials</span>
              </div>
              <ul className="text-xs text-fest-cream/80 space-y-1.5">
                {event.materialsPermitted.map((m, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/25 border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Strict Restrictions</span>
              </div>
              <ul className="text-xs text-fest-cream/80 space-y-1.5">
                {event.restrictions.map((r, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-400">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 3. STICKY BOTTOM ACTION BAR (Always visible on all screens) */}
        <div className="p-4 sm:p-5 border-t border-fest-gold/25 bg-[#050e24]/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 flex-shrink-0 z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-fest-gold/30 text-fest-cream hover:text-white transition-all cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={handleShare}
              className="btn-glass-gold px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:border-fest-brightGold"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          {/* Master Registration Action Button (Always reachable) */}
          <div className="flex items-center">
            <RegisterNowButton
              config={regConfig}
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
