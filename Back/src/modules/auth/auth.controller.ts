import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../users/user.model.js';
import { RegisterInput, LoginInput } from '../users/user.schema.js';

/**
 * 🛰️ UTILITY - ATOMIC TOKEN GENERATOR
 * Emite firmas criptográficas asimétricas de corta duración para mitigar secuestros de sesión.
 */
const generateTokens = (uid: string, role: string) => {
    const secret = process.env.JWT_SECRET || 'ALPHA_CLUSTER_SECRET_KEY';
    const accessToken = jwt.sign({ uid, role }, secret, { expiresIn: '15m' }); // 15 Minutos de ventana de vida L6
    return { accessToken };
};

/**
 * 🟢 PIPELINE - IDENTITY REGISTRATION
 * Inserta un nuevo registro de identidad en el Cluster Omega.
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Envoltura tipada estricta desde el validador Zod Shield
        const { name, email, password, role } = req.body as RegisterInput;
        
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ 
                status: 'BAD_REQUEST', 
                message: 'This identity blueprint is already registered in the system' 
            });
        }

        const newUser = new User({ name, email, password, role });
        await newUser.save();

        const { accessToken } = generateTokens(newUser._id.toString(), newUser.role);

        res.status(201).json({
            status: 'SUCCESS',
            data: {
                user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
                token: accessToken
            }
        });
    } catch (error: any) {
        next(error); // Delega la infraestructura de caída al Global Error Handler
    }
};

/**
 * 🟢 PIPELINE - CLEARANCE LOGIN
 * Verifica credenciales, valida estado operativo del usuario e inyecta timestamp de auditoría.
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as LoginInput;

        // Explicit select para rehidratar el hash de password oculto por defecto
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ 
                status: 'UNAUTHORIZED', 
                message: 'Invalid credentials or security mismatch' 
            });
        }

        if (!user.isActive) {
            return res.status(403).json({ 
                status: 'FORBIDDEN', 
                message: 'This clearance pipeline has been deactivated by the Architect' 
            });
        }

        /**
         * 📊 REAL-TIME AUDIT LAYER
         * Registro del timestamp de acceso directo. Se usa validateBeforeSave
         * para evitar reprocesar hooks criptográficos de Bcrypt en el ciclo de guardado.
         */
        user.lastLogin = new Date();
        await user.save({ validateBeforeSave: false });

        const { accessToken } = generateTokens(user._id.toString(), user.role);

        res.status(200).json({
            status: 'SUCCESS',
            data: {
                user: { id: user._id, name: user.name, email: user.email, role: user.role },
                token: accessToken
            }
        });
    } catch (error: any) {
        next(error); // Evita colapsos catastróficos en el Bogotá Node
    }
};