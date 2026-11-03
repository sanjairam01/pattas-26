import { ShieldCheck } from "lucide-react";
import RegistrationSection from "@/components/registration/RegistrationSection";
import UniversalFireworks from "@/components/fireworks/UniversalFireworks";

export const metadata = {
  title: "Official Registration | PATTAS’26 MKCE",
  description:
    "Official Registration Portal for PATTAS’26 Diwali Festival at M. Kumarasamy College of Engineering. Scan the verified poster QR code or access direct Google Form links.",
};

export default function RegistrationPage() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <UniversalFireworks
        preset="golden-rain"
        colorPalette="gold"
        intensity="medium"
        explosionFrequency={3200}
        enableInteraction={true}
        zIndex={0}
      />
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-royal/70 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-fest-gold" />
          <span>Official Registration Hub</span>
        </div>
        <h1 className="font-serif font-black text-4xl sm:text-6xl text-gold-gradient">
          Festival Registration
        </h1>
        <p className="text-xs sm:text-sm text-fest-cream/75 leading-relaxed">
          Secure your participation in PATTAS’26. Scan the verified QR code from the official poster, or
          register directly through the official event-wise Google Forms below.
        </p>
      </div>

      <RegistrationSection />
    </div>
  );
}
