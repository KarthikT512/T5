import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../courses/api";
import { useAuth } from "../auth/AuthContext";
import Header from "../Frontpage/Header";
import Footer from "../Frontpage/Footer";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const Dashboard = ({ setCursorVariant }) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const fetchCourses = async () => {
        try {
          if (user.role === "student") {
            if (user.allocatedCourses && user.allocatedCourses.length > 0) {
              const coursePromises = user.allocatedCourses.map(
                async (courseId) => {
                  try {
                    const response = await api.get(`/api/courses/${courseId}`);
                    return response.data;
                  } catch (err) {
                    if (err.response && err.response.status === 404) {
                      console.warn(`Course ${courseId} not found.`);
                      return null; // Return null for 404 errors
                    }
                    throw err; // Rethrow other errors
                  }
                }
              );
              const courseResults = await Promise.all(coursePromises);
              const validCourses = courseResults.filter(
                (course) => course !== null
              );
              setCourses(validCourses);
              if (validCourses.length < user.allocatedCourses.length) {
                setError(
                  "Some allocated courses could not be loaded. They may have been removed."
                );
              }
            } else {
              setCourses([]);
            }
          } else if (user.role === "worker") {
            const response = await api.get("/api/courses");
            setCourses(response.data);
          }
        } catch (err) {
          console.error("Failed to fetch courses:", err);
          setError("Failed to load courses. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchCourses();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <>
        <Header setCursorVariant={setCursorVariant} />
        <div className="min-h-screen bg-white">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p>Loading...</p>
          </main>
        </div>
        <Footer setCursorVariant={setCursorVariant} />
      </>
    );
  }

  if (!user || (user.role !== "student" && user.role !== "worker")) {
    return (
      <>
        <Header setCursorVariant={setCursorVariant} />
        <div className="min-h-screen bg-white">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p>Access denied. This page is for students and workers only.</p>
          </main>
        </div>
        <Footer setCursorVariant={setCursorVariant} />
      </>
    );
  }

  return (
    <>
      <Header setCursorVariant={setCursorVariant} />
      <div className="min-h-screen bg-white mt-8">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <section className="mb-12">
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-3xl lg:text-4xl font-bold text-black mb-3"
            >
              Welcome back, {user.name || user.role}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-gray-400 text-lg mb-8"
            >
              {user.role === "student"
                ? "Continue your learning journey"
                : "Manage and oversee courses"}
            </motion.p>
          </section>

          {/* Courses Section */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-black mb-2">
                  {user.role === "student" ? "My Courses" : "All Courses"}
                </h2>
                <p className="text-gray-400">
                  {user.role === "student"
                    ? "Continue your learning progress"
                    : "View and manage all available courses"}
                </p>
              </div>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {courses.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">📚</span>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  {user.role === "student"
                    ? "No courses allocated yet"
                    : "No courses available"}
                </h3>
                <p className="text-gray-400">
                  {user.role === "student"
                    ? "Contact your administrator to get started."
                    : "Please check back later."}
                </p>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {courses.map((course) => (
                  <Link to={`/courses/${course.id}/dashboard`} key={course.id}>
                    <motion.div
                      variants={fadeInUp}
                      className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        {course.image ? (
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          {course.category && (
                            <span className="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-400 rounded-full">
                              {course.category}
                            </span>
                          )}
                          {course.level && (
                            <span className="text-xs text-gray-400">
                              {course.level}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                          {course.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            )}
          </section>
        </main>
      </div>
      <Footer setCursorVariant={setCursorVariant} />
    </>
  );
};

export default Dashboard;
