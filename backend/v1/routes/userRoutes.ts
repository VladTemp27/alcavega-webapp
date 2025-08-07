import express from 'express';

const userRoutes = express.Router();
userRoutes.use(express.json());

userRoutes.get('/health');
userRoutes.get('/users');
userRoutes.get('/users/:id');
userRoutes.post('/users');
userRoutes.put('/users/:id');
userRoutes.delete('/users/:id');

export default userRoutes;