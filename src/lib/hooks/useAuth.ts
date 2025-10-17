"use client";

// store user mock-token, role, and mfaVerification in localStorage to allow access to Dashboard 
export const useAuth = () => {
  const login = (token: string, role: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("mfaVerified", "true");
    }
  };

  // clear localStorage when the user hits logout
  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  };

  const getAuth = () => {
    if (typeof window === "undefined") {
      return {  role: null, mfaVerified: false };
    }
    return {
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role"),
      mfaVerified: localStorage.getItem("mfaVerified") === "true",
    };
  };

  return { login, logout, getAuth };
};
