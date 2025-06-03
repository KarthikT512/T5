// client/src/components/Frontpage/AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

const AboutUs = ({ setCursorVariant }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <>
      <Header setCursorVariant={setCursorVariant} />
      <div className="min-h-screen bg-white text-black mt-[60px]">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Introduction Section */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-16 text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-extrabold text-black mb-6"
            >
              About T5 Education
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            >
              T5 is a premier online education platform dedicated to empowering
              learners worldwide with accessible, high-quality education. We
              bring knowledge to your fingertips through innovative teaching and
              cutting-edge technology.
            </motion.p>
          </motion.section>

          {/* Mission Section */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-16 bg-gray-100 py-12 px-8 rounded-xl"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-black mb-6 text-center"
            >
              Our Mission
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed"
            >
              Our mission is to break down barriers to education, offering a
              diverse range of courses taught by expert instructors. We strive
              to inspire lifelong learning and personal growth for everyone,
              everywhere.
            </motion.p>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-black mb-6"
            >
              Get in Touch
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto"
            >
              Curious about our journey or want to join us in transforming
              education? We’d love to hear from you!
            </motion.p>
            <motion.a
              href="/contactus"
              variants={fadeInUp}
              className="inline-block px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Contact Us
            </motion.a>
          </motion.section>
        </main>
      </div>
      <Footer setCursorVariant={setCursorVariant} />
    </>
  );
};

export default AboutUs;
