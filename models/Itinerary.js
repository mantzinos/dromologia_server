const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema({
  user: {
    name: {
      type: String,
    },
  },
  name: {
    type: String,
    required: true,
  },
  range: {
    type: String,
    required: true,
  },
  driver: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("itinerary", ItinerarySchema);
