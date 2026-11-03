"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Maximize2,
  X,
  Download,
  Camera,
} from "lucide-react";
import { triggerFirework } from "@/lib/fireworks-dispatcher";

interface GalleryItem {
  id: string;
  title: string;
  category: "Official Posters" | "Campus Highlights" | "Event Teasers" | "Live Celebrations";
  src: string;
  width: number;
  height: number;
  description: string;
  isOfficialPoster?: boolean;
  isComingSoon?: boolean;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "welcome-poster",
    title: "Official PATTAS’26 Welcome Banner Poster",
    category: "Official Posters",
    src: "/assets/posters/pattas26-welcome-poster.jpg",
    width: 1024,
    height: 819,
    description:
      "The official inaugural welcome banner showcasing MKCE campus aerial view, NAAC 'A' and NBA rankings, NIRF 201-300 band, and 25 years celebration badge.",
    isOfficialPoster: true,
  },
  {
    id: "schedule-poster",
    title: "Official Schedule & Venues Poster with Registration QR",
    category: "Official Posters",
    src: "/assets/posters/pattas26-schedule-poster.jpg",
    width: 818,
    height: 1024,
    description:
      "Complete festival schedule, timeline, 10 competition venues, Dance performance, DJ ground, and authentic registration QR code.",
    isOfficialPoster: true,
  },
  {
    id: "events-poster",
    title: "Official 10 Competitions & DJ Music Poster",
    category: "Official Posters",
    src: "/assets/posters/pattas26-events-poster.jpg",
    width: 818,
    height: 1024,
    description:
      "All 10 illustrated competition icons, along with the evening DJ Music and Flash Mob celebrations at the Main Ground.",
    isOfficialPoster: true,
  },
  {
    id: "logo-crest",
    title: "PATTAS’26 Master Festival Emblem",
    category: "Official Posters",
    src: "/assets/brand/pattas26-logo.png",
    width: 1024,
    height: 426,
    description:
      "The cinematic 3D festival identity designed with golden typography, traditional glowing diya, bursting fireworks, and celebratory colors.",
    isOfficialPoster: true,
  },
  {
    id: "campus-night",
    title: "MKCE Campus Illuminated for Diwali",
    category: "Campus Highlights",
    src: "/assets/brand/campus-aerial-night.png",
    width: 1024,
    height: 219,
    description:
      "Aerial vista of M. Kumarasamy College of Engineering main academic complexes and boulevard at Karur.",
  },
  {
    id: "live-photo-1",
    title: "PATTAS’26 Live Flash Mob & DJ Ground",
    category: "Live Celebrations",
    src: "/assets/brand/dj-flashmob-banner.png",
    width: 495,
    height: 56,
    description:
      "Main ground stage preparations for the 04 November 2026 Dance Performance & DJ Flash Mob.",
  },
  {
    id: "placeholder-1",
    title: "Face Painting Live Moments (Coming Soon)",
    category: "Live Celebrations",
    src: "/assets/events/face-painting.png",
    width: 140,
    height: 160,
    description:
      "Live event photographs will be uploaded directly following completion of the event on 04 November 2026.",
    isComingSoon: true,
  },
  {
    id: "placeholder-2",
    title: "Rangoli Arena Live Submissions (Coming Soon)",
    category: "Live Celebrations",
    src: "/assets/events/rangoli.png",
    width: 140,
    height: 160,
    description:
      "Photographs of colorful rangoli masterpieces created in front of APJ Block will be published post-evaluation.",
    isComingSoon: true,
  },
];

export default function FestivalGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const categories = ["All", "Official Posters", "Campus Highlights", "Live Celebrations"];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const handleOpenLightbox = (item: GalleryItem) => {
    setActiveLightbox(item);
    triggerFirework({
      x: typeof window !== "undefined" ? window.innerWidth * 0.5 : 400,
      y: 180,
      pattern: "starburst",
      palette: "gold",
      count: 45,
      soundType: "chime",
    });
  };

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeCategory === cat
                ? "bg-fest-gold text-fest-midnight shadow-gold-sm scale-105"
                : "bg-fest-midnight/80 text-fest-cream/70 hover:text-white border border-fest-gold/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry / Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenLightbox(item)}
            className="group relative rounded-3xl overflow-hidden glass-panel border border-fest-gold/30 hover:border-fest-gold transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-gold-md"
          >
            <div className="relative aspect-[4/3] bg-fest-midnight/80 flex items-center justify-center overflow-hidden p-3">
              <Image
                src={item.src}
                alt={item.title}
                width={item.width}
                height={item.height}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />

              {item.isComingSoon && (
                <div className="absolute inset-0 bg-fest-midnight/85 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-fest-gold/20 flex items-center justify-center text-fest-gold mb-2">
                    <Camera className="w-5 h-5 animate-pulse" />
                  </div>
                  <span className="font-serif font-bold text-sm text-fest-brightGold uppercase tracking-wider">
                    Live Photo Upload
                  </span>
                  <span className="text-[10px] text-fest-cream/70 mt-1 max-w-[180px]">
                    Releasing post-event on 04 November 2026
                  </span>
                </div>
              )}

              {/* Hover Overlay */}
              {!item.isComingSoon && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <span className="p-3 rounded-full bg-fest-gold/90 text-fest-midnight shadow-gold-sm">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-fest-gold/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-fest-gold">
                  {item.category}
                </span>
                {item.isOfficialPoster && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-fest-maroon/60 text-fest-brightGold border border-fest-gold/30">
                    Official MKCE Asset
                  </span>
                )}
              </div>
              <h4 className="font-serif font-black text-base text-fest-cream group-hover:text-gold-gradient transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-fest-cream/70 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="glass-panel p-4 sm:p-6 rounded-3xl max-w-4xl w-full border border-fest-gold space-y-4 max-h-[90vh] flex flex-col justify-between shadow-gold-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-fest-gold/20">
              <div>
                <span className="text-[11px] font-bold uppercase text-fest-gold">
                  {activeLightbox.category}
                </span>
                <h3 className="font-serif font-black text-lg sm:text-xl text-gold-gradient">
                  {activeLightbox.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLightbox(null)}
                className="p-2 rounded-full glass-panel text-fest-cream/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 min-h-[300px] max-h-[60vh] bg-fest-midnight/90 rounded-2xl overflow-hidden flex items-center justify-center p-2">
              <Image
                src={activeLightbox.src}
                alt={activeLightbox.title}
                width={activeLightbox.width}
                height={activeLightbox.height}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-xs text-fest-cream/80">
              <p className="max-w-xl">{activeLightbox.description}</p>
              <a
                href={activeLightbox.src}
                download
                className="btn-gold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Asset</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
