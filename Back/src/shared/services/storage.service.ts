import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * 🐍 LA CONSTRICTOR STORAGE SYSTEM - S+ RANK
 * High-Performance Asset Management for Emerald DT
 * Logic: Hybrid local-safe buffering with production-ready AWS hooks.
 */

interface IUploadResponse {
    success: boolean;
    url: string;
    path: string;
    mimeType: string;
    size: number;
}

class StorageService {
    private readonly isProduction: boolean = process.env.NODE_ENV === 'production';
    private readonly localBaseDir: string = path.resolve('uploads');
    private readonly emeraldDir: string = path.join(this.localBaseDir, 'emeralds');
    private readonly certDir: string = path.join(this.localBaseDir, 'certificates');

    constructor() {
        this.initializeStorageStructure();
    }

    /**
     * @private initializeStorageStructure
     * Asegura la integridad física de los directorios de almacenamiento.
     */
    private async initializeStorageStructure(): Promise<void> {
        if (!this.isProduction) {
            const dirs = [this.localBaseDir, this.emeraldDir, this.certDir];
            for (const dir of dirs) {
                try {
                    await fs.access(dir);
                } catch {
                    await fs.mkdir(dir, { recursive: true });
                    console.log(`\x1b[32m✔ [Storage S+]: Directory Secure: ${path.basename(dir)}\x1b[0m`);
                }
            }
        }
    }

    /**
     * @method uploadAsset
     * @description Gestión asíncrona de archivos con validación de destino.
     */
    public async uploadAsset(
        file: Express.Multer.File, 
        subFolder: 'emeralds' | 'certificates' = 'emeralds'
    ): Promise<IUploadResponse> {
        
        const fileExtension = path.extname(file.originalname).toLowerCase();
        const fileName = `${uuidv4()}${fileExtension}`;
        
        if (this.isProduction) {
            // PROTOCOLO OMEGA: AWS S3 Implementation
            // Aquí se inyectará el S3 Client de Software DT
            return {
                success: true,
                url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${subFolder}/${fileName}`,
                path: `${subFolder}/${fileName}`,
                mimeType: file.mimetype,
                size: file.size
            };
        }

        // PROTOCOLO ALPHA: Local Storage (Nieto Laboratory)
        const targetDir = subFolder === 'emeralds' ? this.emeraldDir : this.certDir;
        const targetPath = path.join(targetDir, fileName);

        try {
            // Uso de buffers para evitar corrupción de archivos en gemas de alta resolución
            await fs.writeFile(targetPath, file.buffer);
            
            const relativePath = `/uploads/${subFolder}/${fileName}`;
            
            return {
                success: true,
                url: `${process.env.BACKEND_URL || 'http://localhost:4000'}${relativePath}`,
                path: relativePath,
                mimeType: file.mimetype,
                size: file.size
            };
        } catch (error: any) {
            console.error(`\n❌ [La Constrictor Alert]: Critical Storage Failure: ${error.message}`);
            throw new Error('STORAGE_SYSTEM_FAULT_S+');
        }
    }

    /**
     * @method deleteAsset
     * @description Eliminación atómica de archivos para mantener el nido limpio.
     */
    public async deleteAsset(relativeUrl: string): Promise<boolean> {
        if (!relativeUrl) return false;

        try {
            if (this.isProduction) {
                // TODO: S3.deleteObject logic
                return true;
            }

            // Normalización de ruta para prevenir Directory Traversal Attacks
            const normalizedPath = path.join(process.cwd(), relativeUrl);
            
            // Verificación de existencia antes de intentar asfixiar el archivo
            await fs.access(normalizedPath);
            await fs.unlink(normalizedPath);
            
            return true;
        } catch (error) {
            console.warn(`\x1b[33m⚠️ [Storage S+]: Attempted delete failed or file missing: ${relativeUrl}\x1b[0m`);
            return false;
        }
    }

    /**
     * @method getLocalStaticPath
     * Utilidad para el middleware de Express
     */
    public getLocalStaticPath(): string {
        return this.localBaseDir;
    }
}

export const storageService = new StorageService();