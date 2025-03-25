import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    fullName: { type: String, required: true },
    mobile: { type: String, required: true },
    pinCode: { type: String, required: true },
    locality: { type: String, required: true },
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    landmark: { type: String },
    addressType: { type: String, required: true, default: 'home' }
}, {
    timestamps: true
});

export default mongoose.model('Address', addressSchema);