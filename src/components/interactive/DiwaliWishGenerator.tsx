"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Sparkles, Copy, Share2, Check, Send } from "lucide-react";
import { triggerFirework, triggerCelebration } from "@/lib/fireworks-dispatcher";

interface WishTemplate {
  id: string;
  category: "Traditional" | "Poetic" | "Youth & College" | "Tamil Festive";
  title: string;
  content: string;
}

const WISH_TEMPLATES: WishTemplate[] = [
  {
    id: "1",
    category: "Traditional",
    title: "Light & Prosperity",
    content:
      "May the golden glow of auspicious diyas illuminate your path with wisdom, joy, and unbound prosperity this Diwali. Celebrating PATTAS’26 at MKCE!",
  },
  {
    id: "2",
    category: "Youth & College",
    title: "MKCE Campus Vibes",
    content:
      "Sparklers in the sky, rhythm in our steps, and unity in our celebration! Wishing you an electrifying and joyous Diwali celebration at PATTAS’26 MKCE!",
  },
  {
    id: "3",
    category: "Tamil Festive",
    title: "தீபாவளி நல்வாழ்த்துகள்",
    content:
      "தீபங்களின் ஒளி உங்கள் வாழ்வில் மகிழ்ச்சியையும், புதிய நம்பிக்கைகளையும் தரட்டும்! MKCE PATTAS’26 தீபாவளி நல்வாழ்த்துகள்!",
  },
  {
    id: "4",
    category: "Poetic",
    title: "Victory of Radiance",
    content:
      "As darkness yields to the eternal flame of the diya, may your life shine with triumph, courage, and togetherness. Happy PATTAS’26 Diwali!",
  },
];

export default function DiwaliWishGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<WishTemplate>(WISH_TEMPLATES[0]);
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [copied, setCopied] = useState(false);
  const cardCanvasRef = useRef<HTMLDivElement>(null);

  const fullWishText = `${recipient ? `Dear ${recipient},\n\n` : ""}${selectedTemplate.content}${
    sender ? `\n\n— With warm festive regards, ${sender} (MKCE)` : "\n\n— PATTAS’26 MKCE"
  }`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullWishText);
    setCopied(true);
    triggerFirework({
      x: typeof window !== "undefined" ? window.innerWidth * 0.5 : 400,
      y: 180,
      pattern: "starburst",
      palette: "gold",
      count: 45,
      soundType: "chime",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOnWhatsApp = () => {
    const encoded = encodeURIComponent(fullWishText + "\n\nJoin PATTAS’26: https://pattas26.mkce.ac.in");
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
    triggerCelebration("medium", "diwali");
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "PATTAS’26 Diwali Greeting",
        text: fullWishText,
        url: window.location.origin,
      }).catch(() => {});
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-fest-gold/30 shadow-gold-sm">
      {/* Header */}
      <div className="pb-8 border-b border-fest-gold/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-maroon/60 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-fest-gold" />
          <span>Festive Greeting Card Studio</span>
        </div>
        <h3 className="font-serif font-black text-2xl sm:text-3xl text-gold-gradient">
          Diwali Wish &amp; Greeting Card Generator
        </h3>
        <p className="text-xs sm:text-sm text-fest-cream/75 max-w-xl mt-1">
          Pick an inspiring Diwali greeting, customize names, and share instant festive cards with friends,
          professors, and family!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-fest-brightGold block">
              1. Select a Festive Theme
            </label>
            <div className="grid grid-cols-2 gap-2">
              {WISH_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedTemplate.id === tmpl.id
                      ? "bg-fest-royal/80 border-fest-gold text-fest-brightGold shadow-sm"
                      : "bg-fest-midnight/60 border-fest-gold/20 text-fest-cream/70 hover:bg-white/5"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-fest-gold/70 block">
                    {tmpl.category}
                  </span>
                  <span className="text-xs font-bold font-serif line-clamp-1 mt-0.5">
                    {tmpl.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-fest-brightGold block">
              2. Personalize Names
            </label>
            <div className="space-y-2.5">
              <div>
                <input
                  type="text"
                  maxLength={30}
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Recipient Name (e.g., Karthik, Friends, Faculty)"
                  className="w-full px-4 py-2.5 rounded-xl bg-fest-midnight/80 border border-fest-gold/30 text-fest-cream text-xs focus:outline-none focus:border-fest-gold"
                />
              </div>
              <div>
                <input
                  type="text"
                  maxLength={30}
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Your Name / Dept (e.g., Priya & Team)"
                  className="w-full px-4 py-2.5 rounded-xl bg-fest-midnight/80 border border-fest-gold/30 text-fest-cream text-xs focus:outline-none focus:border-fest-gold"
                />
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={shareOnWhatsApp}
              className="w-full py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Share to WhatsApp</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={copyToClipboard}
                className="btn-glass-gold py-2.5 px-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>

              <button
                onClick={handleNativeShare}
                className="btn-gold py-2.5 px-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-gold-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Card</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Card Preview Column (7 cols) */}
        <div className="lg:col-span-7 flex justify-center">
          <div
            ref={cardCanvasRef}
            className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#102C62] via-[#071329] to-[#650D30] border-2 border-fest-gold shadow-gold-md relative overflow-hidden flex flex-col justify-between min-h-[420px]"
          >
            {/* Ambient Corner Diyas */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-fest-gold/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-fest-magenta/20 rounded-full blur-3xl pointer-events-none" />

            {/* Card Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-fest-gold/30 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full border border-fest-gold/40 p-0.5 bg-fest-midnight">
                  <Image
                    src="/assets/brand/mkce-crest.png"
                    alt="MKCE"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-black text-sm text-gold-gradient tracking-widest">
                    PATTAS’26
                  </h4>
                  <p className="text-[9px] text-fest-cream/70">M. Kumarasamy College of Engg</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-fest-brightGold px-2 py-0.5 rounded bg-white/10 border border-fest-gold/30">
                04 NOV 2026
              </span>
            </div>

            {/* Card Body */}
            <div className="relative z-10 py-6 text-center space-y-4">
              {recipient && (
                <p className="font-serif font-bold text-base sm:text-lg text-fest-brightGold">
                  Dear {recipient},
                </p>
              )}

              {/* Center Decorative Diya Icon */}
              <div className="relative w-12 h-14 mx-auto flex flex-col items-center">
                <div className="w-5 h-8 rounded-[50%_50%_40%_40%/60%_60%_40%_40%] bg-gradient-to-t from-fest-orange via-fest-gold to-white animate-flicker shadow-diya-glow" />
                <div className="w-10 h-3.5 rounded-b-full bg-gradient-to-b from-[#b84814] to-[#451402] border-t border-fest-brightGold" />
              </div>

              <p className="font-serif text-sm sm:text-base text-fest-cream leading-relaxed italic px-2">
                &ldquo;{selectedTemplate.content}&rdquo;
              </p>

              {sender ? (
                <p className="text-xs font-semibold text-fest-gold pt-2">
                  Warmest Wishes, <br />
                  <span className="text-sm font-bold text-fest-brightGold font-serif">{sender}</span>
                </p>
              ) : (
                <p className="text-xs font-semibold text-fest-gold/80 pt-2">
                  Celebrating Light, Tradition &amp; Togetherness
                </p>
              )}
            </div>

            {/* Card Footer */}
            <div className="relative z-10 pt-4 border-t border-fest-gold/30 flex items-center justify-between text-[10px] text-fest-cream/60">
              <span>Agastya Fine Arts Club</span>
              <span>mkce.ac.in • Karur</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
