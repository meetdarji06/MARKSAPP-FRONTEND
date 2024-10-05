import React, { Children } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = true; // Replace with actual authentication logic

  if (!isAuthenticated) {
    <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
