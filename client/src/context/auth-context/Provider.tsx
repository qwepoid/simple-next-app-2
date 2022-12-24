import { createContext, useEffect, useReducer, useState } from "react";
import AuthContext from "./AuthContext";
import { defaultValue } from "./constants";
import AuthReducer from "./AuthReducer";
import { useRouter } from "next/router";
import { applicationRoutes } from "../../constants/applicationRoutes";

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, defaultValue);

  const router = useRouter();

  function redirectToLogin() {
    if (!isAuthPage()) {
      router.replace(applicationRoutes.login);
    }
  }

  function redirectToHome() {
    if (router.pathname !== applicationRoutes.home)
      router.replace(applicationRoutes.home);
  }

  function login() {
    localStorage.setItem("user11", "2");
    dispatch({ type: "login" });
  }
  function logout() {
    localStorage.removeItem("user11");
    dispatch({ type: "logout" });
    redirectToLogin();
  }
  const value = {
    ...state,
    login,
    logout,
  };

  const isAuthPage = () => router.pathname === applicationRoutes.login;

  useEffect(() => {
    // Retrieve authentication status from local storage
    const isAuthenticated = localStorage.getItem("user11");

    if (isAuthenticated) {
      dispatch({ type: "login" });
      if (isAuthPage()) {
        redirectToHome();
      }
    } else {
      // Redirect to login if user is not authenticated
      redirectToLogin();
    }
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
