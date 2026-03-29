import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("clientToken");
  const clientData = localStorage.getItem("clientData");

  if (token || clientData) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;