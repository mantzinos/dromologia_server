const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

router.post("/register", async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User(req.body);
    user.password = hash;
    await user.save();
    res.send("ok");
  } catch (err) {
    if (err.code === 11000) {
      res.send("duplicate name");
    }
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        res.json("ok");
      } else if (!checkPass) {
        res.send("wrong password");
      }
    } else {
      res.send("user not exist");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.put("/update", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const { username, password } = req.body;
    const newPass = await bcrypt.hash(password, salt);
    const user = await User.findOneAndUpdate(
      { username },
      { password: newPass },
      { new: true }
    );
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
