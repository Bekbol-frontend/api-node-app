const express = require("express");
const {
  EnrollmentModel,
  validateEnrollment,
} = require("../model/enrollment.model");
const { CustomerModel } = require("../model/customer.model");
const { CourseModel } = require("../model/course.model");
const router = express.Router();

router.get("/enrollment", async (_, res) => {
  const enrollments = await EnrollmentModel.find()
    .populate("customerID", "name email -_id")
    .populate("courseID", "title fee -_id");
  res.status(200).send(enrollments);
});

router.post("/enrollment", async (req, res) => {
  const { error } = validateEnrollment(req.body);
  if (error) return res.status(403).send(error);

  const customer = await CustomerModel.findById({ _id: req.body.customerID });
  const course = await CourseModel.findById({ _id: req.body.courseID });

  if (!customer || !course) return res.status(403).send("Error...");

  const enrollment = new EnrollmentModel({
    ...req.body,
    courseFee: course.fee,
  });

  if (customer.isVip) {
    const priceDiscount = course.fee - (course.fee * 20) / 100;
    enrollment.courseFee = priceDiscount;
  }

  await customer.bonusPoint++;
  const result = await enrollment.save();
  res.status(201).send(result);
});

module.exports = router;
