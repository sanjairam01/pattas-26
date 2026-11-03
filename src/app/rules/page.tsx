import { ShieldCheck } from "lucide-react";
import RulesExplorer from "@/components/rules/RulesExplorer";
import UniversalFireworks from "@/components/fireworks/UniversalFireworks";

export const metadata = {
  title: "Rules & Regulations | PATTAS’26 at MKCE",
  description:
    "Official Competition Rules, Regulations, Permitted Materials, and Disqualification Criteria for all 10 PATTAS’26 at MKCE events at M. Kumarasamy College of Engineering.",
};

export default function RulesPage() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <UniversalFireworks
        preset="subtle-stars"
        colorPalette="gold"
        intensity="subtle"
        explosionFrequency={5000}
        enableInteraction={true}
        zIndex={0}
      />
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-royal/70 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-fest-gold" />
          <span>Fair Play &amp; Safety First</span>
        </div>
        <h1 className="font-serif font-black text-4xl sm:text-6xl text-gold-gradient">
          Rules &amp; Regulations
        </h1>
        <p className="text-xs sm:text-sm text-fest-cream/75 leading-relaxed">
          The comprehensive rulebook for all 10 events of PATTAS’26, Academic Year 2026–2027. Sourced
          verbatim from the official Agastya Arts Club publication.
        </p>
      </div>

      <RulesExplorer />
    </div>
  );
}
