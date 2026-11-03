"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import UniversalFireworks from "@/components/fireworks/UniversalFireworks";
import { triggerFirework } from "@/lib/fireworks-dispatcher";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    subject: "Event Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    triggerFirework({
      x: typeof window !== "undefined" ? window.innerWidth * 0.5 : 400,
      y: 180,
      pattern: "peony",
      palette: "gold",
      count: 45,
      soundType: "chime",
    });
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        department: "",
        subject: "Event Inquiry",
        message: "",
      });
    }, 5000);
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <UniversalFireworks
        preset="subtle-stars"
        colorPalette="gold"
        intensity="subtle"
        explosionFrequency={4500}
        enableInteraction={true}
      />
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-royal/70 border border-fest-gold/30 text-fest-brightGold text-xs font-bold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5 text-fest-gold" />
          <span>Organizer Helpdesk</span>
        </div>
        <h1 className="font-serif font-black text-4xl sm:text-6xl text-gold-gradient">
          Contact &amp; Support
        </h1>
        <p className="text-xs sm:text-sm text-fest-cream/75 leading-relaxed">
          Have queries about rules, team registrations, venues, or arrival details? Reach out to the
          Agastya Fine Arts Club organizing committee at MKCE.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Official College Contact Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl border border-fest-gold shadow-gold-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-fest-gold/20">
              <div className="w-12 h-12 rounded-full border border-fest-gold/40 p-1 bg-fest-midnight flex items-center justify-center">
                <Image
                  src="/assets/brand/mkce-crest.png"
                  alt="MKCE"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif font-black text-lg text-gold-gradient">
                  MKCE Karur
                </h3>
                <p className="text-xs text-fest-brightGold">Agastya Fine Arts Club</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-fest-cream/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-fest-gold flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-fest-cream font-semibold block">Campus Location:</strong>
                  <span>M. Kumarasamy College of Engineering,</span>
                  <span className="block">Thalavapalayam, Karur - 639 113,</span>
                  <span className="block text-fest-cream/60">Tamilnadu, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-fest-orange flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-fest-cream font-semibold block">Official Phone:</strong>
                  <span>+91 4324 272155 / 270755</span>
                  <span className="block text-[11px] text-fest-cream/60">
                    Ext: Cultural Affairs &amp; Fine Arts Desk
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-fest-magenta flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-fest-cream font-semibold block">Email Desk:</strong>
                  <a
                    href="mailto:info@mkce.ac.in"
                    className="text-fest-brightGold hover:underline"
                  >
                    info@mkce.ac.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-fest-gold flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-fest-cream font-semibold block">Festival Timings:</strong>
                  <span>04 November 2026 (01:30 PM to 06:00 PM IST)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-fest-gold/20">
              <a
                href={SITE_CONFIG.institution.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass-gold w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2"
              >
                <span>Visit MKCE Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Interactive Support Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-fest-gold/30 shadow-gold-sm space-y-6">
            <div>
              <h3 className="font-serif font-black text-2xl text-gold-gradient">
                Send an Inquiry
              </h3>
              <p className="text-xs text-fest-cream/70 mt-1">
                Our festival student coordinators will respond to your queries promptly.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2 animate-in fade-in duration-300">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-emerald-300">
                  Message Transmitted Successfully!
                </h4>
                <p className="text-xs text-fest-cream/80 max-w-sm mx-auto">
                  Thank you! The PATTAS’26 organizing team has received your inquiry. We will connect
                  with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-fest-cream/80 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anand R"
                      className="w-full px-4 py-2.5 rounded-xl bg-fest-midnight/80 border border-fest-gold/30 text-fest-cream text-xs focus:outline-none focus:border-fest-brightGold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-fest-cream/80 block mb-1">
                      College Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@mkce.ac.in"
                      className="w-full px-4 py-2.5 rounded-xl bg-fest-midnight/80 border border-fest-gold/30 text-fest-cream text-xs focus:outline-none focus:border-fest-brightGold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-fest-cream/80 block mb-1">
                      Department / College
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      placeholder="e.g. CSE / IT / ECE"
                      className="w-full px-4 py-2.5 rounded-xl bg-fest-midnight/80 border border-fest-gold/30 text-fest-cream text-xs focus:outline-none focus:border-fest-brightGold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-fest-cream/80 block mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-fest-midnight/80 border border-fest-gold/30 text-fest-cream text-xs focus:outline-none focus:border-fest-brightGold"
                    >
                      <option value="Event Inquiry">Competition Rules Query</option>
                      <option value="Registration Issue">Google Form Registration Issue</option>
                      <option value="Venue & Arrival">Venue &amp; Campus Route Question</option>
                      <option value="General Support">General Support / Cultural Council</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-fest-cream/80 block mb-1">
                    Your Message / Query *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry with event name and details..."
                    className="w-full px-4 py-2.5 rounded-xl bg-fest-midnight/80 border border-fest-gold/30 text-fest-cream text-xs focus:outline-none focus:border-fest-brightGold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry to Organizers</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
