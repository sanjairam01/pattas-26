"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Sparkles,
  Home,
  Info,
  Flame,
  Calendar,
  FileText,
  ArrowRight,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  shortLabel?: string;
}

// Official Festival Destinations directly accessible across Desktop & Mobile Navigation
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Events", href: "/events", icon: Flame },
  { label: "Schedule", href: "/schedule", icon: Calendar },
  { label: "Rules", href: "/rules", icon: FileText },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Escape key handling for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-3 shadow-lg border-b border-fest-gold/25 backdrop-blur-xl"
          : "bg-transparent py-4 border-b border-fest-gold/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: PATTAS’26 Official 3D Branding */}
        <Link
          href="/"
          title="PATTAS’26 at MKCE"
          aria-label="PATTAS’26 at MKCE Home"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-fest-gold rounded-xl p-1"
        >
          {/* Official PATTAS'26 3D Logo */}
          <div className="flex flex-col">
            <div className="relative h-7 sm:h-8 w-28 sm:w-36 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/assets/brand/pattas26-logo.png"
                alt="PATTAS’26 at MKCE Official Logo"
                fill
                className="object-contain object-left filter drop-shadow-[0_0_12px_rgba(255,189,53,0.65)]"
                priority
              />
            </div>
            <span className="text-[9px] sm:text-[10px] text-fest-cream/65 tracking-wider truncate max-w-[130px] sm:max-w-none">
              M. Kumarasamy College of Engineering
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links (All 7 Destinations Direct) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 rounded-full text-xs xl:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "text-fest-gold bg-fest-royal/70 border border-fest-gold/50 shadow-gold-sm"
                    : "text-fest-cream/80 hover:text-fest-brightGold hover:bg-white/5 border border-transparent hover:border-fest-gold/20"
                }`}
              >
                <span className="hidden xl:inline">{item.label}</span>
                <span className="xl:hidden">{item.shortLabel || item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-fest-gold animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions & Animated Prominent REGISTER NOW Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Prominent Animated REGISTER NOW Button */}
          <Link
            href="/registration"
            className="relative group hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-fest-gold via-fest-brightGold to-fest-orange text-fest-midnight shadow-gold-md hover:scale-105 active:scale-95 transition-all overflow-hidden border border-fest-gold"
          >
            <Sparkles className="w-3.5 h-3.5 fill-fest-midnight text-fest-midnight animate-spin-slow group-hover:rotate-45 transition-transform" />
            <span>Register Now</span>
            {/* Moving light reflection effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </Link>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-xl text-fest-cream hover:text-fest-gold hover:bg-white/5 border border-fest-gold/30 transition-all focus:outline-none cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-fest-gold transition-transform duration-200 rotate-90" />
            ) : (
              <Menu className="w-5 h-5 transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-panel border-t border-fest-gold/30 px-5 py-5 mt-3 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 shadow-2xl backdrop-blur-2xl max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-fest-gold/20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fest-royal/70 border border-fest-gold/30 text-fest-brightGold text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-fest-gold animate-spin-slow" />
              <span>FESTIVAL MENU</span>
            </div>
            <span className="text-[10px] font-mono text-fest-cream/60">{NAV_ITEMS.length} Destinations</span>
          </div>

          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                    isActive
                      ? "text-fest-gold bg-fest-royal/80 border border-fest-gold/50 shadow-gold-sm"
                      : "text-fest-cream/80 hover:text-fest-gold hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {IconComponent && (
                      <IconComponent
                        className={`w-4 h-4 ${isActive ? "text-fest-gold" : "text-fest-brightGold"}`}
                      />
                    )}
                    <span>{item.label}</span>
                  </div>
                  {isActive ? (
                    <span className="w-2 h-2 rounded-full bg-fest-gold shadow-gold-sm animate-pulse" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-fest-gold/40" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-fest-gold/20 flex flex-col gap-2">
            <Link
              href="/registration"
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative group w-full text-center py-3 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-fest-gold via-fest-brightGold to-fest-orange text-fest-midnight shadow-gold-md flex items-center justify-center gap-2 overflow-hidden border border-fest-gold"
            >
              <Sparkles className="w-4 h-4 fill-fest-midnight text-fest-midnight animate-spin-slow" />
              <span>Register Now</span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </Link>
            <p className="text-[11px] text-center text-fest-cream/50 pt-1">
              04 November 2026 • M. Kumarasamy College of Engineering
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
