const express = require("express");
const userControllers = require("../controllers/user-controllers");

const router = express.Router();

router.get("/:store", userControllers.getProductsForStore);
router.get("/:store/logo", userControllers.getLogoImage);
router.get("/:store/:pid", userControllers.getProductById);

router.post("/:store/newBuyer", userControllers.createBuyer)

module.exports = router;
