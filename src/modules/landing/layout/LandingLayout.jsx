import React from "react";
import { Outlet } from "react-router-dom";
import LandingHeader from "../pages/LandingHeader";
import LandingFooter from "../pages/LandingFooter";

const LandingLayout = () => {
  return (
    <div>
      <LandingHeader/>

      <main>
        <Outlet />
      </main>


      <LandingFooter/>
    </div>
  );
};

export default LandingLayout;