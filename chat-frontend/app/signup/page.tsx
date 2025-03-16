"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import { Moon, Sun, Upload } from "lucide-react"

export default function SignupPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfilePicture(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" })
      return
    }
    if (password.length < 6) {
      toast({ title: "Password is too short", variant: "destructive" })
      return
    }
    if (!profilePicture) {
      toast({ title: "Profile picture required", variant: "destructive" })
      return
    }
    setIsLoading(true)
    const formData = new FormData()
    formData.append("username", username)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("avatar", profilePicture)

    try {
      const response = await fetch("http://localhost:8000/api/v1/user/register", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) {
        throw new Error("Failed to register")
      }
      toast({ title: "Account created successfully" })
      router.push("/login")
    } catch (error) {
      toast({ title: "Registration failed", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        {mounted && (
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full h-10 w-10">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        )}
      </div>
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">Enter your details to sign up</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 cursor-pointer border" onClick={() => fileInputRef.current?.click()}>
                  <AvatarImage src={preview || ""} />
                  <AvatarFallback>{username.charAt(0).toUpperCase() || <Upload className="h-8 w-8" />}</AvatarFallback>
                </Avatar>
                <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>Upload</Button>
                <Input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfilePictureChange} />
              </div>
              <Label>Username</Label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} required />
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Label>Confirm Password</Label>
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Signing up..." : "Sign up"}</Button>
              <p className="text-center">Already have an account? <Link href="/login" className="text-primary">Login</Link></p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
