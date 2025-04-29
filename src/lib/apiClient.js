export const apiClient = {
  async get(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  },

  async post(url, data = {}) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (
        contentType &&
        contentType.includes("application/json") &&
        response.status !== 204
      ) {
        return await response.json();
      }

      return {};
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  },

  async put(url, data = {}) {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (
        contentType &&
        contentType.includes("application/json") &&
        response.status !== 204
      ) {
        return await response.json();
      }

      return {};
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  },
};
