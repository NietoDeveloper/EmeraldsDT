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
                usq: Request, res: Response, next: NextFunction) => {
