// client/src/components/courses/CoursePage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaStar, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import api from "./api";
import { courseCategories, courseLevels } from "./courseData";
import Header from "../Frontpage/Header";
import { useAuth } from "../auth/AuthContext";

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: {
    y: -10,
    scale: 1.03,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const CoursesPage = ({ setCursorVariant }) => {
  const {
    user,
    loading: authLoading,
    fetchUsersByRole,
    allocateCourse,
  } = useAuth();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAllocationPopupOpen, setIsAllocationPopupOpen] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  // Fetch courses
  useEffect(() => {
    setLoading(true);
    api
      .get("/api/courses")
      .then((res) => {
        setCourses(res.data);
        setFilteredCourses(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch students for workers
  useEffect(() => {
    if (user?.role === "worker") {
      fetchUsersByRole("student")
        .then((data) => {
          setStudents(data);
          setFilteredStudents(data);
          setFetchError(null);
        })
        .catch((err) => {
          console.error("Failed to fetch students:", err);
          setFetchError("Unable to load students. Please try again later.");
        });
    }
  }, [user, fetchUsersByRole]);

  // Filter courses
  useEffect(() => {
    let updatedCourses = [...courses];
    if (selectedCategory !== "All") {
      updatedCourses = updatedCourses.filter(
        (course) => course.category === selectedCategory
      );
    }
    if (selectedLevel !== "All") {
      updatedCourses = updatedCourses.filter(
        (course) => course.level === selectedLevel
      );
    }
    if (searchQuery) {
      updatedCourses = updatedCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredCourses(updatedCourses);
  }, [selectedCategory, selectedLevel, searchQuery, courses]);

  // Filter students
  useEffect(() => {
    if (studentSearchQuery) {
      setFilteredStudents(
        students.filter((s) =>
          s.name.toLowerCase().includes(studentSearchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredStudents(students);
    }
  }, [studentSearchQuery, students]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/api/courses/${id}`);
        setCourses((prev) => prev.filter((c) => c.id !== id));
        Swal.fire("Deleted!", "The course has been deleted.", "success");
      } catch (err) {
        console.error("Delete failed:", err);
        Swal.fire("Error!", "Failed to delete the course.", "error");
      }
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleAllocateCourse = async () => {
    if (selectedStudent && selectedCourse) {
      const result = await allocateCourse(
        selectedStudent._id,
        selectedCourse.id
      );
      if (result.success) {
        Swal.fire("Success!", "Course has been allocated.", "success");
        setSelectedCourse(null); // Reset selected course after allocation
      } else {
        Swal.fire("Error!", result.error, "error");
      }
    }
  };

  const CourseCard = ({ course }) => {
    const isWorker = user?.role === "worker";
    return (
      <motion.div
        className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 group relative"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="h-48 w-full bg-gradient-to-r from-gray-900 to-gray-700 relative">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            {course.image ? (
              <>
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity"></div>
              </>
            ) : (
              <span className="text-4xl">📚</span>
            )}
          </div>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-900 font-medium">
            {course.category}
          </div>
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
            {course.level}
          </div>
          {course.featured && (
            <div className="absolute bottom-4 left-4 bg-yellow-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white flex items-center">
              <FaStar className="mr-1" /> Featured
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors">
            {course.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {course.description}
          </p>
          {isWorker && (
            <div className="flex justify-end space-x-3 mb-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
                onClick={() => navigate(`/courses/${course.id}/edit`)}
                aria-label="Edit course"
              >
                <FaEdit />
                <span>Edit</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors cursor-pointer"
                onClick={() => handleDelete(course.id)}
                aria-label="Delete course"
              >
                <FaTrash />
                <span>Delete</span>
              </motion.button>
            </div>
          )}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
            <div className="flex items-center">
              <FaUsers className="mr-1.5" />
              <span>
                {course.studentsEnrolled
                  ? `${course.studentsEnrolled} students`
                  : "2,500+ students"}
              </span>
            </div>
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="block w-full text-center py-2.5 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors"
          >
            View Course
          </Link>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <Header setCursorVariant={setCursorVariant} />
      <div className="px-4 sm:px-6 lg:px-8 bg-white min-h-screen py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-10 text-center"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
              variants={titleVariants}
            >
              Explore Our Courses
            </motion.h1>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto"
              variants={titleVariants}
            >
              Enhance your skills with our curated collection of high-quality
              courses
            </motion.p>
          </motion.div>

          {user?.role === "worker" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-8 gap-4"
            >
              <Link
                to="/courses/create"
                className="inline-flex items-center bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
              >
                <span className="mr-2 text-xl">+</span>Create New Course
              </Link>
              <button
                onClick={() => setIsAllocationPopupOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Allocate Courses
              </button>
            </motion.div>
          )}

          <div className="mb-10 p-5 bg-gray-100 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <label
                  htmlFor="category-filter"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Category
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none rounded-lg bg-white border border-gray-300 py-2.5 pl-4 pr-10 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                >
                  <option value="All">All Categories</option>
                  {courseCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative flex-1 min-w-[200px]">
                <label
                  htmlFor="level-filter"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Level
                </label>
                <select
                  id="level-filter"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full appearance-none rounded-lg bg-white border border-gray-300 py-2.5 pl-4 pr-10 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                >
                  <option value="All">All Levels</option>
                  {courseLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-[280px]">
                <label
                  htmlFor="search-input"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Search
                </label>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search for courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg bg-white border border-gray-300 pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                />
              </div>
            </div>
            {(selectedCategory !== "All" ||
              selectedLevel !== "All" ||
              searchQuery) && (
              <motion.div
                className="mt-4 flex justify-end"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedLevel("All");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors text-sm"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </div>

          {/* Allocation Popup */}
          {isAllocationPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Allocate Courses</h2>
                {fetchError && (
                  <p className="text-red-500 mb-4">{fetchError}</p>
                )}
                <div className="flex flex-col md:flex-row items-stretch gap-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <label
                      htmlFor="student-search"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Search Students
                    </label>
                    <input
                      id="student-search"
                      type="text"
                      placeholder="Search for students..."
                      value={studentSearchQuery}
                      onChange={(e) => setStudentSearchQuery(e.target.value)}
                      className="w-full rounded-lg bg-white border border-gray-300 pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Students</h3>
                  <ul className="max-h-60 overflow-y-auto">
                    {filteredStudents.map((student) => (
                      <li
                        key={student._id}
                        onClick={() => handleStudentClick(student)}
                        className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                      >
                        {student.name}
                      </li>
                    ))}
                  </ul>
                </div>
                {selectedStudent && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-bold">
                      {selectedStudent.name}
                    </h3>
                    <p>Email: {selectedStudent.email}</p>
                    <p>Role: {selectedStudent.role}</p>
                    <div className="mt-4">
                      <h4 className="font-semibold">Select a Course</h4>
                      <select
                        value={selectedCourse?.id || ""}
                        onChange={(e) =>
                          setSelectedCourse(
                            courses.find((c) => c.id === e.target.value)
                          )
                        }
                        className="w-full p-2 border rounded mt-2"
                      >
                        <option value="">Select a course</option>
                        {courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleAllocateCourse}
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        disabled={!selectedCourse}
                      >
                        Allocate
                      </button>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setIsAllocationPopupOpen(false)}
                  className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <AnimatePresence>
            {(loading || authLoading) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center py-20"
              >
                <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {!loading &&
            !authLoading &&
            filteredCourses.filter((course) => course.featured).length > 0 && (
              <motion.section
                className="mb-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Featured Courses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses
                    .filter((course) => course.featured)
                    .map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                </div>
              </motion.section>
            )}

          {!loading && !authLoading && (
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                All Courses
              </h2>
              {filteredCourses.length === 0 ? (
                <motion.div
                  className="py-16 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-600 text-center max-w-md">
                    Try adjusting your filters or search query.
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </motion.section>
          )}
        </div>
      </div>
      {/* <Footer setCursorVariant={setCursorVariant} /> */}
    </>
  );
};

export default CoursesPage;
