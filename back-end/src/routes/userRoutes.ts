import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/UserControllers';

const userRoutes = Router();

userRoutes.get('/users', getUsers);
userRoutes.get('/users/:id', getUserById);
userRoutes.post('/users', createUser);
userRoutes.put('/users/:id', updateUser);
userRoutes.delete('/users/:id', deleteUser);

export default userRoutes;