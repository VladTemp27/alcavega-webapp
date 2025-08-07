import express from 'express';

const deliveryRoutes = express.Router();
deliveryRoutes.use(express.json());

deliveryRoutes.get('/health');
deliveryRoutes.get('/deliveries');
deliveryRoutes.get('/deliveries/:id');
deliveryRoutes.post('/deliveries');
deliveryRoutes.put('/deliveries/:id');
deliveryRoutes.delete('/deliveries/:id');

export default deliveryRoutes;