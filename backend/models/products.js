const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: String, required: true },
  value: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema)