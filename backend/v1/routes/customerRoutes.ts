import express from 'express';

const customerRoutes = express.Router();
customerRoutes.use(express.json());

customerRoutes.get('/health');
customerRoutes.get('/customers');
customerRoutes.get('/customers/:id');
customerRoutes.post('/customers');
customerRoutes.put('/customers/:id');
customerRoutes.delete('/customers/:id');

export default customerRoutes;