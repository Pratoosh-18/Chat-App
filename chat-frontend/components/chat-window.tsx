"use client"

import type React from "react"

import { useState } from "react"
import type { Chat, Message, User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Info, ArrowLeft } from "lucide-react"
import { messages as allMessages } from "@/lib/dummy-data"
import { useMobile } from "@/hooks/use-mobile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatWindowProps {
  chat: Chat
  messages: Message[]
  currentUser: User
}

export default function ChatWindow({ chat, messages, currentUser }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<Message[]>(messages)
  const isMobile = useMobile()

  // For 1:1 chats, get the other participant
  const otherParticipant = !chat.isGroup ? chat.participants.find((p) => p.id !== currentUser.id) : null

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: `msg-${Date.now()}`,
      chatId: chat.id,
      content: newMessage,
      senderId: currentUser.id,
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

    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-4 border-b border-border/50 flex items-center bg-card/90 backdrop-blur-sm shadow-sm">
        {isMobile && (
          <Button variant="ghost" size="icon" className="mr-2 rounded-full" onClick={() => window.history.back()}>
            <ArrowLeft size={20} />
          </Button>
        )}
        <div className="flex items-center flex-1">
          {chat.isGroup ? (
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Info className="h-5 w-5 text-primary" />
            </div>
          ) : (
            <Avatar className="h-10 w-10 border-2 border-background">
              <AvatarImage
                src={
                  otherParticipant?.avatar ||
                  `/placeholder.svg?height=40&width=40&text=${otherParticipant?.name.charAt(0)}`
                }
              />
              <AvatarFallback className="bg-primary/10">{otherParticipant?.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <div className="ml-3">
            <h2 className="font-medium">{chat.isGroup ? chat.name : otherParticipant?.name}</h2>
            <p className="text-xs text-muted-foreground">
              {chat.isGroup ? `${chat.participants.length} members` : "Online"}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 hover:bg-primary/20">
          <Info size={20} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((message) => {
          const isCurrentUser = message.senderId === currentUser.id
          const sender = chat.participants.find((p) => p.id === message.senderId)

          return (
            <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
              <div className="flex items-end gap-2 max-w-[80%]">
                {!isCurrentUser && chat.isGroup && (
                  <Avatar className="h-8 w-8 mb-1 border-2 border-background">
                    <AvatarImage
                      src={sender?.avatar || `/placeholder.svg?height=32&width=32&text=${sender?.name.charAt(0)}`}
                    />
                    <AvatarFallback className="bg-primary/10">{sender?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  {!isCurrentUser && chat.isGroup && (
                    <p className="text-xs text-muted-foreground ml-1 mb-1">{sender?.name}</p>
                  )}
                  <div
                    className={`p-3 rounded-2xl ${
                      isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                    } shadow-sm`}
                  >
                    <p>{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-1">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-border/50 bg-card/90 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-background/50 focus-visible:ring-primary"
          />
          <Button type="submit" size="icon" className="rounded-full">
            <Send size={20} />
          </Button>
        </form>
      </div>
    </div>
  )
}

