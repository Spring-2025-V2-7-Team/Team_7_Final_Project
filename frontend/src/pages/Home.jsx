import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  TextField,
  Autocomplete,
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import { getAllUsers } from "../services/UserService";
import { fetchPostsByUser } from "../features/posts/postAPI";
import PostCard from "../components/posts/PostCard";
import { reportItem } from "../features/moderation/moderationAPI";

export default function Home() {
  const currentUser = useSelector((state) => state.auth.user);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // To re-fetch on route change

  const isViewingOwnProfile =
    !userId || String(currentUser?.id) === String(userId);
  const viewedUser = isViewingOwnProfile
    ? currentUser
    : users.find((u) => String(u.id) === String(userId));

  useEffect(() => {
    getAllUsers().then((res) => setUsers(res.data));
  }, [location]);

  useEffect(() => {
    const userToFetch = userId || currentUser?.id;
    if (userToFetch) {
      fetchPostsByUser(userToFetch)
        .then((res) => setPosts(res.data))
        .catch((err) => {
          console.error("Error fetching posts:", err);
          setPosts([]);
        });
    }
  }, [userId, currentUser]);

  const handleUserSelect = (e, value) => {
    if (value) {
      setSelectedUser(value.id);
      navigate(`/home/${value.id}`);
    }
  };

  const handleReportUser = async () => {
    try {
      await reportItem({
        report_type: "user",
        target_id: viewedUser.id,
        reason: "Inappropriate behavior",
        reported_by: currentUser.id,
      });
      alert("User reported successfully");
    } catch (err) {
      console.error("Error reporting user", err);
      alert("Failed to report user");
    }
  };

  if (!viewedUser) return <div>Loading...</div>;

  return (
    <Box sx={{ maxWidth: "900px", margin: "auto", p: 3 }}>
      {/* Profile Card */}
      <Card sx={{ display: "flex", alignItems: "center", p: 2, mb: 4 }}>
        <Avatar
          src={viewedUser.avatar_url}
          sx={{ width: 80, height: 80, mr: 2 }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5">{viewedUser.name}</Typography>
          {viewedUser.bio && (
            <Typography variant="body2">{viewedUser.bio}</Typography>
          )}
          {viewedUser.interests && (
            <Typography variant="body2" color="text.secondary">
              Interests: {viewedUser.interests}
            </Typography>
          )}
        </CardContent>
        {isViewingOwnProfile ? (
          <Button variant="contained" onClick={() => navigate("/profile")}>
            Edit Profile
          </Button>
        ) : (
          <Tooltip title="Report User">
            <IconButton onClick={handleReportUser}>
              <ReportIcon color="error" />
            </IconButton>
          </Tooltip>
        )}
      </Card>

      {/* User Search Dropdown */}
      <Box sx={{ mb: 4 }}>
        <Autocomplete
          options={users}
          getOptionLabel={(option) => option.name}
          onChange={handleUserSelect}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Avatar
                src={option.avatar_url}
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Select a user" />
          )}
        />
      </Box>

      {/* Posts */}
      <Typography variant="h6" gutterBottom>
        {isViewingOwnProfile ? "Your Posts" : `${viewedUser.name}'s Posts`}
      </Typography>
      <Grid container spacing={2}>
        {(posts || []).map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}