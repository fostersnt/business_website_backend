const express = require("express");
const router = express.Router();
const {login, updateUser, deleteUser, getUsers, getUser, create} = require("../../controllers/v1/userController");
const {validateRegister, validateUpdateUser, validateUserId} = require("../../validations/v1/userValidation");
const {authCheck} = require("../../middleware/v1/authMiddleware");

router.post("/", validateRegister, create);
router.post("/login", validateRegister, login);
router.get("/:id", validateUserId, getUser);
router.get("/", authCheck, validateRegister, getUsers);
router.put("/:id", validateUserId, validateUpdateUser, updateUser);
router.delete("/:id", validateUserId, deleteUser);

module.exports = router;