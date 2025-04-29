import { apiClient } from "./apiClient";

const API_URL = process.env.NEXT_PUBLIC_FORM_API_URL || "http://localhost:8002";

export const formApi = {
  async submitRequest(requestData) {
    const url = `${API_URL}/submit`;
    return apiClient.post(url, requestData);
  },

  async resubmitRequest(requestId) {
    const url = `${API_URL}/resubmit?request_id=${requestId}`;
    return apiClient.post(url);
  },
};
