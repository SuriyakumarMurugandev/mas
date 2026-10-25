import { apiCall } from "../../apiHelper";

export const signup = (data) => apiCall("post", "/auth/signup", { body: data });
export const login = (data) => apiCall("post", "/auth/login", { body: data });
export const forgotPassword = (email) => apiCall("post", "/auth/forgot-password", { body: { email } });
export const resetPassword = (token, newPassword) => apiCall("post", `/auth/reset-password/${token}`, { body: { password: newPassword } });
export const register = (data) => apiCall("post", "/register", { body: data });