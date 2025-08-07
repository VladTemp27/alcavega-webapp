import express from 'express';
import userRoutes from './routes/userRoutes';
import customerRoutes from './routes/customerRoutes';
import deliveryRoutes from './routes/deliveryRoutes';
import supplierRoutes from './routes/supplierRoutes';

const v1Router = express.Router();
v1Router.use(express.json());

v1Router.use('/users', userRoutes);
v1Router.use('/customers', customerRoutes);
v1Router.use('/deliveries', deliveryRoutes);
v1Router.use('/suppliers', supplierRoutes);

export default v1Router;