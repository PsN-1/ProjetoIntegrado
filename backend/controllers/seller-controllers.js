const HttpError = require("../models/http-error");
const { default: mongoose } = require("mongoose");
const Product = require("../models/products");
const Store = require("../models/stores");
const Seller = require("../models//users/seller");

// Seller
const createSeller = async (req, res, next) => {
  const { name, cpf, email, password } = req.body;

  const createdSeller = new Seller({
    creationDate: Date.now(),
    name,
    cpf,
    email,
    password,
  });

  try {
    await createdSeller.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating user failed, please try again.", 500);
    return next(error);
  }

  console.log("Status Code", 201, "Response: Created Seller");
  res.status(201).json({ message: "Created Seller" });
};

// Store
const getStores = async (req, res, next) => {
  let stores;

  try {
    stores = await Store.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching store failed, please try again later.",
      500
    );
    return next(error);
  }

  console.log("Response:", stores);
  res.json(stores);
};

const getStore = async (storeName) => {
  let store;

  try {
    store = await Store.findOne({ name: storeName });
  } catch (err) {
    const error = new HttpError(
      "Fetching store failed, please try again later.",
      500
    );
    return error;
  }

  return store;
};

const createStore = async (req, res, next) => {
  const { email, name, cnpj, category } = req.body;

  let owner;
  try {
    owner = await Seller.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Creating store failed, please try again.",
      500
    );
    console.log(err);
    return next(error);
  }
  console.log(owner);

  const createdStore = new Store({
    owner,
    name,
    cnpj,
    category,
    products: [],
    balanceAvailable: "0",
    clients: [],
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdStore.save({ session: sess });
    owner.stores = createdStore;
    await owner.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating store failed, please try again.",
      500
    );
    console.log(err);
    return next(error);
  }

  console.log("Status Code", 201, "Response: Store created");
  res.status(201).json({ message: "Store created", store: createdStore.name });
};

// Products
const getProductsForSeller = async (req, res, next) => {
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

  console.log("Response:", products);
  res.json(products.toObject({ getters: true }));
};

const getActiveProduts = async (req, res, next) => {
  const storeName = req.params.store;
  let count;

  try {
    const store = await Store.findOne({ name: storeName });
    count = store.products.length;
  } catch (err) {
    const error = new HttpError(
      "Fetching products failed, please try again later.",
      500
    );
    return next(error);
  }

  console.log("Response:", count);
  res.json(count);
};

const createProduct = async (req, res, next) => {
  const storeName = req.params.store;
  const { name, image, description, amount, value } = req.body;

  const store = await getStore(storeName);

  const createdProduct = new Product({
    store,
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
    store.products.push(createdProduct);
    await store.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating product failed, please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({ product: createdProduct.toObject({ getters: true }) });
};

const getProductById = async (req, res, next) => {
  const storeName = req.params.store;
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId).populate({
      path: "store",
      select: "name",
    });
    if (product.store.toObject().name !== storeName) {
      const error = new HttpError("You are not allowed to see this page.", 401);
      return next(error);
    }
    // product.store = null;
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find product",
      500
    );
    console.log(err);
    return next(error);
  }

  console.log("Status Code:", 200, "Response:", product);
  res.status(200).json({ product: product.toObject({ getters: true }) });
};

const updateProduct = async (req, res, next) => {
  const storeName = req.params.store;
  const { name, image, description, amount, value } = req.body;
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId).populate({
      path: "store",
      select: "name",
    });
    if (product.store.toObject().name !== storeName) {
      const error = new HttpError("You are not allowed to see this page.", 401);
      return next(error);
    }
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

  console.log(200, product);
  res.status(200).json({ product: product.toObject({ getters: true }) });
};

const deleteProduct = async (req, res, next) => {
  const storeName = req.params.store;
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId).populate("store");
    if (product.store.toObject().name !== storeName) {
      const error = new HttpError("You are not allowed to see this page.", 401);
      return next(error);
    }
  } catch (err) {
    console.log("269", err);
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
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await product.remove({ session: sess });
    product.store.products.pull(product);
    await product.store.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log("290", err);
    const error = new HttpError(
      "Something went wrong, could not delete product",
      500
    );
    return next(error);
  }

  console.log("Status Code:", 200, "Response: Deleted product.");
  res.status(200).json({ message: "Deleted product." });
};

exports.createSeller = createSeller;
exports.getStores = getStores;
exports.createStore = createStore;
exports.getProductsForSeller = getProductsForSeller;
exports.getActiveProduts = getActiveProduts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
