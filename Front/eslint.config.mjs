import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extiende las configuraciones de Next.js de forma compatible con Flat Config
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Configuración de ignorados (Reemplaza a globalIgnores de forma nativa)
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**"
    ],
  },
  
  // Reglas personalizadas para Emerald DT
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unescaped-entities": "off"
    }
  }
];

export default eslintConfig;