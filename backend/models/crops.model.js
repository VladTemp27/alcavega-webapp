import mongoose from 'mongoose';

const cropsSchema = mongoose.Schema({
    crop_name:{
        type: String,
        required: true
    },
    buyers:{
        type: [
            {
                buyer_name:{
                    type: String,
                    required: true
                },
                volume_kg:{
                    type: Number,
                    required: true
                }
            }
        ],
        required: false
    }
});

const Crop = mongoose.model('Crop', cropsSchema);

export default Crop;
export { cropsSchema };