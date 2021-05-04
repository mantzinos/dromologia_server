const express = require("express");

const router = express.Router();

const Itinerary = require("../../models/Itinerary");

router.post("/add", async (req, res) => {
  try {
    const itinerary = new Itinerary(req.body);
    await itinerary.save();
    res.send("ok");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
