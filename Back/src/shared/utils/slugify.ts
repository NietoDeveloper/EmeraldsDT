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
    // 1. Normalización NFD: separa caracteres combinados (ej: 'é' -> 'e' + '´')
    .normalize('NFD')
    // 2. Elimina diacríticos (acentos y tildes) usando el rango Unicode de bloques de combinación
    .replace(/[\u0300-\u036f]/g, '')
    // 3. Reemplaza la 'ñ' explícitamente si la normalización no la cubrió en algunos entornos
    .replace(/ñ/g, 'n')
    // 4. Reemplaza espacios y guiones bajos por guiones sencillos
    .replace(/[\s_]+/g, '-')
    // 5. Elimina cualquier caracter que no sea alfanumérico o guion
    .replace(/[^\w-]+/g, '')
    // 6. Colapsa múltiples guiones consecutivos en uno solo
    .replace(/--+/g, '-')
    // 7. Limpia guiones al inicio y al final
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

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