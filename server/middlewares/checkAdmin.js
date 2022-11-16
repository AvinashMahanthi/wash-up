const keys = require("../keys");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const User = mongoose.model("User");
const Admin = mongoose.model("Admin");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in as Admin" });
  }
  // const token = authorization.replace("Bearer ", "");
  // const bearer = authorization.split(" ");
  // const token = bearer[1];
  const token = authorization;
  jwt.verify(token, keys.JWT_SECRET, (err, payload) => {
    console.log(payload);
    if (err) {
      return res.status(401).json({ error: "You must be logged in", token });
    }
    const { _id } = payload;
    Admin.findById(_id).then((Admindata) => {
      if (!Admindata) {
        return res
          .status(401)
          .json({ error: "You are not Authorized to this page", token });
      }
      req.user = Admindata;
      next();
    });
  });
};