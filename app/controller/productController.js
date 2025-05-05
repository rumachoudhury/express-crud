// productController.js
const Product = require("../model/ProductModel");
const Order = require("../model/OrderModel");
const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;

// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;

    // Create a new product in the database
    const result = await Product.create(newProduct);

    // Send a success response
    res.status(200).send({
      data: result,
      message: "Product created successfully",
    });
  } catch (err) {
    // Handle errors
    res.status(500).send({
      message: "Failed to create product",
      error: err.message,
    });
  }
};

// Get all products
const getAllProduct = async (req, res) => {
  const result = await Product.find({});
  res.send({
    data: result,
    status: 200,
    message: " Retrieve all products successfuly",
  });
};

// Get a single product by ID with error handling

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({
        data: null,
        status: 404,
        message: "Product not found",
      });
    }

    res.status(200).json({
      data: product,
      status: 200,
      message: "Product retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  // const filter = { _id: new ObjectId(id) };
  const filter = { _id: new mongoose.Types.ObjectId(id) };
  const updatedProduct = req.body;
  console.log(updatedProduct);

  //   With $set, only the specified fields are updated. If you don't use $set, the entire document will be replaced with the new document.
  const updateDocument = {
    $set: {
      title: updatedProduct.title,
      img: updatedProduct.img,
      description: updatedProduct.description,
      price: updatedProduct.price,
      rating: updatedProduct.rating,
      category: updatedProduct.category,
      featured: updatedProduct.featured,
    },
  };

  const result = await Product.updateOne(filter, updateDocument);

  res.status(200).send({
    message: "Product updated successfully",
    data: result,
  });
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const result = await Product.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
    // _id: new ObjectId(id),
  });

  res.send({
    status: 200,
    message: "Product deleted successfully",
  });
};

// Order a product
const orderProduct = async (req, res) => {
  const newOrder = req.body;

  //   const result = await orderCollection.insertOne(newOrder);
  const result = await Order.create(newOrder);
  res.send({
    data: result,
    status: 200,
    message: "Order created successfully",
  });
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  orderProduct,
};
