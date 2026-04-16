import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { therapistStorage } from "../../../services/therapistAuthApi";

const TherapistLayout = () => {
  const navigate = useNavigate();
  const therapist = therapistStorage.getUser();

  const handleLogout = () => {
    therapistStorage.clearSession();
    navigate("/therapist/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-slate-200 bg-slate-950 text-white lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-6 py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Therapist Panel
            </p>
            <h2 className="mt-2 text-xl font-bold text-white">
              {therapist?.name || "Therapist"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {therapist?.EmployeId || "Profile Access"}
            </p>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            <NavLink
              to="/therapist/profile"
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              Profile
            </NavLink>
          </nav>

          <div className="border-t border-white/10 p-4">
            <button
              onClick={handleLogout}
              className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Logout
            </button>
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Therapist Dashboard
                </h1>
                <p className="text-sm text-slate-500">
                  Manage your profile and account settings
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 lg:hidden"
              >
                Logout
              </button>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default TherapistLayout;