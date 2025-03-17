"use client"

import type { Chat, User } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { chats } from "@/lib/dummy-data"

interface ChatListProps {
  chats: Chat[]
  selectedChat: Chat | null
  onSelectChat: (chat: Chat) => void
  currentUser: User
}

export default function ChatList({ chats, selectedChat, onSelectChat, currentUser }: ChatListProps) {
  return (
    <div className="divide-y divide-border/30">
      {chats.map((chat) => {
        // For 1:1 chats, get the other participant
        const otherParticipant = !chat.isGroup ? chat.participants.find((p) => p._id !== currentUser._id) : null

        return (
          <div
            key={chat.id}
            className={cn(
              "flex items-center p-4 cursor-pointer hover:bg-accent/30 transition-all duration-200",
              selectedChat?.id === chat.id && "bg-accent/50",
            )}
            onClick={() => onSelectChat(chat)}
          >
            <div className="relative">
              {chat.isGroup ? (
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              ) : (
                <Avatar className="h-12 w-12 border-2 border-background">
                  <AvatarImage
                    src={
                      otherParticipant?.avatar ||
                      `/placeholder.svg?height=48&width=48&text=${otherParticipant?.username.charAt(0)}`
                    }
                  />
                  <AvatarFallback className="bg-primary/10">{otherParticipant?.username.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></span>
            </div>
            <div className="ml-4 flex-1 overflow-hidden">
              <div className="flex justify-between items-center">
                <h3 className="font-medium truncate">{chat.isGroup ? chat.name : otherParticipant?.username}</h3>
                <span className="text-xs text-muted-foreground">
                  {new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {chat.lastMessage.senderId === currentUser._id
                  ? `You: ${chat.lastMessage.content}`
                  : chat.lastMessage.content}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

