import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import {
  getUserProfile,
  updateUserProfile,
  updateUserProfileImage,
} from "../features/users/userAPI";

import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function Profile() {
  const user = useSelector(selectUser);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile({
          ...data,
          bio: data.bio || "",
          interests: data.interests || "",
        });
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const { name, bio, interests } = profile;
    try {
      const updated = await updateUserProfile({ name, bio, interests });
      setProfile((prev) => ({ ...prev, ...updated }));
      setEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const { avatarUrl } = await updateUserProfileImage(user.id, formData);
      setProfile((prev) => ({ ...prev, avatarUrl }));
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  if (loading || !profile)
    return (
      <Typography mt={4} align="center">
        Loading profile...
      </Typography>
    );

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Your Profile
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Avatar src={profile.avatarUrl} sx={{ width: 80, height: 80 }} />
        <label htmlFor="upload-avatar">
          <input
            accept="image/*"
            id="upload-avatar"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <IconButton color="primary" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
      </Box>

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={profile.name}
        onChange={handleChange}
        disabled={!editing}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={profile.email}
        disabled
        margin="normal"
      />
      <TextField
        fullWidth
        label="Bio"
        name="bio"
        value={profile.bio}
        onChange={handleChange}
        disabled={!editing}
        margin="normal"
        multiline
        rows={3}
      />
      <TextField
        fullWidth
        label="Interests"
        name="interests"
        value={profile.interests}
        onChange={handleChange}
        disabled={!editing}
        margin="normal"
      />

      {editing ? (
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
          Save Changes
        </Button>
      ) : (
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => setEditing(true)}
        >
          Edit Profile
        </Button>
      )}
    </Box>
  );
}