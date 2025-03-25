import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      data: Buffer,
      contentType: String,
    },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);