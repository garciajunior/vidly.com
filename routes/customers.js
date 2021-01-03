const { Router } = require("express");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

const { Custumer, validateCustumers } = require("../models/customers");

router.get("/", async (req, res) => {
  const custumers = await Custumer.find().sort("name");
  res.send(custumers);
});

router.get("/:id", async (req, res) => {
  const custumer = await Custumer.findById(req.params.id);

  if (!custumer) return res.status(404).send("Custumer not found!! try again");

  res.send(custumer);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCustumers(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const custumer = new Custumer({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    genre: req.body.genre,
  });
  await custumer.save();
  res.send(custumer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustumers(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const custumer = await Custumer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      genre: req.body.genre,
    },
    { new: true }
  );
  if (!custumer) return res.status(404).send("Custumers not found!");

  res.send(custumer);
});

router.delete("/", async (req, res) => {
  const custumer = await Custumer.findByIdAndRemove(req.params.id);

  if (!custumer) return res.status(404).send("Custumer not found!");

  res.send(custumer);
});

module.exports = router;
