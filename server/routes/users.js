const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Course = require("../models/Course");

const { verifyToken, requireWorker } = require("./auth");

// Sanity-check: Verify middleware functions
if (typeof verifyToken !== "function") {
  throw new TypeError(
    "verifyToken middleware is not a function. Check your ./auth.js exports."
  );
}
if (typeof requireWorker !== "function") {
  throw new TypeError(
    "requireWorker middleware is not a function. Check your ./auth.js exports."
  );
}

// GET a single user’s list of courses (Worker-only access)
router.get("/:userId/courses", verifyToken, requireWorker, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "allocatedCourses"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const courses = await Course.find({ id: { $in: user.allocatedCourses } });
    return res.json(courses);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Server error fetching user's courses" });
  }
});

// ADD a course to a user’s list (Worker-only access)
router.post(
  "/:userId/courses",
  verifyToken,
  requireWorker,
  async (req, res) => {
    try {
      const { courseId } = req.body;
      if (!courseId) {
        return res.status(400).json({ error: "Course ID is required" });
      }

      const course = await Course.findOne({ id: courseId });
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.allocatedCourses.includes(courseId)) {
        return res.status(400).json({ error: "Course already added to user" });
      }

      user.allocatedCourses.push(courseId);
      await user.save();

      return res.json({
        message: "Course added to user",
        allocatedCourses: user.allocatedCourses,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Server error adding course to user" });
    }
  }
);

// REMOVE a course from a user’s list (Worker-only access)
router.delete(
  "/:userId/courses/:courseId",
  verifyToken,
  requireWorker,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const courseIndex = user.allocatedCourses.indexOf(req.params.courseId);
      if (courseIndex === -1) {
        return res
          .status(404)
          .json({ error: "Course not found in user's courses" });
      }

      user.allocatedCourses.splice(courseIndex, 1);
      await user.save();

      return res.json({
        message: "Course removed from user",
        allocatedCourses: user.allocatedCourses,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Server error removing course from user" });
    }
  }
);

module.exports = router;
