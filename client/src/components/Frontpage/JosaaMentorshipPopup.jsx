import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../courses/api"; // Adjust the import path as necessary

const JosaaMentorshipPopup = ({ onClose }) => {
  // State for JEE Main Form
  const [jeeMainFormData, setJeeMainFormData] = useState({
    name: "",
    phone: "",
    email: "",
    rank: "",
  });
  const [jeeMainErrors, setJeeMainErrors] = useState({});
  const [jeeMainSubmitStatus, setJeeMainSubmitStatus] = useState("idle");

  // State for JEE Advanced Form
  const [jeeAdvFormData, setJeeAdvFormData] = useState({
    name: "",
    phone: "",
    email: "",
    rank: "",
  });
  const [jeeAdvErrors, setJeeAdvErrors] = useState({});
  const [jeeAdvSubmitStatus, setJeeAdvSubmitStatus] = useState("idle");

  // Validation function (shared logic for both forms)
  const validateForm = (formData, setErrors) => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.rank.trim() || isNaN(formData.rank)) {
      newErrors.rank = "Please enter a valid rank (numeric value)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e, setFormData) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submission handler for JEE Main
  const handleJeeMainSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(jeeMainFormData, setJeeMainErrors)) return;
    setJeeMainSubmitStatus("loading");
    try {
      const response = await api.post(
        "/api/auth/jee-main-mentorship",
        jeeMainFormData
      );
      if (response.data.success) {
        setJeeMainSubmitStatus("success");
        setJeeMainFormData({ name: "", phone: "", email: "", rank: "" });
        setJeeMainErrors({});
      } else {
        setJeeMainSubmitStatus("error");
      }
    } catch (error) {
      setJeeMainSubmitStatus("error");
    }
  };

  // Submission handler for JEE Advanced
  const handleJeeAdvSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(jeeAdvFormData, setJeeAdvErrors)) return;
    setJeeAdvSubmitStatus("loading");
    try {
      const response = await api.post(
        "/api/auth/josaa-mentorship",
        jeeAdvFormData
      );
      if (response.data.success) {
        setJeeAdvSubmitStatus("success");
        setJeeAdvFormData({ name: "", phone: "", email: "", rank: "" });
        setJeeAdvErrors({});
      } else {
        setJeeAdvSubmitStatus("error");
      }
    } catch (error) {
      setJeeAdvSubmitStatus("error");
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.1 + i * 0.15,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{
          background: "#ffffff",
          border: "1px solid #e5e5e5",
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.05), 0 8px 25px rgba(0, 0, 0, 0.03)",
          borderRadius: "1rem",
          padding: "2.5rem",
          width: "100%",
          maxWidth: "32rem",
          height: "96vh",
          marginTop: "3vh",
          marginBottom: "3vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 30px 80px rgba(0, 0, 0, 0.08), 0 12px 35px rgba(0, 0, 0, 0.05)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "0 20px 60px rgba(0, 0, 0, 0.05), 0 8px 25px rgba(0, 0, 0, 0.03)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#666666",
          }}
        >
          ×
        </button>
        <div
          className="popup-form-container"
          style={{ flex: 1, overflowY: "auto" }}
        >
          {/* JEE Main Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              style={{
                fontSize: "clamp(2rem, 4vw, 2.5rem)",
                fontWeight: "bold",
                color: "#000000",
                marginBottom: "1.5rem",
                lineHeight: "1.1",
              }}
            >
              Enroll For JEE Main Mentorship
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              style={{
                color: "#666666",
                fontSize: "1rem",
                lineHeight: "1.6",
                maxWidth: "28rem",
                margin: "0 auto",
              }}
            >
              This year, students can enroll for the JEE Main mentorship
              provided by T5.
            </motion.p>
          </motion.div>
          <form
            onSubmit={handleJeeMainSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={formVariants}
              style={{ position: "relative" }}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  name="name"
                  value={jeeMainFormData.name}
                  onChange={(e) => handleChange(e, setJeeMainFormData)}
                  placeholder="Full Name"
                  style={{
                    width: "100%",
                    paddingLeft: "1rem",
                    paddingRight: "3rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    border: jeeMainErrors.name
                      ? "2px solid #ef4444"
                      : "2px solid #e5e5e5",
                    borderRadius: "0.75rem",
                    fontSize: "1rem",
                    color: "#000000",
                    background: "#ffffff",
                    outline: "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#000000";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.08)";
                  }}
                  onBlur={(e) => {
                    if (!jeeMainErrors.name)
                      e.target.style.borderColor = "#e5e5e5";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={iconVariants}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#9ca3af"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </motion.div>
              </div>
              {jeeMainErrors.name && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  {jeeMainErrors.name}
                </p>
              )}
            </motion.div>
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={formVariants}
              style={{ position: "relative" }}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  name="phone"
                  value={jeeMainFormData.phone}
                  onChange={(e) => handleChange(e, setJeeMainFormData)}
                  placeholder="Phone Number"
                  style={{
                    width: "100%",
                    paddingLeft: "1rem",
                    paddingRight: "3rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    border: jeeMainErrors.phone
                      ? "2px solid #ef4444"
                      : "2px solid #e5e5e5",
                    borderRadius: "0.75rem",
                    fontSize: "1rem",
                    color: "#000000",
                    background: "#ffffff",
                    outline: "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#000000";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.08)";
                  }}
                  onBlur={(e) => {
                    if (!jeeMainErrors.phone)
                      e.target.style.borderColor = "#e5e5e5";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={iconVariants}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#9ca3af"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </motion.div>
              </div>
              {jeeMainErrors.phone && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  {jeeMainErrors.phone}
                </p>
              )}
            </motion.div>
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={formVariants}
              style={{ position: "relative" }}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  name="email"
                  value={jeeMainFormData.email}
                  onChange={(e) => handleChange(e, setJeeMainFormData)}
                  placeholder="Email Address"
                  style={{
                    width: "100%",
                    paddingLeft: "1rem",
                    paddingRight: "3rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    border: jeeMainErrors.email
                      ? "2px solid #ef4444"
                      : "2px solid #e5e5e5",
                    borderRadius: "0.75rem",
                    fontSize: "1rem",
                    color: "#000000",
                    background: "#ffffff",
                    outline: "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#000000";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.08)";
                  }}
                  onBlur={(e) => {
                    if (!jeeMainErrors.email)
                      e.target.style.borderColor = "#e5e5e5";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={iconVariants}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#9ca3af"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </motion.div>
              </div>
              {jeeMainErrors.email && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  {jeeMainErrors.email}
                </p>
              )}
            </motion.div>
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={formVariants}
              style={{ position: "relative" }}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  name="rank"
                  value={jeeMainFormData.rank}
                  onChange={(e) => handleChange(e, setJeeMainFormData)}
                  placeholder="JEE Main Rank"
                  style={{
                    width: "100%",
                    paddingLeft: "1rem",
                    paddingRight: "3rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    border: jeeMainErrors.rank
                      ? "2px solid #ef4444"
                      : "2px solid #e5e5e5",
                    borderRadius: "0.75rem",
                    fontSize: "1rem",
                    color: "#000000",
                    background: "#ffffff",
                    outline: "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#000000";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.08)";
                  }}
                  onBlur={(e) => {
                    if (!jeeMainErrors.rank)
                      e.target.style.borderColor = "#e5e5e5";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={iconVariants}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#9ca3af"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </motion.div>
              </div>
              {jeeMainErrors.rank && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  {jeeMainErrors.rank}
                </p>
              )}
            </motion.div>
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={formVariants}
            >
              <button
                type="submit"
                disabled={jeeMainSubmitStatus === "loading"}
                style={{
                  width: "100%",
                  background:
                    "linear-gradient(135deg, #000000 0%, #333333 100%)",
                  color: "#ffffff",
                  padding: "1rem 2rem",
                  borderRadius: "0.75rem",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  border: "none",
                  cursor:
                    jeeMainSubmitStatus === "loading"
                      ? "not-allowed"
                      : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  outline: "none",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: jeeMainSubmitStatus === "loading" ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (jeeMainSubmitStatus !== "loading") {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow =
                      "0 20px 40px rgba(0, 0, 0, 0.15)";
                    e.target.style.background =
                      "linear-gradient(135deg, #333333 0%, #000000 100%)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (jeeMainSubmitStatus !== "loading") {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                    e.target.style.background =
                      "linear-gradient(135deg, #000000 0%, #333333 100%)";
                  }
                }}
              >
                {jeeMainSubmitStatus === "loading" ? (
                  <>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "2px solid transparent",
                        borderTop: "2px solid #ffffff",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Submit
                  </>
                )}
              </button>
            </motion.div>
          </form>
          {jeeMainSubmitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                padding: "1.5rem",
                borderRadius: "0.75rem",
                textAlign: "center",
                border: "1px solid #dcfce7",
                background: "#f0fdf4",
                color: "#166534",
                marginTop: "2rem",
              }}
            >
              <svg
                width="32"
                height="32"
                fill="none"
                stroke="#22c55e"
                viewBox="0 0 24 24"
                style={{ margin: "0 auto 0.75rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p style={{ fontWeight: "500" }}>
                Enrollment successful! We'll contact you soon.
              </p>
            </motion.div>
          )}
          {jeeMainSubmitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                padding: "1.5rem",
                borderRadius: "0.75rem",
                textAlign: "center",
                border: "1px solid #fecaca",
                background: "#fef2f2",
                color: "#dc2626",
                marginTop: "2rem",
              }}
            >
              <svg
                width="32"
                height="32"
                fill="none"
                stroke="#ef4444"
                viewBox="0 0 24 24"
                style={{ margin: "0 auto 0.75rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p style={{ fontWeight: "500" }}>
                Something went wrong. Please try again.
              </p>
            </motion.div>
          )}

          {/* JEE Advanced Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              marginTop: "3rem",
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              style={{
                fontSize: "clamp(2rem, 4vw, 2.5rem)",
                fontWeight: "bold",
                color: "#000000",
                marginBottom: "1.5rem",
                lineHeight: "1.1",
              }}
            >
              Enroll For JEE Advanced Mentorship
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              style={{
                color: "#666666",
                fontSize: "1rem",
                lineHeight: "1.6",
                maxWidth: "28rem",
                margin: "0 auto",
              }}
            >
              This year, students can enroll for the JEE Advanced mentorship
              provided by T5.
            </motion.p>
          </motion.div>
          <form
            onSubmit={handleJeeAdvSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={formVariants}
              style={{ position: "relative" }}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  name="name"
                  value={jeeAdvFormData.name}
                  onChange={(e) => handleChange(e, setJeeAdvFormData)}
                  placeholder="Full Name"
                  style={{
                    width: "100%",
                    paddingLeft: "1rem",
                    paddingRight: "3rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    border: jeeAdvErrors.name
                      ? "2px solid #ef4444"
                      : "2px solid #e5e5e5",
                    borderRadius: "0.75rem",
                    fontSize: "1rem",
                    color: "#000000",
                    background: "#ffffff",
                    outline: "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#000000";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.08)";
                  }}
                  onBlur={(e) => {
                    if (!jeeAdvErrors.name)
                      e.target.style.borderColor = "#e5e5e5";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={iconVariants}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#9ca3af"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </motion.div>
              </div>
              {jeeAdvErrors.name && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  {jeeAdvErrors.name}
                </p>
              )}
            </motion.div>
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={formVariants}
              style={{ position: "relative" }}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  name="phone"
                  value={jeeAdvFormData.phone}
                  onChange={(e) => handleChange(e, setJeeAdvFormData)}
                  placeholder="Phone Number"
                  style={{
                    width: "100%",
                    paddingLeft: "1rem",
                    paddingRight: "3rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    border: jeeAdvErrors.phone
                      ? "2px solid #ef4444"
                      : "2px solid #e5e5e5",
                    borderRadius: "0.75rem",
                    fontSize: "1rem",
                    color: "#000000",
                    background: "#ffffff",
                    outline: "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#000000";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.08)";
                  }}
                  onBlur={(e) => {
                    if (!jeeAdvErrors.phone)
                      e.target.style.borderColor = "#e5e5e5";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={iconVariants}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#9ca3af"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </motion.div>
              </div>
              {jeeAdvErrors.phone && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  {jeeAdvErrors.phone}
                </p>
              )}
            </motion.div>
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={formVariants}
              style={{ position: "relative" }}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  name="email"
                  value={jeeAdvFormData.email}
                  onChange={(e) => handleChange(e, setJeeAdvFormData)}
                  placeholder="Email Address"
                  style={{
                    width: "100%",
                    paddingLeft: "1rem",
                    paddingRight: "3rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    border: jeeAdvErrors.email
                      ? "2px solid #ef4444"
                      : "2px solid #e5e5e5",
                    borderRadius: "0.75rem",
                    fontSize: "1rem",
                    color: "#000000",
                    background: "#ffffff",
                    outline: "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#000000";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.08)";
                  }}
                  onBlur={(e) => {
                    if (!jeeAdvErrors.email)
                      e.target.style.borderColor = "#e5e5e5";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={iconVariants}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#9ca3af"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </motion.div>
              </div>
              {jeeAdvErrors.email && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  {jeeAdvErrors.email}
                </p>
              )}
            </motion.div>
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={formVariants}
              style={{ position: "relative" }}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  name="rank"
                  value={jeeAdvFormData.rank}
                  onChange={(e) => handleChange(e, setJeeAdvFormData)}
                  placeholder="JEE/Advanced Rank"
                  style={{
                    width: "100%",
                    paddingLeft: "1rem",
                    paddingRight: "3rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    border: jeeAdvErrors.rank
                      ? "2px solid #ef4444"
                      : "2px solid #e5e5e5",
                    borderRadius: "0.75rem",
                    fontSize: "1rem",
                    color: "#000000",
                    background: "#ffffff",
                    outline: "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#000000";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.08)";
                  }}
                  onBlur={(e) => {
                    if (!jeeAdvErrors.rank)
                      e.target.style.borderColor = "#e5e5e5";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={iconVariants}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#9ca3af"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </motion.div>
              </div>
              {jeeAdvErrors.rank && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  {jeeAdvErrors.rank}
                </p>
              )}
            </motion.div>
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={formVariants}
            >
              <button
                type="submit"
                disabled={jeeAdvSubmitStatus === "loading"}
                style={{
                  width: "100%",
                  background:
                    "linear-gradient(135deg, #000000 0%, #333333 100%)",
                  color: "#ffffff",
                  padding: "1rem 2rem",
                  borderRadius: "0.75rem",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  border: "none",
                  cursor:
                    jeeAdvSubmitStatus === "loading"
                      ? "not-allowed"
                      : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  outline: "none",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: jeeAdvSubmitStatus === "loading" ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (jeeAdvSubmitStatus !== "loading") {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow =
                      "0 20px 40px rgba(0, 0, 0, 0.15)";
                    e.target.style.background =
                      "linear-gradient(135deg, #333333 0%, #000000 100%)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (jeeAdvSubmitStatus !== "loading") {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                    e.target.style.background =
                      "linear-gradient(135deg, #000000 0%, #333333 100%)";
                  }
                }}
              >
                {jeeAdvSubmitStatus === "loading" ? (
                  <>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "2px solid transparent",
                        borderTop: "2px solid #ffffff",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Submit
                  </>
                )}
              </button>
            </motion.div>
          </form>
          {jeeAdvSubmitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                padding: "1.5rem",
                borderRadius: "0.75rem",
                textAlign: "center",
                border: "1px solid #dcfce7",
                background: "#f0fdf4",
                color: "#166534",
                marginTop: "2rem",
              }}
            >
              <svg
                width="32"
                height="32"
                fill="none"
                stroke="#22c55e"
                viewBox="0 0 24 24"
                style={{ margin: "0 auto 0.75rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p style={{ fontWeight: "500" }}>
                Enrollment successful! We'll contact you soon.
              </p>
            </motion.div>
          )}
          {jeeAdvSubmitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                padding: "1.5rem",
                borderRadius: "0.75rem",
                textAlign: "center",
                border: "1px solid #fecaca",
                background: "#fef2f2",
                color: "#dc2626",
                marginTop: "2rem",
              }}
            >
              <svg
                width="32"
                height="32"
                fill="none"
                stroke="#ef4444"
                viewBox="0 0 24 24"
                style={{ margin: "0 auto 0.75rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p style={{ fontWeight: "500" }}>
                Something went wrong. Please try again.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JosaaMentorshipPopup;
