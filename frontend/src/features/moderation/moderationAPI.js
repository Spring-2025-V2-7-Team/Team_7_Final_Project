import API from "../../services/api";

export const getFlaggedPosts = async () => {
  const res = await API.get("/moderation/flagged-posts");
  return res.data;
};

export const getReportedUsers = async () => {
  const res = await API.get("/moderation/reported-users");
  return res.data;
};

export const deletePost = async (id) => {
  await API.delete(`/moderation/delete-post/${id}`);
};

export const approvePost = async (id) => {
  await API.patch(`/moderation/approve-post/${id}`);
};

export const ignoreUser = async (id) => {
  await API.patch(`/moderation/ignore-user/${id}`);
};

export const banUser = async (id) => {
  await API.patch(`/moderation/ban-user/${id}`);
};