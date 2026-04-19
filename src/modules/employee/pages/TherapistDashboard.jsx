import React from "react";
import { therapistStorage } from "../../../services/therapistAuthApi";

const TherapistDashboard = () => {
  const therapist = therapistStorage.getUser();

  const stats = [
    { title: "Today's Sessions", value: "08", note: "2 upcoming sessions soon" },
    { title: "Pending Notes", value: "05", note: "Complete your notes today" },
    { title: "Active Clients", value: "24", note: "Current active list" },
    { title: "Profile Status", value: "Live", note: "Your profile is visible" },
  ];

  const upcomingSessions = [
    { name: "Ananya Sharma", time: "10:30 AM", type: "Video Session" },
    { name: "Rohit Verma", time: "12:15 PM", type: "Follow-up" },
    { name: "Neha Singh", time: "03:00 PM", type: "Consultation" },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[28px] bg-gradient-to-r from-slate-950 via-indigo-900 to-slate-900 p-5 text-white shadow-xl sm:p-6 lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-200">
            Welcome
          </p>

          <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            Hello, {therapist?.name || "Therapist"}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
            Manage your therapist profile, review quick stats, and keep your
            panel updated with a clean responsive workspace.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs text-indigo-100">Sessions Today</p>
              <p className="mt-1 text-lg font-bold">08</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs text-indigo-100">Pending Notes</p>
              <p className="mt-1 text-lg font-bold">05</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs text-indigo-100">Active Clients</p>
              <p className="mt-1 text-lg font-bold">24</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Today’s Focus</h3>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              On Track
            </span>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Complete pending clinical notes
              </p>
              <p className="mt-1 text-sm text-slate-500">
                5 notes waiting to be submitted today.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Review afternoon appointments
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Next consultation starts at 03:00 PM.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-sm font-medium text-slate-500">{item.title}</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-900">
              {item.value}
            </h3>
            <p className="mt-2 text-sm text-emerald-600">{item.note}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-bold text-slate-900">Upcoming Sessions</h3>
          <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            Today
          </span>
        </div>

        <div className="space-y-4">
          {upcomingSessions.map((session, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <h4 className="truncate font-semibold text-slate-900">
                  {session.name}
                </h4>
                <p className="text-sm text-slate-500">{session.type}</p>
              </div>

              <div className="shrink-0 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm">
                {session.time}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TherapistDashboard;