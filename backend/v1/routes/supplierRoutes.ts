import express from 'express';

const supplierRoutes = express.Router();
supplierRoutes.use(express.json());

supplierRoutes.get('/health');
supplierRoutes.get('/suppliers');
supplierRoutes.get('/suppliers/:id');
supplierRoutes.post('/suppliers');
supplierRoutes.put('/suppliers/:id');
supplierRoutes.delete('/suppliers/:id');

export default supplierRoutes;