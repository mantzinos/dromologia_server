const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  fridge: {
    type: String,
    required: true,
  },
  sign: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = new mongoose.model("vehicle", VehicleSchema);
