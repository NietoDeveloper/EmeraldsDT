/**
 * 💎 EMERALD DT - INDUSTRY CONSTANTS (L5)
 * Estandarización de parámetros para el mercado de esmeraldas colombianas.
 */

export const EMERALD_ORIGINS = {
  MUZO: 'Muzo',
  CHIVOR: 'Chivor',
  COSCUEZ: 'Coscuez',
  ITOKO: 'Itoko',
  QUIPAMA: 'Quipama',
  OTHER: 'Other'
} as const;

export const EMERALD_CUTS = {
  EMERALD: 'Emerald',
  OVAL: 'Oval',
  PEAR: 'Pear',
  ROUND: 'Round',
  HEART: 'Heart',
  MARQUISE: 'Marquise',
  CUSHION: 'Cushion',
  TRAPICHE: 'Trapiche'
} as const;

export const EMERALD_CLARITY = {
  IF: 'Internally Flawless',
  VVS: 'Very Very Slightly Included',
  VS: 'Very Slightly Included',
  SI: 'Slightly Included',
  I: 'Included'
} as const;

export const EMERALD_COLOR_INTENSITY = {
  FANCY_LIGHT: 'Fancy Light',
  FANCY: 'Fancy',
  FANCY_INTENSE: 'Fancy Intense',
  FANCY_VIVID: 'Fancy Vivid',
  FANCY_DEEP: 'Fancy Deep'
} as const;

export const INVENTORY_STATUS = {
  AVAILABLE: 'AVAILABLE',
  RESERVED: 'RESERVED',
  SOLD: 'SOLD',
  MAINTENANCE: 'MAINTENANCE'
} as const;

export const CERTIFICATION_ENTITIES = {
  GIA: 'GIA',
  CDTEC: 'CDTEC',
  GRS: 'GRS',
  GUBLIN: 'Gübelin',
  OTHER: 'Other'
} as const;

// Tipos extraídos para TypeScript (Nivel L5)
export type EmeraldOrigin = typeof EMERALD_ORIGINS[keyof typeof EMERALD_ORIGINS];
export type EmeraldCut = typeof EMERALD_CUTS[keyof typeof EMERALD_CUTS];
export type InventoryStatus = typeof INVENTORY_STATUS[keyof typeof INVENTORY_STATUS];