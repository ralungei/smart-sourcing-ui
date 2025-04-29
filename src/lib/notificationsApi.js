import { apiClient } from "./apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const notificationsApi = {
  async getNotifications() {
    const url = `${API_URL}/notifications`;
    return apiClient.get(url);
  },

  async markAsRead(requestId) {
    const url = `${API_URL}/notifications/${requestId}/read`;
    return apiClient.put(url);
  },
};
