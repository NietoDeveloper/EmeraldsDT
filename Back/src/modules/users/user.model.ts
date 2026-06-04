import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../auth/auth.interfaces.js';

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        ema


