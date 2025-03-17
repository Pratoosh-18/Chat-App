import type { User, Chat, Message } from "./types"

// Current user is always the first one
export const users: User[] = [
  {
    _id: "user-1",
    username: "You",
    email: "you@example.com",
    status: "online",
  },
  {
    _id: "user-2",
    username: "John Doe",
    email: "john@example.com",
    status: "online",
  },
  {
    _id: "user-3",
    username: "Jane Smith",
    email: "jane@example.com",
    status: "away",
  },
  {
    _id: "user-4",
    username: "Alex Johnson",
    email: "alex@example.com",
    status: "offline",
  },
  {
    _id: "user-5",
    username: "Sarah Williams",
    email: "sarah@example.com",
    status: "online",
  },
  {
    _id: "user-6",
    username: "Michael Brown",
    email: "michael@example.com",
    status: "online",
  },
  {
    _id: "user-7",
    username: "Emily Davis",
    email: "emily@example.com",
    status: "away",
  },
  {
    _id: "user-8",
    username: "David Wilson",
    email: "david@example.com",
    status: "offline",
  },
]

export const chats: Chat[] = [
  {
    id: "chat-1",
    name: "John Doe",
    isGroup: false,
    participants: [users[0], users[1]],
    lastMessage: {
      id: "msg-1-last",
      content: "Hey, how's it going?",
      senderId: "user-2",
      timestamp: "2023-04-15T10:30:00Z",
    },
  },
  {
    id: "chat-2",
    name: "Jane Smith",
    isGroup: false,
    participants: [users[0], users[2]],
    lastMessage: {
      id: "msg-2-last",
      content: "Can we meet tomorrow?",
      senderId: "user-1",
      timestamp: "2023-04-15T09:15:00Z",
    },
  },
  {
    id: "chat-3",
    name: "Project Team",
    isGroup: true,
    participants: [users[0], users[1], users[2], users[3]],
    lastMessage: {
      id: "msg-3-last",
      content: "I've updated the design files",
      senderId: "user-3",
      timestamp: "2023-04-14T16:45:00Z",
    },
  },
  {
    id: "chat-4",
    name: "Alex Johnson",
    isGroup: false,
    participants: [users[0], users[3]],
    lastMessage: {
      id: "msg-4-last",
      content: "Thanks for your help!",
      senderId: "user-4",
      timestamp: "2023-04-13T14:20:00Z",
    },
  },
  {
    id: "chat-5",
    name: "Friends Group",
    isGroup: true,
    participants: [users[0], users[4], users[5], users[6], users[7]],
    lastMessage: {
      id: "msg-5-last",
      content: "Who's up for dinner this weekend?",
      senderId: "user-5",
      timestamp: "2023-04-12T19:30:00Z",
    },
  },
]

export const messages: Message[] = [
  // Chat 1 - John Doe
  {
    id: "msg-1-1",
    chatId: "chat-1",
    content: "Hi there!",
    senderId: "user-1",
    timestamp: "2023-04-15T10:00:00Z",
  },
  {
    id: "msg-1-2",
    chatId: "chat-1",
    content: "Hey, how's it going?",
    senderId: "user-2",
    timestamp: "2023-04-15T10:30:00Z",
  },
  {
    id: "msg-1-3",
    chatId: "chat-1",
    content: "Pretty good, thanks! Working on a new project.",
    senderId: "user-1",
    timestamp: "2023-04-15T10:32:00Z",
  },
  {
    id: "msg-1-4",
    chatId: "chat-1",
    content: "That sounds interesting. What kind of project?",
    senderId: "user-2",
    timestamp: "2023-04-15T10:35:00Z",
  },

  // Chat 2 - Jane Smith
  {
    id: "msg-2-1",
    chatId: "chat-2",
    content: "Hello Jane, do you have time to discuss the report?",
    senderId: "user-1",
    timestamp: "2023-04-15T09:00:00Z",
  },
  {
    id: "msg-2-2",
    chatId: "chat-2",
    content: "Sure, I'm available after 2 PM today.",
    senderId: "user-3",
    timestamp: "2023-04-15T09:10:00Z",
  },
  {
    id: "msg-2-3",
    chatId: "chat-2",
    content: "Can we meet tomorrow instead? I have a tight schedule today.",
    senderId: "user-1",
    timestamp: "2023-04-15T09:15:00Z",
  },

  // Chat 3 - Project Team (Group)
  {
    id: "msg-3-1",
    chatId: "chat-3",
    content: "Good morning team! Let's discuss our progress.",
    senderId: "user-1",
    timestamp: "2023-04-14T09:00:00Z",
  },
  {
    id: "msg-3-2",
    chatId: "chat-3",
    content: "I've completed the backend integration.",
    senderId: "user-2",
    timestamp: "2023-04-14T09:15:00Z",
  },
  {
    id: "msg-3-3",
    chatId: "chat-3",
    content: "Great job, John! I'm still working on the frontend components.",
    senderId: "user-3",
    timestamp: "2023-04-14T09:30:00Z",
  },
  {
    id: "msg-3-4",
    chatId: "chat-3",
    content: "I'm reviewing the code and will provide feedback by EOD.",
    senderId: "user-4",
    timestamp: "2023-04-14T10:00:00Z",
  },
  {
    id: "msg-3-5",
    chatId: "chat-3",
    content: "I've updated the design files",
    senderId: "user-3",
    timestamp: "2023-04-14T16:45:00Z",
  },

  // Chat 4 - Alex Johnson
  {
    id: "msg-4-1",
    chatId: "chat-4",
    content: "Alex, could you help me with the database query?",
    senderId: "user-1",
    timestamp: "2023-04-13T13:00:00Z",
  },
  {
    id: "msg-4-2",
    chatId: "chat-4",
    content: "Of course, what's the issue you're facing?",
    senderId: "user-4",
    timestamp: "2023-04-13T13:10:00Z",
  },
  {
    id: "msg-4-3",
    chatId: "chat-4",
    content: "I'm trying to optimize a join query but it's taking too long to execute.",
    senderId: "user-1",
    timestamp: "2023-04-13T13:15:00Z",
  },
  {
    id: "msg-4-4",
    chatId: "chat-4",
    content: "Let me take a look. Can you share the query?",
    senderId: "user-4",
    timestamp: "2023-04-13T13:20:00Z",
  },
  {
    id: "msg-4-5",
    chatId: "chat-4",
    content: "Thanks for your help!",
    senderId: "user-4",
    timestamp: "2023-04-13T14:20:00Z",
  },

  // Chat 5 - Friends Group
  {
    id: "msg-5-1",
    chatId: "chat-5",
    content: "Hey everyone! How was your weekend?",
    senderId: "user-1",
    timestamp: "2023-04-12T10:00:00Z",
  },
  {
    id: "msg-5-2",
    chatId: "chat-5",
    content: "It was great! I went hiking with my family.",
    senderId: "user-5",
    timestamp: "2023-04-12T10:15:00Z",
  },
  {
    id: "msg-5-3",
    chatId: "chat-5",
    content: "I stayed home and binged a new series. So relaxing!",
    senderId: "user-6",
    timestamp: "2023-04-12T10:30:00Z",
  },
  {
    id: "msg-5-4",
    chatId: "chat-5",
    content: "I had to work, unfortunately. But I'm free next weekend!",
    senderId: "user-7",
    timestamp: "2023-04-12T11:00:00Z",
  },
  {
    id: "msg-5-5",
    chatId: "chat-5",
    content: "Who's up for dinner this weekend?",
    senderId: "user-5",
    timestamp: "2023-04-12T19:30:00Z",
  },
]

