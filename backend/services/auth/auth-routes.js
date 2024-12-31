import express from 'express'
const authRoutes = express.Router();
import AuthController from './auth-controller.js';

authRoutes.use(express.json())

authRoutes.post('/login', AuthController.handleLogin)
authRoutes.put('/logout')

export default authRoutes