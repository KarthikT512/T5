"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";

const faqs = [
  {
    question: "What courses do you offer?",
    answer:
      "We offer a variety of courses in web development, data science, AI, cybersecurity, UI/UX design, engineering, medical sciences, and more! Our curriculum is constantly updated to reflect the latest industry trends and technologies.",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "You can enroll by signing up on our platform, selecting a course, and completing the registration process. Payment can be made through various methods including credit/debit cards and digital wallets. We also offer installment options for premium courses.",
  },
  {
    question: "Are the courses self-paced?",
    answer:
      "Yes! Our courses are designed to be self-paced so you can learn at your convenience. However, some courses may have live sessions or scheduled assignments to enhance the learning experience and provide real-time interaction with instructors.",
  },
  {
    question: "Do you provide certificates?",
    answer:
      "Yes, we provide certificates upon successful completion of the course. These certificates are recognized by industry partners and can be shared on your professional profiles. Some of our advanced courses also offer industry-recognized certifications.",
  },
  {
    question: "Can I access the course materials after completion?",
    answer:
      "Yes, once you've enrolled in a course, you'll have lifetime access to the course materials, allowing you to revisit concepts whenever needed. We also provide regular updates to course content to ensure it remains relevant.",
  },
  {
    question: "Do you offer any scholarships or financial aid?",
    answer:
      "We offer scholarships and financial aid to eligible students. Please contact our support team for more information on the application process. We're committed to making quality education accessible to everyone regardless of financial constraints.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Background patterns with monochrome theme
  const BackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background geometric shapes */}
      {[...Array(10)].map((_, i) => {
        const isCircle = Math.random() > 0.6;
        return (
          <motion.div
            key={i}
            className={`absolute ${
              isCircle ? "rounded-full" : "rounded"
            } bg-black/[0.02] dark:bg-white/[0.02]`}
            style={{
              width: `${Math.random() * 150 + 20}px`,
              height: isCircle
                ? `${Math.random() * 150 + 20}px`
                : `${Math.random() * 80 + 20}px`,
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
      id="faq"
      className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
      ref={ref}
    >
      <BackgroundElements />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-12"
        >
          <motion.span
            className="inline-block px-3 py-1 bg-black/10 dark:bg-white/10 text-black dark:text-white rounded-full text-xs font-semibold uppercase tracking-wide mb-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Got{" "}
            <span className="text-black dark:text-white underline underline-offset-4 decoration-2">
              Questions?
            </span>{" "}
            We Have Answers
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our platform and courses
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.1, duration: 0.5 },
              }}
              whileHover={{ scale: 1.01 }}
            >
              <button
                className="w-full p-4 text-left flex justify-between items-center focus:outline-none cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-800 dark:text-white">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

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
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Still have questions?
          </p>
          <motion.button
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md shadow-md cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center">
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              Contact Support
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
