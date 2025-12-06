/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Colores existentes
        "color-red": "var(--color-red)",
        "color-yellow": "var(--color-yellow)",
        
        // ✨ Nuevo color Esmeralda para Colombia:
        // Uso de un color hexadecimal fijo para el esmeralda
        "color-emerald": "#00A36C", 
      },
      fontFamily: {
        hobo: ["var(--font-hobo)"],
      }
    },
  },
  plugins: [],
};