import mongoose from 'mongoose';
import {cropsSchema} from './crops.model.js';

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
    farmer_data:{
        type:{
            first_name:{
                type: String,
                required: true
            },
            last_name:{
                type: String,
                required: true
            },
            phone_number:{
                type: String,
                required: true
            },
            address:{
                type: String,
                required: false
            },
            crops:{
                type: [cropsSchema],
                required: false
            }
            
        },
        required: true
    }
});


const User = mongoose.model('User', userSchema);
export default User;