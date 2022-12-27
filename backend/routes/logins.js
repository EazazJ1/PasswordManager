const express = require("express");
const { Model, model } = require("mongoose");
const router = express.Router();
const User = require("../models/login");

const bcrypt = require("bcrypt");
const saltRounds = 10;

//Check if password is correct when logging in
router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });    
    if (user.length == 0) {
      return res
        .status(404)
        .json({ message: "Cannot find User or username is incorrect." });
    } else {
      bcrypt.compare(
        req.body.password,
        user.password,
        function (err, response) {
          // if res == true, password matched
          if (response) {
            res.send(user);
          } else {
            res.status(401).json({ message: "Incorrect Username or Password" });
          }
          // else wrong password
        }
      );
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//Register a new user
router.post("/new", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    const hashedPass = new User({
      email: req.body.email,
      username: req.body.username,
      password: hash,
    });
    try {
      const newPassword = await hashedPass.save();
      res.status(201).json(newPassword);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    // Now we can store the password hash in db.
  });
});

//Can update password
// router.patch("/update", async (req, res) => {
//   try {
//     let service = await Password.findOne({
//       service: req.body.service,
//       username: req.body.username,
//     });
//     if (service.length == 0) {
//       return res.status(404).json({ message: "Cannot find student" });
//     }
//     if (req.body.password != null) {
//         service.password = req.body.password;
//         service.lastUpdated = new Date().toLocaleString();
//     }
//     const updatedPassword = await service.save();
//     res.json(updatedPassword);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// //Check to see if the service exists
// async function getUser(req, res, next) {
//   let user;
//   try {
//     user = await User.findOne({
//       username: req.body.username,
//     });
//     if (user.length == 0) {
//       return res
//         .status(404)
//         .json({ message: "Cannot find User or username is incorrect." });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }

//   res.user = user;
//   next();
// }

module.exports = router;
