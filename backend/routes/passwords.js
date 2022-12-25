const express = require("express");
const { Model, model } = require("mongoose");
const router = express.Router();
const Password = require("../models/password");

//Getting all passwords
router.get("/", async (req, res) => {
  try {
    const passwords = await Password.find().select({
      service: 1,
      username: 1,
      password: 1,
      iv: 1,
      _id: 0,
    });

    res.json(passwords);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Add a password
router.post("/", async (req, res) => {
  
  const password = new Password({
    service: req.body.service,
    username: req.body.username,
    password: req.body.password,
    iv: req.body.iv,
  });
  try {
    const newPassword = await password.save();
    res.status(201).json(newPassword);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;