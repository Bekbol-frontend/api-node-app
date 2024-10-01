const express = require("express");

const courseRoute = require("../routes/course.route");
const customerRoute = require("../routes/customer.route");
const enrollmentRoute = require("../routes/enrollment.route");
const userRoute = require("../routes/user.route");
const authRoute = require("../routes/auth.route");

function routes(app) {
  app.use(express.json());
  app.use("/api", courseRoute);
  app.use("/api", customerRoute);
  app.use("/api", enrollmentRoute);
  app.use("/api", userRoute);
  app.use("/api", authRoute);

  app.use((err, req, res, next) => {
    res.status(500).send(`Error TEST: ${err}`);
  });
}

module.exports = routes;
