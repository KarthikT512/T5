// App.jsx
"use client";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./components/Frontpage/Header";
import Hero from "./components/Frontpage/Hero";
import Courses from "./components/Frontpage/Courses";
import Teachers from "./components/Frontpage/Teacher";
import Achievements from "./components/Frontpage/Acheivement";
import Testimonials from "./components/Frontpage/Testimonial";
import FAQ from "./components/Frontpage/FAQ";
import Subscribe from "./components/Frontpage/Subscribe";
import Footer from "./components/Frontpage/Footer";
import Chatbot from "./components/Frontpage/Chatbot";
import CustomCursor from "./components/Frontpage/CustomCursor";
import Loader from "./components/Frontpage/Loader";
import ScrollToTop from "./components/Frontpage/ScrollToTop";
import CoursesIndex from "./components/courses/index";
import AuthPage from "./components/auth/AuthPage";
import Certification from "./components/Frontpage/Certification";
import CareerGuidance from "./components/Frontpage/CarrerGuidance";
import ELearning from "./components/Frontpage/ELearning";
import Workshop from "./components/Frontpage/Workshop";
import Webinar from "./components/Frontpage/Webinar";
import Mentorship from "./components/Frontpage/Mentorship";
import TeacherIndex from "./components/Teacher/index";
import TeacherForm from "./components/Teacher/TeacherForm";
import TeacherDetail from "./components/Teacher/TeacherDetail";
import ProfileEdit from "./components/profile/ProfileEdit";
import Dashboard from "./components/dashboard/Dashboard";
import CourseDashboard from "./components/dashboard/CourseDashboard";
import ContactUs from "./components/Frontpage/ContacttUs"; // Added import
import AboutUs from "./components/Frontpage/AboutUs"; // Added import

function App() {
  const [loading, setLoading] = useState(true);
  const [cursorVariant, setCursorVariant] = useState("default");

  const cursorEnter = () => setCursorVariant("hover");
  const cursorLeave = () => setCursorVariant("default");
  const cursorClick = () => {
    setCursorVariant("click");
    setTimeout(() => setCursorVariant("default"), 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document
          .querySelector(this.getAttribute("href"))
          ?.scrollIntoView({ behavior: "smooth" });
      });
    });

    const interactiveElements = document.querySelectorAll(
      "button, a, .interactive"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", cursorEnter);
      el.addEventListener("mouseleave", cursorLeave);
      el.addEventListener("mousedown", cursorClick);
    });

    return () => {
      clearTimeout(timer);
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", function (e) {
          e.preventDefault();
          document
            .querySelector(this.getAttribute("href"))
            ?.scrollIntoView({ behavior: "smooth" });
        });
      });
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", cursorEnter);
        el.removeEventListener("mouseleave", cursorLeave);
        el.removeEventListener("mousedown", cursorClick);
      });
    };
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="app-container"
          >
            <CustomCursor cursorVariant={cursorVariant} />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header setCursorVariant={setCursorVariant} />
                    <Hero setCursorVariant={setCursorVariant} />
                    <Achievements setCursorVariant={setCursorVariant} />
                    <Courses setCursorVariant={setCursorVariant} />
                    <Teachers setCursorVariant={setCursorVariant} />
                    <Testimonials setCursorVariant={setCursorVariant} />
                    <FAQ setCursorVariant={setCursorVariant} />
                    <Subscribe setCursorVariant={setCursorVariant} />
                    <Footer setCursorVariant={setCursorVariant} />
                  </>
                }
              />
              <Route
                path="/courses/*"
                element={<CoursesIndex setCursorVariant={setCursorVariant} />}
              />
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/certification"
                element={<Certification setCursorVariant={setCursorVariant} />}
              />
              <Route
                path="/career-guidance"
                element={<CareerGuidance setCursorVariant={setCursorVariant} />}
              />
              <Route
                path="/e-learning"
                element={<ELearning setCursorVariant={setCursorVariant} />}
              />
              <Route
                path="/workshops"
                element={<Workshop setCursorVariant={setCursorVariant} />}
              />
              <Route
                path="/webinars"
                element={<Webinar setCursorVariant={setCursorVariant} />}
              />
              <Route
                path="/mentorship"
                element={<Mentorship setCursorVariant={setCursorVariant} />}
              />
              <Route path="/teachers" element={<TeacherIndex />} />
              <Route path="/teachers/create" element={<TeacherForm />} />
              <Route path="/teachers/edit/:id" element={<TeacherForm />} />
              <Route path="/teachers/:id" element={<TeacherDetail />} />
              <Route path="/profile" element={<ProfileEdit />} />
              <Route
                path="/dashboard"
                element={<Dashboard setCursorVariant={setCursorVariant} />}
              />
              <Route
                path="/courses/:courseId/dashboard"
                element={
                  <CourseDashboard setCursorVariant={setCursorVariant} />
                }
              />
              {/* Added ContactUs route */}
              <Route
                path="/contactus"
                element={<ContactUs setCursorVariant={setCursorVariant} />}
              />
              {/* Added AboutUs route */}
              <Route
                path="/aboutus"
                element={<AboutUs setCursorVariant={setCursorVariant} />}
              />
            </Routes>
            <Chatbot setCursorVariant={setCursorVariant} />
            <ScrollToTop setCursorVariant={setCursorVariant} />
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
