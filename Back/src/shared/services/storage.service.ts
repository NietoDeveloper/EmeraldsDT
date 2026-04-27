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
            // TODO: Implementar lógica de AWS SDK cuando La Constrictor pase a Prod
            return `https://s3.amazonaws.com/emerald-dt-bucket/${folder}/${file.filename}`;
        } else {
            // Lógica Local para Desarrollo
            const fileExtension = path.extname(file.originalname);
            const fileName = `${uuidv4()}${fileExtension}`;
            const targetPath = path.join(this.localPath, fileName);

            try {
                await fs.writeFile(targetPath, file.buffer);
                // Retornamos la ruta relativa para acceso vía URL
                return `/uploads/emeralds/${fileName}`;
            } catch (error) {
                console.error('💥 Storage Error:', error);
                throw new Error('Falla crítica en el sistema de archivos local.');
            }
        }
    }



export const storageService = new StorageService();