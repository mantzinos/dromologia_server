const express = require("express");
const Destination = require("../../models/Destination");
const router = express.Router();

router.post("/add/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const destination = new Destination(req.body);
    destination.user = user;
    await destination.save();
    res.send(destination);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/update/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const { _id } = req.body;
    const destination = await Destination.findOneAndUpdate(
      { _id, user },
      req.body,
      { new: true }
    );
    res.json(destination);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.delete("/delete/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const { _id } = req.body;
    await Destination.findOneAndDelete({ _id, user });
    res.send("Destination deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.post("/get/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const { _id } = req.body;
    const destination = await Destination.findOne({ _id, user });
    res.json(destination);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/getall/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const destinations = await Destination.find({ user });
    res.json(destinations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
