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

