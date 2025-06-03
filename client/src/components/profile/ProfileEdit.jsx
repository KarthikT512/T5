// client/src/components/profile/ProfileEdit.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Home, CheckCircle, AlertCircle } from "lucide-react";
import Header from "../Frontpage/Header";
import Footer from "../Frontpage/Footer";

function ProfileEdit({ setCursorVariant }) {
  const { user, loading, refreshUser } = useAuth();
  const navigate = useNavigate();

  // State management using a single formData object
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Populate form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
    }
  }, [user]);

  // Validation function for form fields
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Name must be at least 2 characters" : "";
      case "email":
        return !/\S+@\S+\.\S+/.test(value) ? "Please enter a valid email" : "";
      case "mobile":
        return !/^\+?[\d\s\-\(\)]+$/.test(value)
          ? "Please enter a valid mobile number"
          : "";
      default:
        return "";
    }
  };

  // Handle input changes and clear corresponding errors
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle form submission with validation and API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      const token = localStorage.getItem("t5_token");
      const response = await fetch("https://t5-in2v.onrender.com/api/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      await refreshUser();
      alert("Profile updated successfully");
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  // Unauthenticated state
  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-white text-black"
      >
        <div className="w-full max-w-md mx-4 bg-gray-100 rounded-lg shadow-lg p-6">
          <div className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-black mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600">Please log in to view your profile.</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Main component render
  return (
    <>
      <Header setCursorVariant={setCursorVariant} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-white pt-[86px]"
      >
        <div className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gray-100 rounded-lg shadow-lg border-2 border-gray-300">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <motion.h1
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-semibold text-black"
                    >
                      Edit Profile
                    </motion.h1>
                    <motion.button
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => navigate("/")}
                      className="p-2 rounded-lg border-2 border-gray-300 hover:border-black transition-colors"
                      aria-label="Back to Home"
                      title="Back to Home"
                    >
                      <Home className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="space-y-6">
                    {/* Role Display */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="p-4 bg-white rounded-lg border"
                    >
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Role
                      </label>
                      <p className="text-lg font-medium text-black">
                        {user.role}
                      </p>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* Name Field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-black">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
                          placeholder="Enter your full name"
                          required
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm">{errors.name}</p>
                        )}
                      </motion.div>

                      {/* Email Field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-black">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
                          placeholder="Enter your email address"
                          required
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                      </motion.div>

                      {/* Mobile Field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-black">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          value={formData.mobile}
                          onChange={(e) =>
                            handleInputChange("mobile", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
                          placeholder="Enter your mobile number"
                          required
                        />
                        {errors.mobile && (
                          <p className="text-red-500 text-sm">
                            {errors.mobile}
                          </p>
                        )}
                      </motion.div>

                      {/* Save Error Display */}
                      {saveError && (
                        <p className="text-red-500 text-sm">{saveError}</p>
                      )}

                      {/* Submit Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="pt-4"
                      >
                        <motion.button
                          type="submit"
                          disabled={isSaving}
                          whileHover={
                            !isSaving ? { scale: 1.02, y: -1 } : undefined
                          }
                          whileTap={!isSaving ? { scale: 0.98 } : undefined}
                          className="w-full py-3 px-4 bg-black hover:bg-gray-800 rounded-md text-white font-medium disabled:bg-gray-400 transition-colors"
                        >
                          {isSaving ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                              Saving Changes...
                            </div>
                          ) : (
                            "Save Changes"
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Footer setCursorVariant={setCursorVariant} />
    </>
  );
}

export default ProfileEdit;
