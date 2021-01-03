const error = require("../middleware/error");

const express = require("express");
const video = require("../routes/videos");
const customers = require("../routes/customers");
const genre = require("../routes/genre");
const rental = require("../routes/rental");
const user = require("../routes/user");
const auth = require("../routes/auth");
const home = require("../routes/home");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/videos", video);
  app.use("/api/customers", customers);
  app.use("/api/genres", genre);
  app.use("/api/rentals", rental);
  app.use("/api/users", user);
  app.use("/api/auth", auth);
  app.use("/", home);
  
  app.use(error);
};
