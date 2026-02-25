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
 "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {

      },
    },
  },
  // IMPORTANTE: Asegúrate de que no haya plugins que fuercen el centrado del container
  plugins: [],
};

export default config;