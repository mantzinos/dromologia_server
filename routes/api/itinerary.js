const express = require("express");

const router = express.Router();

const Itinerary = require("../../models/Itinerary");

router.post("/add/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const itinerary = new Itinerary(req.body);
    itinerary.user = user;
    console.log(itinerary);
    await itinerary.save();
    res.json(itinerary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.put("/update/user", async (req, res) => {
  try {
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
