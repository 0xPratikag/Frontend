import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardBase from "./DashboardBase";
import Sidebar from "./Sidebar";
import AdminList from "./Admin/AdminList";
import CreateAdmin from "./Admin/CreateAdmin";
import AdminPermision from "./Admin/AdminPermision";
import SubRoleManager from "./Admin/SubRoleManager";
import SettingPage from "./SettingPage";
import EditAdmin from "./Admin/EditAdmin";
import TherapistCreate from "./Therapist/TherapistCreate";
import TherapistList from "./Therapist/TherapistList";
import AdminDetails from "./Admin/AdminDetails";
import AssistantCreate from "./Assistant/AssistantCreate";
import AssistantList from "./Assistant/AssistantList";

// import EmployeeList from "./Monitoring/EmployeeList";
import PermissionManager from "./PermissionManager";
import RoleManager from "./RoleManager";
import BranchList from "./Branch/BranchList";
import BranchCreate from "./Branch/BranchCreate";
import BranchEdit from "./Branch/BranchEdit";
import EmployeeList from "./Employee/EmployeeList";
import EmployeeCreate from "./Employee/EmployeeCreate";
import EmployeeEdit from "./Employee/EmployeeEdit";
import DesignationManagement from "./Designation/DesignationManagement";
import AttendanceBranches from "./Monitoring/AttendanceBranches";
import BranchAttendance from "./Monitoring/BranchAttendance";
import DeviceList from "./Monitoring/DeviceList";
import PaymentMethods from "./PaymentMethods";
import TherapyCatalog from "./TherapyCatalog/TherapyCatalog";
import DiscountRules from "./DiscountRules/DiscountRules";


const DashboardRouting = () => {
  return (
    <div className="flex w-full">
      <Routes>
        <Route path="/" element={<DashboardBase />} />

      </Routes>
    </div>
  );
};

export default DashboardRouting;
