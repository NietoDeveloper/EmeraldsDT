adata: Record<string, any>; // Para datos extra de minería
}


import { Schema, model, Document, Types } from 'mongoose';

/**
 * High-End Gemstone Standards
 * Clarity Scales: F (Flawless), VVS (Very Very Slightly Included), etc.
 * Treatment Levels: None, Minor, Moderate, Significant
 */

export interface IEmerald extends Document {
  sku: string;
  name: string;
  slug: string; // URL-friendly version of name
  description: string;
  specifications: {
    weight: number;      // Exact Carats
    dimensions: {
      length: number;
      width: number;
      depth: number;
    };
    cut: string;
    clarity: 'F' | 'VVS' | 'VS' | 'SI' | 'I';
    colorIntensity: string; // Vivid, Deep, Light
    origin: 'Muzo' | 'Chivor' | 'Coscuez' | 'Gachalá' | 'Other';
    treatment: 'None' | 'Minor' | 'Moderate' | 'Significant';
  };
  financials: {
    price: number;
    currency: string;
    discountPrice?: number;
  };
  inventory: {
    stock: number;
    status: 'available' | 'reserved' | 'sold' | 'vault';
    location: string;    // Physical vault location
  };
  assets: {
    images: string[];    // S3 Secure Links
    videoUrl?: string;   // S3 Secure Link
    certificate: {
      provider: 'GIA' | 'CDTEC' | 'GRS' | 'GUEBELIN';
      pdfUrl: string;
      certNumber: string;
      issueDate?: Date;
    };
  };
  audit: {
    createdBy: Types.ObjectId;
    lastUpdatedBy?: Types.ObjectId;
  };
  metadata: Record<string, any>;
}

const EmeraldSchema = new Schema<IEmerald>({
  sku: { 
    type: String, 
    required: [true, 'SKU is mandatory for asset tracking'], 
    unique: true, 
    uppercase: true, 
    trim: true,
    index: true 
  },
  name: { type: String, required: true, trim: true },
  slug: { type: String, lowercase: true, unique: true },
  description: { type: String, required: true },
  
  specifications: {
    weight: { type: Number, required: true, min: 0.01 },
    dimensions: {
      length: { type: Number, required: true },
      width: { type: Number, required: true },
      depth: { type: Number, required: true }
    },
    cut: { type: String, required: true },
    clarity: { type: String, enum: ['F', 'VVS', 'VS', 'SI', 'I'], required: true },
    colorIntensity: { type: String, required: true },
    origin: { type: String, enum: ['Muzo', 'Chivor', 'Coscuez', 'Gachalá', 'Other'], required: true },
    treatment: { type: String, enum: ['None', 'Minor', 'Moderate', 'Significant'], default: 'None' }
  },

  financials: {
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD', uppercase: true },
    discountPrice: { type: Number, min: 0 }
  },

  inventory: {
    stock: { type: Number, default: 1, min: 0 },
    status: { 
      type: String, 
      enum: ['available', 'reserved', 'sold', 'vault'], 
      default: 'available',
      index: true 
    },
    location: { type: String, default: 'Bogotá Vault' }
  },

ertificate: {





export const Emerald = model<IEmerald>('Emerald', EmeraldSchema);