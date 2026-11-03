import { Palette } from "lucide-react";
import RangoliCreator from "@/components/interactive/RangoliCreator";
import UniversalFireworks from "@/components/fireworks/UniversalFireworks";

export const metadata = {
  title: "PATTAS'26 at MKCE",
  description:
    "Design and draw sacred symmetric 8-fold and 12-fold traditional Diwali mandalas and kolams for PATTAS’26 at MKCE. Choose festive colors and download your Rangoli masterpiece.",
};

export default function RangoliStudioPage() {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <UniversalFireworks
        preset="celebration"
        colorPalette="magical"
        intensity="subtle"
        explosionFrequency={3500}
        enableInteraction={true}
        zIndex={0}
      />
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-royal/70 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider">
          <Palette className="w-3.5 h-3.5 text-fest-gold" />
          <span>Sacred Geometry &amp; Folk Art</span>
        </div>
        <h1 className="font-serif font-black text-4xl sm:text-6xl text-gold-gradient">
          Interactive Rangoli Studio
        </h1>
        <p className="text-xs sm:text-sm text-fest-cream/75 leading-relaxed">
          Draw in any radial sector and watch traditional Indian mandala symmetry replicate across all
          axes in real time. Choose from authentic festive powders, adjust stroke weight, and export your
          high-resolution artwork.
        </p>
      </div>

      <RangoliCreator />
    </div>
  );
}
