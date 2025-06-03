import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// Sample teacher data with more detailed information
const teachers = [
  {
    name: "Dr. Akash Pandey",
    subject: "Physics",
    // Using UI Avatars for monochrome avatar images
    image:
      "https://ui-avatars.com/api/?name=Akash+Pandey&background=000000&color=ffffff&size=256&bold=true&format=svg",
    description: "Expert in Quantum Mechanics & Relativity",
    shortBio: "Ph.D from IIT Delhi with research papers in quantum computing",
    expertise: [
      "Quantum Physics",
      "Astrophysics",
      "Particle Physics",
      "Advanced Mechanics",
    ],
    experience: "12+ years",
    education: "Ph.D in Physics, IIT Delhi",
    accolades: [
      "Best Physics Teacher Award 2022",
      "5 Research Papers Published",
    ],
    schedule: "Mon, Wed, Fri: 2:00 PM - 5:00 PM",
    rating: 4.9,
    students: 1250,
    courses: 8,
    completionRate: "94%",
    averageResponseTime: "2 hours",
    social: {
      twitter: "#",
      linkedin: "#",
      youtube: "#",
      website: "#",
    },
  },
  {
    name: "Prof. Vishal Kumar",
    subject: "Mathematics",
    image:
      "https://ui-avatars.com/api/?name=Vishal+Kumar&background=111111&color=ffffff&size=256&bold=true&format=svg",
    description: "Makes complex calculus intuitive and accessible",
    shortBio:
      "Former Principal Mathematician at National Mathematics Institute",
    expertise: ["Calculus", "Linear Algebra", "Number Theory", "Statistics"],
    experience: "15+ years",
    education: "M.Sc Mathematics, Stanford University",
    accolades: [
      "Author of 'Mathematics Simplified' textbook",
      "National Teaching Excellence Award",
    ],
    schedule: "Tue, Thu: 10:00 AM - 4:00 PM",
    rating: 4.8,
    students: 980,
    courses: 6,
    completionRate: "92%",
    averageResponseTime: "3 hours",
    social: {
      twitter: "#",
      linkedin: "#",
      youtube: "#",
      website: "#",
    },
  },
  {
    name: "Dr. Rahul Sharma",
    subject: "Computer Science",
    image:
      "https://ui-avatars.com/api/?name=Rahul+Sharma&background=222222&color=ffffff&size=256&bold=true&format=svg",
    description: "Expert in AI and machine learning technologies",
    shortBio: "Ex-Google engineer with expertise in building AI systems",
    expertise: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Structures",
      "Python & JavaScript",
    ],
    experience: "8+ years",
    education: "Ph.D in Computer Science, MIT",
    accolades: ["Top Contributor on GitHub", "AI Innovation Award 2021"],
    schedule: "Weekdays: 6:00 PM - 9:00 PM",
    rating: 4.7,
    students: 1430,
    courses: 10,
    completionRate: "88%",
    averageResponseTime: "1 hour",
    social: {
      twitter: "#",
      linkedin: "#",
      youtube: "#",
      github: "#",
    },
  },
  {
    name: "Dr. Priya Singh",
    subject: "Chemistry",
    image:
      "https://ui-avatars.com/api/?name=Priya+Singh&background=333333&color=ffffff&size=256&bold=true&format=svg",
    description: "Specialized in Organic Chemistry and Biochemistry",
    shortBio:
      "Research scientist with 5 patents in pharmaceutical applications",
    expertise: [
      "Organic Chemistry",
      "Biochemistry",
      "Medicinal Chemistry",
      "Chemical Analysis",
    ],
    experience: "10+ years",
    education: "Ph.D in Chemistry, Cambridge University",
    accolades: [
      "Young Scientist Award",
      "3 Patents in Pharmaceutical Applications",
    ],
    schedule: "Mon, Wed: 1:00 PM - 5:00 PM, Sat: 10:00 AM - 1:00 PM",
    rating: 4.9,
    students: 1120,
    courses: 7,
    completionRate: "95%",
    averageResponseTime: "4 hours",
    social: {
      twitter: "#",
      linkedin: "#",
      youtube: "#",
      researchGate: "#",
    },
  },
];

// This component has been removed as custom cursor effects are no longer needed

// Enhanced TeacherCard component with more visual effects and monochrome design
const TeacherCard = ({ teacher, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
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
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
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

        {/* Teacher Avatar Area with Monochrome Design */}
        <div className="relative overflow-hidden bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 p-8 flex flex-col items-center">
          {/* Avatar with circular frame and subtle animation */}
          <motion.div
            className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-full h-full object-cover"
            />

            {/* Animated ring effect on hover */}
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
          </motion.div>

          {/* Teacher name with premium style */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center relative">
            {teacher.name}
            <motion.span
              className="absolute -right-5 -top-1 text-xs bg-black text-white dark:bg-white dark:text-black px-1 rounded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              PRO
            </motion.span>
          </h3>

          {/* Subject with subtle pill design */}
          <div className="mt-1 mb-3">
            <span className="inline-block px-3 py-1 bg-black/10 dark:bg-white/10 text-black dark:text-white text-sm rounded-full">
              {teacher.subject}
            </span>
          </div>

          {/* Rating with stars */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
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
            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {teacher.rating}
            </span>
            {/* <span className="mx-1.5 text-gray-500">•</span> */}
            {/* <span className="text-sm text-gray-600 dark:text-gray-400">
              {teacher.students.toLocaleString()} students
            </span> */}
          </div>

          {/* Social links in monochrome */}
          <div className="flex justify-center space-x-3">
            {Object.entries(teacher.social).map(([platform, link], idx) => (
              <motion.a
                key={platform}
                href={link}
                className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.2 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
              >
                {platform === "twitter" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                )}
                {platform === "linkedin" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
                )}
                {platform === "youtube" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
                )}
                {platform === "github" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                )}
                {platform === "website" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
                )}
                {platform === "researchGate" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                    <path d="M18 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                    <path d="M6 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                  </svg>
                )}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Teacher info section - more compact */}
        <div className="p-4">
          {/* Short bio */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            <span className="font-medium text-black dark:text-white">
              Bio:{" "}
            </span>
            {teacher.shortBio}
          </p>

          {/* Expertise areas in a compact row */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {teacher.expertise.slice(0, 2).map((skill, idx) => (
                <motion.span
                  key={idx}
                  className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs rounded"
                  initial={{ opacity: 0, x: -5 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          x: 0,
                          transition: { delay: 0.2 + idx * 0.05 },
                        }
                      : {}
                  }
                >
                  {skill}
                </motion.span>
              ))}
              {teacher.expertise.length > 2 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{teacher.expertise.length - 2} more
                </span>
              )}
            </div>
          </div>

          {/* Key stats in a compact layout */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">
                Experience:
              </span>
              <span className="font-medium text-black dark:text-white">
                {teacher.experience}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">
                Students:
              </span>
              <span className="font-medium text-black dark:text-white">
                {teacher.students.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Courses:</span>
              <span className="font-medium text-black dark:text-white">
                {teacher.courses}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">
                Success Rate:
              </span>
              <span className="font-medium text-black dark:text-white">
                {teacher.completionRate}
              </span>
            </div>
          </div>

          {/* Primary action button */}
          <motion.button
            className="mt-3 w-full py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium text-sm"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center">
              <svg
                className="w-4 h-4 mr-1.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              View Profile
            </span>
          </motion.button>
        </div>

        {/* Animated border on hover - monochrome */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-black dark:bg-white"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

// Main Teachers component with enhanced animations
const Teachers = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();
  // No cursor variant state needed anymore

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Background particles with monochrome theme
  const BackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background geometric shapes */}
      {[...Array(15)].map((_, i) => {
        const isCircle = Math.random() > 0.6;
        return (
          <motion.div
            key={i}
            className={`absolute ${
              isCircle ? "rounded-full" : "rounded"
            } bg-black/[0.02] dark:bg-white/[0.02]`}
            style={{
              width: `${Math.random() * 200 + 20}px`,
              height: isCircle
                ? `${Math.random() * 200 + 20}px`
                : `${Math.random() * 100 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: !isCircle ? `rotate(${Math.random() * 45}deg)` : "",
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.2, 0.3, 0.2],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        );
      })}

      {/* Grid lines for depth */}
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMC4yIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')]
             dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC4yIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIgLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')]"
      />
    </div>
  );

  return (
    <section
      id="teachers"
      className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
      ref={ref}
    >
      {/* No custom cursor */}
      <BackgroundElements />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
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
          className="text-center mb-14"
        >
          <motion.span
            className="inline-block px-3 py-1 bg-black/10 dark:bg-white/10 text-black dark:text-white rounded-full text-xs font-semibold uppercase tracking-wide mb-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            EXPERT INSTRUCTORS
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Learn from the{" "}
            <span className="text-black dark:text-white underline underline-offset-4 decoration-2">
              Best Minds
            </span>{" "}
            in the Field
          </h2>

          <motion.p
            className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.2 },
              },
            }}
          >
            Our teachers are industry leaders with years of experience,
            dedicated to providing high-quality education and guiding students
            toward success.
          </motion.p>
        </motion.div>

        {/* Teacher cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, index) => (
            <TeacherCard key={index} teacher={teacher} index={index} />
          ))}
        </div>

        {/* Call to action buttons */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.5 },
            },
          }}
          className="mt-14 text-center"
        >
          <motion.button
            className="mx-2 px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-lg shadow-lg shadow-black/20 dark:shadow-white/20 font-medium cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              Become an Instructor
            </span>
          </motion.button>

          <motion.button
            className="mx-2 mt-4 md:mt-0 px-8 py-3.5 border-2 border-black dark:border-white text-black dark:text-white rounded-lg font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              Explore All Teachers
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Teachers;
