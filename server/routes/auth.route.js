const express = require("express");
const router = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const keys = require("../keys");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

router.get("/signup", (req, res) => {
  res.send("This is auth signUp");
});

router.get("/signin", (req, res) => {
  res.send("This is auth signIn");
});

// USER SIGNUP
router.post("/signup", (req, res) => {
  const { name, email, phone, Location, password } = req.body;
  console.log(re.test(password));
  console.log(password.match(re));

  if (!name || !email || !phone || !Location || !password) {
    return res.status(422).json({ error: "please add all the fields" });
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
  // Checking for upper and lower case characters.
  // if (!password.includes(upper) || !password.includes(lower)) {
  //   return res.status(422).json({
  //     error: "Password atleast contain one upper and lower character",
  //   });
  // }
  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res.json({ error: "User already Exists!" });
    }
    bcrypt.hash(password, 10).then((hashedPassword) => {
      const registerUser = new User({
        email,
        name,
        password: hashedPassword,
        phone,
        Location,
      });
      registerUser
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
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, keys.JWT_SECRET);
          const { _id, email, name, phone, location } = savedUser;
          res.json({
            token,
            user: { _id, name, email, phone, location },
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
