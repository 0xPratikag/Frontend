import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  normalizeTherapistProfile,
  therapistAuthApi,
  therapistStorage,
} from "../../../services/therapistAuthApi";

const getDefaultFormData = (therapist = {}) => ({
  name: therapist?.name || "",
  email: therapist?.email || "",
  phone: therapist?.phone || "",
  employeeId: therapist?.EmployeId || "",
  specialization: therapist?.specialization || "",
  experience: therapist?.experience || "",
  bio: therapist?.bio || "",
  profilePic: null,
  experienceLetter: null,
});

const getExperienceLetterMeta = (therapist = {}) => ({
  name: therapist?.experienceLetterName || "",
  url: therapist?.experienceLetterUrl || "",
});

const getDefaultPasswordForm = () => ({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const TherapistProfile = () => {
  const storedTherapist = therapistStorage.getUser();

  const [formData, setFormData] = useState(getDefaultFormData(storedTherapist));
  const [initialData, setInitialData] = useState(
    getDefaultFormData(storedTherapist)
  );

  const [previewImage, setPreviewImage] = useState(
    storedTherapist?.profilePic || ""
  );
  const [initialPreviewImage, setInitialPreviewImage] = useState(
    storedTherapist?.profilePic || ""
  );

  const [experienceLetterInfo, setExperienceLetterInfo] = useState(
    getExperienceLetterMeta(storedTherapist)
  );
  const [initialExperienceLetterInfo, setInitialExperienceLetterInfo] =
    useState(getExperienceLetterMeta(storedTherapist));

  const [passwordForm, setPasswordForm] = useState(getDefaultPasswordForm());
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      try {
        const response = await therapistAuthApi.getProfile();
        const normalizedProfile = normalizeTherapistProfile(response);

        if (!mounted) return;

        therapistStorage.updateUser(normalizedProfile);

        const nextData = getDefaultFormData(normalizedProfile);
        const nextPreviewImage = normalizedProfile?.profilePic || "";
        const nextExperienceLetterInfo =
          getExperienceLetterMeta(normalizedProfile);

        setFormData(nextData);
        setInitialData(nextData);
        setPreviewImage(nextPreviewImage);
        setInitialPreviewImage(nextPreviewImage);
        setExperienceLetterInfo(nextExperienceLetterInfo);
        setInitialExperienceLetterInfo(nextExperienceLetterInfo);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to load profile."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      profilePic: file,
    }));

    setPreviewImage(URL.createObjectURL(file));
  };

  const handleExperienceLetterChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, DOC, and DOCX files are allowed.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      experienceLetter: file,
    }));

    setExperienceLetterInfo({
      name: file.name,
      url: "",
    });
  };

  const handleRemoveSelectedExperienceLetter = () => {
    setFormData((prev) => ({
      ...prev,
      experienceLetter: null,
    }));

    setExperienceLetterInfo(initialExperienceLetterInfo);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setPreviewImage(initialPreviewImage);
    setExperienceLetterInfo(initialExperienceLetterInfo);
    toast.info("Changes discarded.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("specialization", formData.specialization);
      payload.append("experience", formData.experience);
      payload.append("bio", formData.bio);

      if (formData.profilePic) {
        payload.append("profilePic", formData.profilePic);
      }

      if (formData.experienceLetter) {
        payload.append("experienceLetter", formData.experienceLetter);
      }

      const response = await therapistAuthApi.updateProfile(payload);
      const normalizedProfile = normalizeTherapistProfile(response);

      therapistStorage.updateUser(normalizedProfile);

      const nextData = getDefaultFormData(normalizedProfile);
      const nextPreviewImage = normalizedProfile?.profilePic || previewImage;
      const nextExperienceLetterInfo =
        getExperienceLetterMeta(normalizedProfile);

      setFormData(nextData);
      setInitialData(nextData);
      setPreviewImage(nextPreviewImage);
      setInitialPreviewImage(nextPreviewImage);
      setExperienceLetterInfo(nextExperienceLetterInfo);
      setInitialExperienceLetterInfo(nextExperienceLetterInfo);

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!passwordForm.currentPassword.trim()) {
      toast.error("Current password is required.");
      return;
    }

    if (!passwordForm.newPassword.trim()) {
      toast.error("New password is required.");
      return;
    }

    if (!passwordForm.confirmPassword.trim()) {
      toast.error("Confirm password is required.");
      return;
    }

    if (passwordForm.newPassword.length < 4) {
      toast.error("New password must be at least 4 characters long.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      toast.error("New password should be different from current password.");
      return;
    }

    setChangingPassword(true);

    try {
      const response = await therapistAuthApi.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });

      toast.success(response?.message || "Password changed successfully.");
      setPasswordForm(getDefaultPasswordForm());
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to change password."
      );
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="xl:col-span-1">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Therapist Profile"
                className="h-32 w-32 rounded-3xl object-cover shadow-md"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-indigo-100 text-4xl font-bold text-indigo-600">
                {formData.name?.charAt(0)?.toUpperCase() || "T"}
              </div>
            )}

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              {formData.name || "Therapist Name"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {formData.specialization || "Specialization"}
            </p>

            <label className="mt-5 inline-flex cursor-pointer items-center rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="mt-6 space-y-4 rounded-2xl bg-slate-50 p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Email
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {formData.email || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Phone
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {formData.phone || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Employee ID
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {formData.employeeId || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Experience
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {formData.experience || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Experience Letter
              </p>

              {experienceLetterInfo?.name ? (
                <div className="mt-1 space-y-2">
                  <p className="text-sm font-medium text-slate-700">
                    {experienceLetterInfo.name}
                  </p>

                  {experienceLetterInfo?.url ? (
                    <a
                      href={experienceLetterInfo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      View uploaded file
                    </a>
                  ) : (
                    <p className="text-xs text-slate-500">
                      Selected file will upload on save.
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-1 text-sm text-slate-700">Not uploaded</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="xl:col-span-2 space-y-6">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">Edit Profile</h3>
            <p className="mt-1 text-sm text-slate-500">
              Update your personal and professional details here.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Employee ID
              </label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                disabled
                readOnly
                className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 outline-none"
              />
              <p className="mt-1 text-xs text-slate-500">
                Employee ID cannot be edited.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Enter specialization"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Experience
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter experience"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Experience Letter <span className="text-slate-400">(Optional)</span>
              </label>

              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Upload PDF, DOC, or DOCX
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      This file is optional. You can upload it now or later.
                    </p>

                    {experienceLetterInfo?.name ? (
                      <p className="mt-2 text-sm text-indigo-600">
                        Selected: {experienceLetterInfo.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <label className="inline-flex cursor-pointer items-center rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                      Choose File
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleExperienceLetterChange}
                        className="hidden"
                      />
                    </label>

                    {experienceLetterInfo?.name ? (
                      <button
                        type="button"
                        onClick={handleRemoveSelectedExperienceLetter}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Reset File
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Bio
              </label>
              <textarea
                rows="5"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write therapist bio"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Cancel
            </button>
          </div>
        </form>

        <form
          onSubmit={handleChangePassword}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">Change Password</h3>
            <p className="mt-1 text-sm text-slate-500">
              Keep your account secure by updating your password regularly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Current Password
              </label>

              <div className="flex rounded-2xl border border-slate-200 focus-within:border-indigo-500">
                <input
                  type={showPasswords.currentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="w-full rounded-l-2xl px-4 py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("currentPassword")}
                  className="rounded-r-2xl px-4 text-sm font-semibold text-slate-600"
                >
                  {showPasswords.currentPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                New Password
              </label>

              <div className="flex rounded-2xl border border-slate-200 focus-within:border-indigo-500">
                <input
                  type={showPasswords.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full rounded-l-2xl px-4 py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="rounded-r-2xl px-4 text-sm font-semibold text-slate-600"
                >
                  {showPasswords.newPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Confirm Password
              </label>

              <div className="flex rounded-2xl border border-slate-200 focus-within:border-indigo-500">
                <input
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="w-full rounded-l-2xl px-4 py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="rounded-r-2xl px-4 text-sm font-semibold text-slate-600"
                >
                  {showPasswords.confirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-600">
              Password should be at least <span className="font-semibold">4 characters</span> long and should not match your current password.
            </p>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={changingPassword}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {changingPassword ? "Updating Password..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TherapistProfile;