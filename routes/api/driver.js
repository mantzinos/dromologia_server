const express = require("express");
const router = express.Router();

const Driver = require("../../models/Driver");

router.post("/add/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const driver = new Driver(req.body);
    driver.user = user;
    await driver.save();
    res.json(driver);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/get/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const { _id } = req.body;

    const driver = await Driver.findOne({ user, _id });
    res.json(driver);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/getall/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const drivers = await Driver.find({ user });
    res.json(drivers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.put("/update/:user", async (req, res) => {
  try {
    const { _id } = req.body;
    const { user } = req.params;
    const driver = await Driver.findOneAndUpdate({ _id, user }, req.body, {
      new: true,
    });
    res.send("Driver updated successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.delete("/delete/:user", async (req, res) => {
  try {
    const { _id } = req.body;
    const { user } = req.params;
    await Driver.findOneAndDelete({ _id, user });
    res.send("Driver deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
