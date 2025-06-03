const mongoose = require("mongoose");
const User = require("./User");

const courseSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  description: String,
  longDescription: String,
  category: String,
  level: String,
  price: String,
  discountedPrice: String,
  duration: String,
  batchSize: String,
  validity: String,
  status: String,
  rating: Number,
  studentsEnrolled: Number,
  image: String,
  gradient: String,
  featured: Boolean,
  instructor: {
    name: String,
    image: String,
    bio: String,
    rating: Number,
  },
  curriculum: [
    {
      title: String,
      lessons: [String],
    },
  ],
  features: [String],
  dashboard: {
    type: {
      classes: [
        {
          id: { type: Number, required: true },
          title: { type: String, required: true },
          instructor: { type: String, required: true },
          date: { type: String, required: true },
          time: { type: String, required: true },
          duration: { type: String, required: true },
          status: { type: String, required: true },
          url: { type: String }, // Added for live session link
        },
      ],
      pastSessions: [
        {
          id: { type: Number, required: true },
          title: { type: String, required: true },
          date: { type: String, required: true },
          duration: { type: String, required: true },
          views: { type: Number, required: true },
          recordingUrl: { type: String, required: true },
        },
      ],
      notes: [
        {
          id: { type: Number, required: true },
          title: { type: String, required: true },
          content: { type: String, required: true },
          subject: { type: String, required: true },
          preview: { type: String, required: true },
          lastModified: { type: String, required: true },
          fileUrl: { type: String }, // Added for file link
        },
      ],
      quizzes: [
        {
          id: { type: Number, required: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
          questions: { type: Number, required: true },
          duration: { type: String, required: true },
          points: { type: Number, required: true },
          status: { type: String, required: true },
          progress: { type: Number, required: true },
          score: { type: Number, required: true },
          dueDate: { type: String, required: true },
          completedDate: { type: String },
          url: { type: String }, // Added for quiz page link
        },
      ],
    },
    default: {
      classes: [],
      pastSessions: [],
      notes: [],
      quizzes: [],
    },
  },
});

courseSchema.post("save", async function (doc) {
  try {
    await User.updateMany(
      { role: "worker" },
      { $addToSet: { allocatedCourses: doc.id } }
    );
  } catch (err) {
    console.error("Error in post-save hook:", err);
  }
});

module.exports = mongoose.model("Course", courseSchema);
