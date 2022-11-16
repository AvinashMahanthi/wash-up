const express = require("express");
const router = require("express").Router();
const mongoose = require("mongoose");
const ServiceCenter = mongoose.model("Service");
const Slot = mongoose.model("Slot");
const requireLogin = require("../middlewares/requireLogin");

router.get("/", (req, res, next) => {
  res.send("Index Router");
});

router.get("/bookSlot", requireLogin, (req, res, next) => {
  res.send("Index Router");
});

router.post("/bookSlot", requireLogin, (req, res) => {
  const { ShopName, type, timeTaken, location, NamePlate, cost } = req.body;
  const slot = new Slot({
    ShopName,
    type,
    timeTaken,
    location,
    NamePlate,
    cost,
  });
  slot
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  res.json({
    msg: "Your Information saved!",
    data: slot,
  });
});

router.get("/GetServices", requireLogin, (req, res) => {
  ServiceCenter.find()
    .populate("_id name location costPerCar phone")
    .then((centres) => {
      res.json({ centres });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/GetServices/:location", (req, res) => {
  ServiceCenter.find({ location: req.params.location })
    .then((centres) => {
      // console.log(centres);
      return res.json({ centres });
    })
    .catch((err) => {
      console.log(err);
      return res.status(422).json({ error: "Centres not found!" });
    });
});

router.get("/confirm_Booking/:id", (req, res) => {
  Slot.find({ _id: req.params.id })
    .then((slot) => {
      // console.log(centres);
      return res.json({ slot });
    })
    .catch((err) => {
      console.log(err);
      return res.status(422).json({ error: "Slot not found!" });
    });
});

module.exports = router;
