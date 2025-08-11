import express from 'express';

import {healthCheck, getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer} from '../controllers/customerController.js';

const customerRoutes = express.Router();
customerRoutes.use(express.json());

customerRoutes.get('/health', healthCheck);
customerRoutes.get('/', getAllCustomers);
customerRoutes.get('/:id', getCustomerById);
customerRoutes.post('/', createCustomer);
customerRoutes.put('/:id', updateCustomer);
customerRoutes.delete('/:id', deleteCustomer);

export default customerRoutes;