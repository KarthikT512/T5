// client/src/components/auth/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../courses/api"; // Import the configured axios instance

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("t5_token");
    if (token) {
      api
        .get("/api/auth/me")
        .then((response) => {
          setUser(response.data);
          localStorage.setItem("t5_user", JSON.stringify(response.data));
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            setUser(null);
            localStorage.removeItem("t5_user");
            localStorage.removeItem("t5_token");
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/api/auth/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("t5_token", token);
      const userData = await api.get("/api/auth/me");
      setUser(userData.data);
      localStorage.setItem("t5_user", JSON.stringify(userData.data));
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.response?.data || err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = userData.role;
      const response = await api.post(`/api/auth/signup/${endpoint}`, userData);
      return { success: true, message: response.data.message };
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.response?.data || err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("t5_user");
      localStorage.removeItem("t5_token");
    }
  };

  const verifyOtp = async (email, otp) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/api/auth/verify-otp", { email, otp });
      return { success: true, message: response.data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/api/auth/password-reset-request", {
        email,
      });
      return { success: true, message: response.data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchUsersByRole = async (role) => {
    try {
      const response = await api.get(`/api/auth/users/${role}`);
      return response.data;
    } catch (err) {
      console.error(`Failed to fetch ${role}s:`, err);
      return [];
    }
  };

  const allocateCourse = async (userId, courseId) => {
    try {
      const response = await api.post(
        `/api/auth/users/${userId}/allocate-course`,
        { courseId }
      );
      return { success: true, message: response.data.message };
    } catch (err) {
      console.error("Failed to allocate course:", err);
      return { success: false, error: err.message };
    }
  };

  const refreshUser = async () => {
    const token = localStorage.getItem("t5_token");
    if (token) {
      try {
        const response = await api.get("/api/auth/me");
        setUser(response.data);
        localStorage.setItem("t5_user", JSON.stringify(response.data));
      } catch (err) {
        console.error("Error refreshing user:", err);
        setUser(null);
        localStorage.removeItem("t5_user");
        localStorage.removeItem("t5_token");
      }
    }
  };

  const submitContactForm = async (formData) => {
    try {
      const response = await api.post("/api/auth/contact-us", formData);
      return { success: true, message: response.data.message };
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      return { success: false, error: err.message };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    verifyOtp,
    resetPassword,
    refreshUser,
    fetchUsersByRole,
    allocateCourse,
    submitContactForm,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
