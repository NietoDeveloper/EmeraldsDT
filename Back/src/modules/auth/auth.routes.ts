import { Router } from 'express';
import { login, register } from './auth.controller.js';
import { validate } from '../../shared/middlewares/validate.middleware.js';
router.post('/register', validate(registerSchema), register);
router.post('/login', validate

export default router;