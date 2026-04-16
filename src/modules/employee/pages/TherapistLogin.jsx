import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { therapistAuthApi, therapistStorage } from "../../../services/therapistAuthApi";

const TherapistLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    EmployeId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.EmployeId.trim() || !form.password.trim()) {
      setError("EmployeId and password are required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        EmployeId: form.EmployeId.trim().toUpperCase(),
        password: form.password.trim(),
      };

      const data = await therapistAuthApi.login(payload);

      therapistStorage.setSession({
        token: data.token,
        user: data.user,
      });

      setSuccess("Login successful");

      setTimeout(() => {
        navigate("/therapist/profile");
      }, 700);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl md:grid-cols-2">
          
          {/* Left Section */}
          <div className="hidden flex-col justify-center bg-white/5 p-10 text-white md:flex lg:p-14">
            <div className="mb-6 inline-flex w-fit rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide text-indigo-100">
              Therapist Portal
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight lg:text-5xl">
              Welcome Back
            </h1>

            <p className="mb-8 max-w-lg text-base leading-7 text-slate-300">
              Secure access for therapists to manage profile details, update
              account information, and control password settings from one place.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                  ✓
                </div>
                <p className="text-sm text-slate-100">JWT based secure login</p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                  ✓
                </div>
                <p className="text-sm text-slate-100">Profile update support</p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                  ✓
                </div>
                <p className="text-sm text-slate-100">
                  Password reset and account control
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white px-6 py-8 sm:px-8 md:px-10 lg:px-12 lg:py-12">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8">
                <div className="mb-3 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 md:hidden">
                  Therapist Portal
                </div>

                <h2 className="text-3xl font-bold text-slate-900">Sign In</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Please login with your employee credentials
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="EmployeId"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Employe ID
                  </label>
                  <input
                    id="EmployeId"
                    type="text"
                    name="EmployeId"
                    placeholder="Enter Employe ID"
                    value={form.EmployeId}
                    onChange={handleChange}
                    autoComplete="username"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      value={form.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 pr-20 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {error ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                  </div>
                ) : null}

                {success ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    {success}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Signing in..." : "Login"}
                </button>
              </form>

              <div className="mt-8 border-t border-slate-200 pt-5 text-center text-xs text-slate-400">
                Authorized therapist access only
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistLogin;