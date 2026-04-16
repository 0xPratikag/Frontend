import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const TherapistPublicRoute = () => {
  const token = localStorage.getItem("therapistToken");

  if (token) {
    return <Navigate to="/therapist/profile" replace />;
  }

  return <Outlet />;
};

export default TherapistPublicRoute;