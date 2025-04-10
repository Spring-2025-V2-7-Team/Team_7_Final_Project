import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { formatDistanceToNow } from "date-fns";
import ReportIcon from "@mui/icons-material/Report";
import { reportItem } from "../../features/moderation/moderationAPI";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function PostCard({ post }) {
  const currentUser = useSelector((state) => state.auth.user);
  const isValidImageUrl = (url) =>
    typeof url === "string" && url.startsWith("http");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleReportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReportReason = async (reason) => {
    try {
      await reportItem({
        report_type: "post",
        target_id: post.id,
        reason,
        reported_by: currentUser.id,
      });
      alert("Post reported successfully.");
    } catch (err) {
      console.error("Error reporting post:", err);
      alert("Failed to report post.");
    } finally {
      handleClose();
    }
  };

  const reportReasons = [
    "Spam",
    "Harassment",
    "Inappropriate content",
    "Hate speech",
    "Other",
  ];

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
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" color="text.secondary">
            {post.author || "Anonymous"}
          </Typography>

          <Tooltip title="Report Post">
            <IconButton size="small" onClick={handleReportClick}>
              <ReportIcon fontSize="small" color="error" />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {reportReasons.map((reason) => (
              <MenuItem key={reason} onClick={() => handleReportReason(reason)}>
                {reason}
              </MenuItem>
            ))}
          </Menu>
        </Box>

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