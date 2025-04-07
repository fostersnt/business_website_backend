const express = require("express");
const router = express.Router();
const {register} = require("../controllers/userController");
const {validateRegister} = require("../validations/userValidation");

router.post("/register", validateRegister, register);

module.exports = router;