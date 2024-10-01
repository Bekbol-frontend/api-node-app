const mongoose = require("mongoose");
const Joi = require("joi");

const CourseChema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 150,
    required: true,
  },
  fee: {
    type: Number,
    min: 0,
    required: true,
  },
});

const CourseModel = mongoose.model("course", CourseChema);

function validateCourse(body) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(150).required(),
    fee: Joi.number().min(0).required(),
  });

  return schema.validate(body);
}

exports.CourseModel = CourseModel;
exports.validateCourse = validateCourse;
