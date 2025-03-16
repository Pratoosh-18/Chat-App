"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import ChatList from "@/components/chat-list"
import ChatWindow from "@/components/chat-window"
import UserSearch from "@/components/user-search"
import { chats, messages } from "@/lib/dummy-data"
import type { User, Chat } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Users, MessageSquare, Search, Menu, X, LogOut } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/context/auth-context"

export default function ChatPage() {
  const { theme, setTheme } = useTheme()
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)
  const isMobile = useMobile()
  const { user: currentUser, logout } = useAuth()

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
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
    const existingChat = chats.find((chat) => !chat.isGroup && chat.participants.some((p) => p.id === user.id))

    if (existingChat) {
      setSelectedChat(existingChat)
    } else {
      // Create a new chat
      const newChat: Chat = {
        id: `chat-${chats.length + 1}`,
        name: user.name,
        isGroup: false,
        participants: [currentUser!, user], // Current user and selected user
        lastMessage: {
          id: "new",
          content: "Start a conversation",
          senderId: currentUser!.id,
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
      name: `Group with ${selectedUsers.map((u) => u.name).join(", ")}`,
      isGroup: true,
      participants: [currentUser!, ...selectedUsers], // Current user and selected users
      lastMessage: {
        id: "new-group",
        content: "Group created",
        senderId: currentUser!.id,
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
      {isMobile && (
        <button
          className="absolute top-4 left-4 z-50 bg-primary/10 rounded-full p-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 fixed md:relative z-40 w-80 h-full bg-card/90 backdrop-blur-sm border-r border-border/50 flex flex-col shadow-lg`}
      >
        <div className="p-4 border-b border-border/50 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">ChatApp</h1>
          <div className="flex space-x-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full bg-primary/10 hover:bg-primary/20"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="rounded-full bg-primary/10 hover:bg-primary/20"
            >
              <LogOut size={20} />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {showSearch ? (
            <UserSearch
              onSelectUser={startChat}
              onCreateGroup={createGroupChat}
              onClose={() => setShowSearch(false)}
              currentUser={currentUser}
            />
          ) : (
            <ChatList
              chats={chats}
              selectedChat={selectedChat}
              onSelectChat={setSelectedChat}
              currentUser={currentUser}
            />
          )}
        </div>

        <div className="p-4 border-t border-border/50 flex space-x-2">
          <Button className="flex-1 rounded-full" onClick={() => setShowSearch(true)}>
            <Search className="mr-2 h-4 w-4" />
            Find People
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setShowSearch(true)
            }}
            className="rounded-full"
          >
            <Users size={20} />
          </Button>
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col bg-card/80 backdrop-blur-sm">
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            messages={messages.filter((m) => m.chatId === selectedChat.id)}
            currentUser={currentUser}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
              <MessageSquare size={64} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to ChatApp</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Connect with friends, family, and colleagues. Start a conversation or join a group chat.
            </p>
            <Button onClick={() => setShowSearch(true)} className="rounded-full px-6">
              <Search className="mr-2 h-4 w-4" />
              Find People
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

