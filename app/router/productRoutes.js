const express = require("express");
// const app = express();
const cors = require("cors");
const router = express.Router();

const productController = require("../controller/productController");

router.post("/create-product", productController.createProduct);

router.get("/products", productController.getAllProduct);

router.put("/products/:id", productController.updateProduct);

router.delete("/products/:id", productController.deleteProduct);

// router.post("/order", productController.orderProduct);
router.post("/order", productController.orderProduct);

module.exports = router;
