export interface User {
  _id: string
  username: string
  email: string
  avatar?: string
  status?: "online" | "offline" | "away"
  token?: string
}

export interface MessagePreview {
  id: string
  content: string
  senderId: string
  timestamp: string
}

export interface Chat {
  id: string
  name: string
  isGroup: boolean
  participants: User[]
  lastMessage: MessagePreview
}

export interface Message {
  id: string
  chatId: string
  content: string
  senderId: string
  timestamp: string
}

