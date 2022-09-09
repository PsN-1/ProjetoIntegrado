const HttpError = require("../models/http-error");
const { default: mongoose } = require("mongoose");
const Product = require("../models/products");

const getProductsForSeller = async (req, res, next) => {
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

const getActiveProduts = async (req, res, next) => {
  let count;

  try {
    let products = await Product.find();
    count = products.length;
  } catch (err) {
    const error = new HttpError(
      "Fetching products failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json(count);
};

const createProduct = async (req, res, next) => {
  const { name, image, description, amount, value } = req.body;

  const createdProduct = new Product({
    name,
    image,
    description,
    amount,
    value,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProduct.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating product failed, please try again");
    return next(error);
  }
  res.status(201).json({ product: createdProduct });
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

const updateProduct = async (req, res, next) => {
  const { name, image, description, amount, value } = req.body;
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update product",
      500
    );
    return next(error);
  }

  product.name = name;
  product.image = image;
  product.description = description;
  product.amount = amount;
  product.value = value;

  try {
    await product.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update product",
      500
    );
    return next(error);
  }

  res.status(200).json({ product: product });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete product",
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError("Could not find product for this id.", 404);
    return next(error);
  }

  try {
    await product.delete();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete product",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Deleted product." });
};

exports.getProductsForSeller = getProductsForSeller;
exports.getActiveProduts = getActiveProduts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
