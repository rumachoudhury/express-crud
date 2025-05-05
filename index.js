const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb"); // Import MongoClient
const cors = require("cors");
const { ObjectId } = require("mongodb"); //import the ObjectId

//bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
const port = 5001;

//middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://expressServer:Ero3TSivNcq8VAk6@cluster0.ey9pz.mongodb.net/basicExpressDB?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const usersCollection = client.db("basicExpressDB").collection("users");
    const productCollection = client.db().collection("products");
    const orderCollection = client.db().collection("orders");
    //signup route
    app.post("/signup", async (req, res) => {
      // destructuring newUser
      const { name, img, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = {
        name,
        img,
        email,
        password: hashedPassword,
      };
      const result = await usersCollection.insertOne(newUser);
      res.send({
        data: result,
        status: 200,
        message: "User created successfuly",
      });
    });

    //signin route
    app.post("/signin", async (req, res) => {
      const { email, password } = req.body;
      const user = await usersCollection.findOne({ email: email });
      if (!user) {
        return res.status(404).send({ status: 404, message: "User not found" });
      }

      // console.log("User retrieved from DB:", user);

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      // console.log("Password match result:", isPasswordMatched);
      if (isPasswordMatched) {
        res.send({
          data: user,
          status: 200,
          message: "User logged successfuly",
        });
      } else {
        res.status(404).send({ status: 404, message: "Invalid Credential" });
      }
    });

    //product route
    app.post("/create-product", async (req, res) => {
      const newProduct = req.body;

      const result = await productCollection.insertOne(newProduct);
      res.send({
        data: result,
        status: 200,
        message: "Product created successfuly",
      });
    });

    //get all products
    app.get("/products", async (req, res) => {
      const result = await productCollection.find({}).toArray();
      res.send({
        data: result,
        status: 200,
        message: " Retrieve all products successfuly",
      });
    });

    // //  get a single product route
    // app.get("/products/:id", async (req, res) => {
    //   const { id } = req.params;
    //   const result = await productCollection.findOne({
    //     _id: new ObjectId(id),
    //   });
    //   res.send({
    //     data: result,
    //     status: 200,
    //     message: "Product retrieve successfuly",
    //   });
    // });

    // get a single product by ID with error handling
    app.get("/products/:id", async (req, res) => {
      const { id } = req.params;

      try {
        const objectId = new ObjectId(id); // check if valid
        const result = await productCollection.findOne({ _id: objectId });

        if (!result) {
          return res.status(404).send({
            data: null,
            status: 404,
            message: "Product not found",
          });
        }

        res.send({
          data: result,
          status: 200,
          message: "Product retrieved successfully",
        });
      } catch (error) {
        res.status(400).send({
          status: 400,
          message: "Invalid product ID",
          error: error.message,
        });
      }
    });

    // Delete single product route
    app.delete("/products/:id", async (req, res) => {
      const { id } = req.params;

      const result = await productCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send({
        status: 200,
        message: "Product deleted successfully",
      });
    });

    // update product route
    app.put("/products/:id", async (req, res) => {
      const { id } = req.params;
      const filter = { _id: new ObjectId(id) };
      const updatedProduct = req.body;
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
      const result = await productCollection.updateOne(filter, updateDocument);
      console.log("Update Result:", result);
      res.send({
        data: result,
        status: 200,
        message: "Product updated successfully",
      });
    });

    //partial updates
    app.patch("/products/:id", async (req, res) => {
      const { id } = req.params;
      const { email } = req.body;

      const filter = { _id: new ObjectId(id) };
      const updateDocument = {
        $set: { email: email },
      };

      const result = await productCollection.updateOne(filter, updateDocument);

      res.send({
        data: result,
        status: 200,
        message: "Email updated successfully",
      });
    });

    //order product route
    app.post("/order", async (req, res) => {
      const newOrder = req.body;

      const result = await orderCollection.insertOne(newOrder);
      res.send({
        data: result,
        status: 200,
        message: "Order created successfuly",
      });
    });

    //cart-list
    app.get("/cart-list", async (req, res) => {
      const { email } = req.body;
      const result = await orderCollection.find({ email: email }).toArray();
      res.send({
        data: result,
        status: 200,
        message: "Order retrieve successfuly",
      });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World! I am using nodemon");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// use command  npm start to run the server
