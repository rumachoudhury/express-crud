const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  category: { type: String, required: true },
  featured: { type: Boolean, required: true, default: false },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
