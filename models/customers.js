const mongoose = require("mongoose");
const Joi = require("joi");

const customersSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  genre: { type: String, required: true },
});

const Custumer = mongoose.model("Custumer", customersSchema);

function validateCustumers(custumer) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    age: Joi.number().integer(),
    email: Joi.string().email().max(100),
    genre: Joi.string().min(4).required(),
  });
  return schema.validate(custumer);
}

exports.Custumer = Custumer;
exports.validateCustumers = validateCustumers;
