// OtpVerificationForm.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const API_BASE_URL = "http://localhost:8000/api/auth";

const OtpVerificationForm = ({
  onClose,
  onVerificationComplete,
  initialEmail = "",
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState(initialEmail);
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));
  const emailRef = useRef(null);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (isResending) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsResending(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isResending]);

  useEffect(() => {
    if (inputRefs.current[0] && inputRefs.current[0].current) {
      inputRefs.current[0].current.focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-advance to next input if current one is filled
      if (value && index < 5) {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Go back to previous input on backspace if current is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim().slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      [...pastedData].forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });
      setOtp(newOtp);

      // Focus on the appropriate input after paste
      if (pastedData.length < 6) {
        inputRefs.current[pastedData.length].current.focus();
      } else {
        inputRefs.current[5].current.focus();
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.every((digit) => digit) && email) {
      setIsVerifying(true);
      const otpCode = otp.join("");

      try {
        const response = await fetch(`${API_BASE_URL}/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: otpCode }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "OTP verification failed");
        }
        // On successful verification, trigger any completion handling
        const result = await response.json();
        setIsVerifying(false);
        if (onVerificationComplete) {
          onVerificationComplete();
        }
      } catch (error) {
        console.error("OTP verification error:", error);
        setIsVerifying(false);
      }
    }
  };

  const handleResendOtp = async () => {
    if (!email) return;
    setIsResending(true);
    try {
      // Call a dedicated endpoint for resending OTP.
      const response = await fetch(`${API_BASE_URL}/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to resend OTP");
      }
      // Optionally, you might want to process a confirmation response here.
    } catch (error) {
      console.error("Resend OTP error:", error);
    } finally {
      // The countdown resets automatically via useEffect.
      setIsResending(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <motion.h2
          className="text-2xl font-bold text-black"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Verification Code
        </motion.h2>
        <motion.button
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </motion.button>
      </div>

      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          <Check className="h-8 w-8 text-black" />
        </motion.div>
        <h3 className="text-lg font-medium mb-2">OTP Verification</h3>
        <p className="text-gray-600">
          We've sent a verification code to your email. Please enter the 6-digit
          code below.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Your Email
          </label>
          <input
            ref={emailRef}
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your email"
            required
          />
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label className="block text-gray-700 text-sm font-medium mb-2 text-center">
            Enter 6-digit Code
          </label>
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={inputRefs.current[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                pattern="[0-9]*"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            type="submit"
            className="w-full py-2 px-4 bg-black hover:bg-gray-800 text-white font-medium rounded-md shadow-sm transition-colors duration-300 flex items-center justify-center disabled:opacity-70"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!otp.every((digit) => digit) || !email || isVerifying}
          >
            {isVerifying ? (
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
                Verifying...
              </>
            ) : (
              "Verify & Continue"
            )}
          </motion.button>
        </motion.div>
      </form>

      <motion.div
        className="text-center text-sm text-gray-600 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Didn't receive the code?{" "}
        {isResending ? (
          <span className="text-gray-500">Resend in {countdown}s</span>
        ) : (
          <motion.button
            className="text-black hover:text-gray-700 hover:underline font-medium"
            onClick={handleResendOtp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isResending || !email}
          >
            Resend OTP
          </motion.button>
        )}
      </motion.div>
    </>
  );
};

export default OtpVerificationForm;
