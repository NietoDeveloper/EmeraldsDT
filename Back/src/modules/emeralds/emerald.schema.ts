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
  
  specifications: z.object({
    sku: z.string().min(5, "SKU required for tracking"),
    weight: z.number().positive("Weight must be greater than 0"),
    dimensions: z.string().optional(), // Ej: "8.5 x 6.2 x 4.1 mm"
    origin: z.nativeEnum(EMERALD_ORIGINS),
    cut: z.nativeEnum(EMERALD_CUTS),
    clarity: z.nativeEnum(EMERALD_CLARITY),
  }),

  financials: z.object({
    price: z.number().positive("Price must be positive"),
    currency: z.string().default('USD'),
    cost: z.number().optional(), // Solo visible en Dashboard (Cluster Omega logic)
  }),

  inventory: z.object({
    stock: z.number().int().nonnegative().default(1),
    status: z.nativeEnum(INVENTORY_STATUS).default(INVENTORY_STATUS.AVAILABLE),
  }),

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