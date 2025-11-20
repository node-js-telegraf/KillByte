"use client"

import { useEffect, useState } from "react"
import { Shield, Zap, Globe, Server, Check, ArrowRight, Sparkles, Activity, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { AuthModal } from "@/components/auth-modal"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const numericTarget = Number.parseInt(target.replace(/\D/g, ""))

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = numericTarget / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericTarget) {
        setCount(numericTarget)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [numericTarget])

  return (
    <span>
      {target.replace(/\d+/g, count.toString())}
      {suffix}
    </span>
  )
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing")
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openLogin = () => {
    setAuthMode("login")
    setAuthModalOpen(true)
  }

  const openRegister = () => {
    setAuthMode("register")
    setAuthModalOpen(true)
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
      <div
        className="fixed inset-0 opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(239, 68, 68, 0.15) 0%, transparent 50%)`,
        }}
      />
      <div
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-2xl bg-black/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 blur-xl group-hover:bg-red-500/30 transition-all" />
                  <Image
                    src="/killbyte-logo.png"
                    alt="KillByte"
                    width={40}
                    height={40}
                    className="w-10 h-10 relative"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  KILLBYTE
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <a
                  href="#features"
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
                >
                  {t("features")}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
                </a>
                <a
                  href="#pricing"
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
                >
                  {t("pricing")}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
                </a>
                <Link
                  href="/powerproofs"
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
                >
                  {t("powerproofs")}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
                </Link>
                <div className="w-px h-4 bg-zinc-800" />
                <LanguageSwitcher />
                <Button
                  size="sm"
                  onClick={openLogin}
                  variant="ghost"
                  className="text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all duration-300"
                >
                  {t("signIn")}
                </Button>
                <Button
                  size="sm"
                  onClick={openRegister}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300"
                >
                  {t("getStarted")}
                </Button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8 backdrop-blur-sm animate-float">
                <Sparkles className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-sm font-medium text-red-300">{t("topMarket")}</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-none">
                <span className="inline-block animate-fade-in-up bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
                  {t("ultimatePower")}
                </span>
                <br />
                <span className="inline-block animate-fade-in-up animation-delay-200 bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                  {t("unleashed")}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
                {t("heroDesc")} <span className="text-red-400 font-semibold">240 Gbps</span> {t("and")}{" "}
                <span className="text-red-400 font-semibold">26M {t("reqPerSecond")}</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
                <Button
                  size="lg"
                  onClick={openRegister}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 group shadow-xl shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300 hover:scale-105"
                >
                  {t("startNow")}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-900 bg-transparent backdrop-blur-sm hover:border-red-500/50 transition-all duration-300"
                  onClick={scrollToPricing}
                >
                  {t("viewPlans")}
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="container mx-auto px-4 lg:px-8 mt-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Zap, value: "240+", label: t("gbpsPower"), color: "from-red-500 to-orange-500" },
                { icon: Activity, value: "26M", label: t("reqSecond"), color: "from-red-500 to-pink-500" },
                { icon: TrendingUp, value: "99.9%", label: t("uptime"), color: "from-red-500 to-purple-500" },
                { icon: Users, value: "24/7", label: t("support"), color: "from-red-500 to-rose-500" },
              ].map((stat, i) => (
                <Card
                  key={i}
                  className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm p-6 hover:bg-zinc-900/80 hover:border-red-500/30 transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${i * 100 + 800}ms` }}
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-2">
                    <AnimatedCounter target={stat.value} />
                  </div>
                  <div className="text-sm text-zinc-500 font-medium">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent" />
          <div className="container mx-auto px-4 lg:px-8 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Built for{" "}
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  {t("domination")}
                </span>
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">{t("enterpriseDesc")}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: t("layer7Mastery"),
                  description: t("layer7Desc"),
                },
                {
                  icon: Server,
                  title: t("layer4Power"),
                  description: t("layer4Desc"),
                },
                {
                  icon: Globe,
                  title: t("globalNetwork"),
                  description: t("globalDesc"),
                },
                {
                  icon: Shield,
                  title: t("bypassTechnology"),
                  description: t("bypassDesc"),
                },
                {
                  icon: Sparkles,
                  title: t("zeroLagLaunch"),
                  description: t("zeroLagDesc"),
                },
                {
                  icon: Server,
                  title: t("apiIntegration"),
                  description: t("apiDesc"),
                },
              ].map((feature, i) => (
                <Card
                  key={i}
                  className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm p-6 hover:bg-zinc-900/80 hover:border-red-500/30 transition-all duration-500 group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/20 to-red-500/10 border border-red-500/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <feature.icon className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Attack Vectors Section */}
        <section className="py-20 md:py-32 relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff000012_1px,transparent_1px),linear-gradient(to_bottom,#ff000012_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="container mx-auto px-4 lg:px-8 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                {t("attackVectors")}
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  {t("vectors")}
                </span>
              </h2>
              <p className="text-zinc-400 text-lg">{t("powerfulMethods")}</p>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* VIP Vectors */}
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                  <span className="text-sm font-mono font-semibold text-red-400">{t("vipAccess")}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      cmd: "!overload",
                      name: t("httpFlood"),
                      desc: t("httpFloodDesc"),
                    },
                    {
                      cmd: "!rapidreset",
                      name: t("sessionResetter"),
                      desc: t("sessionResetterDesc"),
                    },
                    {
                      cmd: "!http-exploit",
                      name: t("protocolAbuseEngine"),
                      desc: t("protocolAbuseEngineDesc"),
                    },
                    {
                      cmd: "!spectre",
                      name: t("jsBypass"),
                      desc: t("jsBypassDesc"),
                    },
                    {
                      cmd: "!ovh",
                      name: t("ovhBypasser"),
                      desc: t("ovhBypasserDesc"),
                    },
                    {
                      cmd: "!udp",
                      name: t("rawUdpFlood"),
                      desc: t("rawUdpFloodDesc"),
                    },
                    { cmd: "!tcp", name: t("synRstFlooder"), desc: t("synRstFlooderDesc") },
                  ].map((vector, i) => (
                    <Card
                      key={i}
                      className="bg-zinc-900/50 border-red-500/20 backdrop-blur-sm p-5 hover:bg-zinc-900/80 hover:border-red-500/40 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center font-mono text-red-400 text-xs group-hover:scale-110 transition-transform">
                          VIP
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <code className="text-red-400 font-mono text-sm font-semibold">{vector.cmd}</code>
                            <span className="text-zinc-400 text-sm">-</span>
                            <span className="text-white font-semibold text-sm">{vector.name}</span>
                          </div>
                          <p className="text-zinc-500 text-sm leading-relaxed">{vector.desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Standard Vectors */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700 mb-6">
                  <span className="text-sm font-mono font-semibold text-zinc-400">{t("standardAccess")}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      cmd: "!dns",
                      name: t("dnsSpammer"),
                      desc: t("dnsSpammerDesc"),
                    },
                    {
                      cmd: "!browser",
                      name: t("basicBrowserFlood"),
                      desc: t("basicBrowserFloodDesc"),
                    },
                    {
                      cmd: "!floodcore",
                      name: t("standardHttpFlood"),
                      desc: t("standardHttpFloodDesc"),
                    },
                    {
                      cmd: "!game",
                      name: t("gameDisruptor"),
                      desc: t("gameDisruptorDesc"),
                    },
                  ].map((vector, i) => (
                    <Card
                      key={i}
                      className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm p-5 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-zinc-800/50 border border-zinc-700 flex items-center justify-center font-mono text-zinc-400 text-xs group-hover:scale-110 transition-transform">
                          STD
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <code className="text-zinc-400 font-mono text-sm font-semibold">{vector.cmd}</code>
                            <span className="text-zinc-600 text-sm">-</span>
                            <span className="text-white font-semibold text-sm">{vector.name}</span>
                          </div>
                          <p className="text-zinc-500 text-sm leading-relaxed">{vector.desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Usage tip */}
              <Card className="mt-8 bg-zinc-900/30 border-zinc-800/50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <code className="text-red-400 text-lg">$</code>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">{t("commandSyntax")}</h4>
                    <code className="text-zinc-400 font-mono text-sm">!method host port time rate=32</code>
                    <p className="text-zinc-500 text-sm mt-2">
                      {t("example")}: <code className="text-red-400">!overload example.com 443 120 rate=32</code>
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-32 bg-zinc-900/20 backdrop-blur-sm relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="container mx-auto px-4 lg:px-8 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                {t("power")}
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  {t("plans")}
                </span>
              </h2>
              <p className="text-zinc-400 text-lg">{t("chooseLevel")}</p>
            </div>

            {/* Monthly Plans */}
            <div className="max-w-6xl mx-auto mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center">{t("monthlyPlans")}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: t("starterSurge"), price: "$30", duration: "7 Days", concurrent: "1", time: "60s" },
                  { name: t("edgeStrike"), price: "$65", duration: "30 Days", concurrent: "1", time: "120s" },
                  { name: t("dualSurge"), price: "$85", duration: "30 Days", concurrent: "2", time: "120s" },
                  {
                    name: t("phantomForce"),
                    price: "$160",
                    duration: "30 Days",
                    concurrent: "3",
                    time: "200s",
                    vip: true,
                  },
                ].map((plan, i) => (
                  <Card
                    key={i}
                    className={`bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm p-6 hover:scale-105 hover:border-red-500/50 transition-all duration-500 group relative overflow-hidden ${plan.vip ? "ring-2 ring-red-500/20" : ""}`}
                  >
                    {plan.vip && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-2xl" />
                    )}
                    <div className="relative">
                      {plan.vip && (
                        <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold mb-4">
                          VIP
                        </div>
                      )}
                      <h4 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">{plan.name}</h4>
                      <div className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-4">
                        {plan.price}
                      </div>
                      <div className="space-y-2 text-sm text-zinc-400 mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-red-500" />
                          <span>{plan.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-red-500" />
                          <span>{plan.concurrent} Concurrent</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-red-500" />
                          <span>{plan.time} Duration</span>
                        </div>
                      </div>
                      <a href="https://t.me/RankFlood" target="_blank" rel="noopener noreferrer" className="block">
                        <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300">
                          {t("selectPlan")}
                        </Button>
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Elite Plans */}
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold mb-8 text-center">{t("elitePlans")}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border-red-500/30 p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
                  <div className="relative">
                    <div className="inline-block px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold mb-4">
                      {t("enterprise")}
                    </div>
                    <h4 className="text-2xl font-bold mb-2">{t("enterpriseReactor")}</h4>
                    <div className="text-4xl font-bold text-red-400 mb-4">
                      $1,200<span className="text-lg text-zinc-500">/mo</span>
                    </div>
                    <p className="text-zinc-400 mb-6 leading-relaxed">{t("enterpriseDesc")}</p>
                    <div className="space-y-3 mb-6">
                      {[
                        t("enterpriseFeature1"),
                        t("enterpriseFeature2"),
                        t("enterpriseFeature3"),
                        t("enterpriseFeature4"),
                        t("enterpriseFeature5"),
                        t("enterpriseFeature6"),
                        t("enterpriseFeature7"),
                      ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-zinc-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <a href="https://t.me/RankFlood" target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full bg-red-600 hover:bg-red-700 border-0 text-lg py-6">
                        {t("getEnterprise")}
                      </Button>
                    </a>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-red-950/50 to-zinc-900/50 border-red-500/50 p-8 relative overflow-hidden ring-2 ring-red-500/30">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/20 rounded-full blur-3xl" />
                  <div className="relative">
                    <div className="inline-block px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold mb-4">
                      {t("ultimate")}
                    </div>
                    <h4 className="text-2xl font-bold mb-2">{t("hellstormProtocol")}</h4>
                    <div className="text-4xl font-bold text-red-400 mb-4">
                      $1,450<span className="text-lg text-zinc-500">/mo</span>
                    </div>
                    <p className="text-zinc-400 mb-6 leading-relaxed">{t("ultimateDesc")}</p>
                    <div className="space-y-3 mb-6">
                      {[
                        t("ultimateFeature1"),
                        t("ultimateFeature2"),
                        t("ultimateFeature3"),
                        t("ultimateFeature4"),
                        t("ultimateFeature5"),
                        t("ultimateFeature6"),
                        t("ultimateFeature7"),
                      ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-zinc-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <a href="https://t.me/RankFlood" target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full bg-red-600 hover:bg-red-700 border-0 text-lg py-6">
                        {t("getHellstorm")}
                      </Button>
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <Card className="bg-gradient-to-br from-red-950/30 to-zinc-900/30 border-red-500/30 p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5" />
              <div className="relative">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  {t("readyTo")} <span className="text-red-400">{t("dominate")}</span>?
                </h2>
                <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">{t("startYourDomination")}</p>
                <a href="https://t.me/RankFlood" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white border-0 text-lg px-8">
                    {t("contactTelegram")}
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800/50 py-12 backdrop-blur-sm bg-black/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 blur-xl" />
                  <Image src="/killbyte-logo.png" alt="KillByte" width={32} height={32} className="w-8 h-8 relative" />
                </div>
                <div>
                  <div className="font-bold text-sm">{t("killbyteSolution")}</div>
                </div>
              </div>
              <div className="text-zinc-500 text-sm">© 2025 KillByte. {t("allRightsReserved")}.</div>
            </div>
          </div>
        </footer>
      </div>

      <a
        href="https://t.me/+83HP8h3PfL4yMTc1"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Contact on Telegram"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300 animate-pulse" />
          <div className="relative w-14 h-14 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center hover:border-red-500/50 hover:scale-110 transition-all duration-300 shadow-2xl group-hover:shadow-red-500/50">
            <svg
              className="w-7 h-7 text-red-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
            </svg>
          </div>
        </div>
      </a>

      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} mode={authMode} />
    </div>
  )
}
