import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import LikeButton from "./LikeButton";
import CommentSection from './CommentSection';
import { formatDistanceToNow } from 'date-fns';


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
        <Typography variant="body1" gutterBottom>
          {post.content}
        </Typography>

        <Box mt={1}>
          <LikeButton postId={post.id} initialLikes={post.likes || 0} />
          <Typography variant="caption" color="text.secondary">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </Typography>
        </Box>
        <CommentSection postId={post.id} initialComments={post.comments || []} />
      </CardContent>
    </Card>
  );
}