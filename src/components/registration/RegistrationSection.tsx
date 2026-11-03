"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Copy,
  Check,
  Download,
  ShieldCheck,
  HelpCircle,
  Maximize2,
  FileText,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { EVENTS } from "@/data/events";
import { getEventRegistrationConfig } from "@/data/registration";
import RegisterNowButton from "./RegisterNowButton";

export default function RegistrationSection() {
  const [copied, setCopied] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(SITE_CONFIG.registration.decodedDestinationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-12">
      {/* Top Hero Banner for Registration */}
      <div className="relative glass-panel-gold rounded-3xl p-6 sm:p-10 border-2 border-fest-gold shadow-gold-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Info & Verified URL (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-maroon/70 border border-fest-gold/40 text-fest-brightGold text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-fest-gold" />
              <span>Official MKCE Verified Registration</span>
            </div>

            <h2 className="font-serif font-black text-3xl sm:text-4xl text-gold-gradient">
              Register for PATTAS’26
            </h2>

            <p className="text-xs sm:text-sm text-fest-cream/80 leading-relaxed max-w-xl">
              Scan the authentic festival QR code or access the dedicated registration links below. All
              competitions are hosted exclusively on{" "}
              <strong className="text-fest-cream">04 November 2026</strong> at M. Kumarasamy College of
              Engineering, Karur.
            </p>

            <div className="p-4 rounded-2xl bg-fest-midnight/80 border border-fest-gold/30 space-y-2">
              <div className="flex items-center justify-between text-xs text-fest-cream/70">
                <span className="font-bold text-fest-brightGold uppercase tracking-wider text-[11px]">
                  Verified Destination Link
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Portal
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-black/40 border border-fest-gold/20 font-mono text-xs text-fest-gold">
                <span className="truncate">{SITE_CONFIG.registration.decodedDestinationUrl}</span>
                <button
                  onClick={copyUrl}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-fest-cream hover:text-fest-gold transition-colors flex-shrink-0"
                  title="Copy Link"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.registration.decodedDestinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-gold-sm"
              >
                <span>Launch Master Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={SITE_CONFIG.registration.rulesPdfUrl}
                download="PATTAS26-Rules-and-Regulations.pdf"
                className="btn-glass-gold px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-fest-gold" />
                <span>Download Rulebook PDF</span>
              </a>
            </div>
          </div>

          {/* Right: The Real QR Code Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group p-4 sm:p-5 bg-white rounded-3xl border-4 border-fest-gold shadow-gold-lg text-center max-w-xs transition-transform hover:scale-102">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto bg-white flex items-center justify-center">
                <Image
                  src={SITE_CONFIG.registration.officialQrCodeImage}
                  alt="Official PATTAS'26 Registration QR Code"
                  width={220}
                  height={220}
                  className="w-full h-full object-contain"
                  priority
                />
                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl text-white font-bold text-xs uppercase tracking-wider gap-1.5 backdrop-blur-xs"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Zoom</span>
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <span className="text-xs font-black text-fest-midnight block uppercase tracking-wider">
                  PATTAS’26 Registration QR
                </span>
                <span className="text-[10px] text-gray-500 block">
                  Scanned from MKCE Official Poster
                </span>

                <div className="flex gap-2 justify-center pt-2.5">
                  <a
                    href={SITE_CONFIG.registration.officialQrCodeImage}
                    download="PATTAS26-Official-QR.png"
                    className="px-3 py-1.5 rounded-full bg-fest-royal text-fest-brightGold text-[11px] font-bold flex items-center gap-1 hover:bg-fest-midnight transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download QR</span>
                  </a>
                  <button
                    onClick={() => setIsZoomOpen(true)}
                    className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-[11px] font-bold hover:bg-gray-200 transition-colors"
                  >
                    Enlarge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event-Wise Direct Registration Links Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-fest-gold/20">
          <div>
            <h3 className="font-serif font-black text-2xl text-fest-cream">
              Event-Wise Direct Registration
            </h3>
            <p className="text-xs text-fest-cream/70 mt-0.5">
              Click any event below to immediately launch its official dedicated Google Form.
            </p>
          </div>
          <span className="text-xs font-mono text-fest-gold/80 px-2.5 py-1 rounded-full bg-fest-midnight border border-fest-gold/30">
            10 Events • Dedicated Forms
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...EVENTS].sort((a, b) => Number(a.id) - Number(b.id)).map((event) => {
            const regConfig = getEventRegistrationConfig(event.id);

            return (
              <div
                key={event.id}
                className="glass-panel p-5 rounded-3xl border border-fest-gold/25 hover:border-fest-gold transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="flex items-start gap-3.5">
                  <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
                    <div
                      className="absolute inset-0 rounded-full blur-md opacity-30 pointer-events-none"
                      style={{ backgroundColor: event.accentColor || "#FFBD35" }}
                    />
                    <Image
                      src={event.iconImage || event.posterImage}
                      alt={event.title}
                      width={52}
                      height={52}
                      className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-fest-gold text-fest-midnight text-[11px] font-black flex items-center justify-center">
                        {event.posterNumber}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-fest-brightGold px-2 py-0.5 rounded bg-fest-royal/60 border border-fest-gold/30">
                        {event.participationType}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-fest-cream mt-1">
                      {event.title}
                    </h4>
                    <p className="text-[11px] text-fest-gold/80">{event.venue}</p>
                  </div>
                </div>

                <p className="text-xs text-fest-cream/70 line-clamp-2 leading-relaxed">
                  {event.description}
                </p>

                {/* Direct Registration Form Action */}
                <div className="pt-3 border-t border-fest-gold/15 space-y-2">
                  <RegisterNowButton
                    config={regConfig}
                    size="sm"
                    className="w-full text-center"
                  />
                  <div className="text-center">
                    <Link
                      href={`/events/${event.id}`}
                      className="text-[11px] text-fest-cream/60 hover:text-fest-gold transition-colors underline"
                    >
                      View full rules &amp; team guidelines &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guidelines & Registration Instructions Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-fest-gold/25 space-y-4">
        <div className="flex items-center gap-2 text-fest-brightGold font-serif font-bold text-lg">
          <HelpCircle className="w-5 h-5 text-fest-gold" />
          <span>Registration Guidelines &amp; Participant Notice</span>
        </div>
        <ul className="text-xs sm:text-sm text-fest-cream/80 space-y-2.5 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-fest-gold font-bold">•</span>
            <span>
              <strong>Authentic Destination:</strong> Each registration button connects directly to the
              official Google Form authorized by the Agastya Fine Arts Club. No intermediary form or fake
              confirmation screen is displayed.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-fest-gold font-bold">•</span>
            <span>
              <strong>Gender-Based Routing:</strong> For <em>Water Cup Balancing Game</em> and{" "}
              <em>Balloon Passing Through Head</em>, click <strong>REGISTER NOW</strong> to choose either
              the 👦 <strong>Boys</strong> or 👧 <strong>Girls</strong> form.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-fest-gold font-bold">•</span>
            <span>
              <strong>Capacity Caps:</strong> Once an event reaches maximum team/individual capacity (e.g.,
              30 teams for Face Painting, 50 teams for Water Cup, 100 for Tower Game), registrations will
              be automatically closed by the coordinators.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-fest-gold font-bold">•</span>
            <span>
              <strong>Eligibility:</strong> Open strictly to bonafide students of M. Kumarasamy College of
              Engineering (MKCE) carrying their college identification cards.
            </span>
          </li>
        </ul>
      </div>

      {/* Zoom QR Modal */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="glass-panel p-6 rounded-3xl max-w-sm w-full border-2 border-fest-gold text-center space-y-4 shadow-gold-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-fest-gold/20">
              <span className="text-xs font-serif font-black text-gold-gradient uppercase tracking-wider">
                PATTAS’26 Official QR
              </span>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="text-fest-cream/60 hover:text-white font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-fest-gold shadow-md">
              <Image
                src={SITE_CONFIG.registration.officialQrCodeImage}
                alt="Enlarged Registration QR"
                width={260}
                height={260}
                className="w-full h-auto object-contain mx-auto"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-fest-cream/80 font-mono">
                {SITE_CONFIG.registration.decodedDestinationUrl}
              </p>
              <div className="flex gap-2">
                <a
                  href={SITE_CONFIG.registration.decodedDestinationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1"
                >
                  <span>Open URL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={SITE_CONFIG.registration.officialQrCodeImage}
                  download="PATTAS26-Official-QR.png"
                  className="btn-glass-gold flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
