import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../users/user.model.js';

const generateTokens = (uid: string, role: string) => {
    const secret = process.env.JWT_SECRET || 'ALPHA_CLUSTER_SECRET_KEY';
