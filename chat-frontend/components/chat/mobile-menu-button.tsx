"use client"

import { X, Menu } from "lucide-react"

interface MobileMenuButtonProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function MobileMenuButton({ sidebarOpen, setSidebarOpen }: MobileMenuButtonProps) {
  return (
    <button
      className="absolute top-4 left-4 z-50 bg-primary/10 rounded-full p-2"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  )
}

