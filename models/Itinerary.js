const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema({
  user: {
    type: String,
  },
  driver: {
    type: String,
    required: true,
  },
  driverphoto: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },

  start: {
    type: Date,
    default: Date.now,
  },
  stop: {
    type: Date,
  },
});

module.exports = new mongoose.model("itinerary", ItinerarySchema);
