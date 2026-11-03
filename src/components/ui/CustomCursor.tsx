"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const isVisibleRef = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device has a precise pointing device (mouse)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "BUTTON" ||
        target?.tagName === "A" ||
        target?.closest("button") ||
        target?.closest("a") ||
        target?.getAttribute("role") === "button"
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Flame core cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-fest-gold shadow-gold-sm pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isPointer ? 1.6 : 1,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-fest-orange to-fest-brightGold animate-pulse" />
      </motion.div>

      {/* Outer halo / aura */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-fest-gold/40 pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isPointer ? 1.8 : 1,
          borderColor: isPointer ? "rgba(255, 189, 53, 0.9)" : "rgba(255, 189, 53, 0.35)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </div>
  );
}

