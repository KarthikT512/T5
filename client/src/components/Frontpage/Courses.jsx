import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import api from "../courses/api"; // Assuming this is your API utility

// Helper function to get icons based on category (implement as needed)
const getIcon = (category) => {
  // Placeholder: Replace with your actual icon logic
  switch (category) {
    case "Programming":
      return "💻";
    case "Design":
      return "🎨";
    default:
      return "📚";
  }
};

const CourseCard = ({ course, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            delay: 0, // No staggered delay based on index
            type: "spring",
            stiffness: 100,
          },
        },
      }}
      whileHover={{
        scale: 1.03,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className=" rounded-xl shadow-lg overflow-hidden h-full transform transition-all duration-300 group-hover:shadow-xl">
        <div
          className="p-6 relative overflow-hidden"
          style={{
            background:
              course.gradient || "linear-gradient(to right, #1a1a1a, #2d2d2d)", // Use gradient from backend or default
          }}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10"
            animate={
              isHovered ? { scale: 1.5, x: -5, y: 5 } : { scale: 1, x: 0, y: 0 }
            }
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-6 -mb-6"
            animate={
              isHovered ? { scale: 1.5, x: 5, y: -5 } : { scale: 1, x: 0, y: 0 }
            }
            transition={{ duration: 0.5 }}
          />

          {/* Course icon with animations */}
          <motion.div
            className="text-4xl mb-2 relative z-10"
            animate={
              isHovered
                ? {
                    y: [0, -8, 0],
                    transition: { duration: 1, times: [0, 0.5, 1], repeat: 0 },
                  }
                : {}
            }
          >
            <span className="drop-shadow-glow">{getIcon(course.category)}</span>
          </motion.div>

          {/* Course title with gradient background */}
          <div
            className="inline-block py-1 px-3 rounded-md relative z-10"
            style={{
              background:
                course.gradient ||
                "linear-gradient(to right, #1a1a1a, #2d2d2d)",
              opacity: 0.9, // Slight transparency for a polished look
            }}
          >
            <h3 className="text-xl font-bold text-black drop-shadow-md">
              {course.title}
            </h3>
          </div>

          {/* Category and level tags */}
          <div className="flex mt-2 gap-2 relative z-10">
            <span className="bg-white/20 text-black text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              {course.category}
            </span>
            <span className="bg-white/20 text-black text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              {course.level}
            </span>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4 text-sm">{course.description}</p>

          {/* Course features with animated list items */}
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
              Course Includes:
            </h4>
            <ul className="space-y-1">
              {course.curriculum &&
              course.curriculum[0] &&
              course.curriculum[0].lessons ? (
                course.curriculum[0].lessons.map((lesson, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center text-sm text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            x: 0,
                            transition: { delay: 0.3 },
                          }
                        : {}
                    }
                  >
                    <motion.svg
                      className="w-4 h-4 mr-2 text-green-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ scale: 0 }}
                      animate={
                        isInView
                          ? {
                              scale: 1,
                              transition: {
                                type: "spring",
                                stiffness: 300,
                                delay: 0.4,
                              },
                            }
                          : {}
                      }
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                    <span className="truncate">{lesson}</span>
                  </motion.li>
                ))
              ) : (
                <li className="text-sm text-gray-600">No lessons available</li>
              )}
            </ul>
          </div>

          {/* Price section with animation */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-gray-400 line-through text-xs">
                {course.price}
              </span>
              <motion.span
                className="text-black font-bold text-xl"
                animate={
                  isHovered
                    ? {
                        scale: [1, 1.1, 1],
                        transition: { duration: 0.5 },
                      }
                    : {}
                }
              >
                {course.discountedPrice}
              </motion.span>
            </div>
            <motion.span
              className={`px-2 py-1 rounded-full text-xs font-bold ${
                course.status === "Live"
                  ? "bg-green-100 text-green-800"
                  : "bg-amber-100 text-amber-800"
              }`}
              animate={
                isHovered
                  ? {
                      y: [0, -3, 0],
                      transition: { repeat: 1, duration: 0.3 },
                    }
                  : {}
              }
            >
              {course.status}
            </motion.span>
          </div>

          {/* Learn More button with hover effects */}
          <Link
            to={`/courses/${course.id}`}
            className="relative overflow-hidden group-hover:bg-opacity-90 block"
          >
            <motion.div
              className="w-full py-2.5 bg-gradient-to-r from-gray-900 to-black text-white rounded-md flex items-center justify-center font-medium"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-2">Learn More</span>
              <motion.span
                animate={isHovered ? { x: [0, 5, 0] } : { x: 0 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                →
              </motion.span>
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-gray-800"
              initial={{ width: "0%" }}
              animate={isHovered ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Courses = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const [courses, setCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState(6);
  const [loading, setLoading] = useState(true);

  // Animate section when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Fetch courses from the backend
  useEffect(() => {
    setLoading(true);
    api
      .get("/api/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="courses"
      className="py-16 relative overflow-hidden bg-gray-100"
      ref={ref}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gray-400"
            style={{
              width: `${5 + Math.random() * 10}px`,
              height: `${5 + Math.random() * 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              },
            },
          }}
          className="text-center mb-10"
        >
          <motion.span
            className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-semibold mb-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            FEATURED COURSES
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-black">
            Explore Our Featured Courses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Discover high-quality courses designed to help you advance your
            career and achieve your learning goals with our expert instructors.
          </p>
        </motion.div>

        {/* Loading indicator or course grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key="all-courses"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {courses.slice(0, visibleCourses).map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Load More button */}
            {courses.length > visibleCourses && (
              <motion.div
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.6 },
                  },
                }}
                className="mt-10 text-center"
              >
                <motion.button
                  onClick={() => setVisibleCourses((prev) => prev + 3)}
                  className="px-8 py-3 bg-white border border-gray-500 text-black rounded-md shadow-sm hover:shadow-md transition-all"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  Load More Courses
                </motion.button>
              </motion.div>
            )}

            {/* View All Courses button */}
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.7 },
                },
              }}
              className="mt-8 text-center"
            >
              <Link to="/courses">
                <motion.div
                  className="inline-block px-8 py-3 bg-black text-white rounded-md shadow-md font-medium"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  View All Courses
                </motion.div>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Courses;
