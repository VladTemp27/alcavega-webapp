import Crop from '../models/crops.model.js';
const IS_DEBUG_MODE = process.env.DEBUG_MODE == 'true'

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
        console.log("Creating new crop record")
        const { crop_name, buyers } = req.body;
        console.log(`CROP NAME: ${crop_name} with BUYERS: ${buyers}`)
        const newCrop = new Crop({ crop_name, buyers });
        try {

            const current = await Crop.findOne({crop_name: newCrop.crop_name})
            if(current){
                res.status(400).json({message:"Crop already exists"})
            }

            const savedCrop = await newCrop.save();
            console.log("Trying to save crop object")
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

    static async getBuyers(req,res){
        const crop_id = req.params.crop_id

        //User toleration for missing crop id
        if(!crop_id){
            res.status(400).json({message:"Invalid Request"})
            return
        }

        try{
            const buyers = await Crop.findOne({_id: crop_id}).select('buyers')
            res.status(200).json(buyers)
        }catch(error){
            if(process.env.DEBUG_MODE == 'true'){
                res.status(500).json({error_message: `Server error with: ${error}`})
                return
            }
            res.status(500).json({error:"Server error"})
        }
    }

    static async updateBuyers(req,res){
        const crop_id = req.params.crop_id
        const newBuyers = req.body.buyers
        if(!crop_id || !newBuyers){
            res.status(400).json({message:"invalid request"})
        }

        try{
            const result = await Crop.findOneAndUpdate({_id: crop_id},{buyers: newBuyers},{returnDocument:'after'})
            res.status(200).json({message:"updated",updatedData: result})
        }catch(error){
            console.log(error)
            if(IS_DEBUG_MODE){
                res.status(500).json({server_error:error})
                return
            }

            res.status(500).json({message:"Server error"})
        }
    }

    static async getCropNames(req,res){
        try{
            const cropNames = await Crop.find().select('_id crop_name');
            res.status(200).json(cropNames)
        }catch(error){
            res.status(500).json({message:"Internal Server error"})
        }
    }

}

export default CropController;