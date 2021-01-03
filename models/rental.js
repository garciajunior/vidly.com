const mongoose = require("mongoose");
const Joi = require("joi");
const Rental = mongoose.model(
  "Rentals",
  new mongoose.Schema({
    customer: {
      name: {
        type: String,
        required: true,
        minlenght: 5,
        maxlenght: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlenght: 8,
        maxlenght: 12,
      },
    },
    videos: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlenght: 5,
          maxlenght: 255,
        },
        rentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);
function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    videoId: Joi.objectId().required(),
  });
  return schema.validate(rental);
}
exports.Rental = Rental;
exports.validateRental = validateRental;
