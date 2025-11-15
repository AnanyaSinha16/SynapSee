import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  // ✅ If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Else allow access
  return children;
};

export default ProtectedRoute;