const Joi = require("joi");

const _ = require("lodash");

module.exports = function () {
  Joi.objectId = require("joi-objectid")(Joi);
};
