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
router.put("/update/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const { _id } = req.body;
    const itinerary = Itinerary.findOneAndUpdate({ _id, user }, req.body, {
      new: true,
    });
    res.json(itinerary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.post("/get/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const { _id } = req.body;
    const itinerary = await Itinerary.findOne({ user, _id });
    res.json(itinerary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/getall/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const itineraries = await Itinerary.find({ user });
    res.json(itineraries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.post("/date/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const { dates } = req.body;
    const simera = await Itinerary.find({ user, date: new Date(dates) });
    res.send(simera);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
