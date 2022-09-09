const express = require("express");
const sellerControllers = require("../controllers/seller-controllers");

const router = express.Router();

router.get("/stores", sellerControllers.getProductsForSeller);
router.get("/stores/count", sellerControllers.getActiveProduts);
router.get("/stores/:pid", sellerControllers.getProductById);

router.post("/stores", sellerControllers.createProduct);

router.patch("/stores/:pid", sellerControllers.updateProduct);

router.delete("/stores/:pid", sellerControllers.deleteProduct);

module.exports = router;
