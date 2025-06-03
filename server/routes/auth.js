const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Course = require("../models/Course");
const JWT_SECRET = process.env.JWT_SECRET;
const OTP_VALIDITY = 5 * 60 * 1000; // 5 minutes

// In-memory token blacklist (not production-ready; consider Redis or DB for persistence)
const tokenBlacklist = [];

// Configure nodemailer transporter (example uses Gmail; secure credentials in .env)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Specified emails for worker OTP and signup notifications
const WORKER_OTP_EMAIL = process.env.WORKER_OTP_EMAIL;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;

// Utility: Generate an OTP using speakeasy
function generateOTP() {
  return speakeasy.totp({
    secret: crypto.randomBytes(20).toString("hex"),
    encoding: "hex",
    step: 300, // OTP expires in 5 minutes
  });
}

// Middleware to verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided." });
  const token = authHeader.split(" ")[1];
  if (tokenBlacklist.includes(token)) {
    return res.status(401).json({ error: "This token has been logged out." });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token." });
    req.user = decoded;
    next();
  });
}

// Middleware to check if the user is a worker
function requireWorker(req, res, next) {
  if (req.user.role === "worker") {
    next();
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
}

// Common function to handle signup logic
async function handleSignup(req, res, role) {
  try {
    const { name, email, password, mobile } = req.body;
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = Date.now() + OTP_VALIDITY;

    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      role,
      otp,
      otpExpires,
    });

    await newUser.save();

    // Use specified email for worker role, otherwise use signup email
    const otpEmail = role === "worker" ? WORKER_OTP_EMAIL : email;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: otpEmail,
      subject: "Your OTP Verification Code",
      text: `Hello ${name},\n\nYour OTP code is ${otp}. It expires in 5 minutes.\n\nThank you!`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({
      message: `Registered as ${role}. An OTP has been sent to ${
        role === "worker" ? "the specified email" : "your email"
      }.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error during signup." });
  }
}

// Signup endpoints
router.post("/signup/student", async (req, res) => {
  await handleSignup(req, res, "student");
});

router.post("/signup/teacher", async (req, res) => {
  await handleSignup(req, res, "teacher");
});

router.post("/signup/worker", async (req, res) => {
  await handleSignup(req, res, "worker");
});

// OTP verification endpoint
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email." });

    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Send notification email for student and teacher roles
    if (user.role === "student" || user.role === "teacher") {
      const notificationMailOptions = {
        from: process.env.EMAIL_USER,
        to: NOTIFICATION_EMAIL,
        subject: "New User Signup Notification",
        text: `A new user has signed up:\n\nName: ${user.name}\nRole: ${user.role}\nEmail: ${user.email}`,
      };
      await transporter.sendMail(notificationMailOptions);
    }

    res.json({ message: "OTP verified successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during OTP verification." });
  }
});

// Login endpoint (updated token expiration to 24 hours)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ error: "Email and password are required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials." });

    if (user.otp)
      return res
        .status(400)
        .json({ error: "Please verify your OTP before logging in." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials." });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during login." });
  }
});

// Logout endpoint
router.post("/logout", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(400).json({ error: "No token provided." });
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(400).json({ error: "Invalid token format." });

    tokenBlacklist.push(token);
    res.json({ message: "Logged out successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during logout." });
  }
});

// Fetch user details
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -otp -resetToken -resetTokenExpires"
    );
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error retrieving user details." });
  }
});

// Update user details (name, email, mobile)
router.put(
  "/me",
  verifyToken,
  [
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Name cannot be empty"),
    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("Invalid email format"),
    body("mobile")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Mobile cannot be empty"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ error: "User not found." });

      // Check email uniqueness if email is being updated
      if (req.body.email && req.body.email !== user.email) {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
          return res.status(400).json({ error: "Email already in use." });
        }
        यू;
      }

      // Update only the allowed fields
      if (req.body.name) user.name = req.body.name;
      if (req.body.email) user.email = req.body.email;
      if (req.body.mobile) user.mobile = req.body.mobile;

      await user.save();

      // Exclude sensitive fields from the response
      const updatedUser = user.toObject();
      delete updatedUser.password;
      delete updatedUser.otp;
      delete updatedUser.resetToken;
      delete updatedUser.resetTokenExpires;
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Server error updating user details." });
    }
  }
);

// Password reset request endpoint
router.post("/password-reset-request", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found." });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    const resetUrl = `http://localhost:5173/password-reset/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Hi ${user.name},\n\nTo reset your password, please click the link below:\n${resetUrl}\n\nThis link is valid for 15 minutes.\n\nThank you!`,
    });

    res.json({ message: "Password reset email sent." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing password reset request." });
  }
});

// Password reset endpoint
router.post("/password-reset", async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const user = await User.findOne({
      resetToken,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ error: "Invalid or expired reset token." });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error resetting password." });
  }
});

// GET available users for teacher profile
router.get(
  "/available-for-teacher",
  verifyToken,
  requireWorker,
  async (req, res) => {
    try {
      const teachers = await Teacher.find({}, "userId");
      const teacherUserIds = teachers.map((t) => t.userId);
      const availableUsers = await User.find({
        _id: { $nin: teacherUserIds },
        role: "teacher",
      });
      res.json(availableUsers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error fetching available users." });
    }
  }
);

// NEW: Fetch users by role (worker only)
router.get("/users/:role", verifyToken, requireWorker, async (req, res) => {
  try {
    const role = req.params.role;
    if (!["student", "teacher", "worker"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }
    const users = await User.find({ role: role }).select(
      "-password -otp -resetToken -resetTokenExpires"
    );
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error fetching users." });
  }
});

// NEW: Allocate course to user (worker only)
router.post(
  "/users/:userId/allocate-course",
  verifyToken,
  requireWorker,
  async (req, res) => {
    try {
      const { courseId } = req.body;
      if (!courseId) {
        return res.status(400).json({ error: "Course ID is required" });
      }
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const course = await Course.findOne({ id: courseId });
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      await User.updateOne(
        { _id: req.params.userId },
        { $addToSet: { allocatedCourses: courseId } }
      );
      res.json({ message: "Course allocated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error allocating course." });
    }
  }
);

router.post("/contact-us", async (req, res) => {
  try {
    const { name, email, role, message } = req.body;
    if (!name || !email || !role || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const contactEmail = process.env.CONTACT_EMAIL;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contactEmail,
      subject: "New Contact Us Message",
      text: `Name: ${name}\nEmail: ${email}\nRole: ${role}\nMessage: ${message}`,
    };
    await transporter.sendMail(mailOptions);
    res.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending message." });
  }
});

// Export the router and middleware functions
module.exports = router;
module.exports.verifyToken = verifyToken;
module.exports.requireWorker = requireWorker;
