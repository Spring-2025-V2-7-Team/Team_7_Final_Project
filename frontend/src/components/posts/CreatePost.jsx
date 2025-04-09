import { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";

export default function CreatePost({ onSubmit }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content && !image) return;
    onSubmit({ content, image });
    setContent("");
    setImage(null);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2, mb: 3, border: "1px solid #ddd", borderRadius: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Create a Post
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Stack direction="row" alignItems="center" spacing={2}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <Button type="submit" variant="contained">
          Post
        </Button>
      </Stack>
    </Box>
  );
}