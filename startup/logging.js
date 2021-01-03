const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
module.exports = function () {
  // process.on("uncaughtException", (ex) => { isso ainda nao funciona fazer funcionar com wiston
  //   console.log("we got a exception!!");
  // });
  // winston.handleException(
  winston.transports.Console({ colorized: true, prettyprint: true });
  //   new winston.transports.File({ filename: unhandleException.log })
  // );
  process.on("unhandleRejection", (ex) => {
    // console.log("we got an UNhandle REjection!!");
    throw ex;
    // process.exit(1);
  });
  /*
// winston.error(ex.message, ex)
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    winston.add(
      new winston.transports.MongoDB({
        db: "mongodb://localhost/video",
        level: error,
      })
    ),
  ],
});*/
};
