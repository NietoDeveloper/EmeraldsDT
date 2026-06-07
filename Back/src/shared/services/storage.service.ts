import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

/**
 * 🔒 CONTRATOS DE ESTRUCTURA DE ARCHIVOS - LEVEL L6
 * Interfaces estrictas para el retorno de subidas en Nieto Laboratory.
 */
interface IUploadResponse {
    success: boolean;
    url: string;
    path: string;
    mimeType: string;
    size: number;
}

/**
 * 🐍 LA CONSTRICTOR STORAGE SYSTEM - S+ RANK
 * Gestión híbrida perimetral de archivos multimedia de alta resolución.
 * Sincroniza el almacenamiento local (Alpha) con AWS S3 Clústeres (Omega).
 */
class StorageService {
    private readonly isProduction: boolean = process.env.NODE_ENV === 'production';
    private readonly localBaseDir: string = path.resolve('uploads');
    private readonly emeraldDir: string = path.join(this.localBaseDir, 'emeralds');
    private readonly certDir: string = path.join(this.localBaseDir, 'certificates');
    private s3Client: S3Client | null = null;

    constructor() {
        this.initializeStorageStructure();
        this.initializeAwsS3();
    }

    /**
     * Asegura la integridad física de los directorios de desarrollo local.
     */
    private async initializeStorageStructure(): Promise<void> {
        if (!this.isProduction) {
            const dirs = [this.localBaseDir, this.emeraldDir, this.certDir];
            for (const dir of dirs) {
                try {
                    await fs.access(dir);
                } catch {
                    await fs.mkdir(dir, { recursive: true });
                    console.log(`\x1b[32m✔ [Storage S+]: Folder Infrastructure Secure: ${path.basename(dir)}\x1b[0m`);
                }
            }
        }
    }

    /**
     * Inicializa perezosamente el cliente de AWS S3 con la API modular v3.
     */
    private initializeAwsS3(): void {
        if (this.isProduction) {
            const region = process.env.AWS_REGION || 'us-east-1';
            const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
            const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

            if (!accessKeyId || !secretAccessKey) {
                console.error('\x1b[31m[CRITICAL STORAGE COLLAPSE]: AWS Credentials missing in production\x1b[0m');
                return;
            }

            this.s3Client = new S3Client({
                region,
                credentials: { accessKeyId, secretAccessKey }
            });
            console.log('\x1b[35m🛰️  [Storage S+]: AWS S3 Client successfully mounted\x1b[0m');
        }
    }

    /**
     * 🛰️ METODO - UPLOAD ASSET
     * Gestión asíncrona de archivos multimedia con tolerancia a fallas.
     */
    public async uploadAsset(
        file: Express.Multer.File, 
        subFolder: 'emeralds' | 'certificates' = 'emeralds'
    ): Promise<IUploadResponse> {
        if (!file || !file.buffer) {
            throw new Error('STORAGE_BLOB_EMPTY');
        }

        const fileExtension = path.extname(file.originalname).toLowerCase();
        const fileName = `${uuidv4()}${fileExtension}`;
        const s3Key = `${subFolder}/${fileName}`;

        // 🟢 PROTOCOLO OMEGA: Producción Real en AWS S3
        if (this.isProduction) {
            if (!this.s3Client) {
                throw new Error('AWS_S3_CLIENT_NOT_INITIALIZED');
            }

            const bucketName = process.env.AWS_S3_BUCKET_NAME || 'emerald-dt-assets';

            try {
                const command = new PutObjectCommand({
                    Bucket: bucketName,
                    Key: s3Key,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                    CacheControl: 'max-age=31536000' // Almacenamiento perimetral óptimo en CDN por 1 año
                });

                await this.s3Client.send(command);

                return {
                    success: true,
                    url: `https://${bucketName}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${s3Key}`,
                    path: s3Key,
                    mimeType: file.mimetype,
                    size: file.size
                };
            } catch (error: any) {
                console.error(`\n❌ [AWS S3 Upload Fault]: ${error.message}`);
                throw new Error('STORAGE_PRODUCTION_FUNDS_FAULT');
            }
        }

        // 🟡 PROTOCOLO ALPHA: Almacenamiento Local (Bogotá Node)
        const targetDir = subFolder === 'emeralds' ? this.emeraldDir : this.certDir;
        const targetPath = path.join(targetDir, fileName);

        try {
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
            console.error(`\n❌ [La Constrictor Storage Alert]: Local write failed: ${error.message}`);
            throw new Error('STORAGE_SYSTEM_FAULT_S+');
        }
    }

    /**
     * 🛰️ METODO - DELETE ASSET
     * Eliminación de archivos atómica para control riguroso de memoria.
     */
    public async deleteAsset(relativeUrlOrKey: string): Promise<boolean> {
        if (!relativeUrlOrKey) return false;

        try {
            // 🟢 PROTOCOLO OMEGA: Eliminación en AWS S3
            if (this.isProduction) {
                if (!this.s3Client) return false;

                const bucketName = process.env.AWS_S3_BUCKET_NAME || 'emerald-dt-assets';
                
                // Si viene la URL de S3 completa, extraemos el Key resolutivo de la gema
                const s3Key = relativeUrlOrKey.includes('amazonaws.com/') 
                    ? relativeUrlOrKey.split('amazonaws.com/')[1] 
                    : relativeUrlOrKey;

                const command = new DeleteObjectCommand({
                    Bucket: bucketName,
                    Key: s3Key
                });

                await this.s3Client.send(command);
                return true;
            }

            // 🟡 PROTOCOLO ALPHA: Eliminación Local con sanitización estricta
            // Limpia caracteres de escape inválidos que intenten vulnerar la raíz
            const safeRelativePath = relativeUrlOrKey.replace(/^\\|\.\./g, '');
            const normalizedPath = path.join(process.cwd(), safeRelativePath);
            
            await fs.access(normalizedPath);
            await fs.unlink(normalizedPath);
            
            return true;
        } catch (error: any) {
            console.warn(`\x1b[33m⚠️ [Storage S+]: Attempted delete failed or file missing: ${relativeUrlOrKey}\x1b[0m`);
            return false;
        }
    }

    /**
     * Retorna la ruta física del directorio local para el middleware de Express.
     */
    public getLocalStaticPath(): string {
        return this.localBaseDir;
    }
}

export const storageService = new StorageService();