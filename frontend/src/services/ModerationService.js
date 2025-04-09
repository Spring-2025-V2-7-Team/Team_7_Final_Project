import API from "./api";

export const getFlaggedPosts = async () => {
  const res = await API.get("/moderation/flagged-posts");
  return res.data;
};

export const getReportedUsers = async () => {
  const res = await API.get("/moderation/reported-users");
  return res.data;
};

export const approvePost = async (postId) => {
  await API.patch(`/moderation/approve-post/${postId}`);
};

export const deletePost = async (postId) => {
  await API.delete(`/moderation/delete-post/${postId}`);
};

export const ignoreUser = async (userId) => {
  await API.patch(`/moderation/ignore-user/${userId}`);
};