const bcrypt = require("bcrypt");

async function hasg() {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
}
