const express = require("express");
const { CourseModel, validateCourse } = require("../model/course.model");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const router = express.Router();

router.get("/courses", async (_, res) => {
  const courses = await CourseModel.find();

  res.status(200).send(courses);
});

router.get("/courses/:id", async (req, res) => {
  try {
    const course = await CourseModel.findById({ _id: req.params.id });

    if (!course) throw new Error();

    res.status(200).send(course);
  } catch (error) {
    res.send(404).send("Not found...");
  }
});

router.post("/courses", [authMiddleware, roleMiddleware], async (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(403).send(error);
  }

  const course = new CourseModel({
    ...req.body,
  });

  const result = await course.save();
  res.status(201).send(result);
});

router.put("/courses/:id", async (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(403).send(error);

  try {
    const course = await CourseModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!course) throw new Error();

    res.status(200).send(course);
  } catch (error) {
    res.send(404).send("Not found...");
  }
});

router.delete("/courses/:id", async (req, res) => {
  try {
    const course = await CourseModel.findByIdAndDelete({ _id: req.params.id });

    if (!course) throw new Error();

    res.status(200).send(course);
  } catch (error) {
    res.send(404).send("Not found...");
  }
});

module.exports = router;
