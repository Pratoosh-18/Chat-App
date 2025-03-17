"use client"

import { useState } from "react"
import type { Chat, Message, User } from "@/lib/types"
import { messages as allMessages } from "@/lib/dummy-data"
import { useMobile } from "@/hooks/use-mobile"
import ChatHeader from "@/components/chat/chat-header"
import MessageList from "@/components/chat/message-list"
import MessageInput from "@/components/chat/message-input"

interface ChatWindowProps {
  chat: Chat
  messages: Message[]
  currentUser: User
}

export default function ChatWindow({ chat, messages, currentUser }: ChatWindowProps) {
  const [chatMessages, setChatMessages] = useState<Message[]>(messages)
  const isMobile = useMobile()

  // For 1:1 chats, get the other participant
  const otherParticipant = undefined
  // !chat.isGroup ? chat.participants.find((p) => p._id !== currentUser._id) : null

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    const message: Message = {
      id: `msg-${Date.now()}`,
      chatId: chat.id,
      content,
      senderId: currentUser._id,
      timestamp: new Date().toISOString(),
    }

    // Update chat messages
    setChatMessages([...chatMessages, message])

    // Update last message in chat
    chat.lastMessage = {
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      timestamp: message.timestamp,
    }

    // Add to all messages (for persistence during this session)
    allMessages.push(message)
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader chat={chat} otherParticipant={otherParticipant} isMobile={isMobile} />

      <MessageList messages={chatMessages} currentUser={currentUser} chat={chat} />

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}

