import API from "../../services/api";

export const fetchPosts = async () => {
  const res = await API.get("/posts");
  return res.data;
};

export const createPost = async ({ user_id, content, image_url }) => {
  const res = await API.post("/posts", {
    user_id,
    content,
    image_url,
  });
  return res.data;
};

export const likePost = async (postId) => {
  const res = await API.post(`/posts/${postId}/like`);
  return res.data.likes;
};

export const addComment = async (postId, text) => {
  const res = await API.post(`/posts/${postId}/comments`, { text });
  return res.data;
};

export const fetchComments = async (postId) => {
  const res = await API.get(`/posts/${postId}/comments`);
  return res.data;
};