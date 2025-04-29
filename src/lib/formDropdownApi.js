import { apiClient } from "./apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const formDropdownApi = {
  async getLocations() {
    const url = `${API_URL}/locations`;
    return apiClient.get(url);
  },

  async getParts() {
    const url = `${API_URL}/parts`;
    return apiClient.get(url);
  },

  async getFormOptions() {
    try {
      const [locationsResponse, partsResponse] = await Promise.all([
        this.getLocations(),
        this.getParts(),
      ]);

      return {
        locations: locationsResponse.items || [],
        parts: partsResponse.items || [],
      };
    } catch (error) {
      console.error("Error fetching form options:", error);
      return {
        locations: [],
        parts: [],
      };
    }
  },
};
