import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // La base de SpaceX: Negro absoluto
        background: "#000000",
        foreground: "#ffffff",
        // Identidad Emerald DT
        emerald: {
          DEFAULT: "#047857", // Esmeralda principal
          light: "#10b981",   // Brillo para hovers
          dark: "#064e3b",    // Para profundidad
        },
        // Acento de lujo
        gold: {
          DEFAULT: "#D4AF37",
          dark: "#996515",
        },
      },
      fontFamily: {
        // Tipografía limpia y técnica
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        // Animación de entrada tipo "Falcon 9 Launch" (Fade In + Up)
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1.2s ease-in forwards",
        "slow-pan": "slowPan 20s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
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
  plugins: [],
};

export default config;