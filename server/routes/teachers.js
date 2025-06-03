const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Teacher = require("../models/Teacher");
const { verifyToken } = require("./auth");

// Middleware to check if the user is a worker
function requireWorker(req, res, next) {
  if (req.user.role === "worker") {
    next();
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
}

// Middleware to check if the user is a teacher or worker
function requireTeacherOrWorker(req, res, next) {
  if (req.user.role === "teacher" || req.user.role === "worker") {
    next();
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
}

// GET all teachers (open to all, no authentication required)
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find({}).select("-userId");
    res.json(teachers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching teachers." });
  }
});

// GET single teacher by id (open to all, no authentication required)
router.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ id: req.params.id }).select(
      "-userId"
    );
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    res.json(teacher);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching teacher." });
  }
});

// CREATE new teacher (teacher can create own, worker can create any)
router.post(
  "/",
  verifyToken,
  requireTeacherOrWorker,
  body("id").notEmpty().withMessage("Teacher id is required"),
  body("name").notEmpty().withMessage("Name is required"),
  body("subject").notEmpty().withMessage("Subject is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // If teacher, enforce that userId matches the authenticated user
      if (req.user.role === "teacher") {
        req.body.userId = req.user.id;
      } else if (!req.body.userId) {
        return res
          .status(400)
          .json({ error: "userId is required for workers" });
      }

      const created = await Teacher.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(400)
          .json({ error: "A teacher profile already exists for this user." });
      }
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }
);

// UPDATE existing teacher (worker only)
router.put("/:id", verifyToken, requireWorker, async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ id: req.params.id });
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });

    // Prevent updating userId
    delete req.body.userId;

    const updated = await Teacher.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE a teacher (worker only)
router.delete("/:id", verifyToken, requireWorker, async (req, res) => {
  try {
    const deleted = await Teacher.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: "Teacher not found" });
    res.json({ message: "Teacher deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error deleting teacher." });
  }
});

module.exports = router;
