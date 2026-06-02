import { z } from 'zod';
import { 
  EMERALD_ORIGINS, 
  EMERALD_CUTS, 
  EMERALD_CLARITY, 
  INVENTORY_STATUS, 
  CERTIFICATION_ENTITIES 
} from './emerald.constants.js';

/**
 * 🛡️ EMERALD VALIDATION SCHEMA - INDUSTRIAL GRADE (L6)
 * Strict integrity rules for high-value gemstone assets wrapped for Express Middleware.
 */
export const emeraldSchema = z.object({
  body: z.object({
    name: z.string()
      .min(3, "Name is too short")
      .max(100, "Name exceeds maximum length")
      .trim(),
      
    description: z.string()
      .max(1500, "Description is too long")
      .optional(),
    
    specifications: z.object({
      sku: z.string()
        .min(5, "SKU must be at least 5 characters")
        .regex(/^[A-Z0-9-]+$/, "SKU must be alphanumeric with hyphens (e.g., MZ-001)")
        .trim(),
      weight: z.number()
        .positive("Weight must be greater than 0")
        .max(1000, "Unrealistic weight for a single stone"),
      dimensions: z.string()
        .regex(/^(\d+(\.\d+)?\s?[xX]\s?){2}\d+(\.\d+)?\s?mm$/, "Format must be: 00 x 00 x 00 mm")
        .optional(),
      origin: z.nativeEnum(EMERALD_ORIGINS),
      cut: z.nativeEnum(EMERALD_CUTS),
      clarity: z.nativeEnum(EMERALD_CLARITY),
    }),

    financials: z.object({
      price: z.number()
        .positive("Sale price must be positive")
        .min(1, "Price cannot be zero"),
      cost: z.number()
        .positive("Cost must be positive")
        .optional(),
      currency: z.enum(['USD', 'COP']).default('USD'),
    }).refine((data) => {
      if (data.cost && data.price < data.cost) return false;
      return true;
    }, {
      message: "Sale price cannot be lower than acquisition cost",
      path: ["price"]
    }),

    inventory: z.object({
      stock: z.number()
        .int()
        .nonnegative()
        .default(1),
      status: z.nativeEnum(INVENTORY_STATUS)
        .default(INVENTORY_STATUS.AVAILABLE), // 💎 Gestión de estados sincronizada (AVAILABLE, SOLD, RESERVED)
    }),

    assets: z.object({
      images: z.array(z.string().url("Invalid image URL format"))
        .min(1, "At least one product image is required")
        .max(10, "Maximum 10 images allowed"),
      certificate: z.object({
        entity: z.nativeEnum(CERTIFICATION_ENTITIES),
        reportNumber: z.string().min(3, "Report number required").trim(),
        pdfUrl: z.string().url("Invalid PDF URL").optional(),
      }).optional(),
    }).optional(),
  })
});

/**
 * 🛰️ DERIVED SCHEMAS
 * El método .partial() se aplica sobre el objeto interno del body para permitir actualizaciones parciales.
 */
export const updateEmeraldSchema = z.object({
  body: emeraldSchema.shape.body.partial()
});

/**
 * ⚡ TYPE INFERENCE (L6)
 * Extrae la tipificación estricta de TypeScript directamente de la forma del cuerpo validado.
 */
export type EmeraldInput = z.infer<typeof emeraldSchema.shape.body>;