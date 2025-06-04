import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../courses/api"; // Assuming an axios instance is configured

const JosaaMentorshipPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    jeeMainRank: "",
    jeeAdvancedRank: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'

  // Form validation
  const validateForm = () => {
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

    if (!formData.jeeMainRank.trim() || isNaN(formData.jeeMainRank)) {
      newErrors.jeeMainRank =
        "Please enter a valid JEE Main rank (numeric value)";
    }

    if (!formData.jeeAdvancedRank.trim() || isNaN(formData.jeeAdvancedRank)) {
      newErrors.jeeAdvancedRank =
        "Please enter a valid JEE Advanced rank (numeric value)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitStatus("loading");

    try {
      const response = await api.post("/api/auth/josaa-mentorship", formData);
      if (response.data.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          phone: "",
          email: "",
          jeeMainRank: "",
          jeeAdvancedRank: "",
        });
        setErrors({});
        setTimeout(onClose, 3000); // Close popup after 3 seconds
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
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
            Enroll For Josaa Mentorship
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
            This year JEE students can enroll for the Josaa mentorship provided
            by T5.
          </motion.p>
        </motion.div>

        {/* Scrollable Form Container */}
        <div
          className="popup-form-container"
          style={{ flex: 1, overflowY: "auto" }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Name Field */}
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
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  style={{
                    width: "100%",
                    paddingLeft: "1rem",
                    paddingRight: "3rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    border: errors.name
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
                    if (!errors.name) e.target.style.borderColor = "#e5e5e5";
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
              {errors.name && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  {errors.name}
                </p>
              )}
            </motion.div>

            {/* Phone Number Field */}
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
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  style={{
                    width: "100%",
                    paddingLeft: "1rem",
                    paddingRight: "3rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    border: errors.phone
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
                    if (!errors.phone) e.target.style.borderColor = "#e5e5e5";
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
              {errors.phone && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  {errors.phone}
                </p>
              )}
            </motion.div>

            {/* Email Field */}
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  style={{
                    width: "100%",
                    paddingLeft: "1rem",
                    paddingRight: "3rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    border: errors.email
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
                    if (!errors.email) e.target.style.borderColor = "#e5e5e5";
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
              {errors.email && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  {errors.email}
                </p>
              )}
            </motion.div>

            {/* JEE Main Rank Field */}
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
                  name="jeeMainRank"
                  value={formData.jeeMainRank}
                  onChange={handleChange}
                  placeholder="JEE Main Rank"
                  style={{
                    width: "100%",
                    paddingLeft: "1rem",
                    paddingRight: "3rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    border: errors.jeeMainRank
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
                    if (!errors.jeeMainRank)
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
              {errors.jeeMainRank && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  {errors.jeeMainRank}
                </p>
              )}
            </motion.div>

            {/* JEE Advanced Rank Field */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={formVariants}
              style={{ position: "relative" }}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  name="jeeAdvancedRank"
                  value={formData.jeeAdvancedRank}
                  onChange={handleChange}
                  placeholder="JEE Advanced Rank"
                  style={{
                    width: "100%",
                    paddingLeft: "1rem",
                    paddingRight: "3rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    border: errors.jeeAdvancedRank
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
                    if (!errors.jeeAdvancedRank)
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
              {errors.jeeAdvancedRank && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  {errors.jeeAdvancedRank}
                </p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={formVariants}
            >
              <button
                type="submit"
                disabled={submitStatus === "loading"}
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
                    submitStatus === "loading" ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  outline: "none",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: submitStatus === "loading" ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (submitStatus !== "loading") {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow =
                      "0 20px 40px rgba(0, 0, 0, 0.15)";
                    e.target.style.background =
                      "linear-gradient(135deg, #333333 0%, #000000 100%)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (submitStatus !== "loading") {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                    e.target.style.background =
                      "linear-gradient(135deg, #000000 0%, #333333 100%)";
                  }
                }}
              >
                {submitStatus === "loading" ? (
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

          {/* Success Message */}
          {submitStatus === "success" && (
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

          {/* Error Message */}
          {submitStatus === "error" && (
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

        <style jsx>{`
          .popup-form-container::-webkit-scrollbar {
            width: 8px;
          }
          .popup-form-container::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          .popup-form-container::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
          }
          .popup-form-container::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
};

export default JosaaMentorshipPopup;
