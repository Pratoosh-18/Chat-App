"use client"

import { useState } from "react"
import type { User } from "@/lib/types"
import { users } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, X, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserSearchProps {
  onSelectUser: (user: User) => void
  onCreateGroup: (users: User[]) => void
  onClose: () => void
  currentUser: User
}

export default function UserSearch({ onSelectUser, onCreateGroup, onClose, currentUser }: UserSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [activeTab, setActiveTab] = useState("individual")

  // Filter out the current user
  const filteredUsers = users
    .filter((user) => user.id !== currentUser.id)
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )

  const toggleUserSelection = (user: User) => {
    if (selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id))
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <h2 className="text-lg font-medium">Find People</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
          <X size={20} />
        </Button>
      </div>

      <Tabs defaultValue="individual" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
        <div className="px-4 pt-4">
          <TabsList className="w-full rounded-full">
            <TabsTrigger value="individual" className="flex-1 rounded-full">
              Individual
            </TabsTrigger>
            <TabsTrigger value="group" className="flex-1 rounded-full">
              Create Group
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email"
              className="pl-10 rounded-full bg-background/50"
            />
          </div>
        </div>

        <TabsContent value="individual" className="flex-1 overflow-y-auto m-0">
          <div className="divide-y divide-border/30">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-4 hover:bg-accent/30 cursor-pointer transition-all duration-200"
                onClick={() => onSelectUser(user)}
              >
                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarImage src={user.avatar || `/placeholder.svg?height=40&width=40&text=${user.name.charAt(0)}`} />
                  <AvatarFallback className="bg-primary/10">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="group" className="flex-1 flex flex-col m-0">
          <div className="flex-1 overflow-y-auto divide-y divide-border/30">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-4 hover:bg-accent/30 cursor-pointer transition-all duration-200"
                onClick={() => toggleUserSelection(user)}
              >
                <Checkbox
                  checked={selectedUsers.some((u) => u.id === user.id)}
                  onCheckedChange={() => toggleUserSelection(user)}
                  className="mr-3"
                />
                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarImage src={user.avatar || `/placeholder.svg?height=40&width=40&text=${user.name.charAt(0)}`} />
                  <AvatarFallback className="bg-primary/10">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            ))}
          </div>

          {activeTab === "group" && (
            <div className="p-4 border-t border-border/50">
              <Button
                className="w-full rounded-full"
                disabled={selectedUsers.length < 2}
                onClick={() => onCreateGroup(selectedUsers)}
              >
                <Users className="mr-2 h-4 w-4" />
                Create Group ({selectedUsers.length} selected)
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

