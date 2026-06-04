import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, IJWTPayload } from './auth.interfaces.js';

        const authHeader = req.headers.authorization;
  
