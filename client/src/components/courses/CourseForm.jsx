import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "./api";
import { useAuth } from "../auth/AuthContext";

// Form schema
const courseSchema = z.object({
  id: z.string().min(3, { message: "Course ID must be at least 3 characters" }),
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().optional(),
  longDescription: z.string().optional(),
  category: z.string().optional(),
  level: z.string().optional(),
  price: z.string().optional(),
  discountedPrice: z.string().optional(),
  duration: z.string().optional(),
  batchSize: z.string().optional(),
  validity: z.string().optional(),
  status: z.string().default("draft"),
  rating: z.number().optional(),
  studentsEnrolled: z.number().optional(),
  image: z.string().optional(),
  gradient: z.string().optional(),
  featured: z.boolean().default(false),
  instructor: z.object({
    name: z.string().min(2, { message: "Instructor name is required" }),
    image: z.string().optional(),
    bio: z.string().optional(),
    rating: z.number().optional(),
  }),
  curriculum: z.array(
    z.object({
      title: z.string(),
      lessons: z.array(z.string()),
    })
  ),
  features: z.array(z.string()),
});

// Icons
const Icons = {
  Book: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  ),
  Info: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  ),
  Teacher: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
    </svg>
  ),
  List: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  ),
  Star: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  Eye: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ),
  Back: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  ),
  Plus: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Check: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  Grip: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="9" cy="12" r="1" />
      <circle cx="9" cy="5" r="1" />
      <circle cx="9" cy="19" r="1" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="15" cy="5" r="1" />
      <circle cx="15" cy="19" r="1" />
    </svg>
  ),
  X: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Edit: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  Save: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  ),
};

// Form sections configuration
const formSections = [
  { id: "basic", label: "Basic Info", icon: <Icons.Book /> },
  { id: "details", label: "Details", icon: <Icons.Info /> },
  { id: "instructor", label: "Instructor", icon: <Icons.Teacher /> },
  { id: "curriculum", label: "Curriculum", icon: <Icons.List /> },
  { id: "features", label: "Features", icon: <Icons.Star /> },
];

// Gradient presets
const GRADIENT_PRESETS = [
  "linear-gradient(135deg, #4f56ff, #ff4980)",
  "linear-gradient(135deg, #0061ff, #60efff)",
  "linear-gradient(135deg, #ff930f, #fff95b)",
  "linear-gradient(135deg, #1fa2ff, #12d8fa, #a6ffcb)",
  "linear-gradient(135deg, #ff758c, #ff7eb3)",
  "linear-gradient(135deg, #6a11cb, #2575fc)",
];

// Custom UI components
const FormSection = ({ id, title, icon, isOpen, onToggle, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
  >
    <div
      className="bg-gradient-to-r from-primary-50 to-white p-4 flex justify-between items-center cursor-pointer"
      onClick={() => onToggle(id)}
    >
      <div className="flex items-center gap-3">
        <span className="bg-primary-100 text-primary-700 p-2 rounded-full">
          {icon}
        </span>
        <h2 className="text-xl font-semibold text-neutral-800">{title}</h2>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 0 : -90 }}
        transition={{ duration: 0.2 }}
        className="text-neutral-400"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </motion.div>
    </div>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-6 space-y-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FormProgress = ({ current, sections, onNavigate }) => {
  const progress = ((current + 1) / sections.length) * 100;
  return (
    <div className="hidden md:block">
      <div className="flex flex-col space-y-1 w-full mr-4">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            whileHover={{ x: 4 }}
            onClick={() => onNavigate(idx)}
            className={`flex items-center py-2 px-2 rounded-md cursor-pointer transition-all ${
              idx === current ? "bg-primary-50" : "hover:bg-neutral-50"
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                idx < current
                  ? "bg-secondary-600 text-white"
                  : idx === current
                  ? "bg-primary-600 text-white"
                  : "bg-neutral-200 text-neutral-600"
              }`}
            >
              {idx + 1}
            </div>
            <span
              className={`font-medium ${
                idx === current ? "text-primary-800" : "text-neutral-500"
              }`}
            >
              {section.label}
            </span>
          </motion.div>
        ))}
        <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
          <motion.div
            className="bg-primary-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
};

const CurriculumBuilder = ({ value, onChange }) => {
  const addModule = () => {
    onChange([...value, { title: "", lessons: [""] }]);
  };

  const removeModule = (moduleIndex) => {
    onChange(value.filter((_, i) => i !== moduleIndex));
  };

  const addLesson = (moduleIndex) => {
    const newModules = [...value];
    newModules[moduleIndex].lessons.push("");
    onChange(newModules);
  };

  const removeLesson = (moduleIndex, lessonIndex) => {
    const newModules = [...value];
    newModules[moduleIndex].lessons = newModules[moduleIndex].lessons.filter(
      (_, i) => i !== lessonIndex
    );
    onChange(newModules);
  };

  const updateModule = (moduleIndex, field, newValue) => {
    const newModules = [...value];
    newModules[moduleIndex][field] = newValue;
    onChange(newModules);
  };

  const updateLesson = (moduleIndex, lessonIndex, newValue) => {
    const newModules = [...value];
    newModules[moduleIndex].lessons[lessonIndex] = newValue;
    onChange(newModules);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-neutral-600">
          Add modules and lessons
        </span>
        <button
          type="button"
          onClick={addModule}
          className="px-3 py-1 bg-primary-600 text-white rounded-md flex items-center gap-1 text-sm"
        >
          <Icons.Plus /> Add Module
        </button>
      </div>
      <AnimatePresence>
        {value.map((module, moduleIndex) => (
          <motion.div
            key={moduleIndex}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border border-neutral-200 rounded-lg overflow-hidden"
          >
            <div className="bg-neutral-50 p-3 flex items-center">
              <span className="mr-3 text-neutral-400 cursor-move">
                <Icons.Grip />
              </span>
              <input
                type="text"
                className="flex-grow border-0 bg-transparent focus:ring-0 font-medium"
                placeholder="Module Title"
                value={module.title}
                onChange={(e) =>
                  updateModule(moduleIndex, "title", e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => addLesson(moduleIndex)}
                className="p-1 text-neutral-500 hover:text-primary-600"
              >
                <Icons.Plus />
              </button>
              <button
                type="button"
                onClick={() => removeModule(moduleIndex)}
                className="p-1 text-neutral-400 hover:text-red-500 ml-1"
              >
                <Icons.X />
              </button>
            </div>
            <div className="divide-y divide-neutral-100">
              <AnimatePresence>
                {module.lessons.map((lesson, lessonIndex) => (
                  <motion.div
                    key={lessonIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center p-3 pl-10 bg-white hover:bg-neutral-50"
                  >
                    <span className="mr-3 text-neutral-400 cursor-move">
                      <Icons.Grip />
                    </span>
                    <input
                      type="text"
                      className="flex-grow border-0 bg-transparent focus:ring-0"
                      placeholder="Lesson Title"
                      value={lesson}
                      onChange={(e) =>
                        updateLesson(moduleIndex, lessonIndex, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => removeLesson(moduleIndex, lessonIndex)}
                      className="p-1 text-neutral-400 hover:text-red-500"
                    >
                      <Icons.X />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const FeaturesList = ({ value, onChange }) => {
  const addFeature = () => {
    onChange([...value, ""]);
  };

  const removeFeature = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateFeature = (index, newValue) => {
    const newFeatures = [...value];
    newFeatures[index] = newValue;
    onChange(newFeatures);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-neutral-600">
        List key features and benefits of your course
      </p>
      <AnimatePresence>
        {value.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <div className="mr-2 text-neutral-400">
              <Icons.Grip />
            </div>
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icons.Check />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-10 py-2 border border-neutral-300 rounded-lg"
                placeholder="Enter course feature or benefit"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="ml-2 p-1 text-neutral-400 hover:text-red-500"
            >
              <Icons.X />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      <button
        type="button"
        onClick={addFeature}
        className="px-3 py-1 border border-neutral-300 rounded-md flex items-center gap-1 text-sm hover:bg-neutral-50"
      >
        <Icons.Plus /> Add Feature
      </button>
    </div>
  );
};

const GradientSelector = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <input
          type="text"
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
          placeholder="e.g. linear-gradient(135deg, #4f56ff, #ff4980)"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-xs text-neutral-500 mt-1">
          Use CSS gradient syntax or select from presets
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {GRADIENT_PRESETS.map((preset, index) => (
          <motion.button
            key={index}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(preset)}
            className={`h-10 w-full rounded-md cursor-pointer ${
              value === preset ? "ring-2 ring-primary-500" : ""
            }`}
            style={{ background: preset }}
          />
        ))}
      </div>
    </div>
  );
};

const CoursePreview = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden"
  >
    <div
      className="h-56 relative"
      style={{ background: data.gradient || GRADIENT_PRESETS[0] }}
    >
      {data.featured && (
        <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Featured
        </span>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
        <p className="text-sm uppercase tracking-wider mb-2">
          {data.category || "Category"} • {data.level || "Level"}
        </p>
        <h1 className="text-3xl font-bold mb-2">
          {data.title || "Course Title"}
        </h1>
        <p className="text-lg opacity-90">
          {data.description || "Course description"}
        </p>
      </div>
    </div>
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Course Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-secondary-500 mt-0.5">
                <Icons.Check />
              </span>
              <span>{feature || "Feature item"}</span>
            </li>
          ))}
        </ul>
      </div>
      <hr className="my-6" />
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Curriculum</h2>
        <div className="space-y-3">
          {data.curriculum.map((module, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <div className="bg-neutral-50 p-4 font-medium flex items-center">
                <span className="mr-2 text-primary-500">
                  <Icons.List />
                </span>
                {module.title || `Module ${index + 1}`}
              </div>
              <ul className="divide-y">
                {module.lessons.map((lesson, lessonIndex) => (
                  <li key={lessonIndex} className="p-3 pl-10 flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 text-xs">
                      {lessonIndex + 1}
                    </div>
                    {lesson || `Lesson ${lessonIndex + 1}`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-6" />
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Instructor</h2>
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center">
            <Icons.Teacher />
          </div>
          <div>
            <h3 className="font-medium">
              {data.instructor.name || "Instructor Name"}
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              {data.instructor.bio || "Instructor bio"}
            </p>
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <div className="bg-neutral-50 p-6 rounded-lg flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="text-sm text-neutral-600 mb-1">Price</p>
          <div className="flex items-center space-x-2">
            {data.discountedPrice ? (
              <>
                <span className="line-through text-neutral-400 text-lg">
                  ${data.price || "0"}
                </span>
                <span className="font-bold text-2xl text-green-600">
                  ${data.discountedPrice || "0"}
                </span>
              </>
            ) : (
              <span className="font-bold text-2xl">
                ${data.price || "Free"}
              </span>
            )}
          </div>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-primary-600 text-white rounded-md">
          Enroll Now
        </button>
      </div>
    </div>
  </motion.div>
);

const CourseForm = ({ mode = "create" }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [openSections, setOpenSections] = useState({ basic: true });
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [activeTab, setActiveTab] = useState("edit");
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });

  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      longDescription: "",
      category: "",
      level: "",
      price: "",
      discountedPrice: "",
      duration: "",
      batchSize: "",
      validity: "",
      status: "draft",
      rating: 0,
      studentsEnrolled: 0,
      image: "",
      gradient: "linear-gradient(135deg, #4f56ff, #ff4980)",
      featured: false,
      instructor: { name: "", image: "", bio: "", rating: 0 },
      curriculum: [{ title: "", lessons: [""] }],
      features: [""],
    },
  });

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (mode === "edit" && courseId) {
      setSubmitting(true);
      api
        .get(`/api/courses/${courseId}`)
        .then((res) => {
          form.reset(res.data);
          setSubmitting(false);
        })
        .catch(() => {
          setError("Failed to load course data");
          setSubmitting(false);
        });
    }
  }, [mode, courseId, form]);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    setError(null);
    try {
      if (mode === "create") {
        await api.post("/api/courses", data);
      } else {
        await api.put(`/api/courses/${courseId}`, data);
      }
      navigate("/courses");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save course");
    } finally {
      setSubmitting(false);
    }
  };

  const saveDraft = async () => {
    setSaving(true);
    try {
      const data = form.getValues();
      data.status = "draft";
      if (mode === "create") {
        await api.post("/api/courses", data);
      } else {
        await api.put(`/api/courses/${courseId}`, data);
      }
      setNotification({ show: true, message: "Draft saved successfully!" });
    } catch (err) {
      setError("Failed to save Changes");
    } finally {
      setSaving(false);
    }
  };

  const navigateToSection = (index) => {
    setOpenSections({
      ...openSections,
      [formSections[index].id]: true,
    });
    setCurrentSection(index);
  };

  const goToNextSection = () => {
    if (currentSection < formSections.length - 1) {
      navigateToSection(currentSection + 1);
    }
  };

  const goToPrevSection = () => {
    if (currentSection > 0) {
      navigateToSection(currentSection - 1);
    }
  };

  if (!user || user.role !== "worker") {
    return (
      <div className="container mx-auto px-4 py-8">
        Access denied. Workers only.
      </div>
    );
  }

  if (submitting && mode === "edit" && !form.getValues().id) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  const renderEditForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormSection
        id="basic"
        title="Basic Course Information"
        icon={<Icons.Book />}
        isOpen={openSections.basic || false}
        onToggle={toggleSection}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Course ID</label>
            <input
              {...register("id")}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              placeholder="Enter unique course ID"
              disabled={mode === "edit"}
            />
            {errors.id && (
              <p className="text-red-500 text-xs">{errors.id.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Course Title</label>
            <input
              {...register("title")}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              placeholder="Enter course title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md"
            placeholder="Write a compelling summary of your course"
            rows={3}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Long Description</label>
          <textarea
            {...register("longDescription")}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md"
            placeholder="Detailed course description"
            rows={3}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Category</label>
            <select
              {...register("category")}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
            >
              <option value="">Select category</option>
              <option value="development">Development</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
              <option value="design">Design</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Level</label>
            <select
              {...register("level")}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
            >
              <option value="">Select level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="all-levels.annotation">All Levels</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Status</label>
            <select
              {...register("status")}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Course Gradient</label>
          <GradientSelector
            value={watch("gradient")}
            onChange={(value) => setValue("gradient", value)}
          />
        </div>
        <div className="flex items-start space-x-2 border p-3 rounded-md">
          <input
            type="checkbox"
            id="featured"
            {...register("featured")}
            className="mt-1"
          />
          <div>
            <label htmlFor="featured" className="font-medium">
              Feature this course
            </label>
            <p className="text-sm text-neutral-500">
              Featured courses will be highlighted on the homepage
            </p>
          </div>
        </div>
      </FormSection>

      <FormSection
        id="details"
        title="Course Details"
        icon={<Icons.Info />}
        isOpen={openSections.details || false}
        onToggle={toggleSection}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Price ($)</label>
            <input
              {...register("price")}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              placeholder="e.g. 99.99"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Discounted Price ($)
            </label>
            <input
              {...register("discountedPrice")}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              placeholder="e.g. 79.99"
            />
            <p className="text-xs text-neutral-500">
              Optional promotional price
            </p>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Duration</label>
            <input
              {...register("duration")}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              placeholder="e.g. 10 weeks"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Batch Size</label>
            <input
              {...register("batchSize")}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              placeholder="e.g. 50"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Validity</label>
            <input
              {...register("validity")}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              placeholder="e.g. 6 months"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Rating</label>
            <input
              type="number"
              {...register("rating", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              placeholder="e.g. 4.5"
              step="0.1"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Students Enrolled
            </label>
            <input
              type="number"
              {...register("studentsEnrolled", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              placeholder="e.g. 100"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Image URL</label>
            <input
              {...register("image")}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              placeholder="Enter image URL"
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        id="instructor"
        title="Instructor Information"
        icon={<Icons.Teacher />}
        isOpen={openSections.instructor || false}
        onToggle={toggleSection}
      >
        <div className="space-y-1">
          <label className="block text-sm font-medium">Instructor Name</label>
          <input
            {...register("instructor.name")}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md"
            placeholder="Enter instructor name"
          />
          {errors.instructor?.name && (
            <p className="text-red-500 text-xs">
              {errors.instructor.name.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">
            Instructor Image URL
          </label>
          <input
            {...register("instructor.image")}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md"
            placeholder="Enter instructor image URL"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Instructor Bio</label>
          <textarea
            {...register("instructor.bio")}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md"
            placeholder="Professional background and expertise"
            rows={3}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Instructor Rating</label>
          <input
            type="number"
            {...register("instructor.rating", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md"
            placeholder="e.g. 4.5"
            step="0.1"
          />
        </div>
      </FormSection>

      <FormSection
        id="curriculum"
        title="Course Curriculum"
        icon={<Icons.List />}
        isOpen={openSections.curriculum || false}
        onToggle={toggleSection}
      >
        <CurriculumBuilder
          value={watch("curriculum")}
          onChange={(value) => setValue("curriculum", value)}
        />
      </FormSection>

      <FormSection
        id="features"
        title="Course Features"
        icon={<Icons.Star />}
        isOpen={openSections.features || false}
        onToggle={toggleSection}
      >
        <FeaturesList
          value={watch("features")}
          onChange={(value) => setValue("features", value)}
        />
      </FormSection>

      <div className="flex justify-between pt-4 border-t">
        <button
          type="button"
          onClick={() => navigate("/courses")}
          className="px-4 py-2 border border-neutral-300 rounded-md flex items-center gap-2"
        >
          <Icons.Back /> Cancel
        </button>
        <div className="flex gap-3">
          {currentSection > 0 && (
            <button
              type="button"
              onClick={goToPrevSection}
              className="px-4 py-2 border border-neutral-300 rounded-md"
            >
              Previous
            </button>
          )}
          {currentSection < formSections.length - 1 ? (
            <button
              type="button"
              onClick={goToNextSection}
              className="px-4 py-2 bg-primary-600 text-white rounded-md"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-primary-600 text-white rounded-md flex items-center gap-2"
            >
              {submitting ? (
                "Submitting..."
              ) : (
                <>
                  <Icons.Check />{" "}
                  {mode === "create" ? "Create Course" : "Update Course"}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen pb-20 bg-neutral-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-8 px-4 md:px-8 mb-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <button
              onClick={() => navigate("/courses")}
              className="mr-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20"
            >
              <Icons.Back />
            </button>
            <div>
              <h1 className="text-3xl font-bold">
                {mode === "create" ? "Create New Course" : "Edit Course"}
              </h1>
              <p className="text-primary-100">
                Design an engaging learning experience
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        {/* Main Content Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar for desktop */}
          <div className="hidden md:block md:col-span-1">
            <motion.div
              className="sticky top-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <h3 className="font-semibold text-neutral-700 mb-3">
                  Course Progress
                </h3>
                <FormProgress
                  current={currentSection}
                  sections={formSections}
                  onNavigate={navigateToSection}
                />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={saveDraft}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white shadow-sm border border-neutral-200 rounded-md text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  <Icons.Save /> {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() =>
                    setActiveTab(activeTab === "edit" ? "preview" : "edit")
                  }
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white shadow-sm border border-neutral-200 rounded-md text-secondary-600 hover:bg-secondary-50 transition-colors"
                >
                  <Icons.Eye /> {activeTab === "edit" ? "Preview" : "Edit"}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Main content area */}
          <div className="md:col-span-3">
            {/* Mobile Progress Indicator */}
            <motion.div
              className="md:hidden sticky top-0 z-50 bg-white/90 py-4 px-4 rounded-lg shadow-md backdrop-blur-sm mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-neutral-700">
                  Step {currentSection + 1} of {formSections.length}:{" "}
                  {formSections[currentSection].label}
                </h3>
                <div className="bg-primary-600 text-white flex items-center justify-center w-8 h-8 rounded-full">
                  {currentSection + 1}
                </div>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <motion.div
                  className="bg-primary-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      ((currentSection + 1) / formSections.length) * 100
                    }%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={saveDraft}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-neutral-200 rounded-md text-primary-600 bg-white"
                >
                  <Icons.Save /> {saving ? "..." : "Save Changes"}
                </button>
                <button
                  onClick={() =>
                    setActiveTab(activeTab === "edit" ? "preview" : "edit")
                  }
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-neutral-200 rounded-md text-secondary-600 bg-white"
                >
                  <Icons.Eye /> {activeTab === "edit" ? "Preview" : "Edit"}
                </button>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="mb-4">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab("edit")}
                  className={`px-4 py-2 flex items-center gap-2 ${
                    activeTab === "edit"
                      ? "border-b-2 border-primary-600 text-primary-600"
                      : "text-neutral-500"
                  }`}
                >
                  <Icons.Edit /> Edit Course
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-4 py-2 flex items-center gap-2 ${
                    activeTab === "preview"
                      ? "border-b-2 border-primary-600 text-primary-600"
                      : "text-neutral-500"
                  }`}
                >
                  <Icons.Eye /> Preview
                </button>
              </div>
            </div>

            {/* Error alert */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {/* Content based on active tab */}
            {activeTab === "edit" ? (
              renderEditForm()
            ) : (
              <CoursePreview data={form.getValues()} />
            )}
          </div>
        </div>
      </div>
      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            key="notification"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            role="alert"
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg flex items-center max-w-sm z-50"
          >
            <span className="mr-2">
              <Icons.Check width="20" height="20" />
            </span>
            <span className="flex-grow">{notification.message}</span>
            <button
              onClick={() => setNotification({ show: false, message: "" })}
              className="ml-4 text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close notification"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseForm;
