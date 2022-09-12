const express = require("express");
const sellerControllers = require("../controllers/seller-controllers");

const router = express.Router();

// Store
router.get("/stores", sellerControllers.getStores); // return storeName?

router.post("/stores/newSeller", sellerControllers.createSeller);
router.post("/stores/newStore", sellerControllers.createStore); // new store

// Products
router.get("/:store/products", sellerControllers.getProductsForSeller);
router.get("/:store/products/count", sellerControllers.getActiveProduts);
router.get("/:store/products/:pid", sellerControllers.getProductById);

router.post("/:store/products", sellerControllers.createProduct);

router.patch("/:store/products/:pid", sellerControllers.updateProduct);

router.delete("/:store/products/:pid", sellerControllers.deleteProduct);

module.exports = router;
 