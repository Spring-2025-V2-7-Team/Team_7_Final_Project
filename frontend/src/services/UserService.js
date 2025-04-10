import API from "./api";

export const fetchProfile = () => API.get("/users/profile");
export const updateProfile = (data) => API.put("/users/profile", data);
export const uploadProfileImage = (formData) =>
  API.post("/users/profile/image", formData);
export const getAllUsers = () => API.get("/users");