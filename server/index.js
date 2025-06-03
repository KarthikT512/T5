require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  })
);

// Register authentication routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Register course routes
const courseRoutes = require("./routes/courses");
app.use("/api/courses", courseRoutes);

// Register teacher routes
const teacherRoutes = require("./routes/teachers");
app.use("/api/teachers", teacherRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
