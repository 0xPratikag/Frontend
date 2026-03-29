import React from "react";
import { Routes, Route } from "react-router-dom";
import ClientDashboard from "../pages/ClientDashboard";
import ClientProfile from "../pages/ClientProfile";
import ClientAppointments from "../pages/ClientAppointments";
import ClientReports from "../pages/ClientReports";
import ClientSettings from "../pages/ClientSettings";
import ClientLayout from "../layout/ClientLayout";
import ClientLogin from "../pages/ClientLogin";
import ClientSignup from "../pages/ClientSignup";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const ClientRouting = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<ClientLogin />} />
        <Route path="/signup" element={<ClientSignup />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="profile" element={<ClientProfile />} />
          <Route path="appointments" element={<ClientAppointments />} />
          <Route path="reports" element={<ClientReports />} />
          <Route path="settings" element={<ClientSettings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default ClientRouting;