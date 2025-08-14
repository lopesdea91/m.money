import { Router } from 'express';
import { authData, authSignIn, authSignOut } from '../controllers/AuthControllers';

const authRoutes = Router();

authRoutes.post('/auth/signIn', authSignIn);
authRoutes.post('/auth/signOut', authSignOut);
authRoutes.get('/auth/data', authData);

export default authRoutes;