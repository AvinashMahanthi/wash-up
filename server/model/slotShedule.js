const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  ShopName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "Car wash",
  },
  timeTaken: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  NamePlate: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

module.exports = Slot = new mongoose.model("Slot", slotSchema);
