/**
 * 🛠️ SLUG GENERATOR - EMERALD DT STANDARD (L6)
 * Engine de transformación de strings para URLs semánticas y SEO.
 */

/**
 * Convierte cualquier cadena de texto en un slug amigable.
 * Maneja normalización de caracteres Unicode (tildes, eñes) y limpieza de símbolos.
 * @param text - El nombre del producto o categoría (ej: "Esmeralda Muzo AAA++")
 * @returns string - El slug resultante (ej: "esmeralda-muzo-aaa")
 */
export const slugify = (text: string): string => {
  if (!text) return '';

  return text
    .toString()
    .toLowerCase()
    .trim()
    //

/**
 * 🛰️ UNIQUE SLUG GENERATOR
 * Combina el nombre con el SKU para garantizar que no existan colisiones en el Cluster Alpha.
 * @param name - Nombre del activo
 * @param sku - SKU único del inventario
 */
export const generateUniqueSlug = (name: string, sku: string): string => {
  const base = slugify(name);
  const suffix = slugify(sku);
  return `${base}-${suffix}`;
};