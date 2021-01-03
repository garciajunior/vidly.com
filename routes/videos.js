const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { Video, validateVideo } = require("../models/videos");
const { Genre } = require("../models/genres");

router.get("/", async (req, res) => {
  const videos = await Video.find().sort("name");
  res.send(JSON.stringify(videos));
});

router.get("/:id", async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).send("Object not found");
  res.send(video);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateVideo(req.body);
  console.log(error, "junior");
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");
  console.log(req.body);
  const video = new Video({
    title: req.body.title,
    genre: {
      _id: req.body.genreId,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    rentalRate: req.body.rentalRate,
  });

  await video
    .save()
    .then(() => {
      res.send(video);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/:id", async (req, res) => {
  const { error } = validateVideo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const video = await Video.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      genre: req.body.genre,
    },
    { new: true }
  );
  if (!video) return res.status(404).send("Object not found!");
  res.send(video);
});

router.delete("/:id", async (req, res) => {
  const video = await Video.findByIdAndRemove(req.params.id);

  if (!video) return res.status(404).send("Object not found!!");
  res.send(video);
});

module.exports = router;
