"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Sparkles,
  Music,
  Flame,
  ChevronDown,
  ChevronUp,
  Radio,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { SCHEDULE_DATA, ScheduleItem } from "@/data/schedule";

export default function ScheduleTimeline() {
  const [expandedId, setExpandedId] = useState<string>("events-session");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? "" : id);
  };

  const getCategoryIcon = (category: ScheduleItem["category"]) => {
    switch (category) {
      case "competition":
        return <Flame className="w-5 h-5 text-fest-gold" />;
      case "cultural":
        return <Sparkles className="w-5 h-5 text-fest-magenta" />;
      case "celebration":
        return <Music className="w-5 h-5 text-fest-orange" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Festival Date Banner */}
      <div className="glass-panel p-4 rounded-2xl border border-fest-gold/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-5 h-5 text-fest-gold" />
          <div>
            <h4 className="font-serif font-black text-sm text-gold-gradient uppercase tracking-wider">
              Wednesday, 04 November 2026
            </h4>
            <p className="text-[11px] text-fest-cream/60">
              MKCE Campus • Academic Year 2026–2027 (Odd Semester)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fest-royal text-fest-brightGold text-xs font-mono font-semibold border border-fest-gold/30">
            <Radio className="w-3 h-3 text-fest-gold animate-pulse" />
            <span>01:30 PM to 06:00 PM IST</span>
          </span>
        </div>
      </div>

      {/* Golden Vertical Timeline */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-1 before:bg-gradient-to-b before:from-fest-gold before:via-fest-orange before:to-fest-magenta before:rounded-full">
        {SCHEDULE_DATA.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Golden Node */}
              <div className="absolute -left-[30px] sm:-left-[42px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-fest-midnight border-2 border-fest-gold flex items-center justify-center shadow-gold-sm group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-tr from-fest-gold to-fest-brightGold" />
              </div>

              {/* Schedule Card Container */}
              <div
                className={`glass-panel rounded-3xl p-6 sm:p-7 border transition-all ${
                  item.highlight
                    ? "border-fest-gold/60 shadow-gold-sm bg-gradient-to-br from-fest-royal/40 via-fest-midnight to-fest-maroon/20"
                    : "border-fest-gold/25"
                }`}
              >
                {/* Time & Venue Tag Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-fest-gold/20">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-fest-midnight/80 border border-fest-gold/30">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-fest-brightGold tracking-wider block">
                        {item.timeSlot}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-fest-gold/70 tracking-widest">
                        {item.category} Session
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-fest-cream/80 bg-fest-midnight/60 px-3 py-1.5 rounded-full border border-fest-gold/20">
                    <MapPin className="w-3.5 h-3.5 text-fest-gold flex-shrink-0" />
                    <span className="font-semibold text-fest-cream">{item.venue}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="py-4">
                  <h3 className="font-serif font-black text-xl sm:text-2xl text-gold-gradient">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-fest-cream/80 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Sub-events accordion (for the 10 simultaneous events) */}
                {item.subEvents && (
                  <div className="pt-2 border-t border-fest-gold/15">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-fest-brightGold hover:text-fest-gold transition-colors"
                    >
                      <span>
                        {isExpanded ? "Hide 10 Venues & Competitions" : "View All 10 Venues & Competitions"}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isExpanded && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 animate-in fade-in duration-200">
                        {item.subEvents.map((sub, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-2xl bg-fest-midnight/70 border border-fest-gold/20 flex items-center justify-between hover:border-fest-gold/50 transition-colors"
                          >
                            <div>
                              <span className="font-serif font-bold text-xs text-fest-cream block">
                                {i + 1}. {sub.name}
                              </span>
                              <span className="text-[10px] text-fest-gold/80 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 text-fest-orange" />
                                <span>{sub.venue}</span>
                              </span>
                            </div>
                            {sub.href && (
                              <Link
                                href={sub.href}
                                className="p-1 rounded-full text-fest-gold hover:text-fest-brightGold"
                                title="View Details"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
