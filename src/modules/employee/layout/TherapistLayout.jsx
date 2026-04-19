import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { therapistStorage } from "../../../services/therapistAuthApi";

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M6 6l12 12M18 6l-12 12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M4 5.5C4 4.67 4.67 4 5.5 4h4C10.33 4 11 4.67 11 5.5v4c0 .83-.67 1.5-1.5 1.5h-4C4.67 11 4 10.33 4 9.5v-4ZM13 5.5c0-.83.67-1.5 1.5-1.5h4c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5h-4c-.83 0-1.5-.67-1.5-1.5v-4ZM4 14.5c0-.83.67-1.5 1.5-1.5h4c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5h-4C4.67 20 4 19.33 4 18.5v-4ZM13 14.5c0-.83.67-1.5 1.5-1.5h4c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5h-4c-.83 0-1.5-.67-1.5-1.5v-4Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 20a7 7 0 0 1 14 0"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path
      d="M15 16l4-4m0 0-4-4m4 4H9M13 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TherapistLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const therapist = therapistStorage.getUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    therapistStorage.clearSession();
    navigate("/therapist/login", { replace: true });
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const pageTitle = location.pathname.includes("/profile")
    ? "My Profile"
    : "Dashboard";

  const pageDescription = location.pathname.includes("/profile")
    ? "View and update your therapist profile details."
    : "Track overview, activity, and quick therapist insights.";

  const navItems = [
    {
      to: "/therapist/dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      to: "/therapist/profile",
      label: "My Profile",
      icon: <ProfileIcon />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-slate-800 bg-slate-950 text-white shadow-2xl transition-transform duration-300 ease-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              Therapist Panel
            </p>
            <h2 className="mt-2 text-lg font-bold text-white">Control Center</h2>
          </div>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 lg:hidden"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="border-b border-white/10 px-5 py-5 sm:px-6">
          <div className="rounded-3xl bg-white/5 p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-600/30">
                {therapist?.name?.charAt(0)?.toUpperCase() || "T"}
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-base font-bold text-white">
                  {therapist?.name || "Therapist"}
                </h3>
                <p className="truncate text-sm text-slate-400">
                  {therapist?.EmployeeId ||
                    therapist?.EmployeId ||
                    "Profile Access"}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-white/5 p-3">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                Quick Info
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Manage dashboard, update profile, and keep account details fresh.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                    location.pathname === item.to
                      ? "bg-white/15 text-white"
                      : "bg-white/5 text-slate-300 group-hover:bg-white/10 group-hover:text-white"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      </aside>

      <div className="lg:pl-[280px]">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
          <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-start gap-3">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
              >
                <MenuIcon />
              </button>

              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold text-slate-900 sm:text-2xl">
                  {pageTitle}
                </h1>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                  {pageDescription}
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                Welcome back,{" "}
                <span className="font-semibold text-slate-900">
                  {therapist?.name || "Therapist"}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TherapistLayout;