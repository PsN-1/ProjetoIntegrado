const HttpError = require("../models/http-error");
const Product = require("../models/products");

const getProductsForStore = async (req, res, next) => {
  let products;

  try {
    products = await Product.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching products failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json(products);
};

exports.getProductsForStore = getProductsForStore;
