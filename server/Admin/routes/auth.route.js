const express = require("express");
const router = require("express").Router();
const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");
const keys = require("../../keys");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

router.get("/signup", (req, res) => {
  res.send("This is Admin auth signUp");
});

router.get("/signin", (req, res) => {
  res.send("This is admin signIn");
});

// USER SIGNUP
router.post("/signup", (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(422).json({ error: "please add all the fields in this" });
  }
  if (password.length < 8) {
    return res
      .status(422)
      .json({ error: "Password must be atleast 8 characters" });
  }
  // checking for numeric and special characters.
  if (!re.test(password)) {
    return res.status(422).json({
      error: "Password must satisfy the given conditions",
    });
  }
  Admin.findOne({ email: email }).then((savedAdmin) => {
    if (savedAdmin) {
      return res.json({ msg: "User already Exists!" });
    }
    bcrypt.hash(password, 10).then((hashedPassword) => {
      const registerAdmin = new Admin({
        email,
        name,
        password: hashedPassword,
        phone,
      });
      registerAdmin
        .save()
        // .then((data) => {
        //    console.log(data);
        // })
        .catch((err) => {
          console.log(err);
        });
      res.json({ msg: "Login Information saved!" });
    });
  });
  // console.log(registerUser);
});

// USER SIGNIN
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  Admin.findOne({ email: email }).then((savedAdmin) => {
    if (!savedAdmin) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedAdmin.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedAdmin._id }, keys.JWT_SECRET);
          const { _id, email, name, phone } = savedAdmin;
          res.json({
            token,
            user: { _id, name, email, phone },
          });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
