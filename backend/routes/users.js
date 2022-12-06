const express = require("express");
const router = express.Router();

//Controllers
const { loginUser, registerUser } = require("../controllers/authController");

//Register Route
router.post("/register", registerUser);

//Login Route
router.post("/login", loginUser);

module.exports = router;
