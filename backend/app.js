const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const sellerRoutes = require("./routes/seller-routes");
const userRoutes = require('./routes/user-routes')
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin,  X-requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
})

app.use("/api/seller", sellerRoutes);
app.use("/api/user", userRoutes)

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "an unknown error occurred" });
});

const url =
  "mongodb+srv://mernUdemy:Vl5e1hqhQKmmkBoQ@cluster0.mca3pfo.mongodb.net/stores?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to database!");
    app.listen(3030);
  })
  .catch((err) => {
    console.log(err);
  });
