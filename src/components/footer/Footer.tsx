"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, QrCode, ExternalLink, MapPin, Award, ArrowUpRight, Flame } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { EVENTS } from "@/data/events";
import { triggerFirework } from "@/lib/fireworks-dispatcher";

export default function Footer() {
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <footer className="relative bg-gradient-to-b from-fest-midnight via-[#0b1733] to-[#040a16] border-t border-fest-gold/30 pt-16 pb-12 overflow-hidden">
      {/* Background ambient decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-fest-gold/5 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-fest-maroon/20 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-fest-royal/30 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-fest-gold/20">
          {/* Col 1 & 2: Branding & College Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="space-y-1">
                <div className="relative h-8 w-36">
                  <Image
                    src="/assets/brand/pattas26-logo.png"
                    alt="PATTAS’26 at MKCE Master Logo"
                    fill
                    className="object-contain object-left filter drop-shadow-[0_0_10px_rgba(255,189,53,0.55)]"
                  />
                </div>
                <p className="text-[11px] text-fest-brightGold font-medium">
                  Celebrating Light, Tradition &amp; Togetherness
                </p>
              </div>
            </div>

            <p className="text-xs text-fest-cream/70 leading-relaxed max-w-md">
              The flagship annual Diwali extravaganza presented by the Agastya Fine Arts Club at{" "}
              <strong className="text-fest-cream font-semibold">M. Kumarasamy College of Engineering</strong>.
              Uniting student creativity, traditional culture, high-voltage competitions, and joyous celebrations.
            </p>

            <div className="p-3 rounded-xl bg-fest-royal/30 border border-fest-gold/20 space-y-1.5 text-[11px] text-fest-cream/75">
              <div className="flex items-center gap-2 text-fest-brightGold font-semibold">
                <Award className="w-3.5 h-3.5 text-fest-gold" />
                <span>M. Kumarasamy College of Engineering</span>
              </div>
              <p>Autonomous Institution • Affiliated to Anna University, Chennai</p>
              <p>Accredited by NBA & NAAC with &apos;A&apos; Grade • NIRF Band 201-300</p>
              <div className="flex items-center gap-1.5 pt-1 text-fest-cream/60">
                <MapPin className="w-3 h-3 text-fest-gold flex-shrink-0" />
                <span>Thalavapalayam, Karur - 639 113, Tamilnadu, India</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider text-fest-brightGold uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-fest-gold" />
              <span>Explore</span>
            </h4>
            <ul className="space-y-2 text-xs text-fest-cream/75">
              {SITE_CONFIG.navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-fest-gold transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-fest-gold/50 group-hover:scale-150 group-hover:bg-fest-gold transition-all" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: All 10 Events Direct Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider text-fest-brightGold uppercase flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-fest-orange" />
              <span>Events (10)</span>
            </h4>
            <ul
              data-lenis-prevent="true"
              className="space-y-1.5 text-xs text-fest-cream/75 pr-1"
            >
              {EVENTS.map((event) => (
                <li key={event.id}>
                  <Link
                    href={`/events/${event.id}`}
                    className="hover:text-fest-gold transition-colors flex items-center justify-between group py-0.5"
                  >
                    <span className="truncate max-w-[140px] group-hover:translate-x-0.5 transition-transform">
                      {event.posterNumber}. {event.title}
                    </span>
                    <span className="text-[10px] text-fest-gold/60 uppercase">
                      {event.participationType}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Registration QR & Instant Verification */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider text-fest-brightGold uppercase flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-fest-gold" />
              <span>Registration</span>
            </h4>
            <p className="text-xs text-fest-cream/70 leading-normal">
              Scan the official festival poster QR to open verified registrations.
            </p>

            <button
              onClick={() => {
                setShowQrModal(true);
                triggerFirework({
                  x: typeof window !== "undefined" ? window.innerWidth * 0.75 : 500,
                  y: 180,
                  pattern: "ring",
                  palette: "gold",
                  count: 35,
                  soundType: "chime",
                });
              }}
              className="group relative p-2 bg-white rounded-xl border-2 border-fest-gold/60 shadow-gold-sm hover:border-fest-brightGold transition-all flex items-center gap-3 w-full"
            >
              <div className="relative w-16 h-16 flex-shrink-0 bg-white">
                <Image
                  src={SITE_CONFIG.registration.officialQrCodeImage}
                  alt="PATTAS'26 Registration QR Code"
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-fest-midnight block group-hover:text-fest-maroon transition-colors">
                  Tap to Zoom QR
                </span>
                <span className="text-[10px] text-gray-600 block">Verified Official Link</span>
                <span className="text-[9px] text-fest-orange font-mono block">qrr.to/8f1ebaed</span>
              </div>
            </button>

            <a
              href={SITE_CONFIG.institution.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-fest-brightGold hover:underline pt-1"
            >
              <span>Visit MKCE Official Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-fest-cream/60">
          <p className="text-center sm:text-left">
            © 2026 PATTAS’26 at MKCE | M. Kumarasamy College of Engineering. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/rules" className="hover:text-fest-gold transition-colors">
              Rules &amp; Regulations
            </Link>
          </div>
        </div>
      </div>

      {/* QR Code Zoom Modal */}
      {showQrModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="glass-panel p-6 rounded-2xl max-w-sm w-full border border-fest-gold text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-fest-gold/20">
              <h3 className="font-serif font-bold text-fest-gold text-sm uppercase tracking-wider">
                Official PATTAS’26 Registration QR
              </h3>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-fest-cream/60 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-white p-4 rounded-xl inline-block shadow-gold-md border-2 border-fest-gold">
              <Image
                src={SITE_CONFIG.registration.officialQrCodeImage}
                alt="Enlarged PATTAS'26 Official Registration QR Code"
                width={220}
                height={220}
                className="mx-auto object-contain"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-fest-cream/80">
                Destination URL: <code className="text-fest-brightGold font-mono text-xs">https://qrr.to/8f1ebaed</code>
              </p>
              <div className="flex gap-2 justify-center pt-2">
                <a
                  href={SITE_CONFIG.registration.decodedDestinationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>Open URL</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={SITE_CONFIG.registration.officialQrCodeImage}
                  download="PATTAS26-Registration-QR.png"
                  className="btn-glass-gold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Save QR
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
