const express = require("express");
const app = express();
const cors = require("cors");
// const authRouter = require("../router/authRouter");
const authController = require("../controller/authController");
const router = express.Router();

// Signup route
router.post("/signup", authController.signup);

// Signin route
router.post("/signin", authController.signin);

module.exports = router;
