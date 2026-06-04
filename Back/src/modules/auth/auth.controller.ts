import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../users/user.model.js';

const generateTokens = (uid: string, role: string) => {
    const secret = process.env.JWT_SECRET || 'ALPHA_CLUSTER_SECRET_KEY';
    const accessToken = jwt.sign({ uid, role }, secret, { expiresIn: '15m' }); // Token de corta duración
    return { accessToken };
};

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ status: 'BAD_REQUEST', message: 'Identity already registered' });

        const newUser = new User({ name, email, password, role });
        await newUser.save();

        const { accessToken } = generateTokens(newUser._id.toString(), newUser.role);

        res.status(201).json({
            status: 'SUC
