import { useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInbox } from '../features/chat/chatSlice';

export default function Inbox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inbox = useSelector((state) => state.chat.inbox);

  useEffect(() => {
    dispatch(fetchInbox());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <Typography variant="h5" gutterBottom>
        Messages
      </Typography>
      <List>
        {inbox.map((chat) => (
          <div key={chat.userId}>
            <ListItem
              onClick={() => navigate(`/chat/${chat.userId}`)}
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <Avatar alt={chat.name} src={chat.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={chat.name}
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {chat.lastMessage}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </div>
        ))}
      </List>
    </div>
  );
}