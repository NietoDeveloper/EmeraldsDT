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
        isActive: { type: Boolean, default: true },
        lastLogin: { type: Date }
    },

);

// 🛡️ Pre-Save Hook: Hasheo automático de contraseñas si han sido modificadas

 

});

// ⚔️ Método de instancia para verificar credenciales de manera segura
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>('User', userSchema);