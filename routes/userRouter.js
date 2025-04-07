const express = require("express");
const router = express.Router();
const {register, login, updateUser, deleteUser, getUsers} = require("../controllers/userController");
const {validateRegister, validateUpdateUser} = require("../validations/userValidation");
const {authCheck} = require("../middleware/authMiddleware");

router.post("/register", validateRegister, register);
router.post("/login", validateRegister, login);
router.post("/", authCheck, validateRegister, getUsers);
router.post("/update/:id", validateUpdateUser, updateUser);
router.post("/delete", authCheck, validateRegister, deleteUser);

module.exports = router;