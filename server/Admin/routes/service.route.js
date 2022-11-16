const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const requireLogin = require("../middleware/requireLogin");
const ServiceCenter = mongoose.model("Service");
const checkAdmin = require("../../middlewares/checkAdmin");

router.get("/addCarService", checkAdmin, (req, res, next) => {
  res.send("Admin's add service Router");
});

router.post("/addCarService", checkAdmin, (req, res) => {
  const { name, email, phone, location, costPerCar } = req.body;
  console.log(name, email, phone, location, costPerCar);
  if (!name || !email || !phone || !location || !costPerCar) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  const registerServiceCenter = new ServiceCenter({
    name,
    email,
    phone,
    location,
    costPerCar,
  });
  registerServiceCenter
    .save()
    .then((result) => {
      res.json({
        post: result,
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
