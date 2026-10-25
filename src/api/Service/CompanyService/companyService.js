import apiClient from "./apiClient";

export const getCompanies = () => apiClient.get("/companies");
export const getCompanyById = (id) => apiClient.get(`/companies/${id}`);
export const createCompany = (data) => apiClient.post("/companies", data);
export const updateCompany = (id, data) => apiClient.put(`/companies/${id}`, data);
export const deleteCompany = (id) => apiClient.delete(`/companies/${id}`);
