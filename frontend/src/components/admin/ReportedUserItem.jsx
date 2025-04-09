import React from "react";
import { Card, CardContent, Typography, Button, Avatar } from "@mui/material";

export default function ReportedUserItem({ user, onBan, onIgnore }) {
  return (
    <Card sx={{ mb: 2, display: "flex", alignItems: "center", p: 2 }}>
      <Avatar src={user.avatar_url} alt={user.name} sx={{ mr: 2 }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </CardContent>

      <Button
        variant="outlined"
        color="warning"
        onClick={() => onIgnore(user.id)}
        sx={{ mr: 1 }}
      >
        Ignore
      </Button>

      <Button variant="contained" color="error" onClick={() => onBan(user.id)}>
        Ban
      </Button>
    </Card>
  );
}