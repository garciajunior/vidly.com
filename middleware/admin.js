const { func } = require("joi");
const { User } = require("../models/user");

module.exports = function (req, res, next) {
  if (!req.user.isAdmin) return res.status(status).send("Access denied");
  next();
};
