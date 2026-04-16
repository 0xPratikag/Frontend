import React from "react";
import { Menu, Bell, Search } from "lucide-react";

const EmployeeHeader = ({ setSidebarOpen }) => {
  const employeeData = JSON.parse(localStorage.getItem("employeeData") || "{}");

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden h-11 w-11 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
          >
            <Menu size={20} />
          </button>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-500">
              Manage your health records and appointments
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-2xl px-4 py-2.5 min-w-[240px]">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
            />
          </div>

          <button className="relative h-11 w-11 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition">
            <Bell size={18} />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-3 py-2 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-semibold">
              {employeeData?.name?.[0] || "C"}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {employeeData?.name || "employee User"}
              </p>
              <p className="text-xs text-slate-500">
                {employeeData?.email || "employee@example.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EmployeeHeader;