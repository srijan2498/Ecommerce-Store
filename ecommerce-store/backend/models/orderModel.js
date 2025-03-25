import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' }],
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Address' },
    paymentMethod: { type: String, required: true, default: "Cash on Delivery" },
    totalPrice: { type: Number, required: true },
    isDelivered: { type: Boolean, required: true, default: false },
    currentStatus: { type: String, required: true, default: 'Order Placed' },
}, {
    timestamps: true
});

export default mongoose.model('Order', orderSchema);