"use client";

import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (scrollProgress <= 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-fest-gold via-fest-brightGold to-fest-orange shadow-[0_0_12px_rgba(255,189,53,0.85)] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

