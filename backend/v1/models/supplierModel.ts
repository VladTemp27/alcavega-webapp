import {Schema, model} from 'mongoose';

const supplierSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    crops: [{
        type: String,
        required: true
    }]
});

export default model('Supplier', supplierSchema);