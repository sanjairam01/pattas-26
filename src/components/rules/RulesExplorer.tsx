"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FileText,
  Search,
  Download,
  Printer,
  ShieldAlert,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Users,
  ExternalLink,
} from "lucide-react";
import { EVENTS } from "@/data/events";
import { SITE_CONFIG } from "@/data/site-config";

export default function RulesExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Team" | "Individual">("All");
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({
    "face-painting": true,
    "rangoli": true,
  });

  const toggleEvent = (id: string) => {
    setExpandedEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    EVENTS.forEach((e) => (all[e.id] = true));
    setExpandedEvents(all);
  };

  const collapseAll = () => {
    setExpandedEvents({});
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredEvents = EVENTS.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.rules.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "All" || e.participationType === filterType;

    return matchesSearch && matchesType;
  });

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  return (
    <div className="space-y-8">
      {/* Action Banner for PDF Download & Print */}
      <div className="glass-panel p-6 rounded-3xl border border-fest-gold/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-royal/70 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider mb-1.5">
            <FileText className="w-3.5 h-3.5 text-fest-gold" />
            <span>Official Authoritative Document</span>
          </div>
          <h3 className="font-serif font-black text-xl sm:text-2xl text-gold-gradient">
            PATTAS’26 Official Rules &amp; Regulations
          </h3>
          <p className="text-xs text-fest-cream/70 mt-1 max-w-xl">
            Sourced directly from the official Agastya Arts Club rulebook PDF for Academic Year 2026–2027.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={SITE_CONFIG.registration.rulesPdfUrl}
            download="PATTAS26-Rules-and-Regulations.pdf"
            className="btn-gold px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-gold-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </a>
          <button
            onClick={handlePrint}
            className="btn-glass-gold px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 print:hidden"
          >
            <Printer className="w-4 h-4" />
            <span>Print Rules</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-fest-gold/25 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 print:hidden">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-fest-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rules, materials, venues or restrictions..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-fest-midnight/80 border border-fest-gold/30 text-xs text-fest-cream placeholder:text-fest-cream/50 focus:outline-none focus:border-fest-brightGold"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Type filters */}
          <div className="flex items-center gap-1 bg-fest-midnight/80 p-1 rounded-full border border-fest-gold/20">
            {(["All", "Team", "Individual"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  filterType === type
                    ? "bg-fest-gold text-fest-midnight font-bold"
                    : "text-fest-cream/70 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-fest-gold/20" />

          <button
            onClick={expandAll}
            className="text-xs text-fest-brightGold hover:underline px-2 py-1"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="text-xs text-fest-cream/60 hover:text-white px-2 py-1"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Accordion Rulebook Items */}
      <div className="space-y-4">
        {sortedEvents.map((event) => {
          const isOpen = !!expandedEvents[event.id];

          return (
            <div
              key={event.id}
              className="glass-panel rounded-3xl border border-fest-gold/30 overflow-hidden transition-all shadow-sm hover:border-fest-gold/60"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleEvent(event.id)}
                className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <div
                      className="absolute inset-0 rounded-full blur-md opacity-30 pointer-events-none"
                      style={{ backgroundColor: event.accentColor || "#FFBD35" }}
                    />
                    <Image
                      src={event.iconImage || event.posterImage}
                      alt={event.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-fest-gold text-fest-midnight text-xs font-black flex items-center justify-center">
                        {event.posterNumber}
                      </span>
                      <h4 className="font-serif font-black text-lg sm:text-xl text-fest-cream">
                        {event.title}
                      </h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-fest-royal/60 border border-fest-gold/30 text-fest-brightGold">
                        {event.participationType} ({event.teamSize})
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] text-fest-cream/70 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-fest-gold" />
                        <span>{event.venue}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-fest-brightGold" />
                        <span>{event.maxCapacity}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-fest-orange" />
                        <span>{event.duration}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {event.posterNumber !== event.pdfNumber && (
                    <span className="hidden sm:inline-block text-[10px] text-blue-300 font-mono bg-blue-950/60 px-2 py-0.5 rounded border border-blue-400/30">
                      PDF #{event.pdfNumber}
                    </span>
                  )}
                  <div className="p-2 rounded-full bg-fest-midnight/60 border border-fest-gold/30 text-fest-gold">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Accordion Body */}
              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-fest-gold/15 space-y-5 animate-in fade-in duration-200">
                  {/* Description */}
                  <div>
                    <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-fest-brightGold mb-1">
                      Event Summary
                    </h5>
                    <p className="text-xs sm:text-sm text-fest-cream/80 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* All Official Rules */}
                  <div>
                    <h5 className="font-serif font-bold text-xs uppercase tracking-wider text-fest-brightGold mb-2">
                      Detailed Competition Rules (PDF Verbatim)
                    </h5>
                    <ol className="space-y-2 text-xs sm:text-sm text-fest-cream/80 list-decimal pl-5">
                      {event.rules.map((rule, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {rule}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Materials vs Restrictions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Permitted Materials</span>
                      </div>
                      <ul className="text-xs text-fest-cream/75 space-y-1 pl-2">
                        {event.materialsPermitted.map((m, i) => (
                          <li key={i}>• {m}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                        <ShieldAlert className="w-4 h-4" />
                        <span>Strict Restrictions &amp; Disqualification</span>
                      </div>
                      <ul className="text-xs text-fest-cream/75 space-y-1 pl-2">
                        {event.restrictions.map((r, i) => (
                          <li key={i}>• {r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Registration Action */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-fest-gold/10">
                    <span className="text-[11px] text-fest-cream/60">
                      Duration: <strong>{event.duration}</strong> • Venue: <strong>{event.venue}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      {event.registrationUrls ? (
                        event.registrationUrls.map((rUrl, i) => (
                          <a
                            key={i}
                            href={rUrl.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-gold px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-gold-sm"
                          >
                            <span>{rUrl.label}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))
                      ) : (
                        <a
                          href={event.registrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-gold-sm"
                        >
                          <span>Register For {event.title}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
