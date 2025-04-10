import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Avatar,
  Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, addComment } from "../../features/comment/commentSlice";

export default function CommentSection({ postId }) {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");

  const comments = useSelector(
    (state) => state.comments.commentsByPost[postId] || []
  );
  const loading = useSelector((state) => state.comments.loading);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    await dispatch(addComment({ postId, text: newComment.trim() }));
    setNewComment("");
    dispatch(fetchComments(postId));
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
        <Button variant="contained" type="submit" disabled={loading}>
          Post
        </Button>
      </form>

      {comments.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No comments yet.
        </Typography>
      ) : (
        comments.map((comment) => (
          <Box key={comment.id} mb={1}>
            <Divider />
            <Box display="flex" alignItems="center" mt={1}>
              <Link href={`/profile/user-${comment.user_id}`} underline="none">
                <Avatar
                  alt={comment.author}
                  src={comment.avatar_url}
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
              </Link>
              <Box>
                <Typography variant="subtitle2">{comment.author}</Typography>
                <Typography variant="body2">{comment.text}</Typography>
              </Box>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
}