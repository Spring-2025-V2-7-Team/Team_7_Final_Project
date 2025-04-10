import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { formatDistanceToNow } from "date-fns";

export default function PostCard({ post }) {
  const isValidImageUrl = (url) =>
    typeof url === "string" && url.startsWith("http");

  return (
    <Card sx={{ mb: 2 }}>
      {isValidImageUrl(post.image_url) && (
        <CardMedia
          component="img"
          height="300"
          image={post.image_url}
          alt="Post image"
          sx={{ objectFit: "cover" }}
        />
      )}

      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {post.author || "Anonymous"}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {post.content}
        </Typography>

        <Box mt={1}>
          <LikeButton
            postId={post.id}
            initialLikes={post.like_count}
            initialLiked={post.liked_by_user}
          />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            {post.created_at && !isNaN(new Date(post.created_at))
              ? formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })
              : "Unknown time"}
          </Typography>
        </Box>

        <CommentSection
          postId={post.id}
          initialComments={post.comments || []}
        />
      </CardContent>
    </Card>
  );
}