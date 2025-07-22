const express = require("express");
const app = express();
const cors = require("cors");
const connectToDB = require("./db/dbConnect");
// const port = 5001;
const port = process.env.PORT || 5001; // Use Render's port or fallback to 5001
const authRouter = require("./router/authRouter"); // Import authRouter
const productRoutes = require("./router/productRoutes"); // Import productRouter

// middleware
app.use(cors());
app.use(express.json());

connectToDB();

app.use(authRouter);
app.use(productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World! I am using nodemon");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// use npm start to run the server
