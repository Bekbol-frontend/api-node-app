const mongoose = require("mongoose");

function db() {
  mongoose
    .connect("mongodb://localhost/kz-it")
    .then(() => console.log("Connect..."))
    .catch((err) => console.log(err));
}

module.exports = db;
