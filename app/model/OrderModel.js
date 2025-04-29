const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  category: { type: String, required: true },
  featured: { type: Boolean, required: true },
  email: { type: String, required: true }, // Customer email
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
