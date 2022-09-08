const express = require("express");
const userControllers = require("../controllers/user-controllers");

const router = express.Router();

router.get("/stores", userControllers.getProductsForStore);

module.exports = router;
