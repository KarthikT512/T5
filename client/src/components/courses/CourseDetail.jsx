import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Search,
  Filter,
  Star,
  ChevronDown,
  Clock,
  Users,
  BarChart4,
  Sparkles,
  ArrowLeft,
  Calendar,
  Award,
  CheckCircle,
  BookOpen,
  Play,
} from "lucide-react";
import { FaEdit } from "react-icons/fa";
import api from "./api";
import Header from "../Frontpage/Header";
import Footer from "../Frontpage/Footer";
import { useAuth } from "../auth/AuthContext";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedModules, setExpandedModules] = useState({});
  const [isLearnMoreModalOpen, setIsLearnMoreModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/courses/${courseId}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
        if (res.data && res.data.curriculum) {
          const initialExpandedState = {};
          res.data.curriculum.forEach((module, index) => {
            initialExpandedState[index] = index === 0;
          });
          setExpandedModules(initialExpandedState);
        }
        window.scrollTo(0, 0);
      })
      .catch(() => setLoading(false));
  }, [courseId]);

  const toggleModule = (index) => {
    setExpandedModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        mass: 0.5,
      },
    },
  };

  if (loading || authLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-20 pb-20 bg-white text-gray-800">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading course details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Header />
        <motion.div
          className="min-h-screen pt-20 pb-20 flex flex-col items-center justify-center bg-white text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="text-red-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Course Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-gray-900 to-black text-white rounded-md hover:opacity-90 transition-colors"
              onClick={() => navigate("/courses")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Courses
            </motion.button>
          </div>
        </motion.div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <motion.div
        className="min-h-screen bg-white text-gray-800 pt-12 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Course Header */}
        <div className="bg-black py-12 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/courses"
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Link>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center mb-2 flex-wrap gap-2">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                    {course.featured && (
                      <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Featured
                      </span>
                    )}
                  </div>
                  <motion.h1
                    className="text-3xl md:text-4xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    {course.title}
                  </motion.h1>
                  {user?.role === "worker" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors mt-4 cursor-pointer"
                      onClick={() => navigate(`/courses/${course.id}/edit`)}
                      aria-label="Edit course"
                    >
                      <FaEdit />
                      <span>Edit Course</span>
                    </motion.button>
                  )}
                  <motion.p
                    className="max-w-2xl mb-4 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {course.description}
                  </motion.p>
                  {course.instructor && (
                    <div className="mt-4">
                      <p className="text-base">
                        <strong>About the Instructor:</strong>{" "}
                        {course.instructor.bio}
                      </p>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{course.rating}</span>
                      <span className="ml-1 text-white/70">
                        ({course.studentsEnrolled.toLocaleString()} students)
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <Clock className="h-5 w-5 text-white/70 mr-1" />
                      <span>{course.duration}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <Calendar className="h-5 w-5 text-white/70 mr-1" />
                      <span>{course.validity}</span>
                    </motion.div>
                  </div>
                  {course.instructor && (
                    <motion.div
                      className="flex items-center mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <img
                        src={course.instructor.image || "/placeholder.svg"}
                        alt={course.instructor.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                      />
                      <div className="ml-2">
                        <p className="font-medium">
                          Instructor: {course.instructor.name}
                        </p>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-sm ml-1">
                            {course.instructor.rating}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <motion.div
                  className="mt-6 md:mt-0"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="mb-4">
                      <span className="text-white/70 line-through text-lg">
                        {course.price}
                      </span>
                      <span className="text-white text-3xl font-bold ml-2">
                        {course.discountedPrice}
                      </span>
                      <span className="ml-2 bg-white text-black text-xs px-2 py-1 rounded-full">
                        {Math.round(
                          (1 -
                            Number(
                              course.discountedPrice
                                .replace("₹", "")
                                .replace(",", "")
                            ) /
                              Number(
                                course.price.replace("₹", "").replace(",", "")
                              )) *
                            100
                        )}
                        % OFF
                      </span>
                    </div>
                    <motion.button
                      className="w-full py-3 px-6 bg-white text-black rounded-md font-bold text-lg mb-3 hover:bg-opacity-90 transition-colors flex items-center justify-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Watch Preview
                    </motion.button>
                    <motion.button
                      onClick={() => setIsLearnMoreModalOpen(true)}
                      className="w-full py-3 px-6 bg-transparent border border-white text-white rounded-md font-bold text-lg hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn More
                    </motion.button>
                    <p className="text-xs text-white/60 mt-3">
                      30-Day Money-Back Guarantee
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Course Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="md:w-2/3">
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-8">
                <div className="flex space-x-8">
                  <button
                    className={`pb-4 px-2 font-medium text-lg transition-colors relative ${
                      activeTab === "overview"
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                    {activeTab === "overview" && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2196F3]"
                        layoutId="tabIndicator"
                      />
                    )}
                  </button>
                  <button
                    className={`pb-4 px-2 font-medium text-lg transition-colors relative ${
                      activeTab === "curriculum"
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                    onClick={() => setActiveTab("curriculum")}
                  >
                    Curriculum
                    {activeTab === "curriculum" && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2196F3]"
                        layoutId="tabIndicator"
                      />
                    )}
                  </button>
                  <button
                    className={`pb-4 px-2 font-medium text-lg transition-colors relative ${
                      activeTab === "features"
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                    onClick={() => setActiveTab("features")}
                  >
                    Features
                    {activeTab === "features" && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2196F3]"
                        layoutId="tabIndicator"
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {course.longDescription}
                      </p>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        What You'll Learn
                      </h3>
                      <motion.ul
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {course.curriculum[0].lessons.map((lesson, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-start bg-gray-50 p-3 rounded-md shadow-sm"
                            variants={itemVariants}
                          >
                            <CheckCircle className="h-5 w-5 text-[#2196F3] mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{lesson}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                      {course.instructor && (
                        <div className="mt-6">
                          <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Instructor Bio
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {course.instructor.bio}
                          </p>
                        </div>
                      )}
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Requirements
                      </h3>
                      <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                        <li>Basic understanding of the subject area</li>
                        <li>Willingness to learn and practice</li>
                        <li>Access to a computer with internet connection</li>
                        <li>Dedication to complete assignments and projects</li>
                      </ul>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">
                        Target Audience
                      </h3>
                      <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                        <li>
                          Students looking to enhance their knowledge in{" "}
                          {course.category}
                        </li>
                        <li>
                          Professionals wanting to upgrade their skills and
                          advance their career
                        </li>
                        <li>
                          Anyone interested in {course.category.toLowerCase()}{" "}
                          fundamentals and applications
                        </li>
                        <li>
                          Self-learners who prefer a structured learning
                          approach
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === "curriculum" && (
                  <motion.div
                    key="curriculum"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">
                        Course Curriculum
                      </h2>
                      <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <span>
                          {course.curriculum.reduce(
                            (total, module) => total + module.lessons.length,
                            0
                          )}{" "}
                          lessons
                        </span>
                        <span className="mx-2">•</span>
                        <span>{course.duration} total</span>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {course.curriculum.map((module, moduleIndex) => (
                        <motion.div
                          key={moduleIndex}
                          className="py-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: moduleIndex * 0.1 }}
                        >
                          <button
                            className="w-full flex justify-between items-center text-left group"
                            onClick={() => toggleModule(moduleIndex)}
                          >
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-[#F5F5F5] flex items-center justify-center mr-3 text-[#2196F3] group-hover:bg-[#2196F3] group-hover:text-white transition-colors duration-300">
                                <BookOpen className="h-5 w-5" />
                              </div>
                              <h3 className="text-lg font-medium text-gray-800">
                                Module {moduleIndex + 1}:{" "}
                                {module.title || "Course Module"}
                              </h3>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600 mr-3 px-2 py-1 bg-gray-100 rounded-full">
                                {module.lessons.length} lessons
                              </span>
                              <motion.div
                                animate={{
                                  rotate: expandedModules[moduleIndex]
                                    ? 180
                                    : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center text-[#2196F3]"
                              >
                                <ChevronDown className="h-5 w-5" />
                              </motion.div>
                            </div>
                          </button>
                          <AnimatePresence>
                            {expandedModules[moduleIndex] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-4 pl-14 space-y-3">
                                  {module.lessons.map((lesson, lessonIndex) => (
                                    <motion.li
                                      key={lessonIndex}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: lessonIndex * 0.05 }}
                                      className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors border border-gray-100 shadow-sm"
                                    >
                                      <div className="h-8 w-8 rounded-full bg-[#F5F5F5] flex items-center justify-center mr-3 text-[#2196F3]">
                                        <Play className="h-4 w-4" />
                                      </div>
                                      <span className="font-medium">
                                        {lesson}
                                      </span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "features" && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                      Course Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {course.features
                        ? course.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-start p-5 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              whileHover={{
                                y: -5,
                                transition: { duration: 0.2 },
                              }}
                            >
                              <div className="rounded-full bg-[#F5F5F5] p-3 mr-4 text-[#2196F3] group-hover:bg-[#2196F3] group-hover:text-white transition-colors duration-300">
                                <CheckCircle className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2 text-gray-800 group-hover:text-[#2196F3] transition-colors duration-300">
                                  {feature}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  Enhance your learning experience with
                                  professionally designed interactive resources.
                                </p>
                              </div>
                            </motion.div>
                          ))
                        : [
                            "HD Video Content",
                            "Downloadable Resources",
                            "Direct Instructor Access",
                            "Self-Paced Learning",
                            "Certificate of Completion",
                            "Lifetime Access",
                            "Practice Exercises",
                            "Mobile Access",
                          ].map((feature, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-start p-5 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              whileHover={{
                                y: -5,
                                transition: { duration: 0.2 },
                              }}
                            >
                              <div className="rounded-full bg-[#F5F5F5] p-3 mr-4 text-[#2196F3] group-hover:bg-[#2196F3] group-hover:text-white transition-colors duration-300">
                                <CheckCircle className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2 text-gray-800 group-hover:text-[#2196F3] transition-colors duration-300">
                                  {feature}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  Enhance your learning experience with
                                  professionally designed interactive resources.
                                </p>
                              </div>
                            </motion.div>
                          ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="md:w-1/3 mt-8 md:mt-0">
              <motion.div
                className="bg-white rounded-xl p-6 sticky top-24 border border-gray-100 shadow-md"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-6 text-gray-800">
                  Course Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Enrollment Status</span>
                    <span className="text-gray-900 font-medium px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                      {course.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Category</span>
                    <span className="text-gray-900 font-medium">
                      {course.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Level</span>
                    <span className="text-gray-900 font-medium">
                      {course.level}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Duration</span>
                    <span className="text-gray-900 font-medium">
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Enrolled Students</span>
                    <span className="text-gray-900 font-medium">
                      {course.studentsEnrolled.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-gray-900 font-medium">
                        {course.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      onClick={() => setIsEnrollModalOpen(true)}
                      className="w-full py-3 px-6 bg-[#2196F3] text-white rounded-md font-bold text-lg hover:bg-[#1976D2] transition-colors flex items-center justify-center shadow-md shadow-blue-100"
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 10px 15px -3px rgba(33, 150, 243, 0.3)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 18.5L11.5 18H4.5C3.95 18 3.45 17.78 3.09 17.41C2.72 17.05 2.5 16.55 2.5 16V5C2.5 4.45 2.72 3.95 3.09 3.59C3.45 3.22 3.95 3 4.5 3H19.5C20.05 3 20.55 3.22 20.91 3.59C21.28 3.95 21.5 4.45 21.5 5V16C21.5 16.55 21.28 17.05 20.91 17.41C20.55 17.78 20.05 18 19.5 18H12.5L12 18.5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 3V10L15 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 10L9 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Enroll Now
                    </motion.button>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center mt-6 text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>30-Day Money-Back Guarantee</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        {/* add the whatsapp number in the place of [your-number] and repalce it with phone number of the wharsapp in the line 824 and in 852 to redirect it to whatsapp  */}
        {/* Modals */}
        {isLearnMoreModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Learn More</h3>
              <p className="mb-4">
                To learn more about this course, please click below to redirect
                to WhatsApp.
              </p>
              <a
                href={`https://wa.me/+918297488973?text=${encodeURIComponent(
                  `Hello, I would like to learn more about the course: ${course.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2 px-4 bg-green-500 text-white rounded-md text-center"
              >
                Contact via WhatsApp
              </a>
              <button
                onClick={() => setIsLearnMoreModalOpen(false)}
                className="mt-4 w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {isEnrollModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Enroll in Course</h3>
              <p className="mb-4">
                To enroll in this course, please firstly sign in or sign up as a
                student. Then, click the link below and tell us in detail about
                the course you want to buy and its details.
              </p>
              <a
                href={`https://wa.me/+918297488973?text=${encodeURIComponent(
                  `Hello, I am interested in enrolling in the course: ${course.title}. Please provide me with the enrollment details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2 px-4 bg-green-500 text-white rounded-md text-center"
              >
                Contact via WhatsApp
              </a>
              <button
                onClick={() => setIsEnrollModalOpen(false)}
                className="mt-4 w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </motion.div>
      <Footer />
    </>
  );
};

export default CourseDetail;
