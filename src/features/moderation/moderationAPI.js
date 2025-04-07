let flaggedPosts = [
  { id: 1, content: "Offensive post content", reportedBy: "user123" },
  { id: 2, content: "Spam link here", reportedBy: "user789" },
];

let reportedUsers = [
  { id: 1, name: "ToxicUser42", reason: "Abusive messages" },
  { id: 2, name: "SpamBot99", reason: "Spamming comments" },
];

export const getFlaggedPosts = async () => flaggedPosts;
export const getReportedUsers = async () => reportedUsers;

export const deletePost = async (id) => {
  flaggedPosts = flaggedPosts.filter((p) => p.id !== id);
};

export const approvePost = async (id) => {
  flaggedPosts = flaggedPosts.filter((p) => p.id !== id);
};

export const banUser = async (id) => {
  reportedUsers = reportedUsers.filter((u) => u.id !== id);
};