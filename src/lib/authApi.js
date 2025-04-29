import { apiClient } from "./apiClient";

export const authApi = {
  async login(username, password) {
    return apiClient.post("/api/auth/login", { username, password });
  },

  async logout() {
    return apiClient.post("/api/auth/logout");
  },
};
