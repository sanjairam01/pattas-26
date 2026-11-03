import { Sparkles } from "lucide-react";
import DiwaliWishGenerator from "@/components/interactive/DiwaliWishGenerator";
import UniversalFireworks from "@/components/fireworks/UniversalFireworks";

export const metadata = {
  title: "PATTAS'26 at MKCE",
  description:
    "Generate, customize, and share personalized Diwali greeting cards with friends, professors, and family for PATTAS’26 at MKCE (M. Kumarasamy College of Engineering, Karur).",
};

export default function WishesPage() {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <UniversalFireworks
        preset="golden-rain"
        colorPalette="magical"
        intensity="subtle"
        explosionFrequency={3400}
        enableInteraction={true}
        zIndex={0}
      />
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-magenta/30 border border-fest-magenta/50 text-fest-brightGold text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-fest-gold" />
          <span>Warm Blessings &amp; Radiance</span>
        </div>
        <h1 className="font-serif font-black text-4xl sm:text-6xl text-gold-gradient">
          Diwali Wishes Studio
        </h1>
        <p className="text-xs sm:text-sm text-fest-cream/75 leading-relaxed">
          Spread the glow of celebration across MKCE and beyond. Personalize custom greetings in
          English and Tamil, preview your golden illuminated card, and share directly via WhatsApp,
          social media, or one-click clipboard copy.
        </p>
      </div>

      <DiwaliWishGenerator />
    </div>
  );
}
