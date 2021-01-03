const { Video } = require("../models/videos");
const { Custumer } = require("../models/customers");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const express = require("express");
const Fawn = require("fawn");
const router = express.Router();
const { Rental, validateRental } = require("../models/rental");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const custumer = await Custumer.findById(req.body.customerId);
  if (!custumer) return res.status(400).send("Invalid Custumer");

  const video = await Video.findById(req.body.videoId);
  if (!video) return res.status(400).send("Invalid Video");
  if (video.numeberInStock === 0)
    return res.status(400).send("No videos available");

  let rental = new Rental({
    custumer: {
      _id: custumer._id,
      name: custumer.name,
      phone: custumer.phone,
    },
    videos: {
      _id: video._id,
      title: video.title,
      rentalRate: video.rentalRate,
    },
  });
  console.log(rental);
  try {
    let task = new Fawn.Task();

    task
      .save("rentals", rental)
      .update("videos", { _id: video._id }, { $inc: { numberInStock: -1 } })
      .run()
      .then(() => {})
      .catch((err) => {});
    res.send(rental);
  } catch (error) {
    res.status(500).send("Error interno");
  }
});

module.exports = router;
