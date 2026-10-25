import apiClient from "./apiClient";

export const apiCall = async (method, url, { body = {}, params = {}, query = {} } = {}) => {
  try {
    const response = await apiClient({
      method,
      url,
      data: body,       // ✅ request body
      params: { ...params, ...query }, // ✅ query string / URL params
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
