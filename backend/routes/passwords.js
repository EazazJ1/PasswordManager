const express = require("express");
const { Model, model } = require("mongoose");
const router = express.Router();
const Password = require("../models/password");
const { encrypt, decrypt} = require("../Encryption");

//Getting all passwords
router.get("/:userid", async (req, res) => {
  try {
    const passwords = await Password.find({userid: req.params.userid,}).select({
      service: 1,
      username: 1,
      password: 1,
      iv: 1,
      lastUpdated: 1,
      _id: 1,
      userid: 1,
    });

    for(i in passwords){
      decrypt(passwords[i]);
    }

    res.json(passwords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Add a password
router.post("/new", async (req, res) => {
  const encrypted = encrypt(req.body.username, req.body.password);
  const password = new Password({
    service: req.body.service,
    username: encrypted.username,
    password: encrypted.password,
    iv: encrypted.iv,
    lastUpdated: new Date().toLocaleString(),
    userid: req.body.userid
  });
  try {
    const newPassword = await password.save();
    res.status(201).json(newPassword);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Can update password
router.patch("/update", async (req, res) => {
  try {
    let service = await Password.findOne({
      service: req.body.service,
      username: req.body.username,
    });
    if (service.length == 0) {
      return res.status(404).json({ message: "Cannot find student" });
    }
    if (req.body.password != null) {
        service.password = req.body.password;
        service.lastUpdated = new Date().toLocaleString();
    }
    const updatedPassword = await service.save();
    res.json(updatedPassword);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete a service and password
router.delete("/delete", getService, async (req, res) => {
  try {
    await res.password.remove();

    res.json({
      message:
        "Deleted " + req.body.service + " Password for " + req.body.username,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Check to see if the service exists
async function getService(req, res, next) {
  let password;
  try {
    password = await Password.findOne({
      service: req.body.service,
      username: req.body.username,
    });
    if (password.length == 0) {
      return res
        .status(404)
        .json({ message: "Cannot find Service or Username" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.password = password;
  next();
}

module.exports = router;
