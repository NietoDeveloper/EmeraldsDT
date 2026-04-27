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
