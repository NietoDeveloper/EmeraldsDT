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

export const emeraldSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100),
  description: z.string().max(1000).optional(),


  assets: z.object({
    images: z.array(z.string().url()).optional(),
    certificate: z.object({
      entity: z.nativeEnum(CERTIFICATION_ENTITIES),
      reportNumber: z.string().optional(),
      pdfUrl: z.string().url().optional(),
    }).optional(),
  }).optional(),
});

// Esquema para actualizaciones (hace que todos los campos sean opcionales)
export const updateEmeraldSchema = emeraldSchema.partial();

/**
 * TYPE INFERENCE
 * Extrae el tipo directamente del esquema para usarlo en el código.
 */
export type EmeraldInput = z.infer<typeof emeraldSchema>;