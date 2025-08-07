import express from 'express';

const deliveryRoutes = express.Router();
deliveryRoutes.use(express.json());

deliveryRoutes.get('/health');
deliveryRoutes.get('/');
deliveryRoutes.get('/:id');
deliveryRoutes.post('/');
deliveryRoutes.put('/:id');
deliveryRoutes.delete('/:id');

export default deliveryRoutes;