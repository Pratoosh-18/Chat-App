import type { User, Chat } from "@/lib/types"
import ChatList from "@/components/chat-list"
import UserSearch from "@/components/user-search"
import SidebarHeader from "./sidebar-header"
import SidebarFooter from "./sidebar-footer"

interface SidebarProps {
    sidebarOpen: boolean
    showSearch: boolean
    setShowSearch: (show: boolean) => void
    selectedChat: Chat | null
    setSelectedChat: (chat: Chat) => void
    currentUser: User
    theme: string | undefined
    setTheme: (theme: string) => void
    mounted: boolean
    logout: () => void
    startChat: (user: User) => void
    createGroupChat: (users: User[]) => void
    chats: Chat[]
}

export default function Sidebar({
    sidebarOpen,
    showSearch,
    setShowSearch,
    selectedChat,
    setSelectedChat,
    currentUser,
    theme,
    setTheme,
    mounted,
    logout,
    startChat,
    createGroupChat,
    chats,
}: SidebarProps) {
    return (
        <div
            className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 fixed md:relative z-40 w-80 h-full bg-card/90 backdrop-blur-sm border-r border-border/50 flex flex-col shadow-lg`}
        >
            <SidebarHeader theme={theme} setTheme={setTheme} mounted={mounted} logout={logout} />

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

            <SidebarFooter setShowSearch={setShowSearch} />
        </div>
    )
}

