// Teacher/index.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import {
  Search,
  PlayCircle,
  Award,
  Clock,
  Calendar,
  BookOpen,
  Users,
  BarChart,
  Send,
  Video,
  X,
  Home,
  Edit,
  Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Header from "../Frontpage/Header";
import Footer from "../Frontpage/Footer";

const TeacherIndex = () => {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("t5_token");
        const response = await fetch("http://localhost:8000/api/teachers", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch teachers");
        }
        const data = await response.json();
        setTeachers(data);
        setFilteredTeachers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    const filtered = teachers.filter((teacher) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.shortBio.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject =
        !subjectFilter || teacher.subject === subjectFilter;

      return matchesSearch && matchesSubject;
    });

    setFilteredTeachers(filtered);
  }, [searchTerm, subjectFilter, teachers]);

  const subjects = Array.from(
    new Set(teachers.map((teacher) => teacher.subject))
  );

  const handleTeacherClick = (teacher) => {
    navigate(`/teachers/${teacher.id}`);
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  const deleteTeacher = async (teacherId) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        const token = localStorage.getItem("t5_token");
        const response = await fetch(
          `http://localhost:8000/api/teachers/${teacherId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete teacher");
        }
        setTeachers(teachers.filter((t) => t.id !== teacherId));
      } catch (err) {
        console.error(err);
        alert("Error deleting teacher");
      }
    }
  };

  if (isLoading)
    return <div className="text-white text-center">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-[96px]">
        {/* Header Section */}
        <div className="top-[88px] left-0 right-0 bg-white z-10 shadow-sm">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Return to Home Icon */}
            <button
              onClick={handleReturnHome}
              className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors cursor-pointer"
            >
              <Home className="h-5 w-5" /> Back To Home
            </button>

            {/* Search, Filter, and Create Container */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search teachers..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black w-full"
                />
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Subject Filter */}
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full sm:w-auto"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              {/* Create Button for Teacher and Worker */}
              {user && (user.role === "teacher" || user.role === "worker") && (
                <button
                  onClick={() => navigate("/teachers/create")}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  Create New Teacher
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto sm:pt-0 pb-8 px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher, index) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  index={index}
                  onClick={() => handleTeacherClick(teacher)}
                  onDelete={deleteTeacher}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No teachers found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filters
                  </p>
                </motion.div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

const TeacherCard = ({ teacher, index, onClick, onDelete }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate(); // Define navigate here for use in TeacherCard

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        scale: 1.03,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      className="group relative h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden h-full relative z-10 border border-gray-200 dark:border-gray-800">
        {/* Geometric decorative elements */}
        <motion.div
          className="absolute -right-6 -top-6 w-20 h-20 bg-black/5 dark:bg-white/5 rounded-full z-0"
          animate={
            isHovered ? { scale: 1.5, x: -10, y: 10 } : { scale: 1, x: 0, y: 0 }
          }
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute -left-4 -bottom-4 w-16 h-16 bg-black/5 dark:bg-white/5 rounded-full z-0"
          animate={
            isHovered ? { scale: 1.5, x: 10, y: -10 } : { scale: 1, x: 0, y: 0 }
          }
          transition={{ duration: 0.5 }}
        />

        {/* Teacher Card Content */}
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <div className="relative mr-4">
              <motion.div
                className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-black/0 dark:border-white/0"
                animate={
                  isHovered
                    ? {
                        borderColor: [
                          "rgba(0,0,0,0)",
                          "rgba(0,0,0,0.3)",
                          "rgba(0,0,0,0)",
                        ],
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white relative">
                  {teacher.name}
                  <motion.span
                    className="absolute -right-8 -top-1 text-xs bg-black text-white dark:bg-white dark:text-black px-1 rounded"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    PRO
                  </motion.span>
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-1 mb-2">
                <span className="inline-block px-2 py-0.5 bg-black/10 dark:bg-white/10 text-black dark:text-white text-xs rounded-full">
                  {teacher.subject}
                </span>
                <span className="inline-block px-2 py-0.5 bg-black/5 dark:bg-white/5 text-black dark:text-white text-xs rounded-full">
                  {teacher.level}
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(teacher.rating)
                          ? "text-black dark:text-white"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                  {teacher.rating}
                </span>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-700 line-clamp-3">
              {teacher.description}
            </p>
          </div>
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 mb-2">
              EXPERTISE
            </h4>
            <div className="flex flex-wrap gap-1">
              {teacher.expertise.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-block px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {teacher.expertise.length > 3 && (
                <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
                  +{teacher.expertise.length - 3}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4 text-center">
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="font-semibold text-gray-900 text-sm">
                {teacher.students.toLocaleString()}
              </p>
              <p className="text-gray-500 text-xs">Students</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="font-semibold text-gray-900 text-sm">
                {teacher.experience}
              </p>
              <p className="text-gray-500 text-xs">Experience</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="font-semibold text-gray-900 text-sm">
                {teacher.courses}
              </p>
              <p className="text-gray-500 text-xs">Courses</p>
            </div>
          </div>
          <div className="mt-auto pt-4">
            <motion.button
              className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              View Details
            </motion.button>
          </div>
          <div className="flex justify-center space-x-2 mt-3">
            {Object.entries(teacher.social)
              .slice(0, 4)
              .map(([platform, link], idx) => (
                <motion.a
                  key={platform}
                  href={link}
                  className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.2 }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + idx * 0.05 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {getSocialIcon(platform)}
                </motion.a>
              ))}
          </div>
          {/* Edit and Delete Buttons for Worker */}
          {user && user.role === "worker" && (
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/teachers/edit/${teacher.id}`); // Use navigate defined in TeacherCard
                }}
                className="text-gray-600 hover:text-black"
                title="Edit"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(teacher.id);
                }}
                className="text-red-600 hover:text-red-800"
                title="Delete"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

function getSocialIcon(platform) {
  switch (platform) {
    case "twitter":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      );
    case "linkedin":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect width="4" height="12" x="2" y="9"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      );
    case "youtube":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
          <path d="m10 15 5-3-5-3z"></path>
        </svg>
      );
    case "github":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      );
    case "website":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      );
    case "researchGate":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19.586 0c-2.123 0-3.299 1.562-3.299 3.328h2.454c0-.67.695-1.199 1.309-1.199.742 0 1.309.446 1.309 1.199 0 .67-.566 1.116-1.309 1.116-.316 0-.552-.035-.828-.13v2.031c.329.096.609.169 1.194.169 1.209 0 2.555-.795 2.555-2.922 0-1.953-1.301-3.592-3.385-3.592zm-13.215 4.419v4.829h-2.454v-4.829c0-1.125-.63-1.885-1.309-1.885-.551 0-1.054.43-1.309.929h-.035v-5.263h-2.454v13.8h2.454v-5.694c.316.568.88.929 1.528.929 1.757 0 3.579-1.604 3.579-4.816zm3.115-.357c-2.492 0-4.534 1.971-4.534 4.372s2.042 4.373 4.534 4.373 4.535-1.972 4.535-4.373-2.043-4.372-4.535-4.372zm0 6.45c-1.139 0-2.062-.896-2.062-2.078 0-1.182.923-2.078 2.062-2.078 1.14 0 2.063.896 2.063 2.078 0 1.182-.923 2.078-2.063 2.078z" />
        </svg>
      );
    default:
      return null;
  }
}

export default TeacherIndex;
