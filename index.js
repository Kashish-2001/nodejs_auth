const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

// Connect to DB
const mongoose = require("mongoose");
// Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to DB")
);

//Middlewares
app.use(express.json());
app.use(cors());
// Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(3000, () => console.log("Server up and running"));
