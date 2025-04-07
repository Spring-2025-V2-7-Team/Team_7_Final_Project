import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

export default function PostCard({ post }) {
  return (
    <Card sx={{ mb: 2 }}>
      {post.imageUrl && (
        <CardMedia
          component="img"
          height="300"
          image={post.imageUrl}
          alt="Post image"
        />
      )}
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {post.author || "Anonymous"}
        </Typography>
        <Typography variant="body1">{post.content}</Typography>
      </CardContent>
    </Card>
  );
}