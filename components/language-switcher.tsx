"use client"

import { useLanguage, type Language } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
  ]

  const currentLang = languages.find((l) => l.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all duration-300 gap-2"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLang?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer transition-colors ${
              language === lang.code ? "bg-red-500/10 text-red-400" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
