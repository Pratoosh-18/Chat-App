"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare, Search } from "lucide-react"

interface EmptyStateProps {
  setShowSearch: (show: boolean) => void
}

export default function EmptyState({ setShowSearch }: EmptyStateProps) {
  return (
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
  )
}

