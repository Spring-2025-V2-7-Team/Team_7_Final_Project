import { useEffect, useState } from "react";
import { getInboxUsers } from "../features/chat/chatAPI";
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Inbox() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInbox = async () => {
      const data = await getInboxUsers();
      setUsers(data);
    };
    fetchInbox();
  }, []);

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Your Messages
      </Typography>
      <List>
        {users.map((user) => (
          <ListItemButton
            key={user.id}
            onClick={() => navigate(`/chat/${user.id}`)}
          >
            <ListItemText
              primary={user.name}
              secondary={`Last message: ${user.lastMessage}`}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}