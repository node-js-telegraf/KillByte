"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const proofs = [
  {
    id: 1,
    title: "CyberKazakhstan Leaderboard",
    image: "/proofs/cyberkazakhstan-proof.png",
    target: "cyberkazakhstan.online",
    description: "Leaderboard attack - TitanFlood leading with 110M+ score",
  },
  {
    id: 2,
    title: "Coinbase Service Down",
    image: "/proofs/coinbase-proof.png",
    target: "coinbase.com",
    description: "Something's not right - Loverload attack successful",
  },
  {
    id: 3,
    title: "Spotify Unavailable",
    image: "/proofs/spotify-proof.png",
    target: "open.spotify.com",
    description: "Service Unavailable - Loverload attack at 443 120 rate=32",
  },
  {
    id: 4,
    title: "Snapchat Connection Timeout",
    image: "/proofs/snapchat-proof.png",
    target: "snapchat.com",
    description: "Upstream connect error - Connection timeout triggered",
  },
  {
    id: 5,
    title: "TikTok Overload Protection",
    image: "/proofs/tiktok-proof.png",
    target: "tiktok.com/explore",
    description: "Overload-protect triggered - Loverloadv2 successful",
  },
  {
    id: 6,
    title: "Netflix Takedown",
    image: "/proofs/netflix-proof.png",
    target: "netflix.com",
    description: "Successfully launched attack on all KillByte servers",
  },
  {
    id: 7,
    title: "Google AI Disruption",
    image: "/proofs/google-proof.png",
    target: "ai.google",
    description: "500 Server Error - Attack successfully launched",
  },
  {
    id: 8,
    title: "UDP Flood Demonstration",
    image: "/proofs/udp-proof.png",
    target: "185.60.219.35",
    description: "Multiple UDP attacks on target IP with 60s duration",
  },
  {
    id: 9,
    title: "Apple.com Breach",
    image: "/proofs/apple-proof.png",
    target: "apple.com",
    description: "Server error triggered - Attack successful on all servers",
  },
  {
    id: 10,
    title: "X.com (Twitter) Down",
    image: "/proofs/twitter-proof.png",
    target: "x.com / blog.x.com",
    description: "Page down - Attack successfully launched",
  },
  {
    id: 11,
    title: "Aeza.net Blocked",
    image: "/proofs/aeza-proof.png",
    target: "aeza.net",
    description: "Access denied: suspicious requests triggered",
  },
  {
    id: 12,
    title: "Diceblox Error 520",
    image: "/proofs/diceblox-proof.png",
    target: "diceblox.com",
    description: "Web server returning unknown error - Overload attack",
  },
  {
    id: 13,
    title: "Blog.x.com Takedown",
    image: "/proofs/blogx-proof.png",
    target: "blog.x.com",
    description: "Page is down - Attack successfully launched",
  },
]

export default function PowerproofsPage() {
  const [selectedProof, setSelectedProof] = useState<number | null>(null)

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />

      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-black/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/killbyte-logo.png" alt="KillByte" width={40} height={40} className="w-10 h-10" />
                <span className="text-xl font-bold tracking-tight">KILLBYTE</span>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Power<span className="text-red-400">proofs</span>
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Real attacks. Real results. Proof of our unmatched power.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {proofs.map((proof) => (
                <Card
                  key={proof.id}
                  className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-red-500/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedProof(proof.id)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={proof.image || "/placeholder.svg"}
                      alt={proof.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="text-xs text-red-400 font-mono mb-1">{proof.target}</div>
                      <h3 className="text-lg font-bold">{proof.title}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-zinc-400">{proof.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {selectedProof && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProof(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10"
            onClick={() => setSelectedProof(null)}
          >
            <X className="w-6 h-6" />
          </Button>
          <div className="relative max-w-6xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={proofs.find((p) => p.id === selectedProof)?.image || ""}
              alt={proofs.find((p) => p.id === selectedProof)?.title || ""}
              width={1920}
              height={1080}
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold mb-2">{proofs.find((p) => p.id === selectedProof)?.title}</h3>
              <p className="text-zinc-400">{proofs.find((p) => p.id === selectedProof)?.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
