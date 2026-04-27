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
    private localPath: string = path.resolve('uploads/emeralds');

    constructor() {
        this.init();
    }

    private async init() {
        // Asegura que el nido de almacenamiento local exista en desarrollo
        if (!this.isProduction) {
            try {
                await fs.access(this.localPath);
            } catch {
                await fs.mkdir(this.localPath, { recursive: true });
                console.log('📂 [Storage Service]: Directorio local creado.');
            }
        }
    }

    /**
     * @method uploadFile
     * @description Guarda archivos (imágenes/certificados) en el almacenamiento activo.
     */
    public async uploadFile(file: Express.Multer.File, folder: string = 'assets'): Promise<string> {
        if (this.isProduction) {

    }



export const storageService = new StorageService();