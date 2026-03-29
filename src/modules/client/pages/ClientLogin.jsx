import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { BaseapiClient } from "../../../utils/apiClient";
const ClientLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await BaseapiClient.post("/client/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login success:", res.data);

      // If backend sends token
      if (res.data?.token) {
        localStorage.setItem("clientToken", res.data.token);
      }

      // If backend sends user data
      if (res.data?.user) {
        localStorage.setItem("clientData", JSON.stringify(res.data.user));
      }

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-700 text-white p-10 relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white,_transparent_35%)]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md">
                <HeartPulse size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">MediCare Portal</h1>
                <p className="text-cyan-100 text-sm">
                  Your health, always connected
                </p>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-4xl font-bold leading-tight mb-4">
                Welcome back to your
                <span className="block text-cyan-100">patient dashboard</span>
              </h2>
              <p className="text-cyan-50/90 text-base leading-7 max-w-md">
                Securely access your appointments, reports, prescriptions, and
                health records from one trusted place.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid gap-4 mt-10">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 border border-white/10">
              <ShieldCheck className="text-cyan-100" />
              <span className="text-sm">Secure patient authentication</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 border border-white/10">
              <Stethoscope className="text-cyan-100" />
              <span className="text-sm">Trusted by doctors and hospitals</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 lg:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
              <div className="p-3 rounded-2xl bg-cyan-100 text-cyan-700">
                <HeartPulse size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  MediCare Portal
                </h1>
                <p className="text-sm text-slate-500">Patient Login</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800">Login</h2>
              <p className="text-slate-500 mt-2">
                Access your healthcare account securely
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-cyan-500 focus-within:bg-white transition">
                  <Mail size={18} className="text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-cyan-500 focus-within:bg-white transition">
                  <Lock size={18} className="text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-cyan-600 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="accent-cyan-600" />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-cyan-600 font-medium hover:text-cyan-700"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold shadow-lg hover:scale-[1.01] hover:shadow-xl transition disabled:opacity-70"
              >
                {loading ? "Signing In..." : "Sign In Securely"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-8">
              Don&apos;t have an account?{" "}
              <Link
                to="/client/signup"
                className="text-cyan-600 font-semibold hover:text-cyan-700"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;