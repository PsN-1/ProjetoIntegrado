const express = require("express");
const userControllers = require("../controllers/user-controllers");

const router = express.Router();

router.get("/:store", userControllers.getProductsForStore);
router.get("/:store/:pid", userControllers.getProductById);


module.exports = router;
