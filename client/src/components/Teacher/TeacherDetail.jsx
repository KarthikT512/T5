// Teacher/TeacherDetail.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
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
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";

const TeacherDetail = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const token = localStorage.getItem("t5_token");
        const response = await fetch(
          `http://localhost:8000/api/teachers/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch teacher");
        }
        const data = await response.json();
        setTeacher(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  if (isLoading)
    return <div className="text-white text-center">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;
  if (!teacher)
    return <div className="text-white text-center">Teacher not found</div>;

  const featuredVideos = [
    {
      id: 1,
      title: "Introduction to " + teacher.subject,
      duration: "15:30",
      thumbnail:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Advanced concepts in " + teacher.subject,
      duration: "23:45",
      thumbnail:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => navigate("/teachers")}
      />

      <motion.div
        className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative z-10 mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="relative">
          <button
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
            onClick={() => navigate("/teachers")}
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left panel with image and basic info */}
            <div className="bg-gradient-to-b from-gray-50 to-white p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200">
              <div className="relative">
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-black/10"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">
                  {teacher.name}
                </h2>
                <div className="flex justify-center items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-black/10 text-black text-sm rounded-full">
                    {teacher.subject}
                  </span>
                  <span className="px-3 py-1 bg-black/5 text-black text-sm rounded-full">
                    {teacher.level}
                  </span>
                </div>
              </motion.div>

              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(teacher.rating)
                          ? "text-black"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 font-semibold">{teacher.rating}</span>
              </div>

              <p className="text-center text-sm text-gray-700 mb-6 italic">
                {teacher.shortBio}
              </p>

              <div className="grid grid-cols-2 gap-4 w-full mb-6">
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <Users className="h-5 w-5 text-gray-500 mb-1" />
                  <span className="font-bold text-lg text-gray-900">
                    {teacher.students.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">Students</span>
                </div>

                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <BookOpen className="h-5 w-5 text-gray-500 mb-1" />
                  <span className="font-bold text-lg text-gray-900">
                    {teacher.courses}
                  </span>
                  <span className="text-xs text-gray-500">Courses</span>
                </div>

                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <BarChart className="h-5 w-5 text-gray-500 mb-1" />
                  <span className="font-bold text-lg text-gray-900">
                    {teacher.completionRate}
                  </span>
                  <span className="text-xs text-gray-500">Completion</span>
                </div>

                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <Send className="h-5 w-5 text-gray-500 mb-1" />
                  <span className="font-bold text-lg text-gray-900">
                    {teacher.averageResponseTime}
                  </span>
                  <span className="text-xs text-gray-500">Response</span>
                </div>
              </div>

              <div className="w-full bg-gray-50 rounded-lg p-4 border border-gray-100 mb-6">
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 text-gray-600 mr-2" />
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Availability
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">{teacher.schedule}</p>
              </div>

              <div className="flex flex-wrap justify-center space-x-3 mt-2">
                {Object.entries(teacher.social).map(([platform, link], i) => (
                  <motion.a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {getSocialIcon(platform)}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right panel with detailed information */}
            <div className="col-span-2 p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      i
                    </motion.span>
                  </span>
                  About {teacher.name.split(" ")[0]}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {teacher.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-gray-600" />
                      Education
                    </h4>
                    <p className="text-gray-600">{teacher.education}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-600" />
                      Experience
                    </h4>
                    <p className="text-gray-600">{teacher.experience}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-black w-7 h-7 rounded-full flex items-center justify-center mr-3 text-white text-xs">
                    <motion.span
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ✦
                    </motion.span>
                  </span>
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {teacher.expertise.map((exp, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 border border-gray-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      {exp}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-3 text-gray-700" />
                  Accolades & Achievements
                </h3>
                <ul className="grid grid-cols-1 gap-2 mb-6">
                  {teacher.accolades.map((accolade, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <span className="text-black font-bold mr-2">•</span>
                      {accolade}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Video className="h-5 w-5 mr-3 text-gray-700" />
                  Featured Video Tutorials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredVideos.map((video) => (
                    <motion.div
                      key={video.id}
                      className="group relative rounded-lg overflow-hidden border border-gray-200 shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                    >
                      <div className="aspect-video bg-gray-100 relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-30 transition-all">
                          <motion.div
                            className="w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center text-black"
                            whileHover={{ scale: 1.1 }}
                          >
                            <PlayCircle className="h-8 w-8" />
                          </motion.div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-gray-900">
                          {video.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {video.duration}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-center md:justify-start">
                <motion.button
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Watch Video Tutorial
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
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

export default TeacherDetail;
