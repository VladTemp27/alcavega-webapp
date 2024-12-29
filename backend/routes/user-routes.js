import express from 'express'
import UserController from '../controller/user-controller.js'

const userRoutes = express.Router();
userRoutes.use(express.json())

userRoutes.get('/user/:username', UserController.getUser)
userRoutes.post('/user', UserController.createUser)
userRoutes.put('/user/:username', UserController.updateUser)
userRoutes.get('/users', UserController.getUsers)

export default userRoutes