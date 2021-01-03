const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("The jwtPrivateKey environment variable is not defined!");
    process.exit(1);
  }
};
