import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuthenticatedUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getAuthenticatedUser());
    setLoading(false);
  }, []);

  function login(credentials) {
    const loggedInUser = loginUser(credentials);
    setUser(loggedInUser);
    return loggedInUser;
  }

  function register(credentials) {
    const newUser = registerUser(credentials);
    setUser(newUser);
    return newUser;
  }

  function logout() {
    logoutUser();
    setUser(null);
  }

  function refreshUser() {
    setUser(getAuthenticatedUser());
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}