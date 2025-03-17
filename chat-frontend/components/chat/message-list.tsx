import type { Chat, Message, User } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MessageListProps {
  messages: Message[]
  currentUser: User
  chat: Chat
}

export default function MessageList({ messages, currentUser, chat }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.senderId === currentUser._id
        const sender = chat.participants.find((p) => p._id === message.senderId)

        return (
          <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
            <div className="flex items-end gap-2 max-w-[80%]">
              {!isCurrentUser && chat.isGroup && (
                <Avatar className="h-8 w-8 mb-1 border-2 border-background">
                  <AvatarImage
                    src={sender?.avatar || `/placeholder.svg?height=32&width=32&text=${sender?.username.charAt(0)}`}
                  />
                  <AvatarFallback className="bg-primary/10">{sender?.username.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div>
                {!isCurrentUser && chat.isGroup && (
                  <p className="text-xs text-muted-foreground ml-1 mb-1">{sender?.username}</p>
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
  )
}

