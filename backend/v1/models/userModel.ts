import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true // Link to Clerk user
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {
    timestamps: true
});

export default model('User', userSchema);