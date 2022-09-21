const express = require("express");
const checkAuth = require("../middleware/check-auth");

const sellerControllers = require("../controllers/seller-controllers");
const storeControllers = require("../controllers/store-controllers");

const router = express.Router();

// Login
router.post("/login", sellerControllers.login);

// Store
router.post("/stores/newSeller", sellerControllers.createSeller);
router.post("/stores/newStore", sellerControllers.createStore);

// Products
router.use(checkAuth);

router.get("/:store/store", storeControllers.getSellerStore);
router.get("/:store/seller", sellerControllers.getSeller);

router.patch("/:store/store", storeControllers.updateSellerStore);
router.patch("/:store/seller", sellerControllers.updateSeller);

router.get("/:store/products", storeControllers.getProductsForSeller);
router.get("/:store/products/count", storeControllers.getActiveProduts);
router.get("/:store/products/:pid", storeControllers.getProductById);

router.post("/:store/products", storeControllers.createProduct);

router.patch("/:store/products/:pid", storeControllers.updateProduct);

router.delete("/:store/products/:pid", storeControllers.deleteProduct);

module.exports = router;
