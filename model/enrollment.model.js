const { required } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
    required: true,
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  courseFee: {
    type: Number,
    min: 0,
    required: true,
  },
  dateStart: {
    type: Date,
    default: Date.now,
  },
});

const EnrollmentModel = mongoose.model("enrollment", EnrollmentSchema);

function validateEnrollment(body) {
  const schema = Joi.object({
    customerID: Joi.string().required(),
    courseID: Joi.string().required(),
  });

  return schema.validate(body);
}

exports.EnrollmentModel = EnrollmentModel;
exports.validateEnrollment = validateEnrollment;
