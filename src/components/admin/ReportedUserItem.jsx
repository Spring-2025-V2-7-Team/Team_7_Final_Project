import { Box, Typography, Button } from "@mui/material";

export default function ReportedUserItem({ user, onBan }) {
  return (
    <Box sx={{ border: "1px solid #ccc", p: 2, mb: 2 }}>
      <Typography variant="body1">{user.name}</Typography>
      <Typography variant="caption" color="text.secondary">
        Reason: {user.reason}
      </Typography>
      <Box mt={1}>
        <Button
          variant="contained"
          color="error"
          onClick={() => onBan(user.id)}
        >
          Ban User
        </Button>
      </Box>
    </Box>
  );
}