const express = require("express");
const router = express.Router();

const Vehicle = require("../../models/Vehicle");

router.post("/add", async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.send("ok");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/get", async (req, res) => {
  try {
    const { name } = req.body;
    const vehicle = await Vehicle.findOne({ name });
    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.put("/update", async (req, res) => {
  try {
    const newVehicle = req.body;
    const { id } = req.body;
    await Vehicle.findOneAndUpdate({ _id: id }, newVehicle, { new: true });
    res.send("Vehicle successfully updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Vehicle.findOneAndDelete({ _id: id });
    res.send("Vehicle successfully deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
