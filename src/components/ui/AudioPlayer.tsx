"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Web Audio synth for ambient festive drone & chimes
  const startSynth = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Base drone chords (Indian pentatonic warm tanpura simulation: Sa, Pa, Sa)
      // C#3 ~ 138.59 Hz, G#3 ~ 207.65 Hz, C#4 ~ 277.18 Hz
      const freqs = [138.59, 207.65, 277.18];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle sub-harmonic modulation
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.15 + idx * 0.05, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.15 / (idx + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
      });

      // Occasional festive chime bell harmonics every 6-8 seconds
      const chimeNotes = [554.37, 659.25, 830.61, 987.77, 1108.73]; // C#5, E5, G#5, B5, C#6
      intervalRef.current = setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
        const now = audioCtxRef.current.currentTime;
        const note = chimeNotes[Math.floor(Math.random() * chimeNotes.length)];

        const bellOsc = audioCtxRef.current.createOscillator();
        const bellGain = audioCtxRef.current.createGain();
        bellOsc.type = "triangle";
        bellOsc.frequency.setValueAtTime(note, now);

        bellGain.gain.setValueAtTime(0.001, now);
        bellGain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        bellOsc.connect(bellGain);
        bellGain.connect(masterGain);
        bellOsc.start(now);
        bellOsc.stop(now + 2.6);
      }, 5500);

      setIsPlaying(true);
    } catch {
      console.warn("Web Audio not allowed before user interaction.");
    }
  };

  const stopSynth = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSynth();
    } else {
      startSynth();
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume * 0.3, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopSynth();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <div className="glass-panel px-3 py-2 rounded-full border border-fest-gold/30 flex items-center gap-2.5 shadow-gold-sm transition-all hover:border-fest-gold/60">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Mute Festival Ambient Sound" : "Play Festival Ambient Sound"}
          className="flex items-center gap-2 text-fest-gold hover:text-fest-brightGold transition-colors text-xs font-semibold"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-fest-gold animate-pulse" />
              <span className="hidden sm:inline">Sound ON</span>
              {/* Animated audio wave bars */}
              <span className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-full bg-fest-gold animate-[bounce_1s_infinite_100ms]" />
                <span className="w-0.5 h-2/3 bg-fest-gold animate-[bounce_1s_infinite_300ms]" />
                <span className="w-0.5 h-4/5 bg-fest-gold animate-[bounce_1s_infinite_200ms]" />
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-fest-cream/60" />
              <span className="hidden sm:inline text-fest-cream/70">Festive Sound</span>
            </>
          )}
        </button>

        {isPlaying && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-14 h-1 accent-fest-gold cursor-pointer bg-white/20 rounded-lg"
            title="Adjust Volume"
          />
        )}
      </div>
    </div>
  );
}
