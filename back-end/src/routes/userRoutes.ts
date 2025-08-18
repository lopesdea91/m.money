import { Router } from 'express';
import userControllers from '../app/Controllers/UserControllers';

const userRoutes = Router();

userRoutes.get('/users', userControllers.get);
userRoutes.get('/users/:id', userControllers.getId);
userRoutes.post('/users', userControllers.create);
userRoutes.put('/users/:id', userControllers.update);
userRoutes.delete('/users/:id', userControllers.delete);

export default userRoutes;