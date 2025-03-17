"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun, LogOut } from "lucide-react"

interface SidebarHeaderProps {
  theme: string | undefined
  setTheme: (theme: string) => void
  mounted: boolean
  logout: () => void
}

export default function SidebarHeader({ theme, setTheme, mounted, logout }: SidebarHeaderProps) {
  return (
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
        <Button variant="ghost" size="icon" onClick={logout} className="rounded-full bg-primary/10 hover:bg-primary/20">
          <LogOut size={20} />
        </Button>
      </div>
    </div>
  )
}

