import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, MessageSquare } from "lucide-react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import OtpVerificationForm from "./OtpVerificationForm";
import ResetPasswordForm from "./ResetPasswordForm";
import SuccessMessage from "./SuccessMessage";
import AutoRedirect from "./AutoRedirect";

const AuthPage = () => {
  const navigate = useNavigate();
  const [authType, setAuthType] = useState("login");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("student");

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-6 py-12 md:py-24">
          <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 p-6 md:p-10">
              <div className="mb-6">
                <div className="flex items-center mb-6">
                  <button
                    className={`mr-4 font-medium text-lg ${
                      authType === "login"
                        ? "text-black border-b-2 border-black"
                        : "text-gray-400"
                    }`}
                    onClick={() => setAuthType("login")}
                  >
                    Login
                  </button>
                  <button
                    className={`font-medium text-lg ${
                      authType === "signup"
                        ? "text-black border-b-2 border-black"
                        : "text-gray-400"
                    }`}
                    onClick={() => setAuthType("signup")}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {authType === "login" && (
                <LoginForm
                  onSwitchToSignup={() => setAuthType("signup")}
                  onSwitchToReset={() => setAuthType("reset")}
                />
              )}

              {authType === "signup" && (
                <SignupForm
                  onSwitchToLogin={() => setAuthType("login")}
                  onSignupComplete={(email) => {
                    setEmail(email);
                    setAuthType("otp");
                  }}
                />
              )}

              {authType === "otp" && (
                <OtpVerificationForm
                  initialEmail={email}
                  onClose={() => setAuthType("login")}
                  onVerificationComplete={() => setAuthType("success-otp")}
                />
              )}

              {authType === "reset" && (
                <ResetPasswordForm
                  onClose={() => setAuthType("login")}
                  onBackToLogin={() => setAuthType("login")}
                  onResetComplete={() => setAuthType("success-reset")}
                />
              )}

              {authType === "success-otp" && (
                <SuccessMessage
                  title="Verification Complete"
                  message="Your email has been successfully verified. You can now access your account."
                  buttonText="Continue to Login"
                  onButtonClick={() => setAuthType("login")}
                  onClose={() => setAuthType("login")}
                />
              )}

              {authType === "success-otp" && (
                <AutoRedirect
                  delay={1000}
                  onComplete={() => setAuthType("login")}
                />
              )}

              {authType === "success-reset" && (
                <SuccessMessage
                  title="Password Reset Email Sent"
                  message="We've sent password reset instructions to your email. Please check your inbox."
                  buttonText="Back to Login"
                  onButtonClick={() => setAuthType("login")}
                  onClose={() => setAuthType("login")}
                />
              )}

              {authType === "success-reset" && (
                <AutoRedirect
                  delay={1000}
                  onComplete={() => setAuthType("login")}
                />
              )}
            </div>

            {/* Right Side - Hero Section */}
            <div className="w-full md:w-1/2 bg-black text-white p-6 md:p-10 flex flex-col justify-center relative overflow-hidden">
              <motion.div
                className="absolute top-[-10%] right-[-10%] w-40 h-40 rounded-full bg-gray-800 opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 10, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              <motion.div
                className="absolute bottom-[-10%] left-[-5%] w-32 h-32 rounded-full bg-gray-700 opacity-20"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, -10, 0],
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1,
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10"
              >
                <motion.div
                  className="w-24 h-24 mb-6 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-full h-full bg-white rounded-md flex items-center justify-center shadow-lg">
                    <span className="text-black text-3xl font-bold tracking-tighter">
                      <img
                        src="/T5-Logo.png"
                        alt="T5"
                        className="h-22 w-auto"
                      />
                    </span>
                  </div>
                  <motion.div
                    className="absolute -inset-1 rounded-lg"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)",
                    }}
                    animate={{
                      background: [
                        "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)",
                        "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)",
                        "linear-gradient(270deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)",
                        "linear-gradient(360deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)",
                        "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)",
                      ],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                <motion.h2
                  className="text-3xl font-bold mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {authType === "login" && "Welcome Back!"}
                  {authType === "signup" && "Join Our Platform"}
                  {authType === "otp" && "Verify Your Email"}
                  {authType === "reset" && "Reset Your Password"}
                  {authType === "success-otp" && "Verification Success"}
                  {authType === "success-reset" && "Reset Email Sent"}
                </motion.h2>

                <motion.p
                  className="text-gray-300 mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {authType === "login" &&
                    "Sign in to access your learning dashboard and continue your educational journey with T5."}
                  {authType === "signup" &&
                    "Create an account to unlock personalized learning experiences and join our community of learners worldwide."}
                  {authType === "otp" &&
                    "Enter the 6-digit code sent to your email to verify your account and ensure secure access."}
                  {authType === "reset" &&
                    "Enter your email address and we'll send instructions to reset your password securely."}
                  {authType === "success-otp" &&
                    "Your account is now verified and ready to use. Welcome to the T5 learning platform!"}
                  {authType === "success-reset" &&
                    "Check your inbox for password reset instructions. Follow the link provided to create a new password."}
                </motion.p>

                <div className="space-y-5">
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <svg
                        className="h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-200">
                      Adaptive learning technology
                    </p>
                  </motion.div>

                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <svg
                        className="h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-200">
                      Expert-crafted courses & resources
                    </p>
                  </motion.div>

                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <svg
                        className="h-4 w-4 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-200">
                      Interactive learning experiences
                    </p>
                  </motion.div>
                </div>

                {/* Floating elements for added visual effect */}
                <motion.div
                  className="absolute top-20 right-20 w-10 h-10 rounded-sm bg-white opacity-5"
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, 15, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />

                <motion.div
                  className="absolute bottom-20 right-20 w-8 h-8 rounded-full bg-white opacity-5"
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 15, 0],
                  }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />

                <motion.div
                  className="absolute top-40 left-5 w-6 h-6 rounded-sm bg-white opacity-5"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
