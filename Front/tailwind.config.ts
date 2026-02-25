import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Breakpoints explícitos para garantizar responsive 310px - 1900px
    screens: {
      'xs': '310px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'uw': '1900px', 
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
        // Vinculamos las variables de Next Font con Tailwind
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1.2s ease-in forwards",
        "slow-pan": "slowPan 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
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
          "50%": { transform: "scale(1.05) translateX(-1%)" }, // Reducido para evitar blur en fuentes
          "100%": { transform: "scale(1) translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
      // Añadimos espaciado personalizado para el layout ultra-wide
      maxWidth: {
        'uw': '1900px',
      }
    },
  },
  plugins: [],
};

export default config;