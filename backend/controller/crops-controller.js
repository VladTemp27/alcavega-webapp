import Crop from '../models/crop.model.js';

class CropController{
    static async getCrops(req, res){
        try{
            const crops = await Crop.find();
            if(!crops){
                res.status(400).json({error: 'Crops not found'});
            }
            res.status(200).json(crops);
        }catch(error){
            res.status(500).json({error: 'Server error'});
        }
    }

    static async createCrop(req, res) {
        const { crop_name, buyers } = req.body;
        const newCrop = new Crop({ crop_name, buyers });
        try {
            const savedCrop = await newCrop.save();
            res.status(201).json(savedCrop);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    static async updateCrop(req, res) {
        const cropID = req.params.crop_id;
        const { crop_name, buyers } = req.body;
        try {
            const crop = await Crop.findOneAndUpdate(
                { _id: cropID },
                { crop_name, buyers },
                { new: true } // Return the updated document
            );
            if (!crop) {
                return res.status(404).json({ error: 'Crop not found' });
            }
            res.status(200).json({ message: 'Crop updated', crop });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
    static async deleteCrop(req, res){
        const cropID = req.params.crop_id;
        try{
            const crop = await Crop.findOneAndDelete({_id: cropID});
            if(!crop){
                res.status(400).json({error: 'Crop not found'});
            }
            res.status(200).json({message: 'Crop deleted '+`${crop}`});
        }catch(error){
            res.status(500).json({error: 'Server error'});
        }
    }

}

export default CropController;