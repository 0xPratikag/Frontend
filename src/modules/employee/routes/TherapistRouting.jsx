import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TherapistProtectedRoute from "./TherapistProtectedRoute";
import TherapistPublicRoute from "./TherapistPublicRoute";
import TherapistLayout from "../layout/TherapistLayout";
import TherapistLogin from "../pages/TherapistLogin";
import TherapistDashboard from "../pages/TherapistDashboard";

const TherapistRouting = () => {
  return (
    <Routes>
      <Route element={<TherapistPublicRoute />}>
        <Route path="/login" element={<TherapistLogin />} />
      </Route>

      <Route element={<TherapistProtectedRoute />}>
        <Route path="/" element={<TherapistLayout />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<TherapistDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default TherapistRouting;