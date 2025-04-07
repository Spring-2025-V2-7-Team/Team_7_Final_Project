import { useEffect, useState } from "react";
import {
  getFlaggedPosts,
  getReportedUsers,
  deletePost,
  approvePost,
  banUser,
} from "../features/moderation/moderationAPI";

import { Typography, Box, Divider } from "@mui/material";
import FlaggedPostItem from "../components/admin/FlaggedPostItem";
import ReportedUserItem from "../components/admin/ReportedUserItem";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const loadModerationData = async () => {
    const [p, u] = await Promise.all([getFlaggedPosts(), getReportedUsers()]);
    setPosts(p);
    setUsers(u);
  };

  useEffect(() => {
    loadModerationData();
  }, []);

  const handleApprove = async (id) => {
    await approvePost(id);
    loadModerationData();
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    loadModerationData();
  };

  const handleBan = async (id) => {
    await banUser(id);
    loadModerationData();
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Moderation Panel
      </Typography>

      <Divider sx={{ my: 3 }} />
      <Typography variant="h6">Flagged Posts</Typography>
      {posts.map((post) => (
        <FlaggedPostItem
          key={post.id}
          post={post}
          onApprove={handleApprove}
          onDelete={handleDelete}
        />
      ))}

      <Divider sx={{ my: 3 }} />
      <Typography variant="h6">Reported Users</Typography>
      {users.map((user) => (
        <ReportedUserItem key={user.id} user={user} onBan={handleBan} />
      ))}
    </Box>
  );
}