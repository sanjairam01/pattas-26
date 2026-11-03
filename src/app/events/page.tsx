"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Flame } from "lucide-react";
import EventCard3D from "@/components/events/EventCard3D";
import EventModal from "@/components/events/EventModal";
import UniversalFireworks from "@/components/fireworks/UniversalFireworks";
import { EVENTS, EventData } from "@/data/events";
import { triggerFirework } from "@/lib/fireworks-dispatcher";

function EventsContent() {
  const searchParams = useSearchParams();
  const filterQuery = searchParams.get("filter");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | "Team" | "Individual" | "Favorites">("All");
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    if (filterQuery === "favorites") {
      setTypeFilter("Favorites");
    }

    try {
      const stored = localStorage.getItem("pattas26_favorites");
      if (stored) {
        setBookmarkedIds(JSON.parse(stored));
      }
    } catch {}
  }, [filterQuery]);

  const filteredEvents = EVENTS.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.rules.some((r) => r.toLowerCase().includes(search.toLowerCase()));

    if (typeFilter === "Team") return matchesSearch && event.participationType === "Team";
    if (typeFilter === "Individual") return matchesSearch && event.participationType === "Individual";
    if (typeFilter === "Favorites") return matchesSearch && bookmarkedIds.includes(event.id);

    return matchesSearch;
  });

  // Strictly sort by ascending permanent numerical event ID (1 to 10)
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => Number(a.id) - Number(b.id)
  );

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <UniversalFireworks
        preset="celebration"
        colorPalette="diwali"
        intensity="medium"
        explosionFrequency={3200}
        enableInteraction={true}
        zIndex={0}
      />
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-maroon/60 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-fest-gold animate-flicker" />
          <span>The Official Competitions</span>
        </div>
        <h1 className="font-serif font-black text-4xl sm:text-6xl text-gold-gradient">
          PATTAS’26 Event Explorer
        </h1>
        <p className="text-xs sm:text-sm text-fest-cream/75 leading-relaxed">
          Ten electrifying challenges across arts, games, physical skill, cultural trivia, and digital
          creativity. Click any event to inspect complete rules, venues, team sizes, and registration forms.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-fest-gold/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-fest-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events by title, venue, or rules..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-fest-midnight/80 border border-fest-gold/30 text-xs text-fest-cream placeholder:text-fest-cream/50 focus:outline-none focus:border-fest-brightGold"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(["All", "Team", "Individual", "Favorites"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setTypeFilter(tab)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                typeFilter === tab
                  ? "bg-fest-gold text-fest-midnight shadow-gold-sm"
                  : "bg-fest-midnight/70 text-fest-cream/70 hover:text-white border border-fest-gold/20"
              }`}
            >
              {tab === "Favorites" ? `Saved (${bookmarkedIds.length})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3 max-w-md mx-auto">
          <p className="text-fest-gold font-serif font-bold text-lg">No Events Found</p>
          <p className="text-xs text-fest-cream/60">
            {typeFilter === "Favorites"
              ? "You haven't bookmarked any events yet. Click the bookmark icon on any card to save your favorite events!"
              : "Try adjusting your search query or switching filters to see all 10 events."}
          </p>
          <button
            onClick={() => {
              setSearch("");
              setTypeFilter("All");
            }}
            className="btn-glass-gold px-4 py-1.5 rounded-full text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedEvents.map((event) => (
            <EventCard3D
              key={event.id}
              event={event}
              onSelect={(evt) => {
                setSelectedEvent(evt);
                triggerFirework({
                  x: typeof window !== "undefined" ? window.innerWidth * 0.5 : 400,
                  y: 200,
                  pattern: "chrysanthemum",
                  palette: "diwali",
                  count: 55,
                  soundType: "burst",
                });
              }}
            />
          ))}
        </div>
      )}

      {/* Pop-up Details Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="text-center py-24 text-fest-gold">Loading Events...</div>}>
      <EventsContent />
    </Suspense>
  );
}
