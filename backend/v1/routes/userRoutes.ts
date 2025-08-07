import express from 'express';

const userRoutes = express.Router();
userRoutes.use(express.json());

userRoutes.get('/health');
userRoutes.get('/');
userRoutes.get('/:id');
userRoutes.post('/');
userRoutes.put('/:id');
userRoutes.delete('/:id');

export default userRoutes;