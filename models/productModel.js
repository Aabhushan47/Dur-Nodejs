const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sales: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      max: 5,
    },
    category: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
