const express = require("express");
const userControllers = require("../controllers/user-controllers");

const router = express.Router();

router.get("/stores", userControllers.getProductsForStore);
router.get("/stores/:id", userControllers.getProductById);


module.exports = router;
