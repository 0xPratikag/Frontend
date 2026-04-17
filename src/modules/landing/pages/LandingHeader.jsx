import React from "react";
import { Link } from "react-router-dom";
import {
  HeartHandshake,
  Brain,
  Speech,
  Activity,
  Users,
  Phone,
  MapPin,
  Clock3,
  CheckCircle2,
  Star,
  ArrowRight,
  LogIn,
  UserPlus,
} from "lucide-react";
import logo from "../../../assets/logo.jpeg";

const SectionTitle = ({ eyebrow, title, subtitle }) => (
  <div className="max-w-3xl mx-auto text-center mb-12">
    <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-3">
      {eyebrow}
    </p>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
      {title}
    </h2>
    <p className="text-slate-600 text-base md:text-lg leading-relaxed">
      {subtitle}
    </p>
  </div>
);

const Card = ({ className = "", children }) => (
  <div className={`bg-white ${className}`}>{children}</div>
);

const CardContent = ({ className = "", children }) => (
  <div className={className}>{children}</div>
);

const Button = ({
  className = "",
  variant = "default",
  children,
  as: Component = "button",
  to,
}) => {
  const base =
    "inline-flex items-center justify-center rounded-2xl h-12 px-6 text-base font-medium transition-all duration-200";
  const styles =
    variant === "outline"
      ? "border border-orange-300 text-orange-700 hover:bg-orange-50 bg-white"
      : "bg-blue-700 text-white hover:bg-blue-800";

  if (Component === Link) {
    return (
      <Link to={to} className={`${base} ${styles} ${className}`}>
        {children}
      </Link>
    );
  }

  return <button className={`${base} ${styles} ${className}`}>{children}</button>;
};

const LandingHeader = () => {
  return (
    <div className="bg-white text-slate-800">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/90 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={logo}
              alt="India Therapy Centre logo"
              className="h-14 w-14 rounded-full object-cover border border-slate-200 shadow-sm flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-lg md:text-xl font-bold text-slate-900 leading-tight truncate">
                India Therapy Centre
              </h1>
              <p className="text-sm text-slate-500 truncate">
                Care • Support • Progress
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a
              href="#services"
              className="hover:text-blue-700 transition-colors"
            >
              Services
            </a>
            <a
              href="#why-us"
              className="hover:text-blue-700 transition-colors"
            >
              Why Us
            </a>
            <a
              href="#testimonials"
              className="hover:text-blue-700 transition-colors"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="hover:text-blue-700 transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/client/login"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all"
            >
              <LogIn size={18} />
             Client Login
            </Link>

            <Link
              to="/therapist/login"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              <UserPlus size={18} />
             Employee Login
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/client/login"
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-300 bg-white text-slate-700 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50 transition-all"
            >
              <LogIn size={18} />
            </Link>

            <Link
             to="/therapist/login"
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              <UserPlus size={18} />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default LandingHeader;