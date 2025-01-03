import User from '../models/users.model.js';

class FarmerController{
    static async getFarmers(req,res){
        try{
            const farmer = await User.find().select('farmer_data');
            if(!farmer){
                res.status(401).json({error: 'Farmer not found'})
            }
            res.status(200).json(farmer);
        }catch(error){
            res.status(500).json({error: 'Server error'});
        }
    }    

    static async deleteFarmer(req,res){
        const farmerID = req.params.farmer_id;
        console.log(farmerID)
        try{
            const farmer = await User.findOneAndDelete({_id: farmerID});
            if(!farmer){
                res.status(401).json({error: 'Farmer not found'})
            }
            res.status(200).json({message: 'Farmer deleted '+`${farmer}`});
        }catch(error){
            res.status(500).json({error: 'Server error'});
        }
    }

    static async editFarmer(req,res){
        const farmerID = req.params.farmer_id;
        const {farmer_data} = req.body;

        if(farmer_data.first_name == null || farmer_data.last_name == null || farmer_data.phone_number == null){
            res.status(400).json({error: 'Missing required fields'});
        }
        
        try{
            const farmer = await User.findOneAndUpdate({_id: farmerID}, {farmer_data: farmer_data});
            if(!farmer){
                res.status(401).json({error: 'Farmer not found'})
            }
            res.status(200).json({message: 'Farmer updated '+`${farmer}`});
        }catch(error){
            res.status(500).json({error: 'Server error'});
        }
    }

}

export default FarmerController;