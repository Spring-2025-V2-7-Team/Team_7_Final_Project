import API from "./api";

export const register = async (userData) => {
  const res = await API.post("/api/auth/register", userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await API.post("/api/auth/login", credentials);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await API.get("/api/auth/me");
  return res.data;
};

export const logout = async () => {
  return new Promise((resolve) => {
    localStorage.removeItem("authToken");
    setTimeout(() => resolve(true), 200);
  });
};