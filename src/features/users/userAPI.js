const dummyDB = {
  1: {
    id: 1,
    name: "Admin User",
    email: "admin@connectwise.com",
    avatarUrl: "",
    bio: "Managing things",
    interests: "tech, ai"
  }
};

export const getUserProfile = async (id) => {
  return dummyDB[id] || null;
};

export const updateUserProfile = async (updated) => {
  dummyDB[updated.id] = { ...dummyDB[updated.id], ...updated };
  return dummyDB[updated.id];
};

export const updateUserProfileImage = async (id, formData) => {
  const url = URL.createObjectURL(formData.get("avatar"));
  dummyDB[id].avatarUrl = url;
  return { avatarUrl: url };
};