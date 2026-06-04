import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../auth/auth.interfaces.js';

/**
 * 🗄️ USER METADATA SCHEMA - OMEGA CLUSTER
 * Infraestructura para la persistencia y auditoría de identidades del Nieto Laboratory.
 */
const userSchema = new Schema<IUser>(
    {
        name: { 
            type: String, 
            required: true, 
            trim: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            lowercase: true, 
            trim: true 
        },
        password: { 
            type: String, 
            required: true, 
            select: false // Evita la extracción involuntaria en pipelines de lectura
        }, 
        role: {
            type: String,
            enum: ['SUPER_ADMIN', 'EMPLOYEE', 'CLIENT'],
            default: 'CLIENT'
        },
        isActive: { 
            type: Boolean, 
            default: true 
        },
        lastLogin: { 
            type: Date 
        }
    },
    { 
        timestamps: true,
        versionKey: '__v'
    }
);

/**
 * 🛡️ PRE-SAVE HOOK - ATOMIC CRYPTO LAYER
 * Intercepta el flujo de persistencia para hashear la clave con factor de costo 12.
 */
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(12); // Nivel de cómputo seguro L6
        if (this.password) {
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error: any) {
        next(error);
    }
});

/**
 * ⚔️ INSTANCE METHODS - SAFE PROTOCOL COMPARATOR
 * Compara las firmas hash de manera segura evitando ataques de sincronización.
 */
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    // Al usar select: false, si el controlador no hace un explicit .select('+password'),
    // saltamos una aserción para asegurar el tipado correcto de Mongoose.
    const currentPassword = (this as any).password || '';
    return bcrypt.compare(candidatePassword, currentPassword);
};

export const User = model<IUser>('User', userSchema);