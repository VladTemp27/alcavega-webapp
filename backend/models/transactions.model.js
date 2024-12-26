import mongoose from 'mongoose';

const transactionsSchema = mongoose.Schema({
    farmer:{
        type: mongoose.Schema.Types.ObjectId,
        regf: 'User',
        required: true
    },
    order:{
        type:[
            {
                crop_name:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Crop',
                    required: true
                },
                volume_kg:{
                    type: Number,
                    required: true
                },
                unit_price:{
                    type: Number,
                    required: true
                },
                total_price:{
                    type: Number,
                    required: true
                },
                classification:{
                    type: String,
                    required: true
                }
            }
        ],
        required: true
    },
    total_order_value:{
        type: Number,
        required: true
    },
    total_order_volume:{
        type: Number,
        required: true
    }
})

const Transaction = transactionsSchema.model('Transaction', transactionsSchema);
export default Transaction;