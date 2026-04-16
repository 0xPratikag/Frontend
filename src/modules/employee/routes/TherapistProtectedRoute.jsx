import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const TherapistProtectedRoute = () => {
  const token = localStorage.getItem("therapistToken");

  if (!token) {
    return <Navigate to="/therapist/login" replace />;
  }

  return <Outlet />;
};

export default TherapistProtectedRoute;