const HttpError = require("../models/http-error");
const Product = require("../models/products");
const Store = require("../models/stores");

const getProductsForStore = async (req, res, next) => {
  const storeName = req.params.store;

  let products;
  let storeId;
  try {
    storeId = await Store.findOne({ name: storeName });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Store Name not found, please check.", 404);
    return next(error);
  }

  try {
    products = await Product.find(
      { store: storeId._id },
      "image name value category"
    );
  } catch (err) {
    const error = new HttpError(
      "Fetching products failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json(products);
};

const getProductById = async (req, res, next) => {
  const productId = req.params.pid;

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

const getLogoImage = async (req, res, next) => {
  const storeName = req.params.store;

  let logoImage;

  try {
    logoImage = await Store.findOne({ name: storeName }, "logoImage");
  } catch (err) {
    console.log(err);
    const error = new HttpError("Logo image for store was not found.", 404);
    return next(error);
  }
  res.json(logoImage);
};

exports.getProductsForStore = getProductsForStore;
exports.getProductById = getProductById;
exports.getLogoImage = getLogoImage;
