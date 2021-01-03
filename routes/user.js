const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const { User, validateUser } = require("../models/user");

router.get("/", async (req, res) => {
  const user = await User.find().sort("name");
  res.send(user);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  // if (!user) return res.status(404).send("Object not found");

  res.send(user);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("Bad request, user already registered!");

  // user = new User({
  //   name: req.body.name, isso funciona mas há um outro modo mais elegante de carregar as propriedades
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;