// SignupForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  MessageSquare,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAuth } from "./AuthContext";

const SignupForm = ({ onSwitchToLogin, onSignupComplete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // Default role
    agreeToTerms: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const navigate = useNavigate();
  const { register } = useAuth();
  const API_BASE_URL = "https://t5-in2v.onrender.com/api/auth";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      updatePasswordStrength(value);
    }
  };

  const updatePasswordStrength = (password) => {
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password),
    });
  };

  const isPasswordStrong = Object.values(passwordStrength).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Clear previous error

    if (!isPasswordStrong || !formData.agreeToTerms) {
      setErrorMessage("Please ensure all requirements are met.");
      setIsLoading(false);
      return;
    }

    try {
      const userData = { ...formData, mobile: "0000000000" };
      const result = await register(userData);
      if (result.success) {
        // In a real app with OTP verification you might redirect to an OTP verification page.
        if (onSignupComplete) {
          onSignupComplete(formData.email);
        }
      } else {
        setErrorMessage(result.error); // Display specific error
        console.error("Signup error:", result.error);
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Signup error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <motion.div
            className="mb-4 p-3 bg-red-100 text-red-700 rounded-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errorMessage}
          </motion.div>
        )}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <label className="block text-gray-700 text-sm font-medium mb-2">
            I am a
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                formData.role === "student"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setFormData({ ...formData, role: "student" })}
            >
              Student
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                formData.role === "teacher"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setFormData({ ...formData, role: "teacher" })}
            >
              Teacher
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                formData.role === "worker"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setFormData({ ...formData, role: "worker" })}
            >
              Worker
            </button>
          </div>
        </motion.div>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              required
            />
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </motion.button>
          </div>

          {formData.password && (
            <div className="mt-2 space-y-1 text-xs">
              <div className="flex items-center">
                {passwordStrength.hasMinLength ? (
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span
                  className={
                    passwordStrength.hasMinLength
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center">
                {passwordStrength.hasUppercase ? (
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span
                  className={
                    passwordStrength.hasUppercase
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  At least one uppercase letter
                </span>
              </div>
              <div className="flex items-center">
                {passwordStrength.hasLowercase ? (
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span
                  className={
                    passwordStrength.hasLowercase
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  At least one lowercase letter
                </span>
              </div>
              <div className="flex items-center">
                {passwordStrength.hasNumber ? (
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span
                  className={
                    passwordStrength.hasNumber
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  At least one number
                </span>
              </div>
              <div className="flex items-center">
                {passwordStrength.hasSpecialChar ? (
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span
                  className={
                    passwordStrength.hasSpecialChar
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  At least one special character
                </span>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <label className="flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-black hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-black hover:underline">
                Privacy Policy
              </a>
            </span>
          </label>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <motion.button
            type="submit"
            className="w-full py-2 px-4 bg-black hover:bg-gray-800 text-white font-medium rounded-md shadow-sm transition-colors duration-300 flex items-center justify-center disabled:opacity-70"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!isPasswordStrong || !formData.agreeToTerms || isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing up...
              </>
            ) : (
              "Sign up"
            )}
          </motion.button>
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center my-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="border-t border-gray-300 absolute w-full"></div>
          <div className="bg-white px-4 relative z-10 text-sm text-gray-500">
            or
          </div>
        </motion.div>

        <a
          href="https://wa.me/+918297488973"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            type="button"
            className="w-full py-2 border border-green-600 text-green-600 rounded-md flex items-center justify-center gap-2 mb-6 hover:bg-green-50 transition-colors"
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(22, 163, 74, 0.05)",
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <MessageSquare className="h-5 w-5" />
            Connect via WhatsApp
          </motion.button>
        </a>
      </form>

      <motion.div
        className="text-center text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        Already have an account?{" "}
        <motion.button
          className="text-black hover:text-gray-700 hover:underline font-medium"
          onClick={onSwitchToLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Log in
        </motion.button>
      </motion.div>
    </>
  );
};

export default SignupForm;
