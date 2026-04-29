import { z } from 'zod';
import { 
  EMERALD_ORIGINS, 
  EMERALD_CUTS, 
  EMERALD_CLARITY, 
  INVENTORY_STATUS, 
  CERTIFICATION_ENTITIES 
} from './emerald.constants.js';

/**
 * 🛡️ EMERALD VALIDATION SCHEMA - NIVEL L5
 * Validador de integridad para creación y actualización de activos.
 */


// Esquema para actualizaciones (hace que todos los campos sean opcionales)
export const updateEmeraldSchema = emeraldSchema.partial();

/**
 * TYPE INFERENCE
 * Extrae el tipo directamente del esquema para usarlo en el código.
 */
export type EmeraldInput = z.infer<typeof emeraldSchema>;