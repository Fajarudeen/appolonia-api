import express from 'express';
import { postAuthentication, validateToken } from '../../controllers/dashboard/authController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

export const authenticationRouter = express.Router();

authenticationRouter.post('/login', postAuthentication);

authenticationRouter.get('/validate', authMiddleware, validateToken);
