import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TherapistProtectedRoute from "./TherapistProtectedRoute";
import TherapistPublicRoute from "./TherapistPublicRoute";
import TherapistLayout from "../layout/TherapistLayout";
import TherapistLogin from "../pages/TherapistLogin";
import TherapistDashboard from "../pages/TherapistDashboard";
import TherapistProfile from "../pages/TherapistProfile";

const TherapistRouting = () => {
  return (
    <Routes>
      <Route element={<TherapistPublicRoute />}>
        <Route path="login" element={<TherapistLogin />} />
      </Route>

      <Route element={<TherapistProtectedRoute />}>
        <Route element={<TherapistLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<TherapistDashboard />} />
          <Route path="profile" element={<TherapistProfile />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/therapist/dashboard" replace />} />
    </Routes>
  );
};

export default TherapistRouting;