const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  subject: { type: String, required: true },
  image: String,
  description: String,
  shortBio: String,
  expertise: [String],
  experience: String,
  education: String,
  accolades: [String],
  schedule: String,
  rating: Number,
  students: Number,
  courses: Number,
  completionRate: String,
  averageResponseTime: String,
  level: String,
  social: {
    twitter: String,
    linkedin: String,
    youtube: String,
    website: String,
    github: String,
    researchGate: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // Ensures one teacher profile per user
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
