import mongoose from "mongoose";
const { Schema, model } = mongoose;


const deliverySchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-transit", "unloading", "completed"],
    default: "pending",
  },
  totalKg: {
    type: Number,
    required: true,
  },
  netValue: {
    type: Number,
    required: true,
  },
  crops: [
    {
      cropName: {
        type: String,
        required: true,
      },
      supplier: {
        type: Schema.Types.ObjectId,
        ref: "Supplier",
        required: true,
      },
      kg: {
        type: Number,
        required: true,
      },
      owner: {
        type: String,
        required: true,
      },
      pricePerKg: {
        type: Number,
        required: true,
      },
    },
  ],
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
  otherDetails: {
    type: String,
    default: "",
  },
});

export default model("Delivery", deliverySchema);
