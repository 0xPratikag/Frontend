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
    const response = await therapistApiClient.put("/me", payload);
    return response.data;
  },

  changePassword: async (payload) => {
    const response = await therapistApiClient.put("/change-password", payload);
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

  return {
    id: nestedEmployee?.id || root?.employeeId || root?.id || "",
    EmployeId: root?.EmployeId || nestedEmployee?.EmployeId || "",
    name: nestedEmployee?.name || root?.name || "",
    email: nestedEmployee?.email || root?.email || "",
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
    hasTherapistProfile: Boolean(root?.hasTherapistProfile),
    raw: root,
  };
};