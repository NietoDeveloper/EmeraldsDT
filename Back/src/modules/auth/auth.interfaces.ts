import { Document } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document {
    name: string;
    email: string;

    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IJWTPayload {

}

}