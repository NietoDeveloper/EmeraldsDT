import { Schema, model, Document } from 'mongoose';

/**
 * IEmerald Interface - Representación técnica de una gema
 */
export interface IEmerald extends Document {
  sku: string;           // Identificador único (ej: EM-MUZO-001)
  name: string;
  description: string;
  weight: number;        // Quilates (Carats)
  dimensions: {
    length: number;
    width: number;
    depth: number;
  };
  cut: string;           // Talla (Emerald cut, Oval, etc.)
  clarity: 'F' | 'VVS' | 'VS' | 'SI'; 
  origin: string;        // Muzo, Chivor, Coscuez
  price: number;
  stock: number;
  images: string[];      // URLs de AWS S3
  certificate: {
    provider: string;    // GIA, CDTEC, GRS
    pdfUrl: string;      // URL del PDF en S3
    certNumber: string;
  };
  status: 'available' | 'reserved' | 'sold';
  metadata: Record<string, any>; // Para datos extra de minería
}

const EmeraldSchema = new Schema<IEmerald>({
  sku: { type: String, required: true, unique: true, uppercase: true, index: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  weight: { type: Number, required: true },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    depth: { type: Number }
  },
