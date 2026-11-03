import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Award,
  Flame,
  Users,
  ArrowRight,
} from "lucide-react";
import UniversalFireworks from "@/components/fireworks/UniversalFireworks";

export const metadata = {
  title: "About | PATTAS’26 at MKCE",
  description:
    "Learn about PATTAS’26 at MKCE, the premier Diwali festival celebration at M. Kumarasamy College of Engineering (MKCE), Karur. Discover the philosophy of Light, Tradition & Togetherness.",
};

export default function AboutPage() {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <UniversalFireworks
        preset="golden-rain"
        colorPalette="gold"
        intensity="subtle"
        explosionFrequency={3200}
        enableInteraction={true}
        zIndex={0}
      />
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-fest-royal/70 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-fest-gold" />
          <span>The Spirit of PATTAS’26</span>
        </div>
        <h1 className="font-serif font-black text-4xl sm:text-6xl text-gold-gradient">
          Celebrating Light, Tradition &amp; Togetherness
        </h1>
        <p className="text-sm sm:text-base text-fest-cream/80 leading-relaxed">
          PATTAS’26 is the signature Diwali carnival of M. Kumarasamy College of Engineering (MKCE),
          organized proudly by the Agastya Fine Arts Club. It is a vibrant convergence of cultural
          heritage, artistic audacity, and collegiate camaraderie.
        </p>
      </div>

      {/* College Welcome Poster Banner */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-fest-gold shadow-gold-md max-w-4xl mx-auto aspect-[16/9] sm:aspect-[21/9] bg-fest-midnight">
        <Image
          src="/assets/posters/pattas26-welcome-poster.jpg"
          alt="MKCE PATTAS'26 Official Welcome Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Philosophy & Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-8 rounded-3xl border border-fest-gold/30 space-y-3 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-fest-gold/20 flex items-center justify-center text-fest-gold mb-4">
            <Flame className="w-6 h-6 animate-flicker" />
          </div>
          <h3 className="font-serif font-black text-xl text-gold-gradient">
            LIGHT (ஒளி)
          </h3>
          <p className="text-xs sm:text-sm text-fest-cream/75 leading-relaxed">
            Every diya tells a story of hope, every flame spreads happiness, and every light brings new beginnings. At PATTAS’26, we celebrate the victory of light over darkness through creativity, knowledge and joyful moments.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-fest-gold/30 space-y-3 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-fest-magenta/20 flex items-center justify-center text-fest-magenta mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-black text-xl text-gold-gradient">
            TRADITION (பாரம்பரியம்)
          </h3>
          <p className="text-xs sm:text-sm text-fest-cream/75 leading-relaxed">
            From beautiful kolams and vibrant rangolis to festive attire, music and cultural games, PATTAS’26 brings the beauty of Indian traditions to life. Every celebration reflects our heritage, creativity and festive spirit.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-fest-gold/30 space-y-3 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-fest-orange/20 flex items-center justify-center text-fest-orange mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-black text-xl text-gold-gradient">
            TOGETHERNESS (ஒற்றுமை)
          </h3>
          <p className="text-xs sm:text-sm text-fest-cream/75 leading-relaxed">
            Diwali is more than a festival; it is a celebration of friendship, family and unity. Sharing smiles, exchanging sweets and creating unforgettable memories make every celebration brighter.
          </p>
        </div>
      </div>

      {/* Institution Background */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-fest-gold/40 shadow-gold-sm space-y-6">
        {/* MKCE Official Header Banner Image */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-fest-gold/30 shadow-sm flex items-center justify-center max-w-2xl mx-auto">
          <Image
            src="/assets/brand/mkce-official-logo.png"
            alt="M. Kumarasamy College of Engineering Official Banner"
            width={600}
            height={160}
            className="w-full h-auto object-contain max-h-24 sm:max-h-28"
          />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-fest-gold/20">
          <div>
            <div className="flex items-center gap-2 text-fest-brightGold text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-fest-gold" />
              <span>Academic Distinction</span>
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-gold-gradient">
              About M. Kumarasamy College of Engineering
            </h2>
          </div>
          <span className="px-4 py-1 rounded-full bg-fest-royal text-fest-brightGold border border-fest-gold/40 text-xs font-mono font-bold">
            25 Years of Excellence
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-fest-cream/80 leading-relaxed">
          <p>
            Established in 2000, <strong>M. Kumarasamy College of Engineering (MKCE)</strong> has grown
            into a premier autonomous engineering institute affiliated to Anna University, Chennai.
            Located on the Karur-Salem highway in Thalavapalayam, MKCE stands committed to nurturing
            world-class technical competencies grounded in ethical leadership and cultural vibrancy.
          </p>
          <p>
            Accredited by NBA and NAAC with an &apos;A&apos; Grade and placed in the NIRF Innovation
            Band (201-300), the college empowers vibrant student clubs including the{" "}
            <strong>Agastya Fine Arts Club</strong>, which orchestrates landmark collegiate festivals
            like PATTAS each academic year.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-fest-gold/15 text-center">
          <div className="p-4 rounded-2xl bg-fest-midnight/60 border border-fest-gold/20">
            <span className="font-serif text-2xl sm:text-3xl font-black text-fest-gold block">
              25+
            </span>
            <span className="text-[11px] text-fest-cream/70">Years of Legacy</span>
          </div>
          <div className="p-4 rounded-2xl bg-fest-midnight/60 border border-fest-gold/20">
            <span className="font-serif text-2xl sm:text-3xl font-black text-fest-gold block">
              NAAC &apos;A&apos;
            </span>
            <span className="text-[11px] text-fest-cream/70">Accreditation</span>
          </div>
          <div className="p-4 rounded-2xl bg-fest-midnight/60 border border-fest-gold/20">
            <span className="font-serif text-2xl sm:text-3xl font-black text-fest-gold block">
              10
            </span>
            <span className="text-[11px] text-fest-cream/70">Festival Events</span>
          </div>
          <div className="p-4 rounded-2xl bg-fest-midnight/60 border border-fest-gold/20">
            <span className="font-serif text-2xl sm:text-3xl font-black text-fest-gold block">
              100%
            </span>
            <span className="text-[11px] text-fest-cream/70">Student Energy</span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center pt-8">
        <Link
          href="/events"
          className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-gold-md hover:scale-105 transition-transform"
        >
          <span>Explore All 10 Competitions</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
