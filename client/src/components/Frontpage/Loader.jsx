import React from "react";
import { motion } from "framer-motion";
import Logo from "/T5-Logo.png";

const LoadingScreen = ({ isLoading = true }) => {
  // If not loading, don't render anything
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Books floating in background */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
            color: ["#4F46E5", "#818CF8", "#6366F1"][i % 3],
            opacity: 0.2,
            fontSize: `${2 + (i % 3)}rem`,
          }}
          animate={{
            y: [0, -15, 0, 15, 0],
            rotate: [0, 5, 0, -5, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 5 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        >
          {["📚", "🎓", "📘", "📖", "🖋️", "✏️"][i]}
        </motion.div>
      ))}

      {/* Main container */}
      <div className="relative flex flex-col items-center justify-center p-8">
        {/* Pencil drawing circle */}
        <motion.div
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: "transparent",
            border: "2px dashed #4F46E5",
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Multiple rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${180 - i * 15}px`,
              height: `${180 - i * 15}px`,
              border: `2px solid rgba(99, 102, 241, ${0.1 + i * 0.1})`,
              boxShadow: `0 0 ${10 + i * 5}px rgba(99, 102, 241, ${
                0.05 + i * 0.05
              })`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              scale: { duration: 2 + i, repeat: Infinity, ease: "easeInOut" },
              opacity: {
                duration: 2 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              },
            }}
          />
        ))}

        {/* Center logo container with floating animation */}
        <motion.div
          className="relative w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-lg z-10"
          animate={{
            y: [0, -10, 0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0 0px rgba(79, 70, 229, 0.2)",
                "0 0 0 15px rgba(79, 70, 229, 0)",
                "0 0 0 0px rgba(79, 70, 229, 0.2)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Education logo image */}
          <motion.img
            src={Logo}
            alt="Education Logo"
            className="w-32 h-32 object-contain"
            animate={{
              scale: [0.95, 1.05, 0.95],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </motion.div>
      </div>

      {/* Learning in progress text */}
      <motion.div
        className="text-indigo-800 font-medium text-lg mt-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center space-x-2">
          <span>Preparing your learning experience</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          >
            .
          </motion.span>
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="w-80 h-2 bg-indigo-100 rounded-full mt-6 overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="h-full bg-indigo-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 5,
            ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
            repeat: Infinity,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
