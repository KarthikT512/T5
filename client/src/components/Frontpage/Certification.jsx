import React from "react";
import { motion } from "framer-motion";
import t5Logo from "/T5.png";
import { Link } from "react-router-dom"; // Updated import: using react-router-dom instead of wouter
// Import Header and Footer components
import Header from "../Frontpage/Header";
import Footer from "../Frontpage/Footer";

const Certification = ({ setCursorVariant }) => {
  // Animation variants for staggered card reveals
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
      {/* Header */}
      <Header setCursorVariant={setCursorVariant} />

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
              Certification Programs
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
              Get recognized for your skills with industry-validated
              certifications. Stand out to employers and validate your
              expertise.
            </motion.p>
          </motion.section>

          <motion.section
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-white shadow-lg rounded-2xl p-10 border border-gray-200"
              variants={itemVariants}
              whileHover={{
                boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
            >
              <motion.h3
                className="text-2xl font-bold text-gray-800 mb-6 relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Our Certification Approach
                <motion.div
                  className="w-full h-1 bg-black absolute -bottom-2 left-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </motion.h3>

              <motion.p
                className="text-gray-600 text-lg mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Our comprehensive certification programs are designed to
                validate your skills in today's most in-demand fields. Each
                certification represents a rigorous assessment of your knowledge
                and practical abilities, ensuring that you stand out in a
                competitive job market.
              </motion.p>

              <motion.p
                className="text-gray-600 text-lg mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Our certifications cover areas including technology, data
                science, business management, digital marketing, and creative
                fields. Each program is developed by industry experts and
                regularly updated to reflect the latest standards and practices.
              </motion.p>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-xl mb-3">
                    The Certification Process
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Complete the required coursework</li>
                    <li>Build practical projects for your portfolio</li>
                    <li>Pass the comprehensive assessment</li>
                    <li>Receive your official T5 certification</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-xl mb-3">
                    Benefits of Certification
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Validate your skills with industry recognition</li>
                    <li>Enhance your professional credibility</li>
                    <li>Gain access to our professional network</li>
                    <li>Receive ongoing learning resources</li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
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
              className="text-3xl font-bold mb-6 relative inline-block"
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
              Why Get Certified?
              <motion.div
                className="w-full h-1 bg-white absolute -bottom-2 left-0"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              />
            </motion.h2>

            <motion.p
              className="text-white max-w-2xl mx-auto mb-10 text-lg"
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
              Stand out to employers, validate your expertise, and gain
              confidence in your abilities with our professionally designed
              certification programs.
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
                Explore All Certifications
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

      {/* Footer */}
      <Footer setCursorVariant={setCursorVariant} />
    </>
  );
};

export default Certification;
