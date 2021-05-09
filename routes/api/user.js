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

    const { password, email, username } = req.body;
    const newPass = await bcrypt.hash(password, salt);
    const newUser = req.body;
    newUser.password = newPass;
    console.log(newUser);
    const user = await User.findOneAndUpdate({ username }, newUser, {
      new: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send("Server error");
  }
});
router.delete("/delete/:username", async (req, res) => {
  try {
    const { password } = req.body;
    const { username } = req.params;
    const user = await User.findOne({ username });
    console.log(password);
    console.log(user);
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        await User.findOneAndDelete({ username: username });
        res.send("ok");
      } else if (!checkPass) {
        res.send("wrong password");
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
