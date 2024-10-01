const express = require("express");
const { UserModel } = require("../model/user.model");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/auth", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(403).send(error);

  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("Email yamasa parolde qatelik bar...");

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword)
    return res.status(401).send("Email yamasa parolde qatelik bar...");

  const token = user.generateToken();
  res.header("x-auth-token", token).status(201).send(true);
});

function validate(body) {
  const schema = Joi.object({
    email: Joi.string().min(10).required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(body);
}

module.exports = router;
