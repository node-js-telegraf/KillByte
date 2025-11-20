"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { User, Shield, Clock, Calendar, LogOut, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [authenticated, setAuthenticated] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Password change form
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    const userDataString = localStorage.getItem("userData")

    if (!jwt || !userDataString) {
      router.push("/")
    } else {
      setAuthenticated(true)
      setUserData(JSON.parse(userDataString))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("jwt")
    localStorage.removeItem("userKey")
    localStorage.removeItem("userData")
    router.push("/")
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    if (newPassword !== confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Новые пароли не совпадают",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (newPassword.length < 6 || newPassword.length > 30) {
      toast({
        title: "Ошибка",
        description: "Пароль должен быть от 6 до 30 символов",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
          currentPassword,
          newPassword,
        }),
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Пароль изменен",
        })
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        throw new Error("Failed to change password")
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить пароль",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated || !userData) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
      <div className="fixed inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />

      <div className="relative z-10">
        {/* Header with Mobile Menu */}
        <header className="border-b border-white/5 backdrop-blur-xl bg-black/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/killbyte-logo.png" alt="KillByte" width={40} height={40} className="w-10 h-10" />
                <span className="text-xl font-bold tracking-tight">KILLBYTE</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/panel" className="text-sm hover:text-red-400 transition-colors">
                  Панель
                </Link>
                <Link href="/profile" className="text-sm text-red-400 transition-colors">
                  Профиль
                </Link>
                <Link href="/powerproofs" className="text-sm hover:text-red-400 transition-colors">
                  Powerproofs
                </Link>
                {userData.plan === "admin" || userData.plan === "owner" ? (
                  <Link href="/admin/methods" className="text-sm hover:text-red-400 transition-colors">
                    Админ
                  </Link>
                ) : null}
                <Button variant="outline" size="sm" onClick={handleLogout} className="border-zinc-700 bg-transparent">
                  <LogOut className="w-4 h-4 mr-2" />
                  Выход
                </Button>
              </nav>

              {/* Mobile Menu Button */}
              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <nav className="md:hidden py-4 border-t border-white/5 flex flex-col gap-4">
                <Link href="/panel" className="text-sm hover:text-red-400 transition-colors py-2">
                  Панель
                </Link>
                <Link href="/profile" className="text-sm text-red-400 py-2">
                  Профиль
                </Link>
                <Link href="/powerproofs" className="text-sm hover:text-red-400 transition-colors py-2">
                  Powerproofs
                </Link>
                {userData.plan === "admin" || userData.plan === "owner" ? (
                  <Link href="/admin/methods" className="text-sm hover:text-red-400 transition-colors py-2">
                    Админ
                  </Link>
                ) : null}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-zinc-700 justify-start w-fit bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Выход
                </Button>
              </nav>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Account Details */}
            <Card className="bg-zinc-900/50 border-zinc-800 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold">Данные аккаунта</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                  <div className="text-zinc-400 text-sm mb-1">Пользователь</div>
                  <div className="text-xl font-semibold">{userData.username}</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                  <div className="text-zinc-400 text-sm mb-1 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Тариф
                  </div>
                  <div className="text-xl font-semibold text-red-400">{userData.plan}</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                  <div className="text-zinc-400 text-sm mb-1 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Макс. время атаки
                  </div>
                  <div className="text-xl font-semibold">{userData.maxDuration}s</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                  <div className="text-zinc-400 text-sm mb-1">Одновременных атак</div>
                  <div className="text-xl font-semibold">{userData.maxConcurrent}</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700 md:col-span-2">
                  <div className="text-zinc-400 text-sm mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Истечение тарифа
                  </div>
                  <div className="text-xl font-semibold">{userData.expiry}</div>
                </div>
              </div>
            </Card>

            {/* Change Password */}
            <Card className="bg-zinc-900/50 border-zinc-800 p-8">
              <h2 className="text-2xl font-bold mb-6">Изменить пароль</h2>
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current">Текущий пароль</Label>
                  <Input
                    id="current"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">Новый пароль</Label>
                  <Input
                    id="new"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Подтвердите новый пароль</Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 border-0 h-12">
                  {loading ? "Обновление..." : "Обновить пароль"}
                </Button>
              </form>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
