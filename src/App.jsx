import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoadingModal from "./modules/LoadingModal";
import LandingRouting from "./modules/landing/routes/LandingRouting";
import ClientRouting from "./modules/client/routes/ClientRouting";
import TherapistRouting from "./modules/employee/routes/TherapistRouting";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <Suspense fallback={<LoadingModal />}>
        <Routes>
          <Route path="/*" element={<LandingRouting />} />
          <Route path="/client/*" element={<ClientRouting />} />
          <Route path="/therapist/*" element={<TherapistRouting />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;