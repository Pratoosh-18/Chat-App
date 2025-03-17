"use client"

import type { Chat, User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Info, ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatHeaderProps {
  chat: Chat
  otherParticipant: User | undefined
  isMobile: boolean
}

export default function ChatHeader({ chat, otherParticipant, isMobile }: ChatHeaderProps) {
  return (
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
                `/placeholder.svg?height=40&width=40&text=${otherParticipant?.username.charAt(0)}`
              }
            />
            <AvatarFallback className="bg-primary/10">{otherParticipant?.username.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        <div className="ml-3">
          <h2 className="font-medium">{chat.isGroup ? chat.name : otherParticipant?.username}</h2>
          <p className="text-xs text-muted-foreground">
            {chat.isGroup ? `${chat.participants.length} members` : "Online"}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 hover:bg-primary/20">
        <Info size={20} />
      </Button>
    </div>
  )
}

