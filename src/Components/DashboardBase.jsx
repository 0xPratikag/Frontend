import React from "react";
import {
  BarChart3,
  Users2,
  Building2,
  CreditCard,
  Activity,
} from "lucide-react";

const statCards = [
  {
    title: "Total Admins",
    value: "24",
    icon: <Users2 className="text-white" size={28} />,
    color: "bg-indigo-500",
  },
  {
    title: "Total Users",
    value: "1,582",
    icon: <Users2 className="text-white" size={28} />,
    color: "bg-green-500",
  },
  {
    title: "Branches",
    value: "12",
    icon: <Building2 className="text-white" size={28} />,
    color: "bg-yellow-500",
  },
  {
    title: "Revenue",
    value: "₹1,20,500",
    icon: <CreditCard className="text-white" size={28} />,
    color: "bg-pink-500",
  },
];

const recentActivities = [
  { id: 1, text: "Abhishek created a new branch - Bank More", time: "2 hrs ago" },
  { id: 2, text: "Riya updated role permissions", time: "5 hrs ago" },
  { id: 3, text: "New admin added for Dhanbad", time: "1 day ago" },
  { id: 4, text: "Password reset by Raj", time: "2 days ago" },
];

const DashboardBase = () => {
  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">📊 Landing Page</h2>

    </div>
  );
};

export default DashboardBase;
