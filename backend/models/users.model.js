import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

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
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Crop',
                required: false
            }
            
        },
        required: true
    }
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')|| !this.isNew) {
        next()   
        return
    }

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        next();
    }catch(error){
        next(error);
    }
});

userSchema.methods.comparePassword = async function(inputPassword){
    return await bcrypt.compare(inputPassword, this.password)
}


const User = mongoose.model('User', userSchema);
export default User;