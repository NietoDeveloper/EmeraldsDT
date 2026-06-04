import { Document } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'SUPER_ADMIN' | 'EMPLOYEE' | 'CLIENT';
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IJWTPayload {
    uid: string;
    role: 'SUPER_ADMIN' | 'EMPLOYEE' | 'CLIENT';
}

}