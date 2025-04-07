const express = require("express");
const router = express.Router();
const {authCheck} = require("../../middleware/v1/authMiddleware");
const { validateProductCreation } = require("../../validations/v1/productValidation");
const { create } = require("../../controllers/v1/productController");

router.post("/", validateProductCreation, create);
// router.get("/:id", validateUserId, getUser);
// router.get("/", authCheck, validateRegister, getUsers);
// router.put("/:id", validateUserId, validateUpdateUser, updateUser);
// router.delete("/:id", validateUserId, deleteUser);

module.exports = router;