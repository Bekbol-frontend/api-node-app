const mongoose = require("mongoose");
const Joi = require("joi");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 150,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    minlength: 10,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    minlength: 7,
    trim: true,
    required: true,
  },
  isVip: {
    type: Boolean,
    default: false,
  },
  bonusPoint: {
    type: Number,
    min: 0,
    default: 0,
  },
});

const CustomerModel = mongoose.model("customer", CustomerSchema);

function validateCustomer(body) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(150).required(),
    email: Joi.string().min(10).required(),
    phone: Joi.string().min(7).required(),
  });

  return schema.validate(body);
}

exports.CustomerModel = CustomerModel;
exports.validateCustomer = validateCustomer;
