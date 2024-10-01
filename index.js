const express = require("express");
require("express-async-errors");
require("dotenv").config();
const app = express();

if (!process.env.TOKEN_KEY) {
  console.log("Global error NOT TOKEN-KEY!");
  process.exit(1);
}

require("./startup/routes")(app);
require("./startup/db")();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listen port: ${PORT}`);
});
