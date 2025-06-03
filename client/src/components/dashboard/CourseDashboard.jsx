import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../courses/api";
import {
  Calendar,
  Clock,
  User,
  Video,
  History,
  Play,
  Download,
  StickyNote,
  Plus,
  ClipboardCheck,
  HelpCircle,
  Menu,
  X,
  Users,
  Star,
  Edit,
  Trash,
} from "lucide-react";
import Header from "../Frontpage/Header";
import Footer from "../Frontpage/Footer";

const CourseDashboard = ({ setCursorVariant }) => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("classes");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (err) {
        setError("Failed to load course data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();

    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [courseId]);

  const menuItems = [
    { id: "classes", label: "Upcoming Classes", icon: Calendar },
    { id: "pastSessions", label: "Past Sessions", icon: History },
    { id: "notes", label: "Study Notes", icon: StickyNote },
    { id: "quizzes", label: "Quizzes & Assessments", icon: ClipboardCheck },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const slideVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (index) => ({
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut", delay: index * 0.1 },
    }),
  };

  const getCounts = (section) => {
    if (!course || !course.dashboard) return 0;
    switch (section) {
      case "classes":
        return course.dashboard.classes.filter((c) => c.status !== "completed")
          .length;
      case "pastSessions":
        return course.dashboard.pastSessions.length;
      case "notes":
        return course.dashboard.notes.length;
      case "quizzes":
        return course.dashboard.quizzes.length;
      default:
        return 0;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await api.post(
        `/api/courses/${courseId}/dashboard/${activeSection}`,
        newItem
      );
      const response = await api.get(`/api/courses/${courseId}`);
      setCourse(response.data);
      setShowAddModal(false);
      setNewItem({});
    } catch (err) {
      console.error(`Failed to add ${activeSection}:`, err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateItem = async (itemId) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await api.put(
        `/api/courses/${courseId}/dashboard/${activeSection}/${itemId}`,
        editingItem
      );
      const response = await api.get(`/api/courses/${courseId}`);
      setCourse(response.data);
      setEditingItem(null);
    } catch (err) {
      console.error(`Failed to update ${activeSection}:`, err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${activeSection.slice(0, -1)}?`
      )
    ) {
      try {
        await api.delete(
          `/api/courses/${courseId}/dashboard/${activeSection}/${itemId}`
        );
        const response = await api.get(`/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (err) {
        console.error(`Failed to delete ${activeSection}:`, err);
      }
    }
  };

  const fieldConfigs = {
    classes: [
      { name: "id", type: "number", label: "ID", placeholder: "e.g., 1" },
      {
        name: "title",
        type: "text",
        label: "Title",
        placeholder: "e.g., Introduction to React",
      },
      {
        name: "instructor",
        type: "text",
        label: "Instructor",
        placeholder: "e.g., John Doe",
      },
      { name: "date", type: "date", label: "Date" },
      { name: "time", type: "time", label: "Time" },
      {
        name: "duration",
        type: "text",
        label: "Duration",
        placeholder: "e.g., 1 hour",
      },
      {
        name: "status",
        type: "select",
        label: "Status",
        options: ["scheduled", "live", "completed"],
      },
      {
        name: "url",
        type: "text",
        label: "Class URL",
        placeholder: "e.g., https://zoom.us/j/1234567890",
      },
    ],
    pastSessions: [
      { name: "id", type: "number", label: "ID", placeholder: "e.g., 1" },
      {
        name: "title",
        type: "text",
        label: "Title",
        placeholder: "e.g., React Basics",
      },
      { name: "date", type: "date", label: "Date" },
      {
        name: "duration",
        type: "text",
        label: "Duration",
        placeholder: "e.g., 1 hour",
      },
      {
        name: "views",
        type: "number",
        label: "Views",
        placeholder: "e.g., 50",
      },
      {
        name: "recordingUrl",
        type: "text",
        label: "Recording URL",
        placeholder: "e.g., https://example.com/recording",
      },
    ],
    notes: [
      { name: "id", type: "number", label: "ID", placeholder: "e.g., 1" },
      {
        name: "title",
        type: "text",
        label: "Title",
        placeholder: "e.g., React Hooks",
      },
      {
        name: "content",
        type: "textarea",
        label: "Content",
        placeholder: "Enter detailed notes here",
      },
      {
        name: "subject",
        type: "text",
        label: "Subject",
        placeholder: "e.g., Programming",
      },
      {
        name: "preview",
        type: "text",
        label: "Preview",
        placeholder: "e.g., Brief overview of hooks",
      },
      { name: "lastModified", type: "date", label: "Last Modified" },
      {
        name: "fileUrl",
        type: "text",
        label: "File URL",
        placeholder: "e.g., https://example.com/notes.pdf",
      },
    ],
    quizzes: [
      { name: "id", type: "number", label: "ID", placeholder: "e.g., 1" },
      {
        name: "title",
        type: "text",
        label: "Title",
        placeholder: "e.g., React Quiz",
      },
      {
        name: "description",
        type: "textarea",
        label: "Description",
        placeholder: "e.g., Test your React knowledge",
      },
      {
        name: "questions",
        type: "number",
        label: "Number of Questions",
        placeholder: "e.g., 10",
      },
      {
        name: "duration",
        type: "text",
        label: "Duration",
        placeholder: "e.g., 30 minutes",
      },
      {
        name: "points",
        type: "number",
        label: "Points",
        placeholder: "e.g., 100",
      },
      {
        name: "status",
        type: "select",
        label: "Status",
        options: ["available", "in_progress", "completed"],
      },
      {
        name: "progress",
        type: "number",
        label: "Progress",
        placeholder: "e.g., 5",
      },
      {
        name: "score",
        type: "number",
        label: "Score",
        placeholder: "e.g., 85",
      },
      { name: "dueDate", type: "date", label: "Due Date" },
      { name: "completedDate", type: "date", label: "Completed Date" },
      {
        name: "url",
        type: "text",
        label: "Quiz URL",
        placeholder: "e.g., /quizzes/123",
      },
    ],
  };

  const renderModal = () => {
    const data = editingItem || newItem;
    const configs = fieldConfigs[activeSection] || [];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-md w-full overflow-y-auto max-h-[80vh]">
          <h2 className="text-xl font-bold mb-4">
            {editingItem
              ? `Edit ${activeSection.slice(0, -1)}`
              : `Add ${activeSection.slice(0, -1)}`}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editingItem ? handleUpdateItem(editingItem.id) : handleAddItem(e);
            }}
          >
            {configs.map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    value={data[field.name] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      editingItem
                        ? setEditingItem({
                            ...editingItem,
                            [field.name]: value,
                          })
                        : setNewItem({ ...newItem, [field.name]: value });
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={data[field.name] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      editingItem
                        ? setEditingItem({
                            ...editingItem,
                            [field.name]: value,
                          })
                        : setNewItem({ ...newItem, [field.name]: value });
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    rows="4"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={data[field.name] || ""}
                    onChange={(e) => {
                      const value =
                        field.type === "number"
                          ? Number(e.target.value)
                          : e.target.value;
                      editingItem
                        ? setEditingItem({
                            ...editingItem,
                            [field.name]: value,
                          })
                        : setNewItem({ ...newItem, [field.name]: value });
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                }}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-md text-white ${
                  isSubmitting ? "bg-gray-500" : "bg-black"
                }`}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderUpcomingClasses = () => {
    if (loading)
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      );
    if (!course || !course.dashboard)
      return <div>No dashboard data available.</div>;

    const upcomingClasses = course.dashboard.classes.filter(
      (c) => c.status !== "completed"
    );

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-black lg:hidden">
            Upcoming Classes
          </h2>
          <div className="flex items-center space-x-4">
            <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
              {upcomingClasses.length} Classes
            </span>
            {user.role === "worker" && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center px-4 py-2 bg-black text-white rounded-md"
              >
                <Plus className="mr-2 h-5 w-5" /> Add Class
              </button>
            )}
          </div>
        </div>
        <div className="space-y-6">
          {upcomingClasses.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              custom={index}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-black text-xl">
                  {classItem.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      classItem.status === "live"
                        ? "bg-black text-white animate-pulse"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {classItem.status?.toUpperCase() || "N/A"}
                  </span>
                  {user.role === "worker" && (
                    <>
                      <button
                        onClick={() => setEditingItem(classItem)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(classItem.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-6 text-gray-600 mb-4">
                <span className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  {classItem.instructor || "N/A"}
                </span>
                <span className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  {classItem.duration || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-black font-semibold text-lg">
                    {classItem.date || "N/A"}
                  </p>
                  <p className="text-gray-600">{classItem.time || "N/A"}</p>
                </div>
                {classItem.status === "live" && classItem.url ? (
                  <motion.button
                    className="bg-black text-white flex items-center px-6 py-3 rounded-lg font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(classItem.url, "_blank")}
                  >
                    <Video className="mr-2 h-5 w-5" />
                    Join Class
                  </motion.button>
                ) : (
                  <span className="text-gray-500">Class not yet live</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderPastSessions = () => {
    if (loading)
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      );
    if (!course || !course.dashboard)
      return <div>No dashboard data available.</div>;

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-black lg:hidden">
            Past Sessions
          </h2>
          <div className="flex items-center space-x-4">
            <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
              {course.dashboard.pastSessions.length} Sessions
            </span>
            {user.role === "worker" && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center px-4 py-2 bg-black text-white rounded-md"
              >
                <Plus className="mr-2 h-5 w-5" /> Add Session
              </button>
            )}
          </div>
        </div>
        <div className="space-y-6">
          {course.dashboard.pastSessions.map((session, index) => (
            <motion.div
              key={session.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              custom={index}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-black text-xl">
                  {session.title || "N/A"}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                    RECORDED
                  </span>
                  {user.role === "worker" && (
                    <>
                      <button
                        onClick={() => setEditingItem(session)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(session.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-6 text-gray-600 mb-4">
                <span className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  {session.date || "N/A"}
                </span>
                <span className="flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  {session.duration || "N/A"}
                </span>
                <span className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  {session.views || 0} views
                </span>
              </div>
              <div className="flex space-x-4">
                <motion.button
                  className="bg-black text-white px-6 py-3 rounded-lg font-medium flex-1 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    session.recordingUrl &&
                    window.open(session.recordingUrl, "_blank")
                  }
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Recording
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderStudyNotes = () => {
    if (loading)
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      );
    if (!course || !course.dashboard)
      return <div>No dashboard data available.</div>;

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-black lg:hidden">
            Study Notes
          </h2>
          <div className="flex items-center space-x-4">
            <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
              {course.dashboard.notes.length} Notes
            </span>
            {user.role === "worker" && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center px-4 py-2 bg-black text-white rounded-md"
              >
                <Plus className="mr-2 h-5 w-5" /> Add Note
              </button>
            )}
          </div>
        </div>
        <div className="space-y-6">
          {course.dashboard.notes.map((note, index) => (
            <motion.div
              key={note.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              custom={index}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4 }}
              onClick={() =>
                note.fileUrl && window.open(note.fileUrl, "_blank")
              }
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-black text-xl">
                  {note.title || "N/A"}
                </h3>
                <div
                  className="flex items-center space-x-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                    {note.subject || "N/A"}
                  </span>
                  {user.role === "worker" && (
                    <>
                      <button
                        onClick={() => setEditingItem(note)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(note.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                {note.preview || "No preview available"}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">
                  Last edited: {note.lastModified || "N/A"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderQuizzes = () => {
    if (loading)
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      );
    if (!course || !course.dashboard)
      return <div>No dashboard data available.</div>;

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-black lg:hidden">
            Quizzes & Assessments
          </h2>
          <div className="flex items-center space-x-4">
            <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
              {course.dashboard.quizzes.length} Available
            </span>
            {user.role === "worker" && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center px-4 py-2 bg-black text-white rounded-md"
              >
                <Plus className="mr-2 h-5 w-5" /> Add Quiz
              </button>
            )}
          </div>
        </div>
        <div className="space-y-6">
          {course.dashboard.quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              custom={index}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-black text-xl mb-2">
                    {quiz.title || "N/A"}
                  </h3>
                  <p className="text-gray-600">
                    {quiz.description || "No description"}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(
                      quiz.status
                    )}`}
                  >
                    {quiz.status?.toUpperCase().replace("_", " ") || "N/A"}
                  </span>
                  {user.role === "worker" && (
                    <>
                      <button
                        onClick={() => setEditingItem(quiz)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(quiz.id)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-6 text-gray-600 mb-4">
                <span className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  {quiz.questions || 0} questions
                </span>
                <span className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  {quiz.duration || "N/A"}
                </span>
                <span className="flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  {quiz.points || 0} points
                </span>
              </div>
              {quiz.status === "in_progress" && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>
                      Progress: {quiz.progress || 0}/{quiz.questions || 0}{" "}
                      questions
                    </span>
                    <span>
                      {quiz.questions
                        ? Math.round(
                            ((quiz.progress || 0) / quiz.questions) * 100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-black h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          quiz.questions
                            ? ((quiz.progress || 0) / quiz.questions) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              )}
              {quiz.status === "completed" && (
                <div className="mb-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-green-700 font-semibold">
                        Score: {quiz.score || 0}/{quiz.points || 0} (
                        {quiz.points
                          ? Math.round(((quiz.score || 0) / quiz.points) * 100)
                          : 0}
                        %)
                      </span>
                      <p className="text-green-600 text-sm">
                        Completed on {quiz.completedDate || "N/A"}
                      </p>
                    </div>
                    <div className="text-green-700 text-2xl font-bold">
                      {quiz.points
                        ? Math.round(((quiz.score || 0) / quiz.points) * 100) >=
                          90
                          ? "A"
                          : Math.round(
                              ((quiz.score || 0) / quiz.points) * 100
                            ) >= 80
                          ? "B"
                          : Math.round(
                              ((quiz.score || 0) / quiz.points) * 100
                            ) >= 70
                          ? "C"
                          : "D"
                        : "N/A"}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center">
                <div>
                  {quiz.dueDate && (
                    <p className="text-sm text-gray-600">
                      Due:{" "}
                      <span className="text-black font-medium">
                        {quiz.dueDate}
                      </span>
                    </p>
                  )}
                </div>
                <div className="flex space-x-4">
                  {quiz.status === "available" && (
                    <motion.button
                      className="bg-black text-white px-6 py-3 rounded-lg font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        quiz.url && window.open(quiz.url, "_blank")
                      }
                    >
                      Start Quiz
                    </motion.button>
                  )}
                  {quiz.status === "in_progress" && (
                    <motion.button
                      className="bg-black text-white px-6 py-3 rounded-lg font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        quiz.url && window.open(quiz.url, "_blank")
                      }
                    >
                      Continue Quiz
                    </motion.button>
                  )}
                  {quiz.status === "completed" && (
                    <>
                      <motion.button
                        className="border border-black text-black hover:bg-black hover:text-white px-6 py-3 rounded-lg transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          quiz.url && navigate(quiz.url + "/review")
                        }
                      >
                        Review Answers
                      </motion.button>
                      <motion.button
                        className="border border-black text-black hover:bg-black hover:text-white px-3 py-3 rounded-lg transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Download className="h-5 w-5" />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case "classes":
        return renderUpcomingClasses();
      case "pastSessions":
        return renderPastSessions();
      case "notes":
        return renderStudyNotes();
      case "quizzes":
        return renderQuizzes();
      default:
        return renderUpcomingClasses();
    }
  };

  const sectionTitles = {
    classes: "Upcoming Classes",
    pastSessions: "Past Sessions",
    notes: "Study Notes",
    quizzes: "Quizzes & Assessments",
  };

  if (error)
    return (
      <>
        <Header setCursorVariant={setCursorVariant} />
        <div className="min-h-screen bg-gray-50 mt-22">
          <main className="p-6 lg:p-8">{error}</main>
        </div>
        <Footer setCursorVariant={setCursorVariant} />
      </>
    );

  return (
    <>
      <Header setCursorVariant={setCursorVariant} />
      <div className="min-h-screen bg-gray-50 mt-22">
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-black">
              {course ? course.title : "Course Dashboard"}
            </h1>
            <div className="w-10" />
          </div>
        </div>
        <div className="flex">
          <aside className="hidden lg:block w-80 bg-white border-r border-gray-200 h-screen flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {user.name?.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="font-semibold text-black text-lg">
                    {user.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {user.role === "student" ? "Student" : "Worker"}
                  </p>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-6">
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  const count = getCounts(item.id);
                  return (
                    <button
                      key={item.id}
                      className={`w-full flex items-center justify-start h-12 px-4 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-black text-white"
                          : "text-gray-600 hover:text-black hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                      <span
                        className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                          isActive
                            ? "bg-white text-black"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <button className="w-full flex items-center justify-start px-4 py-3 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                  <HelpCircle className="mr-3 h-4 w-4" />
                  <span className="text-sm">Help & Support</span>
                </button>
              </div>
            </nav>
          </aside>
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
                <motion.div
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed left-0 top-0 h-full w-80 bg-white z-50 lg:hidden shadow-xl"
                >
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-black">Menu</h2>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <nav className="p-6">
                    <div className="space-y-2">
                      {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        const count = getCounts(item.id);
                        return (
                          <button
                            key={item.id}
                            className={`w-full flex items-center justify-start h-12 px-4 rounded-lg font-medium transition-all duration-200 ${
                              isActive
                                ? "bg-black text-white"
                                : "text-gray-600 hover:text-black hover:bg-gray-100"
                            }`}
                            onClick={() => {
                              setActiveSection(item.id);
                              setSidebarOpen(false);
                            }}
                          >
                            <Icon className="mr-3 h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                            <span
                              className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                                isActive
                                  ? "bg-white text-black"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <button className="w-full flex items-center justify-start px-4 py-3 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                        <HelpCircle className="mr-3 h-4 w-4" />
                        <span className="text-sm">Help & Support</span>
                      </button>
                    </div>
                  </nav>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <div className="flex-1 min-h-screen">
            <header className="hidden lg:block bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-black">
                    {course
                      ? `${course.title} - ${sectionTitles[activeSection]}`
                      : "Dashboard"}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </header>
            <main className="p-6 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {renderSection()}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
        <AnimatePresence>
          {(showAddModal || editingItem) && renderModal()}
        </AnimatePresence>
      </div>
      <Footer setCursorVariant={setCursorVariant} />
    </>
  );
};

export default CourseDashboard;
