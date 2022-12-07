const User = require("../models/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// Login User
// @route POST api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Please enter all fields",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      msg: "Invalid email",
    });
  }

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    return res.status(400).json({
      msg: "User does not exist",
    });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    } else {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        }
      );

      res.status(200).json({
        msg: "Login successful",
        user: {
          token: token,
          id: user._id,
          email: user.email,
        },
      });
    }
  }
};

// Register User
// @route POST api/users/register
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Please enter all fields",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      msg: "Invalid email",
    });
  }

  const isUserExist = await User.findOne({
    email: email,
  });

  if (isUserExist) {
    return res.status(400).json({
      msg: "User already exist",
    });
  } else {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email: email,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({
      msg: "User created successfully",
      user: user,
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
