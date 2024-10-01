const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 150,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    minlength: 10,
    maxlength: 150,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
    trim: true,
  },
});

UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.TOKEN_KEY);
};

const UserModel = mongoose.model("user", UserSchema);

function validateUser(body) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(150).required(),
    email: Joi.string().min(10).required(),
    password: Joi.string().min(8).required(),
    role: Joi.string(),
  });

  return schema.validate(body);
}

exports.UserModel = UserModel;
exports.validateUser = validateUser;
