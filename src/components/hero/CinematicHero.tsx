"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  Calendar,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { triggerFirework } from "@/lib/fireworks-dispatcher";

export default function CinematicHero() {
  const [stage, setStage] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Fast, crisp cinematic entrance (All stages completed in ~300ms total)
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 30);
    const t2 = setTimeout(() => setStage(2), 70);
    const t3 = setTimeout(() => setStage(3), 120);
    const t4 = setTimeout(() => {
      setStage(4);
      // Trigger opening celebratory firework behind the logo
      triggerFirework({
        x: typeof window !== "undefined" ? window.innerWidth * 0.5 : 500,
        y: 190,
        pattern: "brocade-crown",
        palette: "gold",
        count: 75,
        soundType: "chime",
      });
    }, 160);
    const t5 = setTimeout(() => setStage(5), 200);
    const t6 = setTimeout(() => setStage(6), 250);
    const t7 = setTimeout(() => setStage(7), 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, []);

  // 3D Parallax Tilt based on Mouse Movement
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHoveringLogo(false);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[94vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-8 pb-16 select-none"
    >
      {/* 1. Ambient Radial Vignette & Festive Atmospheric Lighting */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-fest-midnight/40 to-fest-midnight pointer-events-none" />

      {/* Hero Central Content Container (z-20 in front of background fireworks) */}
      <div className="relative z-20 max-w-4xl mx-auto space-y-5">
        {/* Top College Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-fest-gold/40 text-fest-brightGold text-xs font-bold uppercase tracking-widest shadow-gold-sm transition-all duration-300 ease-out ${
            stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-fest-gold animate-ping" />
          <span>PATTAS’26 at MKCE</span>
          <span className="text-fest-cream/60">•</span>
          <span className="text-fest-cream/80">M. Kumarasamy College of Engineering</span>
        </div>

        {/* Master 3D Logo / Typography with Mouse-Responsive Parallax */}
        <div
          className={`relative max-w-xl mx-auto py-1 transition-all duration-300 ease-out transform ${
            stage >= 3 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"
          }`}
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
              isHoveringLogo ? "scale(1.03)" : "scale(1)"
            }`,
            transition: isHoveringLogo ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
          }}
          onMouseEnter={() => setIsHoveringLogo(true)}
          onMouseLeave={() => setIsHoveringLogo(false)}
        >
          {/* Logo container strictly overflow-hidden to prevent any stray elements bleeding onto screen */}
          <div className="relative group cursor-pointer overflow-hidden rounded-2xl">
            <Image
              src="/assets/brand/pattas26-logo.png"
              alt="PATTAS’26 at MKCE Official 3D Typography Logo"
              width={580}
              height={240}
              className="w-full h-auto object-contain filter drop-shadow-2xl hover:scale-[1.02] transition-all duration-300"
              priority
            />
          </div>
        </div>

        {/* 4. Main Heading & Tagline */}
        <div
          className={`space-y-3 transition-all duration-300 ease-out transform ${
            stage >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <h2 className="font-serif font-black text-2xl sm:text-4xl lg:text-5xl tracking-widest text-gold-gradient uppercase drop-shadow-[0_2px_22px_rgba(255,189,53,0.6)]">
            LET THE NIGHT GLOW.
          </h2>

          <p className="font-serif text-sm sm:text-xl text-fest-cream/90 italic font-light tracking-wide text-gold-glow">
            “ Celebrating Light, Tradition &amp; Togetherness ”
          </p>

          {/* 5. Date & Semester Badges */}
          <div
            className={`flex flex-wrap items-center justify-center gap-3 pt-1 font-mono text-xs text-fest-gold/90 tracking-widest transition-all duration-300 ease-out ${
              stage >= 6 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-fest-royal/60 border border-fest-gold/30 shadow-sm hover:border-fest-gold transition-colors">
              <Calendar className="w-3.5 h-3.5 text-fest-orange" />
              <span>04 NOVEMBER 2026</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-fest-maroon/60 border border-fest-gold/30 shadow-sm hover:border-fest-gold transition-colors">
              <Flame className="w-3.5 h-3.5 text-fest-gold" />
              <span>ODD SEMESTER (2026–2027)</span>
            </span>
          </div>
        </div>

        {/* 6. Staggered Call to Action Buttons */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 pt-3 transition-all duration-300 ease-out transform ${
            stage >= 7 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {/* Explore 10 Events Button */}
          <a
            href="#events-explorer"
            className="group relative btn-gold px-7 py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-gold-md flex items-center gap-2 hover:scale-105 active:scale-95 transition-all overflow-hidden"
          >
            <Sparkles className="w-4 h-4 text-fest-midnight fill-fest-midnight animate-spin-slow group-hover:rotate-45 transition-transform" />
            <span className="relative z-10">Explore 10 Events</span>
            {/* Shimmer light sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </a>

          {/* View Schedule Button */}
          <a
            href="#festival-schedule"
            className="group relative btn-glass-gold px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 transition-all overflow-hidden"
          >
            <Calendar className="w-4 h-4 text-fest-brightGold" />
            <span className="relative z-10">View Schedule</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </a>

          {/* Register Now Button */}
          <Link
            href="/registration"
            className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-fest-maroon to-fest-magenta text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 border border-fest-gold/40 shadow-sm hover:brightness-110 hover:scale-105 active:scale-95 transition-all overflow-hidden"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="relative z-10">Register Now</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </Link>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-[10px] text-fest-gold/70 tracking-widest uppercase pointer-events-none">
        <span>Scroll To Discover</span>
        <ChevronDown className="w-4 h-4 text-fest-gold animate-bounce" />
      </div>
    </section>
  );
}
