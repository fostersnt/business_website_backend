const express = require("express");
const router = express.Router();
const {authCheck} = require("../../middleware/v1/authMiddleware");
const { validateProductCreation, validateProductId, validateProductUpdate } = require("../../validations/v1/productValidation");
const { create, updateProduct, searchProduct, getProducts } = require("../../controllers/v1/productController");

router.post("/", validateProductCreation, create);
// router.get("/:id", validateUserId, getUser);
router.get("/", getProducts);
router.get("/search", searchProduct);
router.put("/:id", validateProductId, validateProductUpdate, updateProduct);
// router.delete("/:id", validateUserId, deleteUser);

module.exports = router;