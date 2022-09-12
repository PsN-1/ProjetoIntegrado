const mongoose = require("mongoose");
const user = require("./user");

const Schema = mongoose.Schema;

const buyerSchema = new Schema({
  creationDate: { type: Date, required: true},
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  paymentsMethods: { type: String, required: true },
  clients: {type: mongoose.Types.ObjectId, required: true, ref: 'Store'},
});

module.exports = mongoose.model("Buyer", buyerSchema);
