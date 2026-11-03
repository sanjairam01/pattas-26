"use client";

import { useState, useRef, MouseEvent } from "react";
import { Sparkles, ArrowRight, Clock, Lock } from "lucide-react";
import { EventRegistrationConfig } from "@/data/registration";
import GenderSelectionModal from "./GenderSelectionModal";
import { triggerFirework } from "@/lib/fireworks-dispatcher";

interface RegisterNowButtonProps {
  config?: EventRegistrationConfig;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function RegisterNowButton({
  config,
  className = "",
  size = "md",
}: RegisterNowButtonProps) {
  const [showGenderModal, setShowGenderModal] = useState(false);
  const buttonRef = useRef<HTMLElement>(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  if (!config) return null;

  // Handle magnetic hover on desktop
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!buttonRef.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.18;
    const deltaY = (e.clientY - centerY) * 0.18;
    setMagneticPos({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  const fireCelebration = (e: MouseEvent) => {
    e.stopPropagation();
    const rect = buttonRef.current?.getBoundingClientRect();
    triggerFirework({
      x: rect ? rect.left + rect.width / 2 : window.innerWidth / 2,
      y: rect ? Math.max(80, rect.top - 30) : 250,
      pattern: "golden-rain",
      palette: "gold",
      count: 55,
      soundType: "anar",
    });
  };

  // State: CLOSED
  if (config.registrationStatus === "closed") {
    return (
      <div
        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-semibold ${className}`}
      >
        <Lock className="w-3 h-3 text-red-400" />
        <span>Registration Closed</span>
      </div>
    );
  }

  // State: PENDING
  if (config.registrationStatus === "pending" || (!config.registrationUrl && !config.registrationLinks)) {
    return (
      <div
        className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold ${className}`}
      >
        <Clock className="w-3 h-3 text-amber-400" />
        <span>Registration Link Coming Soon</span>
      </div>
    );
  }

  // Sizing styles
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-[11px]",
    md: "px-5 py-2 text-xs",
    lg: "px-7 py-3 text-sm",
  }[size];

  const commonStyle = {
    transform: `translate(${magneticPos.x}px, ${magneticPos.y}px)`,
    transition: magneticPos.x === 0 ? "transform 0.4s ease-out" : "none",
    background: "linear-gradient(135deg, #FFBD35 0%, #FFD76A 50%, #FF7518 100%)",
  };

  const commonClasses = `group relative overflow-hidden rounded-full font-black uppercase tracking-wider text-fest-midnight transition-all hover:scale-105 active:scale-95 shadow-gold-sm hover:shadow-gold-md flex items-center justify-center gap-1.5 cursor-pointer ${sizeClasses} ${className}`;

  // Gender-based event triggers modal
  if (config.registrationType === "gender_based") {
    return (
      <>
        <button
          ref={buttonRef as React.RefObject<HTMLButtonElement>}
          onClick={(e) => {
            e.stopPropagation();
            setShowGenderModal(true);
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={commonStyle}
          className={commonClasses}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          <Sparkles className="w-3.5 h-3.5 text-fest-midnight animate-pulse" />
          <span>REGISTER NOW</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>

        <GenderSelectionModal
          config={config}
          isOpen={showGenderModal}
          onClose={() => setShowGenderModal(false)}
        />
      </>
    );
  }

  // Direct single registration URL link
  return (
    <a
      ref={buttonRef as React.RefObject<HTMLAnchorElement>}
      href={config.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={fireCelebration}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={commonStyle}
      className={commonClasses}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      <Sparkles className="w-3.5 h-3.5 text-fest-midnight animate-pulse" />
      <span>REGISTER NOW</span>
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
    </a>
  );
}
