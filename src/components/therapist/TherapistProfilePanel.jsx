import React, { useMemo, useState } from "react";
import {
  normalizeTherapistProfile,
  therapistAuthApi,
  therapistStorage,
} from "../../services/therapistAuthApi";

const StatItem = ({ label, value }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <p className="mt-2 text-sm font-semibold text-slate-900">
      {value || "-"}
    </p>
  </div>
);

const TherapistProfilePanel = ({ profile, onProfileRefresh }) => {
  const normalized = useMemo(
    () => normalizeTherapistProfile(profile),
    [profile]
  );

  const [editForm, setEditForm] = useState({
    name: normalized.name || "",
    email: normalized.email || "",
    location: normalized.location || "",
    specialization: normalized.specialization || "",
    therapistType: normalized.therapistType || "",
    experience: normalized.experience || "",
    fees: normalized.fees || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
    if (profileError) setProfileError("");
    if (profileMessage) setProfileMessage("");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    if (passwordError) setPasswordError("");
    if (passwordMessage) setPasswordMessage("");
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      setSavingProfile(true);
      setProfileError("");
      setProfileMessage("");

      const payload = {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        location: editForm.location.trim(),
        specialization: editForm.specialization.trim(),
        therapistType: editForm.therapistType.trim(),
        experience: editForm.experience ? Number(editForm.experience) : 0,
        fees: editForm.fees ? Number(editForm.fees) : 0,
      };

      const response = await therapistAuthApi.updateProfile(payload);
      const updated = normalizeTherapistProfile(response);

      therapistStorage.updateUser({
        ...therapistStorage.getUser(),
        ...updated.raw,
        name: updated.name,
        email: updated.email,
        EmployeId: updated.EmployeId,
      });

      setProfileMessage("Profile updated successfully");

      if (onProfileRefresh) {
        onProfileRefresh();
      }
    } catch (err) {
      setProfileError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to update profile"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (
      !passwordForm.currentPassword.trim() ||
      !passwordForm.newPassword.trim() ||
      !passwordForm.confirmPassword.trim()
    ) {
      setPasswordError("All password fields are required");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return;
    }

    try {
      setSavingPassword(true);
      setPasswordError("");
      setPasswordMessage("");

      await therapistAuthApi.changePassword({
        currentPassword: passwordForm.currentPassword.trim(),
        newPassword: passwordForm.newPassword.trim(),
        confirmPassword: passwordForm.confirmPassword.trim(),
      });

      setPasswordMessage("Password changed successfully");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setPasswordError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to change password"
      );
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-900 p-6 text-white shadow-xl">
        <p className="text-sm font-medium text-indigo-200">Therapist Profile</p>
        <h2 className="mt-2 text-2xl font-bold">
          {normalized.name || "Therapist"}
        </h2>
        <p className="mt-2 text-sm text-slate-200">
          Manage your profile information and account settings.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-300">
              Employe ID
            </p>
            <p className="mt-2 text-sm font-semibold">
              {normalized.EmployeId || "-"}
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-300">
              Role
            </p>
            <p className="mt-2 text-sm font-semibold">
              {normalized.roleName || "-"}
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-300">
              Branch
            </p>
            <p className="mt-2 text-sm font-semibold">
              {normalized.branchName || "-"}
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-300">
              Machine ID
            </p>
            <p className="mt-2 text-sm font-semibold">
              {normalized.machineEmpId || "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr,1.2fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Profile Overview</h3>
          <p className="mt-1 text-sm text-slate-500">Current account details</p>

          <div className="mt-6 grid gap-4">
            <StatItem label="Name" value={normalized.name} />
            <StatItem label="Email" value={normalized.email} />
            <StatItem label="Location" value={normalized.location} />
            <StatItem label="Specialization" value={normalized.specialization} />
            <StatItem label="Therapist Type" value={normalized.therapistType} />
            <StatItem label="Experience" value={normalized.experience} />
            <StatItem label="Fees" value={normalized.fees} />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Edit Profile</h3>
          <p className="mt-1 text-sm text-slate-500">
            Update the information allowed for your account
          </p>

          <form
            onSubmit={handleProfileSubmit}
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleProfileChange}
                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleProfileChange}
                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={editForm.location}
                onChange={handleProfileChange}
                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={editForm.specialization}
                onChange={handleProfileChange}
                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Therapist Type
              </label>
              <input
                type="text"
                name="therapistType"
                value={editForm.therapistType}
                onChange={handleProfileChange}
                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Experience
              </label>
              <input
                type="number"
                name="experience"
                value={editForm.experience}
                onChange={handleProfileChange}
                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Fees
              </label>
              <input
                type="number"
                name="fees"
                value={editForm.fees}
                onChange={handleProfileChange}
                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {profileError ? (
              <div className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {profileError}
              </div>
            ) : null}

            {profileMessage ? (
              <div className="md:col-span-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {profileMessage}
              </div>
            ) : null}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={savingProfile}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {savingProfile ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">Change Password</h3>
        <p className="mt-1 text-sm text-slate-500">
          Update your account password securely
        </p>

        <form
          onSubmit={handlePasswordSubmit}
          className="mt-6 grid gap-4 md:grid-cols-3"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {passwordError ? (
            <div className="md:col-span-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {passwordError}
            </div>
          ) : null}

          {passwordMessage ? (
            <div className="md:col-span-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {passwordMessage}
            </div>
          ) : null}

          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={savingPassword}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {savingPassword ? "Updating..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TherapistProfilePanel;