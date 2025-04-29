import { apiClient } from "./apiClient";

const API_URL = process.env.NEXT_PUBLIC_AI_AGENT_API_URL;

export const chatApi = {
  async sendFirstMessage(message) {
    const url = `${API_URL}/request/message`;
    return apiClient.post(url, { message });
  },

  async sendFollowUpMessage(requestId, message) {
    const url = `${API_URL}/request/${requestId}/message`;
    return apiClient.post(url, { message });
  },
};
