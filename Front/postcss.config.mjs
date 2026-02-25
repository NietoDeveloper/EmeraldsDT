/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Usamos los nombres de los plugins como keys para compatibilidad total con PostCSS 8
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;