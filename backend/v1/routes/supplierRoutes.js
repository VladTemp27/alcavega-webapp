import express from 'express';

import {healthCheck, getAllSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier} from '../controllers/supplierController.js';

const supplierRoutes = express.Router();
supplierRoutes.use(express.json());

supplierRoutes.get('/health', healthCheck);
supplierRoutes.get('/', getAllSuppliers);
supplierRoutes.get('/:id', getSupplierById);
supplierRoutes.post('/', createSupplier);
supplierRoutes.put('/:id', updateSupplier);
supplierRoutes.delete('/:id', deleteSupplier);

export default supplierRoutes;