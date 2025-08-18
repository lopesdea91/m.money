import { Router } from 'express';
import authControllers from '../app/Controllers/AuthControllers';

const authRoutes = Router();

authRoutes.post('/auth/signIn', authControllers.signIn);
authRoutes.post('/auth/signOut', authControllers.signOut);
authRoutes.get('/auth/data', authControllers.data);

export default authRoutes;