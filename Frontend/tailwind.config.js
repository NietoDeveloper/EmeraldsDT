/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-red": "var(--color-red)",
        "color-yellow": "var(--color-yellow)",
      },
      fontFamily: {
        hobo: ["var(--font-hobo)"],
      }
    },
  },
  plugins: [],
};
