let notifications = [
  {
    id: 1,
    type: "like",
    text: "Alice liked your post",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 min ago
  },
  {
    id: 2,
    type: "comment",
    text: 'Bob commented: "Nice!"',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 min ago
  },
  {
    id: 3,
    type: "message",
    text: "New message from Carol",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 min ago
  },
];

export const getNotifications = async () => {
  return notifications;
};

export const markAsRead = async (id) => {
  notifications = notifications.map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  return notifications;
};

export const clearNotifications = async () => {
  notifications = [];
  return notifications;
};