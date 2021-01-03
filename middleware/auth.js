const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("Access denied.  No token is provided!");
  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decode;
    next();
  } catch (error) {
    res.status(status).send("Invalid Token", error);
  }
};