const express = require("express");
const router = express.Router();

const Vehicle = require("../../models/Vehicle");

router.post("/add/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const vehicle = new Vehicle(req.body);
    vehicle.user = user;
    await vehicle.save();
    res.send("ok");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.post("/get/:user", async (req, res) => {
  try {
    const { _id } = req.body;
    const { user } = req.params;
    const vehicle = await Vehicle.findOne({ _id, user });
    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/getall/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const vehicles = await Vehicle.find({ user });
    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.put("/update/", async (req, res) => {
  try {
    const newVehicle = req.body;
    const { _id } = req.body;
    const { user } = req.params;
    const vehicle = await Vehicle.findOneAndUpdate({ _id, user }, newVehicle, {
      new: true,
    });
    res.send("Vehicle successfully updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.delete("/delete/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const { _id } = req.body;
    await Vehicle.findOneAndDelete({ _id, user });
    res.send("Vehicle successfully deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
