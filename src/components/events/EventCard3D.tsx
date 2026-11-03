"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Clock, Bookmark, ArrowRight, BookOpen, AlertCircle } from "lucide-react";
import { EventData } from "@/data/events";
import { getEventRegistrationConfig } from "@/data/registration";
import RegisterNowButton from "@/components/registration/RegisterNowButton";

interface EventCard3DProps {
  event: EventData;
  onSelect?: (event: EventData) => void;
}

export default function EventCard3D({ event, onSelect }: EventCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const regConfig = getEventRegistrationConfig(event.id);

  // Sync bookmark state reactively across storage and custom events
  useEffect(() => {
    const checkBookmark = () => {
      try {
        const stored = localStorage.getItem("pattas26_favorites");
        if (stored) {
          const list: string[] = JSON.parse(stored);
          setIsBookmarked(list.includes(event.id));
        } else {
          setIsBookmarked(false);
        }
      } catch {}
    };

    checkBookmark();
    window.addEventListener("pattas26_fav_changed", checkBookmark);
    window.addEventListener("storage", checkBookmark);
    return () => {
      window.removeEventListener("pattas26_fav_changed", checkBookmark);
      window.removeEventListener("storage", checkBookmark);
    };
  }, [event.id]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const toggleBookmark = (e: MouseEvent) => {
    e.stopPropagation();
    try {
      const stored = localStorage.getItem("pattas26_favorites");
      let list: string[] = stored ? JSON.parse(stored) : [];
      if (list.includes(event.id)) {
        list = list.filter((id) => id !== event.id);
        setIsBookmarked(false);
      } else {
        list.push(event.id);
        setIsBookmarked(true);
      }
      localStorage.setItem("pattas26_favorites", JSON.stringify(list));
      window.dispatchEvent(new Event("pattas26_fav_changed"));
    } catch {}
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect?.(event)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
          isHovered ? "translateZ(18px) translateY(-6px)" : "translateZ(0px)"
        }`,
        transition: isHovered
          ? "transform 0.1s ease-out, box-shadow 0.3s ease"
          : "transform 0.5s ease-out, box-shadow 0.5s ease",
      }}
      className={`group relative rounded-3xl p-5 cursor-pointer flex flex-col justify-between overflow-hidden border transition-all ${
        isHovered
          ? "border-fest-gold shadow-gold-md bg-gradient-to-br from-fest-navy/90 via-[#0d224d]/90 to-fest-maroon/40"
          : "border-fest-gold/25 bg-fest-midnight/80 hover:border-fest-gold/60"
      }`}
    >
      {/* Background ambient color glow */}
      <div
        className={`absolute -top-12 -right-12 w-44 h-44 rounded-full blur-[70px] opacity-25 transition-opacity pointer-events-none ${
          isHovered ? "opacity-60" : "opacity-20"
        }`}
        style={{ backgroundColor: event.accentColor }}
      />

      {/* Top Bar: Event Numbers (Poster & PDF) + Bookmark Toggle */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-fest-gold/15">
        <div className="flex items-center gap-2">
          {/* Main Poster Number Badge */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fest-gold to-fest-brightGold text-fest-midnight font-serif font-black text-sm flex items-center justify-center shadow-gold-sm">
            {event.posterNumber}
          </div>
          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-fest-royal/60 border border-fest-gold/30 text-fest-brightGold">
            {event.participationType} Event
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {event.posterNumber !== event.pdfNumber && (
            <span
              title={`Poster #${event.posterNumber} • Rules PDF #${event.pdfNumber}`}
              className="text-[9px] text-fest-gold/70 px-1.5 py-0.5 rounded bg-white/5 border border-fest-gold/20 flex items-center gap-1"
            >
              <AlertCircle className="w-2.5 h-2.5 text-fest-gold" />
              <span>PDF #{event.pdfNumber}</span>
            </span>
          )}

          <button
            onClick={toggleBookmark}
            aria-label={isBookmarked ? "Remove from Saved" : "Save this event"}
            className={`p-1.5 rounded-full transition-colors ${
              isBookmarked
                ? "bg-fest-magenta text-white shadow-sm"
                : "text-fest-cream/50 hover:text-fest-gold hover:bg-white/10"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* Center: Independent 3D Event Illustration (The Main Visual Focus) */}
      <div className="relative z-10 py-3 flex flex-col items-center">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-1.5 transition-all duration-300 pointer-events-none">
          {/* Radiant festival back-glow on hover */}
          <div
            className="absolute inset-2 rounded-full blur-2xl opacity-20 group-hover:opacity-65 transition-opacity duration-300 pointer-events-none"
            style={{ backgroundColor: event.accentColor || "#FFBD35" }}
          />
          <Image
            src={event.iconImage || event.posterImage}
            alt={`${event.title} 3D festival illustration`}
            width={160}
            height={160}
            className="w-full h-full object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_12px_24px_rgba(255,189,53,0.4)] transition-all duration-300"
            priority={event.numericId <= 4}
          />
        </div>

        <div className="mt-3 text-center">
          <h3 className="font-serif font-black text-lg sm:text-xl text-fest-cream group-hover:text-gold-gradient transition-all line-clamp-1">
            {event.title}
          </h3>
          <p className="text-[11px] text-fest-gold/80 italic mt-0.5 line-clamp-1">
            &ldquo;{event.tagline}&rdquo;
          </p>
        </div>
      </div>

      {/* Meta Specs: Venue, Capacity, Duration */}
      <div className="relative z-10 space-y-2.5 pt-2 border-t border-fest-gold/15">
        <div className="space-y-1 text-xs text-fest-cream/80">
          <div className="flex items-center gap-1.5 truncate text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-fest-gold flex-shrink-0" />
            <span className="font-medium text-fest-cream">{event.venue}</span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-fest-cream/70">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-fest-brightGold" />
              <span>{event.maxCapacity}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-fest-orange" />
              <span>{event.duration}</span>
            </span>
          </div>
        </div>

        {/* 3 Explicit Event Actions: VIEW DETAILS, VIEW RULES, REGISTER NOW */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-1.5">
            <Link
              href={`/events/${event.id}`}
              onClick={(e) => e.stopPropagation()}
              className="btn-glass-gold py-1.5 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1 hover:border-fest-brightGold"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(event);
              }}
              className="py-1.5 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center bg-white/5 border border-fest-gold/30 text-fest-cream/90 hover:bg-white/10 hover:border-fest-gold transition-colors flex items-center justify-center gap-1"
            >
              <BookOpen className="w-3 h-3 text-fest-gold" />
              <span>View Rules</span>
            </button>
          </div>

          {/* Master Event-Wise Direct Register Button */}
          <div onClick={(e) => e.stopPropagation()} className="w-full">
            <RegisterNowButton
              config={regConfig}
              size="sm"
              className="w-full text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
