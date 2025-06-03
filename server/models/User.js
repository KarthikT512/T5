const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "teacher", "worker"],
    required: true,
  },
  otp: String,
  otpExpires: Date,
  resetToken: String,
  resetTokenExpires: Date,
  allocatedCourses: [{ type: String }], // Stores course IDs as strings
});

module.exports = mongoose.model("User", userSchema);
