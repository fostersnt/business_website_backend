const express = require("express");
const router = express.Router();
const {register} = require("../controllers/userController");
const {validateRegister} = require("../validations/userValidation");
const {authCheck} = require("../middleware/authMiddleware");

router.post("/register", authCheck, validateRegister, register);

module.exports = router;