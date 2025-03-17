"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { chats, messages } from "@/lib/dummy-data"
import type { User, Chat } from "@/lib/types"
import { useMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/context/auth-context"
import Sidebar from "@/components/chat/sidebar"
import ChatArea from "@/components/chat/chat-area"
import MobileMenuButton from "@/components/chat/mobile-menu-button"

export default function ChatPage() {
  const { theme, setTheme } = useTheme()
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)
  const isMobile = useMobile()
  const { user: currentUser, logout } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setInterval(() => {
      console.log(currentUser)
    }, 1000)
  }, [])

  // Auto-close sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  // Start a new chat with a user
  const startChat = (user: User) => {
    // Check if chat already exists
    const existingChat = chats.find((chat) => !chat.isGroup && chat.participants.some((p) => p._id === user._id))

    if (existingChat) {
      setSelectedChat(existingChat)
    } else {
      // Create a new chat
      const newChat: Chat = {
        id: `chat-${chats.length + 1}`,
        name: user.username,
        isGroup: false,
        participants: [currentUser!, user], // Current user and selected user
        lastMessage: {
          id: "new",
          content: "Start a conversation",
          senderId: currentUser!._id,
          timestamp: new Date().toISOString(),
        },
      }
      chats.unshift(newChat)
      setSelectedChat(newChat)
    }
    setShowSearch(false)
  }

  // Create a new group chat
  const createGroupChat = (selectedUsers: User[]) => {
    if (selectedUsers.length < 2) return

    const newGroup: Chat = {
      id: `group-${chats.length + 1}`,
      name: `Group with ${selectedUsers.map((u) => u.username).join(", ")}`,
      isGroup: true,
      participants: [currentUser!, ...selectedUsers], // Current user and selected users
      lastMessage: {
        id: "new-group",
        content: "Group created",
        senderId: currentUser!._id,
        timestamp: new Date().toISOString(),
      },
    }

    chats.unshift(newGroup)
    setSelectedChat(newGroup)
    setShowSearch(false)
  }

  if (!currentUser) return null

  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-background/95">
      {/* Mobile menu button */}
      {isMobile && <MobileMenuButton sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}

      {/* Sidebar */}
      <Sidebar
        chats={chats}
        sidebarOpen={sidebarOpen}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        currentUser={currentUser}
        theme={theme}
        setTheme={setTheme}
        mounted={mounted}
        logout={logout}
        startChat={startChat}
        createGroupChat={createGroupChat}
      />

      {/* Chat area */}
      <ChatArea
        selectedChat={selectedChat}
        currentUser={currentUser}
        messages={messages}
        setShowSearch={setShowSearch}
      />
    </div>
  )
}

