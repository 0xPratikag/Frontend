import React from "react";
import { Outlet } from "react-router-dom";

const EmployeeLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;