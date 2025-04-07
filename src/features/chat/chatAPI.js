const inboxMock = [
  { id: 101, name: "Alice Smith", lastMessage: "See you later!" },
  { id: 102, name: "Bob Johnson", lastMessage: "Thanks for the info." },
  { id: 103, name: "Carol Brown", lastMessage: "Let's schedule a call." },
];

const messageStore = {
  101: [
    { text: "Hey, how are you?", fromSelf: false },
    { text: "Doing well! You?", fromSelf: true },
  ],
  102: [],
  103: [],
};

export const getMessages = async (userId) => {
  return messageStore[userId] || [];
};

export const sendMessage = async (userId, text) => {
  const msg = { text, fromSelf: true };
  messageStore[userId] = [...(messageStore[userId] || []), msg];
  return msg;
};

export const getInboxUsers = async () => {
  return inboxMock;
};

export const simulateIncomingMessage = async (userId) => {
  const replies = [
    "Got it!",
    "Interesting…",
    "What do you think?",
    "I'll check that out!",
    "Sounds good!",
  ];
  const msg = {
    text: replies[Math.floor(Math.random() * replies.length)],
    fromSelf: false,
  };
  messageStore[userId] = [...(messageStore[userId] || []), msg];
};