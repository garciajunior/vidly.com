const express = require("express");
const app = express();
require("./startup/logging");
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/validation");

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server its running on the port ${port}`);
});

//quando o winston tiver funcionando  colocar o winston na porta com info
// importar winston tambem
