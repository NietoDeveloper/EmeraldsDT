import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Definimos pantallas explícitas para el Nieto Lab
    screens: {
      'xs': '310px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'uw': '1900px', // Ultra-Wide: El estándar de tu proyecto
    },
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        emerald: {
          DEFAULT: "#047857",
          light: "#10b981",
          dark: "#064e3b",
        },
        gold: {
          DEFAULT: "#D4AF37",
          dark: "#996515",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1.2s ease-in forwards",
        "slow-pan": "slowPan 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slowPan: {
          "0%": { transform: "scale(1) translateX(0)" },
          "50%": { transform: "scale(1.1) translateX(-2%)" },
          "100%": { transform: "scale(1) translateX(0)" },
        },
      },
    },
  },
  // IMPORTANTE: Asegúrate de que no haya plugins que fuercen el centrado del container
  plugins: [],
};

export default config;