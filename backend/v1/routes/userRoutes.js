import express from 'express';

import {healthCheck, getAllUsers, getUserById, createUser, updateUser, deleteUser} from '../controllers/userController.js';

const userRoutes = express.Router();
userRoutes.use(express.json());

userRoutes.get('/health', healthCheck);
userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', createUser);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

export default userRoutes;