const express = require("express");
const app = express();
// Connect to DB
const mongoose = require("mongoose");
// Import Routes
const authRoute = require("./routes/auth");

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to DB")
);

//Middlewares
app.use(express.json());
// Route Middlewares
app.use("/api/user", authRoute);

app.listen(3000, () => console.log("Server up and running"));
