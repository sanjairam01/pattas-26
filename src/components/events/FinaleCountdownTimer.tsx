"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface TimeUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
  isCompleted: boolean;
}

export default function FinaleCountdownTimer() {
  const [timeUnits, setTimeUnits] = useState<TimeUnits>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
    isCompleted: false,
  });

  useEffect(() => {
    // Target: 04 November 2026 15:00:00 IST (+05:30)
    const targetDate = new Date("2026-11-04T15:00:00+05:30").getTime();
    const endDate = new Date("2026-11-04T18:00:00+05:30").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();

      if (now >= endDate) {
        setTimeUnits({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false, isCompleted: true });
        return;
      }

      if (now >= targetDate && now < endDate) {
        setTimeUnits({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true, isCompleted: false });
        return;
      }

      const diff = targetDate - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeUnits({ days, hours, minutes, seconds, isLive: false, isCompleted: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeUnits.isLive) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-600/90 border border-red-400 text-white font-bold text-xs uppercase tracking-wider animate-pulse shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
        <span>DJ Ground is LIVE NOW!</span>
      </div>
    );
  }

  if (timeUnits.isCompleted) {
    return (
      <div className="px-4 py-2 rounded-2xl bg-fest-midnight/80 border border-fest-gold/30 text-fest-gold text-xs font-semibold">
        <span>Celebration Concluded</span>
      </div>
    );
  }

  const items = [
    { label: "Days", val: timeUnits.days },
    { label: "Hours", val: timeUnits.hours },
    { label: "Mins", val: timeUnits.minutes },
    { label: "Secs", val: timeUnits.seconds },
  ];

  return (
    <div className="flex flex-col items-center sm:items-end gap-1.5 flex-shrink-0">
      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-fest-brightGold/90 pb-0.5">
        <Clock className="w-3 h-3 text-fest-gold animate-spin-slow" />
        <span>Countdown To Finale</span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {items.map((item, idx) => (
          <div key={item.label} className="flex items-center gap-1 sm:gap-2">
            <div className="flex flex-col items-center justify-center bg-fest-midnight/90 border-2 border-fest-gold/50 rounded-2xl px-2.5 sm:px-3 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[60px] shadow-gold-sm backdrop-blur-md">
              <span className={`font-mono text-base sm:text-2xl font-black ${idx === 3 ? "text-fest-orange" : "text-gold-gradient"}`}>
                {String(item.val).padStart(2, "0")}
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-wider text-fest-cream/70">
                {item.label}
              </span>
            </div>
            {idx < 3 && (
              <span className="text-fest-gold font-bold text-sm sm:text-base animate-pulse">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
