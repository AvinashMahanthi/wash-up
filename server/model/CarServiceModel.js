const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const carServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  costPerCar: {
    type: Number,
    required: true,
  },
  PostedBy: {
    type: ObjectId,
    ref: "admin",
  },
});

module.exports = Service = new mongoose.model("Service", carServiceSchema);
