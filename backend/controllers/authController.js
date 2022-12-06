const User = require("../models/userModel");

// Login User
// @route POST api/users/login
const loginUser = async (req, res) => {
  res.json({ msg: "Login User" });
};

// Register User
// @route POST api/users/register
const registerUser = async (req, res) => {
  res.json({ msg: "Register User" });
};

module.exports = {
  loginUser,
  registerUser,
};
