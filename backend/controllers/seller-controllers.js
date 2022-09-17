const HttpError = require("../models/http-error");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Store = require("../models/stores");
const Seller = require("../models//users/seller");

const createSeller = async (req, res, next) => {
  const { name, lastname, cpf, email, postalCode, number, password } = req.body;

  let existingSeller;
  try {
    existingSeller = await Seller.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingSeller) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdSeller = new Seller({
    creationDate: Date.now(),
    name,
    lastname,
    cpf,
    email,
    postalCode,
    number,
    password: hashedPassword,
  });

  try {
    await createdSeller.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating user failed, please try again.", 500);
    return next(error);
  }

  res.status(201);
  res.json({
    email: createdSeller.email,
  });
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

const createStore = async (req, res, next) => {
  const { email, name, cnpj, ie, corporateName, category } = req.body;

  let existingStore;
  try {
    existingStore = await Store.findOne({ name: name, cnpj: cnpj });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingStore) {
    const error = new HttpError(
      "Store exists already, please login instead.",
      422
    );
    return next(error);
  }

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
    ie,
    corporateName,
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

  let token;
  try {
    token = jwt.sign(
      { storeName: createdStore.name, email: owner.email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  console.log("Status Code", 201, "Response: Store created");
  res.status(201);
  res.json({
    storeName: createdStore.storeName,
    email: owner.email,
    token: token,
  });
};

const login = async (req, res, next) => {
  let { email, password } = req.body;

  let store;
  let seller;
  try {
    seller = await Seller.findOne({ email: email }).populate("stores");
    store = seller.stores.name;
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!seller) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    console.log("SELLER", seller);
    isValidPassword = await bcrypt.compare(password, seller.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { storeName: seller.stores, email: seller.email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    storeName: store,
    email: seller.email,
    token: token,
  });
};

exports.createSeller = createSeller;
exports.getStores = getStores;
exports.createStore = createStore;
exports.login = login;
