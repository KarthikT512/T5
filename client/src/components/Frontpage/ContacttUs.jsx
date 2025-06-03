import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../auth/AuthContext";
import Header from "../Frontpage/Header";
import Footer from "../Frontpage/Footer";

const ContactUs = ({ setCursorVariant }) => {
  const { user, submitContactForm } = useAuth();

  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    role: user ? user.role : "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
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
      const result = await submitContactForm(formData);
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ ...formData, message: "" });
        setErrors({});
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
    <>
      <Header setCursorVariant={setCursorVariant} />
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #ffffff 0%, #f2f2f2 100%)",
          fontFamily: "'Inter', 'Segoe UI', -apple-system, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          marginTop: "60px", // Added margin top as requested
        }}
      >
        <div style={{ width: "100%", maxWidth: "32rem" }}>
          {/* Header */}
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
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: "bold",
                color: "#000000",
                marginBottom: "1.5rem",
                lineHeight: "1.1",
              }}
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              style={{
                color: "#666666",
                fontSize: "1.125rem",
                lineHeight: "1.6",
                maxWidth: "28rem",
                margin: "0 auto",
              }}
            >
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </motion.p>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e5e5",
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.05), 0 8px 25px rgba(0, 0, 0, 0.03)",
              borderRadius: "1rem",
              padding: "2.5rem",
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
                      e.target.style.boxShadow =
                        "0 8px 25px rgba(0, 0, 0, 0.08)";
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

              {/* Email Field */}
              <motion.div
                custom={1}
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
                      e.target.style.boxShadow =
                        "0 8px 25px rgba(0, 0, 0, 0.08)";
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

              {/* Role Field */}
              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={formVariants}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.75rem",
                  }}
                >
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={iconVariants}
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="#6b7280"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6"
                      />
                    </svg>
                  </motion.div>
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    border: "2px solid #e5e5e5",
                    borderRadius: "0.75rem",
                    fontSize: "1rem",
                    color: "#000000",
                    background: "#ffffff",
                    outline: "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#000000";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e5e5";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="">Select your role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="worker">Worker</option>
                </select>
              </motion.div>

              {/* Message Field */}
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={formVariants}
                style={{ position: "relative" }}
              >
                <div style={{ position: "relative" }}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What would you like to discuss?"
                    rows={5}
                    style={{
                      width: "100%",
                      paddingLeft: "1rem",
                      paddingRight: "3rem",
                      paddingTop: "1rem",
                      paddingBottom: "1rem",
                      border: errors.message
                        ? "2px solid #ef4444"
                        : "2px solid #e5e5e5",
                      borderRadius: "0.75rem",
                      fontSize: "1rem",
                      color: "#000000",
                      background: "#ffffff",
                      outline: "none",
                      resize: "none",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#000000";
                      e.target.style.transform = "translateY(-1px)";
                      e.target.style.boxShadow =
                        "0 8px 25px rgba(0, 0, 0, 0.08)";
                    }}
                    onBlur={(e) => {
                      if (!errors.message)
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
                      top: "1.25rem",
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
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </motion.div>
                </div>
                {errors.message && (
                  <p
                    style={{
                      color: "#ef4444",
                      fontSize: "0.875rem",
                      marginTop: "0.5rem",
                      marginLeft: "0.25rem",
                    }}
                  >
                    {errors.message}
                  </p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div
                custom={4}
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
                      Sending Message...
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
                      Send Message
                    </>
                  )}
                </button>
              </motion.div>

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
                    Thank you! Your message has been sent successfully. We'll
                    get back to you soon.
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
                    Something went wrong. Please try again or contact us
                    directly.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Add keyframes for spinner */}
        <style jsx>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
      <Footer setCursorVariant={setCursorVariant} />
    </>
  );
};

export default ContactUs;
