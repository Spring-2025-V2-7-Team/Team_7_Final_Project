import { useState, useEffect } from "react";
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  getNotifications,
  markAsRead,
  clearNotifications,
} from "../../features/notifications/notificationAPI";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MailIcon from "@mui/icons-material/Mail";
import { formatDistanceToNow } from "date-fns";

export default function NotificationBell() {
  const getIconForType = (type) => {
    if (type === "like") return <FavoriteIcon color="error" fontSize="small" />;
    if (type === "comment")
      return <ChatBubbleIcon color="primary" fontSize="small" />;
    if (type === "message") return <MailIcon color="action" fontSize="small" />;
    return null;
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleMarkAsRead = async (id) => {
    const updated = await markAsRead(id);
    setNotifications(updated);
  };

  const handleClear = async () => {
    await clearNotifications();
    setNotifications([]);
  };

  return (
    <Box>
      <IconButton onClick={handleOpen} color="inherit">
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ style: { width: 300 } }}
      >
        <Box px={2} pt={1}>
          <Typography variant="subtitle1">Notifications</Typography>
        </Box>
        <Divider />
        {notifications.length === 0 ? (
          <MenuItem disabled>No new notifications</MenuItem>
        ) : (
          notifications.map((n) => (
            <MenuItem
              key={n.id}
              onClick={() => handleMarkAsRead(n.id)}
              selected={!n.read}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {getIconForType(n.type)}
              <Box>
                <Typography variant="body2">{n.text}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(new Date(n.timestamp), {
                    addSuffix: true,
                  })}
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}
        <Divider />
        <Box px={2} pb={1} display="flex" justifyContent="space-between">
          <Button size="small" onClick={handleClear}>
            Clear All
          </Button>
          <Button size="small" onClick={fetchNotifications}>
            Refresh
          </Button>
        </Box>
      </Menu>
    </Box>
  );
}