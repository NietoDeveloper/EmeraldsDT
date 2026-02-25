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


      },
    },
  },
  // IMPORTANTE: Asegúrate de que no haya plugins que fuercen el centrado del container
  plugins: [],
};

export default config;