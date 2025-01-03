import express from 'express'
import FarmerController from '../controller/farmer-controller.js'
import UserController from '../controller/user-controller.js'

const farmerRoutes = express.Router()
farmerRoutes.use(express.json())

farmerRoutes.delete('/farmer/:farmer_id',FarmerController.deleteFarmer)
farmerRoutes.get('/farmers', FarmerController.getFarmers)
farmerRoutes.post('/farmer/:farmer_id', FarmerController.editFarmer)
farmerRoutes.post('/farmer', UserController.createUser)

export default farmerRoutes