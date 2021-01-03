const mongoose = require("mongoose");
//depois que funcionar o  winston tirar o catch e terminar o processo mandando o log para
// o arquivo e logs

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/video")
    .then(() => console.log("Connect to MongoDB"))
    .catch((err) => console.log("Cound connect to mongo", err));
};
