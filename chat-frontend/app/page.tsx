import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the login page instead of chat
  redirect("/login")
}

