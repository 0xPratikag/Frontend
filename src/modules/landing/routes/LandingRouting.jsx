import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingLayout from "../layout/LandingLayout";
import LandingHome from "../pages/LandingHome";


const LandingRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<LandingHome />} />
      </Route>
    </Routes>
  );
};

export default LandingRouting;