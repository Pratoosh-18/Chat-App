import type { Chat, User, Message } from "@/lib/types"
import ChatWindow from "@/components/chat-window"
import EmptyState from "./empty-state"

interface ChatAreaProps {
  selectedChat: Chat | null
  currentUser: User
  messages: Message[]
  setShowSearch: (show: boolean) => void
}

export default function ChatArea({ selectedChat, currentUser, messages, setShowSearch }: ChatAreaProps) {
  return (
    <div className="flex-1 flex flex-col bg-card/80 backdrop-blur-sm">
      {selectedChat ? (
        <ChatWindow
          chat={selectedChat}
          messages={messages.filter((m) => m.chatId === selectedChat.id)}
          currentUser={currentUser}
        />
      ) : (
        <EmptyState setShowSearch={setShowSearch} />
      )}
    </div>
  )
}

