const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  user: {
    type: String,
  },

  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },
  photo: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("driver", DriverSchema);
