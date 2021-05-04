const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  user: {
    type: String,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  brand: {
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
