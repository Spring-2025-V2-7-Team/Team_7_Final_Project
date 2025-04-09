import { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { likePost } from "../../features/posts/postAPI";

export default function LikeButton({ postId, initialLikes, initialLiked }) {
  const [liked, setLiked] = useState(initialLiked || false);
  const [likes, setLikes] = useState(Number(initialLikes) || 0);

  const handleToggleLike = async () => {
    const newCount = await likePost(postId);
    setLiked(!liked);
    setLikes(newCount);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={handleToggleLike}>
        {liked ? (
          <FavoriteIcon color="error" className="burst" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>
      <Typography variant="body2">{likes}</Typography>
    </div>
  );
}