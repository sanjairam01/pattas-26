import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        fest: {
          midnight: "#071329",
          navy: "#0a1936",
          royal: "#102C62",
          maroon: "#650D30",
          deepMaroon: "#45051e",
          gold: "#FFBD35",
          brightGold: "#FFD76A",
          amber: "#FF9E00",
          orange: "#FF7518",
          cream: "#FFF3D8",
          magenta: "#E82C91",
          deepBlue: "#091732",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        decorative: ["var(--font-cinzel-decorative)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FFBD35 0%, #FFD76A 50%, #FF7518 100%)",
        "royal-gradient": "linear-gradient(135deg, #071329 0%, #102C62 50%, #650D30 100%)",
        "card-glass": "linear-gradient(135deg, rgba(16, 44, 98, 0.45) 0%, rgba(101, 13, 48, 0.25) 100%)",
        "gold-border-glow": "linear-gradient(90deg, #FFBD35, #FF7518, #E82C91, #FFD76A)",
      },
      boxShadow: {
        "gold-sm": "0 0 15px rgba(255, 189, 53, 0.25)",
        "gold-md": "0 0 25px rgba(255, 189, 53, 0.4)",
        "gold-lg": "0 0 45px rgba(255, 189, 53, 0.6)",
        "diya-glow": "0 0 50px rgba(255, 117, 24, 0.5), 0 0 100px rgba(255, 189, 53, 0.3)",
      },
      animation: {
        "flicker": "flicker 2.5s infinite alternate ease-in-out",
        "float": "float 5s infinite ease-in-out",
        "float-slow": "float 8s infinite ease-in-out",
        "sway": "sway 4s infinite ease-in-out",
        "pulse-glow": "pulseGlow 3s infinite alternate ease-in-out",
        "spin-slow": "spin 30s linear infinite",
        "spin-reverse": "spinReverse 40s linear infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "25%": { transform: "scale(1.06, 0.94) rotate(-1deg)", opacity: "0.85" },
          "50%": { transform: "scale(0.96, 1.04) rotate(1deg)", opacity: "0.95" },
          "75%": { transform: "scale(1.03, 0.98) rotate(-0.5deg)", opacity: "0.9" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        pulseGlow: {
          "0%": { opacity: "0.4", filter: "drop-shadow(0 0 10px rgba(255,189,53,0.3))" },
          "100%": { opacity: "0.9", filter: "drop-shadow(0 0 25px rgba(255,189,53,0.7))" },
        },
        spinReverse: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
