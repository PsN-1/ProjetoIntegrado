const HttpError = require("../models/http-error");
const Product = require("../models/products");
const Store = require("../models/stores");

const getProductsForStore = async (req, res, next) => {
  const storeName = req.params.store;
  let products;

  try {
    const store = await Store.findOne({ name: storeName }).populate("products");
    products = store.products;
  } catch (err) {
    const error = new HttpError(
      "Fetching products failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json(products.toObject({ getters: true }));
};

const getProductById = async (req, res, next) => {
  let productId = req.params.pid;
  let product;

  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find product",
      500
    );
    return next(error);
  }
  res.status(200).json({ product: product });
};

exports.getProductsForStore = getProductsForStore;
exports.getProductById = getProductById;
