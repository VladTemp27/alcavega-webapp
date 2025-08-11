import express from 'express';

import {healthCheck, getAllDeliveries, getDeliveryById, createDelivery, updateDelivery, deleteDelivery} from '../controllers/deliveryController.js';

const deliveryRoutes = express.Router();
deliveryRoutes.use(express.json());

deliveryRoutes.get('/health', healthCheck);
deliveryRoutes.get('/', getAllDeliveries);
deliveryRoutes.get('/:id', getDeliveryById);
deliveryRoutes.post('/', createDelivery);
deliveryRoutes.put('/:id', updateDelivery);
deliveryRoutes.delete('/:id', deleteDelivery);

export default deliveryRoutes;