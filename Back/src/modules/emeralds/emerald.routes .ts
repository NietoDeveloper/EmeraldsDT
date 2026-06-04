import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../auth/auth.interfaces.js';

/**
 * 🔒 IDENTITY DATABASE MODEL - CLUSTER OMEGA (L6)
 * Secure user persistence engine with automated state triggers and cryptographic hashing.
 */
const userSchema = new Schema<IUser>(
  {
    name: { 
      type: String, 
      required: [true, 'Name identifier is required'], 
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, 'Unique email coordinate is required'], 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: [true, 'Cryptographic credential key is required'], 
      select: false // 🛡️ Evita fugas accidentales: no se incluye en respuestas ni búsquedas por defecto
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
 * 🛡️ PRE-SAVE CRYPTOGRAPHIC TRIGGER
 * Captura el flujo de persistencia y aplica hashing asíncrono asilado con factor de costo industrial.
 */
userSchema.pre('save', async function (next) {
  // Si la contraseña no sufrió mutación en el pipeline, ignoramos el proceso
  if (!this.isModified('password')) return next();

  try {
    const saltRounds = 12; // Estándar de alta seguridad para la arquitectura de Emerald DT
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password!, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

/**
 * ⚔️ VERIFICATION INSTANCE METHOD
 * Compara de forma segura el string plano de la petición con el hash en DB usando algoritmos de tiempo constante.
 */
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  // Como password tiene "select: false", se asume que el controlador lo inyectó explícitamente para validar
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>('User', userSchema);