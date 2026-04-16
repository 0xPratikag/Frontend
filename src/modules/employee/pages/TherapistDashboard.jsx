import React, { useEffect, useState } from "react";
import TherapistProfilePanel from "../../../components/therapist/TherapistProfilePanel";
import {
  normalizeTherapistProfile,
  therapistAuthApi,
  therapistStorage,
} from "../../../services/therapistAuthApi";

const TherapistDashboard = () => {
  const [profile, setProfile] = useState(therapistStorage.getUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setError("");
      const response = await therapistAuthApi.getProfile();
      const normalized = normalizeTherapistProfile(response);

      setProfile(response?.data || response?.user || response);

      therapistStorage.updateUser({
        ...therapistStorage.getUser(),
        ...normalized.raw,
        name: normalized.name,
        email: normalized.email,
        EmployeId: normalized.EmployeId,
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm">
          Loading profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm font-medium text-red-700">
        {error}
      </div>
    );
  }

  return (
    <TherapistProfilePanel
      profile={profile}
      onProfileRefresh={fetchProfile}
    />
  );
};

export default TherapistDashboard;