import express from 'express'
import CropController from '../controller/crops-controller.js'

const cropRoutes = express.Router()

cropRoutes.use(express.json())

cropRoutes.get('/crops', CropController.getCrops)
cropRoutes.post('/crop', CropController.createCrop)
cropRoutes.put('/crop/:crop_id', CropController.updateCrop)
cropRoutes.delete('/crop/:crop_id', CropController.deleteCrop)

export default cropRoutes