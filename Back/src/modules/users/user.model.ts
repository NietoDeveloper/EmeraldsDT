import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../auth/auth.interfaces.js';

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, select: false }, // Oculto por defecto en consultas
        role: {
            type: String,
            enum: ['SUPER_ADMIN', 'EMPLOYEE', 'CLIENT'],
            default: 'CLIENT'
        },


