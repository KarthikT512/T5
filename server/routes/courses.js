const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Course = require("../models/Course");
const User = require("../models/User");
const { verifyToken } = require("./auth"); // Assuming auth middleware exists
const multer = require("multer");
const path = require("path");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage: storage });

// Role middleware
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res
        .status(403)
        .json({ error: "Forbidden: Insufficient permissions" });
    }
    next();
  };
}

// Helper to initialize dashboard if missing
function ensureDashboard(course) {
  if (!course.dashboard) {
    course.dashboard = {
      classes: [],
      pastSessions: [],
      notes: [],
      quizzes: [],
    };
  }
  const sections = ["classes", "pastSessions", "notes", "quizzes"];
  sections.forEach((section) => {
    if (!Array.isArray(course.dashboard[section])) {
      course.dashboard[section] = [];
    }
  });
}

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching courses" });
  }
});

// GET single course by id
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching course" });
  }
});

// CREATE new course (worker only)
router.post(
  "/",
  verifyToken,
  requireRole("worker"),
  [
    body("id").notEmpty().withMessage("Course ID is required"),
    body("title").notEmpty().withMessage("Title is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const course = await Course.create(req.body);
      res.status(201).json(course);
    } catch (err) {
      console.error("Create course error:", err);
      res.status(400).json({ error: err.message });
    }
  }
);

// UPDATE existing course (worker only)
router.put("/:id", verifyToken, requireRole("worker"), async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error("Update course error:", err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE a course (worker only)
router.delete("/:id", verifyToken, requireRole("worker"), async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ id: req.params.id });
    if (!course) return res.status(404).json({ error: "Course not found" });

    await User.updateMany(
      { allocatedCourses: course.id },
      { $pull: { allocatedCourses: course.id } }
    );
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Delete course error:", err);
    res.status(500).json({ error: "Server error deleting course" });
  }
});

// **Dashboard Routes**

// Add a new class
router.post(
  "/:id/dashboard/classes",
  verifyToken,
  requireRole("worker"),
  async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) return res.status(404).json({ error: "Course not found" });

      ensureDashboard(course);
      const newClass = req.body || {};
      const maxId =
        course.dashboard.classes.length > 0
          ? Math.max(...course.dashboard.classes.map((c) => c.id || 0))
          : 0;
      newClass.id = maxId + 1;

      course.dashboard.classes.push(newClass);
      await course.save();
      res.status(201).json(newClass);
    } catch (err) {
      console.error("Add class error:", err);
      res.status(500).json({ error: "Server error adding class" });
    }
  }
);

// Update a class
router.put(
  "/:id/dashboard/classes/:classId",
  verifyToken,
  requireRole("worker"),
  async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) return res.status(404).json({ error: "Course not found" });

      ensureDashboard(course);
      const classIndex = course.dashboard.classes.findIndex(
        (c) => c.id == req.params.classId
      );
      if (classIndex === -1)
        return res.status(404).json({ error: "Class not found" });

      course.dashboard.classes[classIndex] = {
        ...course.dashboard.classes[classIndex],
        ...req.body,
      };
      await course.save();
      res.json(course.dashboard.classes[classIndex]);
    } catch (err) {
      console.error("Update class error:", err);
      res.status(500).json({ error: "Server error updating class" });
    }
  }
);

// Delete a class
router.delete(
  "/:id/dashboard/classes/:classId",
  verifyToken,
  requireRole("worker"),
  async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) return res.status(404).json({ error: "Course not found" });

      ensureDashboard(course);
      const initialLength = course.dashboard.classes.length;
      course.dashboard.classes = course.dashboard.classes.filter(
        (c) => c.id != req.params.classId
      );
      if (course.dashboard.classes.length === initialLength) {
        return res.status(404).json({ error: "Class not found" });
      }
      await course.save();
      res.json({ message: "Class deleted successfully" });
    } catch (err) {
      console.error("Delete class error:", err);
      res.status(500).json({ error: "Server error deleting class" });
    }
  }
);

// Add a past session
router.post(
  "/:id/dashboard/pastSessions",
  verifyToken,
  requireRole("worker"),
  async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) return res.status(404).json({ error: "Course not found" });

      ensureDashboard(course);
      const newSession = req.body || {};
      const maxId =
        course.dashboard.pastSessions.length > 0
          ? Math.max(...course.dashboard.pastSessions.map((s) => s.id || 0))
          : 0;
      newSession.id = maxId + 1;

      course.dashboard.pastSessions.push(newSession);
      await course.save();
      res.status(201).json(newSession);
    } catch (err) {
      console.error("Add past session error:", err);
      res.status(500).json({ error: "Server error adding past session" });
    }
  }
);

// Update a past session
router.put(
  "/:id/dashboard/pastSessions/:sessionId",
  verifyToken,
  requireRole("worker"),
  async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) return res.status(404).json({ error: "Course not found" });

      ensureDashboard(course);
      const sessionIndex = course.dashboard.pastSessions.findIndex(
        (s) => s.id == req.params.sessionId
      );
      if (sessionIndex === -1)
        return res.status(404).json({ error: "Past session not found" });

      course.dashboard.pastSessions[sessionIndex] = {
        ...course.dashboard.pastSessions[sessionIndex],
        ...req.body,
      };
      await course.save();
      res.json(course.dashboard.pastSessions[sessionIndex]);
    } catch (err) {
      console.error("Update past session error:", err);
      res.status(500).json({ error: "Server error updating past session" });
    }
  }
);

// Delete a past session
router.delete(
  "/:id/dashboard/pastSessions/:sessionId",
  verifyToken,
  requireRole("worker"),
  async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) return res.status(404).json({ error: "Course not found" });

      ensureDashboard(course);
      const initialLength = course.dashboard.pastSessions.length;
      course.dashboard.pastSessions = course.dashboard.pastSessions.filter(
        (s) => s.id != req.params.sessionId
      );
      if (course.dashboard.pastSessions.length === initialLength) {
        return res.status(404).json({ error: "Past session not found" });
      }
      await course.save();
      res.json({ message: "Past session deleted successfully" });
    } catch (err) {
      console.error("Delete past session error:", err);
      res.status(500).json({ error: "Server error deleting past session" });
    }
  }
);

// Add a note (with file upload)
router.post(
  "/:id/dashboard/notes",
  verifyToken,
  requireRole("worker"),
  upload.single("file"), // Expecting a file field named "file"
  async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) return res.status(404).json({ error: "Course not found" });

      ensureDashboard(course);
      const newNote = req.body || {};
      if (req.file) {
        newNote.fileUrl = `/uploads/${req.file.filename}`;
      }
      const maxId =
        course.dashboard.notes.length > 0
          ? Math.max(...course.dashboard.notes.map((n) => n.id || 0))
          : 0;
      newNote.id = maxId + 1;

      course.dashboard.notes.push(newNote);
      await course.save();
      res.status(201).json(newNote);
    } catch (err) {
      console.error("Add note error:", err);
      res.status(500).json({ error: "Server error adding note" });
    }
  }
);

// Update a note
router.put(
  "/:id/dashboard/notes/:noteId",
  verifyToken,
  requireRole("worker"),
  upload.single("file"), // Optional file update
  async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) return res.status(404).json({ error: "Course not found" });

      ensureDashboard(course);
      const noteIndex = course.dashboard.notes.findIndex(
        (n) => n.id == req.params.noteId
      );
      if (noteIndex === -1)
        return res.status(404).json({ error: "Note not found" });

      const updatedNote = {
        ...course.dashboard.notes[noteIndex],
        ...req.body,
      };
      if (req.file) {
        updatedNote.fileUrl = `/uploads/${req.file.filename}`;
      }
      course.dashboard.notes[noteIndex] = updatedNote;
      await course.save();
      res.json(course.dashboard.notes[noteIndex]);
    } catch (err) {
      console.error("Update note error:", err);
      res.status(500).json({ error: "Server error updating note" });
    }
  }
);

// Delete a note
router.delete(
  "/:id/dashboard/notes/:noteId",
  verifyToken,
  requireRole("worker"),
  async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) return res.status(404).json({ error: "Course not found" });

      ensureDashboard(course);
      const initialLength = course.dashboard.notes.length;
      course.dashboard.notes = course.dashboard.notes.filter(
        (n) => n.id != req.params.noteId
      );
      if (course.dashboard.notes.length === initialLength) {
        return res.status(404).json({ error: "Note not found" });
      }
      await course.save();
      res.json({ message: "Note deleted successfully" });
    } catch (err) {
      console.error("Delete note error:", err);
      res.status(500).json({ error: "Server error deleting note" });
    }
  }
);

// Add a quiz
router.post(
  "/:id/dashboard/quizzes",
  verifyToken,
  requireRole("worker"),
  async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) return res.status(404).json({ error: "Course not found" });

      ensureDashboard(course);
      const newQuiz = req.body || {};
      const maxId =
        course.dashboard.quizzes.length > 0
          ? Math.max(...course.dashboard.quizzes.map((q) => q.id || 0))
          : 0;
      newQuiz.id = maxId + 1;

      course.dashboard.quizzes.push(newQuiz);
      await course.save();
      res.status(201).json(newQuiz);
    } catch (err) {
      console.error("Add quiz error:", err);
      res.status(500).json({ error: "Server error adding quiz" });
    }
  }
);

// Update a quiz
router.put(
  "/:id/dashboard/quizzes/:quizId",
  verifyToken,
  requireRole("worker"),
  async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) return res.status(404).json({ error: "Course not found" });

      ensureDashboard(course);
      const quizIndex = course.dashboard.quizzes.findIndex(
        (q) => q.id == req.params.quizId
      );
      if (quizIndex === -1)
        return res.status(404).json({ error: "Quiz not found" });

      course.dashboard.quizzes[quizIndex] = {
        ...course.dashboard.quizzes[quizIndex],
        ...req.body,
      };
      await course.save();
      res.json(course.dashboard.quizzes[quizIndex]);
    } catch (err) {
      console.error("Update quiz error:", err);
      res.status(500).json({ error: "Server error updating quiz" });
    }
  }
);

// Delete a quiz
router.delete(
  "/:id/dashboard/quizzes/:quizId",
  verifyToken,
  requireRole("worker"),
  async (req, res) => {
    try {
      const course = await Course.findOne({ id: req.params.id });
      if (!course) return res.status(404).json({ error: "Course not found" });

      ensureDashboard(course);
      const initialLength = course.dashboard.quizzes.length;
      course.dashboard.quizzes = course.dashboard.quizzes.filter(
        (q) => q.id != req.params.quizId
      );
      if (course.dashboard.quizzes.length === initialLength) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      await course.save();
      res.json({ message: "Quiz deleted successfully" });
    } catch (err) {
      console.error("Delete quiz error:", err);
      res.status(500).json({ error: "Server error deleting quiz" });
    }
  }
);

module.exports = router;
