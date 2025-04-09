import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getMessages, sendMessage } from "../features/chat/chatAPI";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Divider,
} from "@mui/material";

export default function ChatRoom() {
  const { userId } = useParams();
  const { currentUser } = useAuth(); 
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messageEndRef = useRef(null);

  useEffect(() => {
    const loadChat = async () => {
      const msgs = await getMessages(userId);
      const formatted = msgs.map((m) => ({
        ...m,
        fromSelf: m.sender_id === currentUser?.id,
      }));
      setMessages(formatted);
    };
    loadChat();
  }, [userId, currentUser]);

  useEffect(() => {
    console.log(currentUser);
    const interval = setInterval(async () => {
      const updated = await getMessages(userId);
      const formatted = updated.map((m) => ({
        ...m,
        fromSelf: Number(m.sender_id) === Number(currentUser?.id),
      }));
      setMessages(formatted);
    }, 5000);

    return () => clearInterval(interval);
  }, [userId, currentUser]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;
    const newMsg = await sendMessage(userId, text.trim());
    setMessages((prev) => [...prev, { ...newMsg, fromSelf: true }]);
    setText("");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Chat with User {userId}
      </Typography>
      <Divider />
      <List sx={{ maxHeight: "400px", overflowY: "auto", mt: 2 }}>
        {messages.map((msg, index) => (
          <ListItem
            key={index}
            sx={{ justifyContent: msg.fromSelf ? "flex-end" : "flex-start" }}
          >
            <ListItemText
              primary={msg.text}
              sx={{
                maxWidth: "70%",
                backgroundColor: msg.fromSelf ? "#d1e7dd" : "#f8d7da",
                padding: "0.5rem 1rem",
                borderRadius: "10px",
              }}
            />
          </ListItem>
        ))}
        <div ref={messageEndRef} />
      </List>

      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <TextField
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a message..."
          size="small"
        />
        <Button variant="contained" onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  );
}