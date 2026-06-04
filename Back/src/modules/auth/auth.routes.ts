import { Router } from 'express';
import { login, register } from './auth.controller.js';
import { validate } from '../../shared/middlewares/validate.middleware.js';
import {
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;