import { motion } from "framer-motion";
import t5Logo from "/T5.png";
// Import the Header and Footer components
import Header from "../Frontpage/Header";
import Footer from "../Frontpage/Footer";

const CareerGuidance = ({ setCursorVariant }) => {
  // Animation variants for staggered card reveals with enhanced effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        duration: 0.7,
      },
    },
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.5,
      },
    },
  };

  // Button animation variants
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 800,
        damping: 20,
      },
    },
  };

  return (
    <>
      {/* Header component */}
      <Header setCursorVariant={setCursorVariant} />

      {/* Main Career Guidance content */}
      <div className="w-full bg-white text-black">
        <motion.div
          className="max-w-6xl mx-auto px-6 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.section
            className="text-center mb-16 relative mt-16"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute top-0 left-10 w-24 h-24 rounded-full bg-gray-100 -z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                opacity: [0, 0.7, 0.5],
                x: [0, -20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />

            <motion.div
              className="absolute bottom-0 right-10 w-32 h-32 rounded-full bg-gray-100 -z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.5, 1],
                opacity: [0, 0.5, 0.3],
                x: [0, 30, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 3,
                delay: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />

            <motion.h1
              className="text-5xl font-bold text-gray-800 mb-10 relative inline-flex items-center"
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.4,
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="inline-block mr-4 align-middle"
              >
                <img src={t5Logo} alt="T5 Logo" className="w-32 h-auto" />
              </motion.div>
              Learning Platform
              <motion.div
                className="w-full h-1 bg-black absolute bottom-0 left-0"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.9 }}
              />
            </motion.h1>

            <motion.p
              className="text-gray-600 text-xl max-w-3xl mx-auto mb-8"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              Discover expert-led online courses designed to elevate your skills
              and transform your career. Learn at your own pace with our
              flexible, interactive learning platform.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row justify-center gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <motion.button
                className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg relative overflow-hidden group"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.span
                  className="absolute inset-0 w-0 bg-gray-700 transition-all duration-300 ease-out group-hover:w-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  style={{ zIndex: -1 }}
                />
                Browse Courses
              </motion.button>

              <motion.button
                className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg border-2 border-black relative overflow-hidden group"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.span
                  className="absolute inset-0 w-0 bg-gray-50 transition-all duration-300 ease-out group-hover:w-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  style={{ zIndex: -1 }}
                />
                Enroll Now
              </motion.button>
            </motion.div>
          </motion.section>

          <motion.h2
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Courses
          </motion.h2>

          <motion.section
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-white p-8 shadow-lg rounded-xl border border-gray-200"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
            >
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                  Comprehensive Learning Programs
                </h3>

                <p className="text-gray-600 mb-6 text-center">
                  T5 offers a wide range of courses designed to help you master
                  in-demand skills for today's competitive job market. Our
                  curriculum is constantly updated to reflect the latest
                  industry trends and technologies.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Technology Courses</h4>
                    <p className="text-sm text-gray-600">
                      Web development, mobile apps, cloud computing, data
                      science, and more. Build practical projects that enhance
                      your portfolio.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Business & Marketing</h4>
                    <p className="text-sm text-gray-600">
                      Digital marketing, business analytics, entrepreneurship,
                      and leadership skills for the modern workplace.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center items-center border-t border-gray-200 pt-6">
                  <motion.button
                    className="bg-black text-white px-6 py-3 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View All Courses
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.section>

          <motion.section
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl font-bold text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Why Choose T5
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                className="bg-white p-6 rounded-xl border border-gray-200 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <div className="bg-black text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Expert Instructors
                </h3>
                <p className="text-gray-600">
                  Learn from industry professionals with years of real-world
                  experience
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl border border-gray-200 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <div className="bg-black text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⏱️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Flexible Learning
                </h3>
                <p className="text-gray-600">
                  Study at your own pace with lifetime access to course
                  materials
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl border border-gray-200 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <div className="bg-black text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Project-Based</h3>
                <p className="text-gray-600">
                  Build a portfolio of real projects to showcase your new skills
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl border border-gray-200 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <div className="bg-black text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Community Support
                </h3>
                <p className="text-gray-600">
                  Connect with fellow learners and get help when you need it
                </p>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            className="bg-black text-white p-10 rounded-2xl text-center mb-10 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute top-4 left-4 w-32 h-32 rounded-full bg-gray-800 -z-10"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{
                scale: [0, 1.5, 1.2],
                opacity: [0, 0.3, 0.2],
                x: [0, -10, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                times: [0, 0.5, 1],
                delay: 0.2,
              }}
              viewport={{ once: true }}
            />

            <motion.div
              className="absolute bottom-6 right-6 w-48 h-48 rounded-full bg-gray-800 -z-10"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{
                scale: [0, 1.8, 1.3],
                opacity: [0, 0.2, 0.15],
                x: [0, 15, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                times: [0, 0.5, 1],
                delay: 0.5,
              }}
              viewport={{ once: true }}
            />

            <motion.h2
              className="text-4xl font-bold mb-6 relative inline-block"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: 0.3,
              }}
              viewport={{ once: true }}
            >
              Ready to Start Learning?
              <motion.div
                className="w-full h-1 bg-white absolute -bottom-2 left-0"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              />
            </motion.h2>

            <motion.p
              className="max-w-2xl mx-auto mb-10 text-lg"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.5,
              }}
              viewport={{ once: true }}
            >
              Join thousands of students already learning on T5. Get unlimited
              access to all our comprehensive courses.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="bg-white text-black px-10 py-4 rounded-lg font-bold text-lg relative overflow-hidden group"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.span
                  className="absolute inset-0 w-0 bg-gray-200 transition-all duration-300 ease-out group-hover:w-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  style={{ zIndex: -1 }}
                />
                Enroll Now
              </motion.button>

              <motion.button
                className="bg-transparent text-white px-10 py-4 rounded-lg font-bold text-lg border-2 border-white relative overflow-hidden group"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.span
                  className="absolute inset-0 w-0 bg-white bg-opacity-10 transition-all duration-300 ease-out group-hover:w-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  style={{ zIndex: -1 }}
                />
                Learn More
              </motion.button>
            </motion.div>
          </motion.section>

          <motion.footer
            className="text-center text-gray-600 mt-20 pb-10 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.7,
            }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-24 h-1 bg-black mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="font-medium"
            >
              © 2025 T5. All rights reserved.
            </motion.p>
          </motion.footer>
        </motion.div>
      </div>

      {/* Footer component */}
      <Footer setCursorVariant={setCursorVariant} />
    </>
  );
};

export default CareerGuidance;
