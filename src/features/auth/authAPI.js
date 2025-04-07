export const login = async ({ email, password }) => {
  return {
    token: "abc123",
    user: {
      id: 1,
      name: "Admin User",
      email,
      role: "admin",
    },
  };
};

export const register = async ({ name, email, password }) => {
  return {
    token: "new-user-token",
    user: {
      id: 1,
      name,
      email,
      role: "user",
    },
  };
};

export const logout = async () => true;

export const getUserByToken = async (token) => {
  if (token === "abc123" || token === "new-user-token") {
    return {
      id: 1,
      name: "Admin User",
      email: "admin@connectwise.com",
      role: "admin",
    };
  }
  throw new Error("Invalid token");
};