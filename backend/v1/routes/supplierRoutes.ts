import express from 'express';

const supplierRoutes = express.Router();
supplierRoutes.use(express.json());

supplierRoutes.get('/health');
supplierRoutes.get('/');
supplierRoutes.get('/:id');
supplierRoutes.post('/');
supplierRoutes.put('/:id');
supplierRoutes.delete('/:id');

export default supplierRoutes;