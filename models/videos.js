const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genres");

const vidSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  genre: { type: genreSchema, required: true },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  rentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});
const Video = mongoose.model("Videos", vidSchema);

async function validateVideo(video) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    rentalRate: Joi.number().min(0).required(),
  });

  try {
    const value = await schema.validateAsync(video);
    return value;
  } catch (err) {
  throw new Error(err);
  }
}

exports.Video = Video;
exports.validateVideo = validateVideo;
