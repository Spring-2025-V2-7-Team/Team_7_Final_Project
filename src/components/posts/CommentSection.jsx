import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Avatar,
  Link,
} from "@mui/material";
import { addComment } from "../../features/posts/postAPI";

const randomProfileLink = () => {
  const id = Math.floor(Math.random() * 1000);
  return `/profile/user-${id}`;
};

const randomAvatar = () => {
  return `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70) + 1}`;
};

export default function CommentSection({ postId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = await addComment(postId, newComment.trim());
    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle2" gutterBottom>
        Comments
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
      >
        <TextField
          size="small"
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <Button variant="contained" type="submit">
          Post
        </Button>
      </form>

      {comments.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No comments yet.
        </Typography>
      ) : (
        comments.map((comment, idx) => (
          <Box key={idx} mb={1}>
            <Divider />
            <Box display="flex" alignItems="center" mt={1}>
              <Link href={randomProfileLink()} underline="none">
                <Avatar
                  alt="User"
                  src={randomAvatar()}
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
              </Link>
              <Typography variant="body2">{comment.text}</Typography>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
}