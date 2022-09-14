const HttpError = require("../models/http-error");
const { default: mongoose } = require("mongoose");
const Seller = require("../models/users/seller");
const Store = require("../models/stores");

const getStoreByEmail = async (req, res, next) => {
  let { email } = req.body;
  let store;

  try {
    const seller = await Seller.findOne({email: email}, 'stores').populate('stores')
    store = seller.stores.name
  } catch (err) {
    console.log(err)
    const error = new HttpError(
      "Failed to find store for email, please try again later",
      500
    );
    return next(error);
  }

  res.json(store);
};

exports.getStoreByEmail = getStoreByEmail;
