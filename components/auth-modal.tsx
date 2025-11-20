"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { User, Lock, Mail, Sparkles, Shield, Terminal, Eye, EyeOff } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "login" | "register"
}

export function AuthModal({ open, onOpenChange, mode: initialMode }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()
  const [displayText, setDisplayText] = useState("")
  const fullText = mode === "login" ? "root@killbyte:~$" : "root@killbyte:~$ register"

  useEffect(() => {
    let index = 0
    setDisplayText("")
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [mode, fullText])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === "register") {
        if (password !== confirmPassword) {
          toast({
            title: t("error"),
            description: t("passwordMismatch"),
            variant: "destructive",
          })
          setLoading(false)
          return
        }

        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })

        if (response.ok) {
          const data = await response.json()
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("userKey", data.key)
          toast({
            title: t("success"),
            description: t("welcomeMsg"),
          })
          onOpenChange(false)
          setTimeout(() => {
            window.location.href = "/panel"
          }, 300)
        } else {
          throw new Error("Registration failed")
        }
      } else {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })

        if (response.ok) {
          const data = await response.json()
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("userKey", data.key)
          toast({
            title: t("welcomeBack"),
            description: t("loginSuccess"),
          })
          onOpenChange(false)
          setTimeout(() => {
            window.location.href = "/panel"
          }, 300)
        } else {
          throw new Error("Login failed")
        }
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: mode === "login" ? t("invalidCredentials") : t("registrationError"),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-0 p-0 overflow-hidden bg-transparent">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-950" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.08),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.05),transparent_70%)]" />

          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 p-[1px] bg-gradient-to-r from-red-500/30 via-red-600/20 to-red-500/30 animate-shimmer" />
          </div>

          {/* Content */}
          <div className="relative p-8 backdrop-blur-2xl">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-800/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-zinc-400 text-sm font-mono">KillByte Solutions v2.0</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-black/40 border border-zinc-800/50 rounded-lg p-4 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">{displayText}</span>
                  <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-red-600/15 to-red-500/5 border border-red-500/20 mb-3 animate-float">
                {mode === "login" ? (
                  <Shield className="w-7 h-7 text-red-400" />
                ) : (
                  <User className="w-7 h-7 text-red-400" />
                )}
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent mb-1">
                {mode === "login" ? t("welcomeBack") : t("createAccount")}
              </h2>
              <p className="text-zinc-500 text-sm">{mode === "login" ? t("loginAccess") : t("joinKillbyte")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-400 text-sm font-medium flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  {t("emailAddress")}
                </Label>
                <div className="relative group">
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@killbyte.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 bg-zinc-900/50 border-zinc-800/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all font-mono text-sm"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-400 text-sm font-medium flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" />
                  {t("password")}
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 bg-zinc-900/50 border-zinc-800/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm password (register only) */}
              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="confirm" className="text-zinc-400 text-sm font-medium flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5" />
                    {t("confirmPassword")}
                  </Label>
                  <div className="relative group">
                    <Input
                      id="confirm"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-11 bg-zinc-900/50 border-zinc-800/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-lg shadow-red-500/25 hover:shadow-red-500/50 transition-all duration-300 hover:scale-[1.02] group mt-6"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="font-mono text-sm">{t("loading")}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    <span className="font-mono text-sm">{mode === "login" ? t("loginBtn") : t("registerBtn")}</span>
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </div>
                )}
              </Button>

              {/* Toggle mode */}
              <div className="text-center pt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-800/50" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-zinc-950/80 text-zinc-500 font-mono text-xs">
                      {mode === "login" ? t("noAccount") : t("haveAccount")}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="mt-3 text-sm font-medium text-red-400 hover:text-red-300 transition-colors relative group font-mono"
                >
                  <span className="relative z-10">{mode === "login" ? t("registerLink") : t("loginLink")}</span>
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
