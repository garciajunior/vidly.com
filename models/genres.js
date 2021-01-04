const mongoose = require("mongoose");
const Joi = require("joi");
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Genre = mongoose.model("Genre", genreSchema);

async function validadeSchema(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50),
  });

  try {
    const value = await schema.validateAsync(genre);
    return value;
  } catch (err) {
    throw new Error(err);
  }
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validadeSchema;
