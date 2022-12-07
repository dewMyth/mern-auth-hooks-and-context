const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //JWT Verify Authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    return res.status(401).send({ error: "You must be logged in." });
  }
};

module.exports = requireAuth;
