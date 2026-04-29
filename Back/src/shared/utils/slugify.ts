/**
 * 🛠️ SLUG GENERATOR - EMERALD DT INDUSTRIAL GRADE (L6)
 * Core transformation engine for semantic URLs and SEO optimization.
 */

/**
 * Transforms any string into a URL-friendly slug.
 * Optimized for Spanish/English gemstone inventory.
 */
export const slugify = (text: string): string => {
  if (!text || typeof text !== 'string') return '';

  return text
    .toString()
    .toLowerCase()
    .trim()
    // 1. Unicode Normalization (NFD) to separate diacritics
    .normalize('NFD')
    // 2. Remove accents/tildes
    .replace(/[\u0300-\u036f]/g, '')
    // 3. Explicitly handle Spanish 'ñ' and special characters like '&'
    .replace(/ñ/g, 'n')
    .replace(/&/g, 'and')
    // 4. Replace spaces, underscores, and dots with single hyphens
    .replace(/[\s_.]+/g, '-')
    // 5. Remove any non-alphanumeric character except hyphens
    .replace(/[^\w-]+/g, '')
    // 6. Collapse multiple hyphens into one
    .replace(/--+/g, '-')
    // 7. Trim hyphens from both ends
    .replace(/^-+|-+$/g, '')
    // 8. Security/SEO Limit: Prevent excessively long URLs (Max 150 chars)
    .substring(0, 150);
};

/**
 * 🛰️ UNIQUE SLUG GENERATOR
 * Combines asset name with SKU to ensure zero collisions in Alpha Cluster.
 */
export const generateUniqueSlug = (name: string, sku: string): string => {
  const baseSlug = slugify(name);
  const cleanSku = slugify(sku);
  
  if (!baseSlug) return cleanSku;
  
  return `${baseSlug}-${cleanSku}`;
};