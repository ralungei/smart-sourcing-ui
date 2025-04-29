import { apiClient } from "./apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const requestsApi = {
  async getRequests(offset = 0, limit = 10, filter = "ALL") {
    const url = `${API_URL}/requests?offset=${offset}&limit=${limit}&filter=${filter}`;
    return apiClient.get(url);
  },

  async getRequestsCounts() {
    const url = `${API_URL}/requests/counts`;
    return apiClient.get(url);
  },
};
