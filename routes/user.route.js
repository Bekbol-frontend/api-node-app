const express = require("express");
const { UserModel, validateUser } = require("../model/user.model");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(403).send(error);

  const checkUserEmail = await UserModel.findOne({ email: req.body.email });

  if (checkUserEmail)
    return res.status(402).send("Bunday paydalaniwshi bar...");

  const user = new UserModel({
    ...req.body,
  });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  user.password = hashPassword;

  const result = await user.save();
  res.status(201).send(result);
});

module.exports = router;
