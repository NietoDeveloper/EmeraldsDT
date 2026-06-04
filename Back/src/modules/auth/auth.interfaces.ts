import { Document, Types } from 'mongoose';
import { Request } from 'express';

/**
 * 🛰️ OMEGA CONTRACTS - ARCHITECTURE INTERFACES
 * Definición estricta de tipados para la gestión de accesos en Nieto Laboratory.
 */

/**
 * 💎 USER INTERFACE - DATABASE MODEL TARGET
 * Contrato de hidratación para el documento de Mongoose en el Cluster Omega.
 */
export interface IUser extends Document {
    _id: Types.ObjectId; // ID nativo de persistencia de MongoDB BSON
    name: string;
    email: string;
    password?: string;
    role: 'SUPER_ADMIN' | 'EMPLOYEE' | 'CLIENT';
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    
    /**
     * Compara criptográficamente una cadena de texto plano contra el hash Bcrypt.
     */
    comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * 🔐 JWT PAYLOAD STRUCT
 * Estructura de la carga útil serializada dentro de los tokens de acceso L6.
 */
export interface IJWTPayload {
    uid: string; // ID del usuario formateado como HexString para transporte HTTP
    role: 'SUPER_ADMIN' | 'EMPLOYEE' | 'CLIENT';
}

/**
 * 🛡️ AUTHENTICATED REQUEST STREAM
 * Extensión segura del objeto Request de Express. 
 * Inyecta la identidad verificada por el guardián 'requireAuth' en el hilo de la petición.
 */
export interface AuthenticatedRequest extends Request {
    user?: IJWTPayload;
}