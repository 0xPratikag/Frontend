import { therapistApiClient } from "../utils/apiClient";

export const therapistAuthApi = {
  login: async (payload) => {
    const response = await therapistApiClient.post("/login", payload);
    return response.data;
  },

  getProfile: async () => {
    const response = await therapistApiClient.get("/me");
    return response.data;
  },

  updateProfile: async (payload) => {
    const isFormData = payload instanceof FormData;

    const response = await therapistApiClient.put("/me", payload, {
      headers: isFormData
        ? {
            "Content-Type": "multipart/form-data",
          }
        : {},
    });

    return response.data;
  },

  changePassword: async (payload) => {
    const response = await therapistApiClient.put("/change-password", payload);
    return response.data;
  },

  uploadExperienceLetter: async (payload) => {
    const response = await therapistApiClient.post(
      "/me/experience-letter",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  removeExperienceLetter: async () => {
    const response = await therapistApiClient.delete("/me/experience-letter");
    return response.data;
  },
};

export const therapistStorage = {
  setSession: ({ token, user }) => {
    localStorage.setItem("therapistToken", token);
    localStorage.setItem("therapistUser", JSON.stringify(user));
  },

  updateUser: (user) => {
    localStorage.setItem("therapistUser", JSON.stringify(user));
  },

  clearSession: () => {
    localStorage.removeItem("therapistToken");
    localStorage.removeItem("therapistUser");
  },

  getToken: () => {
    return localStorage.getItem("therapistToken");
  },

  getUser: () => {
    const raw = localStorage.getItem("therapistUser");
    return raw ? JSON.parse(raw) : null;
  },
};

export const normalizeTherapistProfile = (payload) => {
  const root = payload?.data || payload?.user || payload || {};
  const nestedEmployee = root?.employee || {};

  const profilePicValue =
    root?.profilePic ||
    root?.avatar ||
    root?.image ||
    nestedEmployee?.profilePic ||
    "";

  const experienceLetterValue =
    root?.experienceLetter || nestedEmployee?.experienceLetter || null;

  const experienceLetterUrl =
    typeof experienceLetterValue === "string"
      ? experienceLetterValue
      : experienceLetterValue?.url ||
        root?.experienceLetterUrl ||
        nestedEmployee?.experienceLetterUrl ||
        "";

  const experienceLetterName =
    experienceLetterValue?.name ||
    experienceLetterValue?.originalName ||
    root?.experienceLetterName ||
    nestedEmployee?.experienceLetterName ||
    "";

  return {
    id: nestedEmployee?.id || root?.employeeId || root?.id || "",
    EmployeId: root?.EmployeId || nestedEmployee?.EmployeId || "",
    name: nestedEmployee?.name || root?.name || "",
    email: nestedEmployee?.email || root?.email || "",
    phone: nestedEmployee?.phone || root?.phone || "",
    location: nestedEmployee?.location || root?.location || "",
    machineEmpId: nestedEmployee?.machineEmpId || root?.machineEmpId || "",
    roleName: nestedEmployee?.roleName || root?.roleName || "",
    branchName: nestedEmployee?.branchName || root?.branchName || "",
    specialization: root?.specialization || "",
    therapistType: root?.therapistType || "",
    experience:
      root?.experience !== undefined && root?.experience !== null
        ? String(root.experience)
        : "",
    fees:
      root?.fees !== undefined && root?.fees !== null
        ? String(root.fees)
        : "",
    bio: root?.bio || "",
    profilePic: profilePicValue,
    experienceLetterUrl,
    experienceLetterName,
    hasTherapistProfile: Boolean(root?.hasTherapistProfile),
    raw: root,
  };
};