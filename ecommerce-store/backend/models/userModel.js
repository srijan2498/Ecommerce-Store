import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    mobile: { type: String, required: true },
    address: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Address' }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Product' }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Product' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Order' }],
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);