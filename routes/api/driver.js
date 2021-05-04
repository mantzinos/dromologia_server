const express = require("express");
const router = express.Router();

const Driver = require("../../models/Driver");

router.post("/add", async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.send("ok");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/get", async (req, res) => {
  try {
    const { phone } = req.body;
    const driver = await Driver.findOne({ phone });
    res.json(driver);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.put("/update", async (req, res) => {
  try {
    const { id, firstname, lastname, phone } = req.body;
    const newDriver = {};
    if (firstname) newDriver.firstname = firstname;
    if (lastname) newDriver.lastname = lastname;
    if (phone) newDriver.phone = phone;
    console.log(newDriver.firstname);
    await Driver.findOneAndUpdate(
      { _id: id },
      { ...newDriver },
      {
        new: true,
      }
    );
    res.send("Driver updated successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Driver.findOneAndDelete({ _id: id });
    res.send("Driver deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
