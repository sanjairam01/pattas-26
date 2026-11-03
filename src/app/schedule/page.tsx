import { Calendar } from "lucide-react";
import ScheduleTimeline from "@/components/schedule/ScheduleTimeline";
import UniversalFireworks from "@/components/fireworks/UniversalFireworks";

export const metadata = {
  title: "PATTAS'26 at MKCE",
  description:
    "Official schedule and timeline for PATTAS’26 at MKCE on 04 November 2026. Explore competitions from 01:30 PM, Dance Showcase at 03:00 PM, and DJ Flash Mob from 04:00 PM to 06:00 PM.",
};

export default function SchedulePage() {
  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <UniversalFireworks
        preset="sparks"
        colorPalette="royal"
        intensity="medium"
        explosionFrequency={3000}
        enableInteraction={true}
        zIndex={0}
      />
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-royal/70 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5 text-fest-gold" />
          <span>04 November 2026</span>
        </div>
        <h1 className="font-serif font-black text-4xl sm:text-6xl text-gold-gradient">
          PATTAS’26 Timeline
        </h1>
        <p className="text-xs sm:text-sm text-fest-cream/75 leading-relaxed">
          From the opening whistle of competitions to the climactic flash mob and DJ dance in the Main
          Ground. Follow every phase of our festival day.
        </p>
      </div>

      {/* Main Interactive Timeline */}
      <ScheduleTimeline />
    </div>
  );
}
