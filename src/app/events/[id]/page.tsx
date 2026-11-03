import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Users,
  Clock,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { EVENTS, findEventByIdOrSlug } from "@/data/events";
import { getEventRegistrationConfig } from "@/data/registration";
import RegisterNowButton from "@/components/registration/RegisterNowButton";
import UniversalFireworks from "@/components/fireworks/UniversalFireworks";

export function generateStaticParams() {
  const allIds = new Set<string>();
  EVENTS.forEach((e) => {
    allIds.add(e.id);
    allIds.add(String(e.numericId));
    allIds.add(e.slug);
    if (e.aliases) e.aliases.forEach((a) => allIds.add(a));
  });
  return Array.from(allIds).map((id) => ({ id }));
}

export async function generateMetadata() {
  return {
    title: "PATTAS'26 at MKCE",
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = findEventByIdOrSlug(id);

  if (!event) {
    notFound();
  }

  const eventIndex = EVENTS.findIndex((e) => e.id === event.id);
  const prevEvent = eventIndex > 0 ? EVENTS[eventIndex - 1] : EVENTS[EVENTS.length - 1];
  const nextEvent = eventIndex < EVENTS.length - 1 ? EVENTS[eventIndex + 1] : EVENTS[0];

  const regConfig = getEventRegistrationConfig(event.id);

  // Generate event-specific firework palette
  const eventPalette = [
    event.accentColor || "#FFBD35",
    "#FFD700",
    "#FFF0A0",
    "#FF7518",
  ];

  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <UniversalFireworks
        preset="celebration"
        customColors={eventPalette}
        intensity="subtle"
        explosionFrequency={3400}
        enableInteraction={true}
        zIndex={0}
      />
      {/* Back button */}
      <div>
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs text-fest-gold hover:text-fest-brightGold transition-colors font-medium group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All 10 Events</span>
        </Link>
      </div>

      {/* Main Event Showcase Card */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border-2 border-fest-gold shadow-gold-md space-y-8 relative overflow-hidden">
        {/* Ambient Glow */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-30 pointer-events-none"
          style={{ backgroundColor: event.accentColor }}
        />

        {/* Top Header */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-fest-gold/25">
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-35 pointer-events-none"
                style={{ backgroundColor: event.accentColor || "#FFBD35" }}
              />
              <Image
                src={event.iconImage || event.posterImage}
                alt={event.title}
                width={112}
                height={112}
                className="w-full h-full object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.6)]"
                priority
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-fest-gold to-fest-brightGold text-fest-midnight text-xs font-serif font-black flex items-center justify-center shadow-sm">
                  {event.posterNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-fest-royal/80 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider">
                  {event.participationType} ({event.teamSize})
                </span>
                {event.posterNumber !== event.pdfNumber && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-950 border border-blue-400/40 text-blue-200 text-[11px] font-mono">
                    PDF Rules Index: Event {event.pdfNumber}
                  </span>
                )}
              </div>

              <h1 className="font-serif font-black text-3xl sm:text-4xl text-gold-gradient">
                {event.title}
              </h1>
              <p className="text-xs sm:text-sm text-fest-gold italic">
                &ldquo;{event.tagline}&rdquo;
              </p>
            </div>
          </div>

          {/* Master Event-Wise Registration Button with Magnetic Hover & Particle Burst */}
          <div className="w-full md:w-auto flex flex-col items-stretch md:items-end gap-2">
            <RegisterNowButton
              config={regConfig}
              size="lg"
              className="w-full sm:w-auto"
            />
            {regConfig?.registrationType === "gender_based" && (
              <span className="text-[10px] text-fest-brightGold text-center md:text-right font-medium">
                ⚡ Separate Boys &amp; Girls Registration
              </span>
            )}
          </div>
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-fest-midnight/80 border border-fest-gold/25 space-y-1">
            <div className="flex items-center gap-1.5 text-fest-gold text-xs font-bold uppercase">
              <MapPin className="w-3.5 h-3.5" />
              <span>Venue</span>
            </div>
            <p className="text-sm font-semibold text-fest-cream">{event.venue}</p>
          </div>

          <div className="p-4 rounded-2xl bg-fest-midnight/80 border border-fest-gold/25 space-y-1">
            <div className="flex items-center gap-1.5 text-fest-brightGold text-xs font-bold uppercase">
              <Users className="w-3.5 h-3.5" />
              <span>Capacity</span>
            </div>
            <p className="text-sm font-semibold text-fest-cream">{event.maxCapacity}</p>
            <span className="text-[11px] text-fest-cream/60 block">{event.teamSize}</span>
          </div>

          <div className="p-4 rounded-2xl bg-fest-midnight/80 border border-fest-gold/25 space-y-1">
            <div className="flex items-center gap-1.5 text-fest-orange text-xs font-bold uppercase">
              <Clock className="w-3.5 h-3.5" />
              <span>Duration</span>
            </div>
            <p className="text-sm font-semibold text-fest-cream">{event.duration}</p>
            <span className="text-[11px] text-fest-cream/60 block">{event.timing}</span>
          </div>

          <div className="p-4 rounded-2xl bg-fest-midnight/80 border border-fest-gold/25 space-y-1">
            <div className="flex items-center gap-1.5 text-fest-magenta text-xs font-bold uppercase">
              <Calendar className="w-3.5 h-3.5" />
              <span>Date</span>
            </div>
            <p className="text-sm font-semibold text-fest-cream">04 Nov 2026</p>
            <span className="text-[11px] text-fest-cream/60 block">PATTAS’26 Day</span>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-3">
          <h3 className="font-serif font-black text-xl text-fest-cream">
            Competition Overview
          </h3>
          <p className="text-xs sm:text-sm text-fest-cream/80 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Official Rules Verbatim */}
        <div className="space-y-4">
          <h3 className="font-serif font-black text-xl text-fest-brightGold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-fest-gold" />
            <span>Official Rules &amp; Regulations (PDF Source)</span>
          </h3>
          <div className="space-y-2.5">
            {event.rules.map((rule, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-fest-midnight/60 border border-fest-gold/20 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-fest-gold/20 text-fest-gold font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-fest-cream/85 leading-relaxed">
                  {rule}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Materials vs Restrictions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-5 rounded-3xl bg-emerald-950/20 border border-emerald-500/25 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Permitted Materials &amp; Tools</span>
            </div>
            <ul className="text-xs sm:text-sm text-fest-cream/80 space-y-1.5 pl-2">
              {event.materialsPermitted.map((m, i) => (
                <li key={i}>• {m}</li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-3xl bg-rose-950/20 border border-rose-500/25 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Strict Restrictions &amp; Disqualification</span>
            </div>
            <ul className="text-xs sm:text-sm text-fest-cream/80 space-y-1.5 pl-2">
              {event.restrictions.map((r, i) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Prev / Next Event Navigation */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t border-fest-gold/20">
        <Link
          href={`/events/${prevEvent.id}`}
          className="btn-glass-gold px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 hover:border-fest-gold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">{prevEvent.posterNumber}.</span>
          <span className="truncate max-w-[140px] sm:max-w-none">{prevEvent.title}</span>
        </Link>

        <Link
          href={`/events/${nextEvent.id}`}
          className="btn-glass-gold px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 hover:border-fest-gold group"
        >
          <span className="hidden sm:inline">{nextEvent.posterNumber}.</span>
          <span className="truncate max-w-[140px] sm:max-w-none">{nextEvent.title}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
