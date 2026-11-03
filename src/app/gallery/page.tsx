import { Camera } from "lucide-react";
import FestivalGallery from "@/components/gallery/FestivalGallery";
import UniversalFireworks from "@/components/fireworks/UniversalFireworks";

export const metadata = {
  title: "Festival Gallery & Posters | PATTAS’26 MKCE",
  description:
    "Explore the official festival posters, campus highlights, and event teasers for PATTAS’26 at M. Kumarasamy College of Engineering, Karur.",
};

export default function GalleryPage() {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <UniversalFireworks
        preset="celebration"
        colorPalette="diwali"
        intensity="subtle"
        explosionFrequency={3600}
        enableInteraction={true}
      />
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-royal/70 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5 text-fest-gold" />
          <span>Visual Archive</span>
        </div>
        <h1 className="font-serif font-black text-4xl sm:text-6xl text-gold-gradient">
          PATTAS’26 Gallery
        </h1>
        <p className="text-xs sm:text-sm text-fest-cream/75 leading-relaxed">
          High-definition official promotional posters, festival branding assets, and illuminated campus
          vistas. Live competition moments will be published here post-event.
        </p>
      </div>

      <FestivalGallery />
    </div>
  );
}
