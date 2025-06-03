// server/scripts/seedCourses.js
require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("../models/Course");

(async () => {
  try {
    // dynamically import your ES‑module courseData
    const { courses } = await import(
      // adjust this path if your relative structure is different
      "../../client/src/components/courses/courseData.js"
    );

    // connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    // clear & seed
    await Course.deleteMany({});
    await Course.insertMany(courses);
    console.log(`✅ Seeded ${courses.length} courses`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
})();
