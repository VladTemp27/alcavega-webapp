import express from 'express';

const customerRoutes = express.Router();
customerRoutes.use(express.json());

customerRoutes.get('/health');
customerRoutes.get('/');
customerRoutes.get('/:id');
customerRoutes.post('/');
customerRoutes.put('/:id');
customerRoutes.delete('/:id');

export default customerRoutes;