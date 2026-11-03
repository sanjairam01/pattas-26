"use client";

import { useState, useEffect } from "react";
import {
  Flame,
  Calendar,
  Music,
} from "lucide-react";
import CinematicHero from "@/components/hero/CinematicHero";
import UniversalFireworks from "@/components/fireworks/UniversalFireworks";
import FestivalCountdown from "@/components/hero/FestivalCountdown";
import EventCard3D from "@/components/events/EventCard3D";
import EventModal from "@/components/events/EventModal";
import ScheduleTimeline from "@/components/schedule/ScheduleTimeline";
import RangoliCreator from "@/components/interactive/RangoliCreator";
import RegistrationSection from "@/components/registration/RegistrationSection";
import GrandFinaleSection from "@/components/home/GrandFinaleSection";
import FinaleCountdownTimer from "@/components/events/FinaleCountdownTimer";
import { EVENTS, EventData } from "@/data/events";
import { triggerFirework } from "@/lib/fireworks-dispatcher";

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [eventFilter, setEventFilter] = useState<"All" | "Team" | "Individual">("All");

  useEffect(() => {
    document.title = "PATTAS’26 at MKCE";
  }, []);

  const filteredEvents = EVENTS.filter(
    (e) => eventFilter === "All" || e.participationType === eventFilter
  );

  // Strictly sort by ascending permanent numerical event ID (1 to 10)
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  return (
    <div className="relative overflow-hidden">
      {/* 1. Universal Realistic Diwali Fireworks Engine (Full-screen Background) */}
      <UniversalFireworks
        preset="sky"
        colorPalette="diwali"
        intensity="grand"
        enableInteraction={true}
        zIndex={0}
      />

      {/* 3. CINEMATIC HERO SECTION (3D Diya, Rotating Conic Beams, 3D Logo Parallax, Animated Typography) */}
      <CinematicHero />

      {/* 4. FESTIVAL COUNTDOWN SECTION */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <FestivalCountdown />
      </section>

      {/* 5. EVENT EXPLORER SECTION (All 10 Events with 3D Cards) */}
      <section id="events-explorer" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-royal/60 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-fest-gold" />
            <span>The Competitive Arena</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-gold-gradient">
            Explore All 10 PATTAS’26 Events
          </h2>
          <p className="text-xs sm:text-sm text-fest-cream/75 leading-relaxed">
            From Good vs Evil Face Painting to the high-stakes Water Cup Relay and Tower Game.
            Experience the vibrant traditions and electrifying student talent at MKCE.
          </p>

          {/* Event Filter Pills */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {(["All", "Team", "Individual"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setEventFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${eventFilter === f
                  ? "bg-fest-gold text-fest-midnight shadow-gold-sm"
                  : "bg-fest-midnight/80 text-fest-cream/70 hover:text-white border border-fest-gold/20"
                  }`}
              >
                {f} Events {f === "All" ? `(10)` : f === "Team" ? `(6)` : `(4)`}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Event Cards Grid – Desktop 4 cols (Row 1: 1-4, Row 2: 5-8, Row 3: 9-10) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {sortedEvents.map((event) => (
            <EventCard3D
              key={event.id}
              event={event}
              onSelect={(evt) => {
                setSelectedEvent(evt);
                triggerFirework({
                  x: typeof window !== "undefined" ? window.innerWidth * 0.5 : 400,
                  y: 220,
                  pattern: "peony",
                  palette: "gold",
                  count: 45,
                  soundType: "burst",
                });
              }}
            />
          ))}
        </div>

        {/* DJ Music & Flash Mob Special Highlight Banner */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-fest-maroon via-[#220738] to-fest-royal border-2 border-fest-gold/60 shadow-gold-md overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-fest-brightGold text-xs font-bold uppercase tracking-wider border border-fest-gold/30">
              <Music className="w-3.5 h-3.5 text-fest-gold" />
              <span>Evening Grand Finale (03:00 PM – 06:00 PM)</span>
            </div>
            <h3 className="font-serif font-black text-2xl sm:text-3xl text-gold-gradient">
              DJ Music &amp; Flash Mob Extravaganza
            </h3>
            <p className="text-xs sm:text-sm text-fest-cream/80 max-w-xl">
              Dance performance starts 03:00 PM on the Main Ground, followed by non-stop DJ music,
              laser lights, and the collegiate flash mob.
            </p>
          </div>

          {/* Live Countdown Timer to Evening Finale */}
          <FinaleCountdownTimer />
        </div>
      </section>

      {/* 6. FESTIVAL SCHEDULE TIMELINE */}
      <section id="festival-schedule" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-maroon/60 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-fest-gold" />
            <span>Golden Day Timeline</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-gold-gradient">
            Official Festival Schedule
          </h2>
          <p className="text-xs sm:text-sm text-fest-cream/70">
            All 10 competitions begin sharply at 01:30 PM across 10 campus venues.
          </p>
        </div>

        <ScheduleTimeline />
      </section>

      {/* 7. INTERACTIVE RANGOLI CREATOR */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <RangoliCreator />
      </section>

      {/* 8. REGISTRATION HUB */}
      <section id="registration" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <RegistrationSection />
      </section>

      {/* 12. GRAND FINALE SPECTACLE */}
      <GrandFinaleSection />

      {/* Event Details Pop-up Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
