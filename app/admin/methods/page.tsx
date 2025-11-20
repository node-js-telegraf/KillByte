"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Settings, Plus, Trash2, LogOut, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AdminMethodsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [authenticated, setAuthenticated] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [methods, setMethods] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Form states
  const [methodName, setMethodName] = useState("")
  const [apiUrl, setApiUrl] = useState("")
  const [editingMethod, setEditingMethod] = useState<any>(null)

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    const userDataString = localStorage.getItem("userData")

    if (!jwt || !userDataString) {
      router.push("/")
      return
    }

    const user = JSON.parse(userDataString)
    if (user.plan !== "admin" && user.plan !== "owner") {
      router.push("/panel")
      return
    }

    setAuthenticated(true)
    setUserData(user)
    loadMethods()
  }, [router])

  const loadMethods = async () => {
    try {
      const response = await fetch("/api/methods")
      if (response.ok) {
        const data = await response.json()
        setMethods(data)
      }
    } catch (error) {
      console.error("Failed to load methods", error)
    }
  }

  const handleAddMethod = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: methodName, api: apiUrl }),
      })

      if (response.ok) {
        toast({ title: "Успешно", description: "Метод добавлен" })
        setMethodName("")
        setApiUrl("")
        loadMethods()
      } else {
        throw new Error("Failed to add method")
      }
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось добавить метод", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMethod = async (method: string) => {
    if (!confirm("Удалить этот метод?")) return

    try {
      const response = await fetch(`/api/methods?method=${method}`, { method: "DELETE" })
      if (response.ok) {
        toast({ title: "Успешно", description: "Метод удален" })
        loadMethods()
      }
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось удалить метод", variant: "destructive" })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt")
    localStorage.removeItem("userKey")
    localStorage.removeItem("userData")
    router.push("/")
  }

  if (!authenticated) return null

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
      <div className="fixed inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-xl bg-black/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/killbyte-logo.png" alt="KillByte" width={40} height={40} className="w-10 h-10" />
                <span className="text-xl font-bold tracking-tight">KILLBYTE ADMIN</span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                <Link href="/panel" className="text-sm hover:text-red-400 transition-colors">
                  Панель
                </Link>
                <Link href="/profile" className="text-sm hover:text-red-400 transition-colors">
                  Профиль
                </Link>
                <Link href="/admin/methods" className="text-sm text-red-400">
                  Методы
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="border-zinc-700 bg-transparent">
                  <LogOut className="w-4 h-4 mr-2" />
                  Выход
                </Button>
              </nav>

              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <nav className="md:hidden py-4 border-t border-white/5 flex flex-col gap-4">
                <Link href="/panel" className="text-sm hover:text-red-400 py-2">
                  Панель
                </Link>
                <Link href="/profile" className="text-sm hover:text-red-400 py-2">
                  Профиль
                </Link>
                <Link href="/admin/methods" className="text-sm text-red-400 py-2">
                  Методы
                </Link>
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

        <main className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Add Method */}
            <Card className="bg-zinc-900/50 border-zinc-800 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold">Добавить новый метод</h2>
              </div>
              <form onSubmit={handleAddMethod} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="method">Название метода</Label>
                    <Input
                      id="method"
                      value={methodName}
                      onChange={(e) => setMethodName(e.target.value)}
                      placeholder="GET"
                      required
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="api">API URL</Label>
                    <Input
                      id="api"
                      value={apiUrl}
                      onChange={(e) => setApiUrl(e.target.value)}
                      placeholder="http://api.example.com/attack"
                      required
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 border-0">
                  {loading ? "Добавление..." : "Добавить метод"}
                </Button>
              </form>
            </Card>

            {/* Methods List */}
            <Card className="bg-zinc-900/50 border-zinc-800 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold">Текущие методы</h2>
              </div>
              <div className="space-y-4">
                {methods.map((method, i) => (
                  <div
                    key={i}
                    className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-mono text-red-400 font-semibold">{method.method}</div>
                      <div className="text-sm text-zinc-400 break-all">{method.api}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/30 hover:border-red-500 text-red-400 bg-transparent"
                      onClick={() => handleDeleteMethod(method.method)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {methods.length === 0 && <div className="text-center text-zinc-500 py-8">Нет методов</div>}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
