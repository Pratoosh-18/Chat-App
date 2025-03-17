"use client"

import { Button } from "@/components/ui/button"
import { Search, Users } from "lucide-react"

interface SidebarFooterProps {
  setShowSearch: (show: boolean) => void
}

export default function SidebarFooter({ setShowSearch }: SidebarFooterProps) {
  return (
    <div className="p-4 border-t border-border/50 flex space-x-2">
      <Button className="flex-1 rounded-full" onClick={() => setShowSearch(true)}>
        <Search className="mr-2 h-4 w-4" />
        Find People
      </Button>
      <Button variant="outline" size="icon" onClick={() => setShowSearch(true)} className="rounded-full">
        <Users size={20} />
      </Button>
    </div>
  )
}

