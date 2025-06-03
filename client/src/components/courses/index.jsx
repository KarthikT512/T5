// client/src/components/courses/index.jsx
"use client";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CoursesPage from "./CoursesPage";
import CourseDetail from "./CourseDetail";
import CourseForm from "./CourseForm";
import Header from "../Frontpage/Header";
import Footer from "../Frontpage/Footer";

const CoursesIndex = ({ setCursorVariant }) => {
  const location = useLocation();

  return (
    <>
      <Header setCursorVariant={setCursorVariant} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            index
            element={<CoursesPage setCursorVariant={setCursorVariant} />}
          />
          {/* Specific route for creating a course, placed before dynamic route */}
          <Route path="create" element={<CourseForm mode="create" />} />
          {/* Dynamic route for course details */}
          <Route
            path=":courseId"
            element={<CourseDetail setCursorVariant={setCursorVariant} />}
          />
          <Route path=":courseId/edit" element={<CourseForm mode="edit" />} />
        </Routes>
      </AnimatePresence>
      <Footer setCursorVariant={setCursorVariant} />
    </>
  );
};

export default CoursesIndex;
