"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (message: string) => void
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [newMessage, setNewMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    onSendMessage(newMessage)
    setNewMessage("")
  }

  return (
    <div className="p-4 border-t border-border/50 bg-card/90 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="flex space-x-2">
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
  )
}

