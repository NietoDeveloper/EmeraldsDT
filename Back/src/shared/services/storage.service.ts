import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * 🐍 STORAGE SERVICE - PROVIDER NIVEL S+
 * Arquitectura Híbrida: Local (Dev) / AWS S3 (Prod)
 * Bajo la supervisión de La Constrictor - Isabella Nieto
 */

class StorageService {
    private isProduction: boolean = process.env.NODE_ENV === 'production';



export const storageService = new StorageService();