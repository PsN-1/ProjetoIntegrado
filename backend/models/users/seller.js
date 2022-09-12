const mongoose = require("mongoose");
const user = require("./user");

const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  creationDate: { type: Date, required: true },
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  stores: { type: mongoose.Types.ObjectId, ref: "Store" },
});

module.exports = mongoose.model("Seller", sellerSchema);
