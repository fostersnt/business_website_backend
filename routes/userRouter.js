const express = require("express");
const router = express.Router();
const {register, login, updateUser, deleteUser, getUsers, getUser} = require("../controllers/userController");
const {validateRegister, validateUpdateUser, validateUserId} = require("../validations/userValidation");
const {authCheck} = require("../middleware/authMiddleware");

router.post("/register", validateRegister, register);
router.post("/login", validateRegister, login);
router.get("/:id", validateUserId, getUser);
router.post("/", authCheck, validateRegister, getUsers);
router.post("/update/:id", validateUserId, validateUpdateUser, updateUser);
router.delete("/:id", validateUserId, deleteUser);

module.exports = router;