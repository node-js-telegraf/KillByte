"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "ru" | "zh"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Header
    features: "Features",
    pricing: "Pricing",
    powerproofs: "Powerproofs",
    signIn: "Sign In",
    getStarted: "Get Started",

    // Hero
    topMarket: "Top #1 Market Services",
    ultimatePower: "Ultimate Power",
    unleashed: "Unleashed",
    heroDesc: "Specializing in Layer 7 with unmatched power. Up to",
    and: "and",
    reqPerSecond: "requests/second",
    startNow: "Start Now",
    viewPlans: "View Plans",

    // Stats
    gbpsPower: "Gbps Power",
    reqSecond: "Req/Second",
    uptime: "Uptime",
    support: "Support",

    // Features
    builtFor: "Built for",
    domination: "Domination",
    featuresDesc: "Enterprise-grade infrastructure designed for maximum impact",
    layer7Mastery: "Layer 7 Mastery",
    layer7Desc: "Up to 45M+ requests per second with advanced payload optimization",
    layer4Power: "Layer 4 Power",
    layer4Desc: "200+ Gbps raw output capability for maximum bandwidth impact",
    globalNetwork: "Global Network",
    globalDesc: "VIP-only private nodes distributed worldwide for optimal performance",
    bypassTech: "Bypass Technology",
    bypassDesc: "Advanced obfuscation methods to bypass Cloudflare, DDOS-Guard, and more",
    zeroLag: "Zero Lag Launch",
    zeroLagDesc: "Instant deployment with no preparation time required",
    apiIntegration: "API Integration",
    apiDesc: "Full API access for automated deployment and management",

    // Attack Vectors
    attackVectors: "Attack Vectors",
    vectorsDesc: "Powerful methods for every scenario",
    vipAccess: "VIP ACCESS REQUIRED",
    standardAccess: "STANDARD ACCESS",
    commandSyntax: "Command Syntax",
    example: "Example",
    httpFlood: "HTTP Flood",
    httpFloodDesc: "12M RPS. Overload backends & CDN instantly",
    sessionResetter: "Session Resetter",
    sessionResetterDesc: "Drops HTTP sessions via TCP RST",
    protocolAbuseEngine: "Protocol Abuse Engine",
    protocolAbuseEngineDesc: "Malformed requests crash parsers",
    jsBypass: "JS Bypass",
    jsBypassDesc: "Emulates browser logic to pass anti-bot defenses",
    ovhBypasser: "OVH Bypasser",
    ovhBypasserDesc: "Breaks OVH Game & VAC firewall stacks",
    rawUdpFlood: "Raw UDP Flood",
    rawUdpFloodDesc: "1.5M+ PPS for bandwidth saturation",
    synRstFlooder: "SYN/RST Flooder",
    synRstFlooderDesc: "Crashes port handlers fast",
    dnsSpammer: "DNS Spammer",
    dnsSpammerDesc: "Floods resolvers with randomized queries",
    basicBrowserFlood: "Basic Browser Flood",
    basicBrowserFloodDesc: "GET/HEAD spoof with rotating headers",
    standardHttpFlood: "Standard HTTP Flood",
    standardHttpFloodDesc: "Reliable POST/GET for weak endpoints",
    gameDisruptor: "Game Disruptor",
    gameDisruptorDesc: "Injects latency & crashes real-time sessions",

    // Pricing
    power: "Power ",
    plans: "Plans",
    plansDesc: "Choose your level of domination",
    monthlyPlans: "Monthly Plans",
    elitePlans: "Elite-Class Monthly Plans",
    starterSurge: "Starter Surge",
    edgeStrike: "Edge Strike",
    dualSurge: "Dual Surge",
    phantomForce: "Phantom Force",
    enterpriseReactor: "Enterprise Reactor",
    hellstormProtocol: "Hellstorm Protocol",
    enterprise: "ENTERPRISE",
    ultimate: "ULTIMATE",
    ultimateDesc: "The Final Evolution. Welcome to the top of the food chain.",
    enterpriseDesc: "Built for Full-Scale Domination. Engineered for serious operators and organizations.",
    enterpriseFeature1: "35M+ Rq/s Layer 7 Power",
    enterpriseFeature2: "150+ Gbps L4 Capability",
    enterpriseFeature3: "Multi-Target Parallel Handling",
    enterpriseFeature4: "API-Optimized Deployment",
    enterpriseFeature5: "No cooldowns or rate limits",
    enterpriseFeature6: "Priority slot execution",
    enterpriseFeature7: "Dedicated support channel",
    ultimateFeature1: "45M+ Rq/s L7 Floods",
    ultimateFeature2: "200+ Gbps Raw L4 Output",
    ultimateFeature3: "VIP-Only Private Nodes",
    ultimateFeature4: "No sharing, throttling, or delay",
    ultimateFeature5: "Bypass Cloudflare & DDOS-Guard",
    ultimateFeature6: "Layer7-KILLER Payloads",
    ultimateFeature7: "Zero-Lag Launch Time",
    getEnterprise: "Get Enterprise",
    getHellstorm: "Get Hellstorm",

    // CTA
    readyTo: "Ready to",
    dominate: "Dominate",
    startYourDomination: "Start your journey to absolute control",
    contactTelegram: "Contact on Telegram",

    // Footer
    killbyteSolution: "KILLBYTE SOLUTIONS",
    allRightsReserved: "All rights reserved",

    // Auth Modal
    welcomeBack: "Welcome Back",
    createAccount: "Create Account",
    loginAccess: "Login to access your panel",
    joinKillbyte: "Join KillByte Solutions",
    emailAddress: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    loading: "Loading...",
    loginBtn: "$ ./login.sh",
    registerBtn: "$ ./register.sh",
    noAccount: "No account?",
    haveAccount: "Already have an account?",
    registerLink: "Register →",
    loginLink: "← Sign In",

    // Toasts
    error: "Error",
    success: "Success!",
    passwordMismatch: "Passwords don't match",
    welcomeMsg: "Welcome to KillByte",
    loginSuccess: "Login successful",
    invalidCredentials: "Invalid email or password",
    registrationError: "Registration error. Please try again.",
  },
  ru: {
    // Header
    features: "Возможности",
    pricing: "Тарифы",
    powerproofs: "Доказательства",
    signIn: "Войти",
    getStarted: "Начать",

    // Hero
    topMarket: "№1 на рынке услуг",
    ultimatePower: "Абсолютная Мощь",
    unleashed: "Без Границ",
    heroDesc: "Специализация на Layer 7 с непревзойденной мощностью. До",
    and: "и",
    reqPerSecond: "запросов/секунду",
    startNow: "Начать сейчас",
    viewPlans: "Смотреть тарифы",

    // Stats
    gbpsPower: "Gbps мощности",
    reqSecond: "Запр/сек",
    uptime: "Время работы",
    support: "Поддержка",

    // Features
    builtFor: "Создано для",
    domination: "Доминирования",
    featuresDesc: "Инфраструктура корпоративного уровня для максимального эффекта",
    layer7Mastery: "Мастерство Layer 7",
    layer7Desc: "До 45М+ запросов в секунду с продвинутой оптимизацией нагрузки",
    layer4Power: "Мощь Layer 4",
    layer4Desc: "200+ Gbps сырой пропускной способности для максимального воздействия",
    globalNetwork: "Глобальная Сеть",
    globalDesc: "VIP-эксклюзивные приватные ноды по всему миру для оптимальной производительности",
    bypassTech: "Технология Обхода",
    bypassDesc: "Продвинутые методы обфускации для обхода Cloudflare, DDOS-Guard и других",
    zeroLag: "Мгновенный Запуск",
    zeroLagDesc: "Моментальное развертывание без времени подготовки",
    apiIntegration: "API Интеграция",
    apiDesc: "Полный доступ к API для автоматизированного развертывания и управления",

    // Attack Vectors
    attackVectors: "Векторы Атак",
    vectorsDesc: "Мощные методы для любых сценариев",
    vipAccess: "ТРЕБУЕТСЯ VIP ДОСТУП",
    standardAccess: "СТАНДАРТНЫЙ ДОСТУП",
    commandSyntax: "Синтаксис команды",
    example: "Пример",
    httpFlood: "HTTP Флуд",
    httpFloodDesc: "12М RPS. Мгновенная перегрузка бэкенда и CDN",
    sessionResetter: "Сброс Сессий",
    sessionResetterDesc: "Сбрасывает HTTP сессии через TCP RST",
    protocolAbuseEngine: "Движок Злоупотребления Протоколом",
    protocolAbuseEngineDesc: "Некорректные запросы ломают парсеры",
    jsBypass: "JS Обход",
    jsBypassDesc: "Эмулирует логику браузера для обхода анти-бот защиты",
    ovhBypasser: "OVH Обходчик",
    ovhBypasserDesc: "Ломает OVH Game и VAC файрвол стеки",
    rawUdpFlood: "Чистый UDP Флуд",
    rawUdpFloodDesc: "1.5М+ PPS для насыщения канала",
    synRstFlooder: "SYN/RST Флудер",
    synRstFlooderDesc: "Быстро крашит обработчики портов",
    dnsSpammer: "DNS Спамер",
    dnsSpammerDesc: "Флудит резолверы рандомизированными запросами",
    basicBrowserFlood: "Базовый Браузерный Флуд",
    basicBrowserFloodDesc: "GET/HEAD спуф с ротацией заголовков",
    standardHttpFlood: "Стандартный HTTP Флуд",
    standardHttpFloodDesc: "Надежный POST/GET для слабых эндпоинтов",
    gameDisruptor: "Игровой Дизраптор",
    gameDisruptorDesc: "Инжектит задержки и крашит реал-тайм сессии",

    // Pricing
    power: "Тарифы ",
    plans: "Мощи",
    plansDesc: "Выберите свой уровень доминирования",
    monthlyPlans: "Месячные тарифы",
    elitePlans: "Элитные месячные тарифы",
    starterSurge: "Стартовый Всплеск",
    edgeStrike: "Граничный Удар",
    dualSurge: "Двойной Всплеск",
    phantomForce: "Фантомная Сила",
    enterpriseReactor: "Корпоративный Реактор",
    hellstormProtocol: "Протокол Адский Шторм",
    enterprise: "КОРПОРАТИВНЫЙ",
    ultimate: "МАКСИМАЛЬНЫЙ",
    ultimateDesc: "Финальная эволюция. Добро пожаловать на вершину пищевой цепи.",
    enterpriseDesc: "Создан для полномасштабного доминирования. Разработан для серьезных операторов и организаций.",
    enterpriseFeature1: "35М+ Запр/с Layer 7",
    enterpriseFeature2: "150+ Gbps L4",
    enterpriseFeature3: "Параллельная обработка целей",
    enterpriseFeature4: "API-оптимизированное развертывание",
    enterpriseFeature5: "Без задержек и лимитов",
    enterpriseFeature6: "Приоритетное выполнение",
    enterpriseFeature7: "Выделенный канал поддержки",
    ultimateFeature1: "45М+ Запр/с L7 Флуды",
    ultimateFeature2: "200+ Gbps Чистый L4",
    ultimateFeature3: "VIP-Приватные Ноды",
    ultimateFeature4: "Без шаринга и троттлинга",
    ultimateFeature5: "Обход Cloudflare & DDOS-Guard",
    ultimateFeature6: "Layer7-KILLER Пейлоады",
    ultimateFeature7: "Мгновенный Запуск",
    getEnterprise: "Получить Корпоративный",
    getHellstorm: "Получить Адский Шторм",

    // CTA
    readyTo: "Готовы к",
    dominate: "Доминированию",
    startYourDomination: "Начните свой путь к абсолютному контролю",
    contactTelegram: "Связаться в Telegram",

    // Footer
    killbyteSolution: "KILLBYTE РЕШЕНИЯ",
    allRightsReserved: "Все права защищены",

    // Auth Modal
    welcomeBack: "С возвращением",
    createAccount: "Создать аккаунт",
    loginAccess: "Войдите для доступа к панели",
    joinKillbyte: "Присоединяйтесь к KillByte Solutions",
    emailAddress: "Email адрес",
    password: "Пароль",
    confirmPassword: "Повторите пароль",
    loading: "Загрузка...",
    loginBtn: "$ ./login.sh",
    registerBtn: "$ ./register.sh",
    noAccount: "Нет аккаунта?",
    haveAccount: "Уже есть аккаунт?",
    registerLink: "Зарегистрироваться →",
    loginLink: "← Войти в систему",

    // Toasts
    error: "Ошибка",
    success: "Успешно!",
    passwordMismatch: "Пароли не совпадают",
    welcomeMsg: "Добро пожаловать в KillByte",
    loginSuccess: "Вход выполнен успешно",
    invalidCredentials: "Неверный email или пароль",
    registrationError: "Ошибка регистрации. Попробуйте снова.",
  },
  zh: {
    // Header
    features: "功能",
    pricing: "价格",
    powerproofs: "证明",
    signIn: "登录",
    getStarted: "开始使用",

    // Hero
    topMarket: "市场第一服务",
    ultimatePower: "终极力量",
    unleashed: "释放",
    heroDesc: "专注于Layer 7，拥有无与伦比的力量。高达",
    and: "和",
    reqPerSecond: "请求/秒",
    startNow: "立即开始",
    viewPlans: "查看计划",

    // Stats
    gbpsPower: "Gbps 功率",
    reqSecond: "请求/秒",
    uptime: "正常运行时间",
    support: "支持",

    // Features
    builtFor: "为",
    domination: "主导而生",
    featuresDesc: "专为最大影响力而设计的企业级基础设施",
    layer7Mastery: "Layer 7 精通",
    layer7Desc: "每秒高达4500万+请求，具有先进的有效负载优化",
    layer4Power: "Layer 4 力量",
    layer4Desc: "200+ Gbps 原始输出能力，实现最大带宽影响",
    globalNetwork: "全球网络",
    globalDesc: "VIP专用私有节点遍布全球，实现最佳性能",
    bypassTech: "绕过技术",
    bypassDesc: "先进的混淆方法绕过Cloudflare、DDOS-Guard等",
    zeroLag: "零延迟启动",
    zeroLagDesc: "即时部署，无需准备时间",
    apiIntegration: "API 集成",
    apiDesc: "完整的API访问，用于自动化部署和管理",

    // Attack Vectors
    attackVectors: "攻击向量",
    vectorsDesc: "适用于每种场景的强大方法",
    vipAccess: "需要VIP访问权限",
    standardAccess: "标准访问",
    commandSyntax: "命令语法",
    example: "示例",
    httpFlood: "HTTP 洪水",
    httpFloodDesc: "12M RPS. 立即使后端和CDN过载",
    sessionResetter: "会话重置器",
    sessionResetterDesc: "通过 TCP RST 删除 HTTP 会话",
    protocolAbuseEngine: "协议滥用引擎",
    protocolAbuseEngineDesc: "格式错误的请求使解析器崩溃",
    jsBypass: "JS 绕过",
    jsBypassDesc: "模拟浏览器逻辑以通过反机器人防御",
    ovhBypasser: "OVH 绕过器",
    ovhBypasserDesc: "打破 OVH Game 和 VAC 防火墙堆栈",
    rawUdpFlood: "原始 UDP 洪水",
    rawUdpFloodDesc: "1.5M+ PPS 用于带宽饱和",
    synRstFlooder: "SYN/RST 洪水器",
    synRstFlooderDesc: "快速使端口处理程序崩溃",
    dnsSpammer: "DNS 垃圾器",
    dnsSpammerDesc: "用随机查询淹没解析器",
    basicBrowserFlood: "基本浏览器洪水",
    basicBrowserFloodDesc: "带有旋转标头的 GET/HEAD 欺骗",
    standardHttpFlood: "标准 HTTP 洪水",
    standardHttpFloodDesc: "针对弱端点的可靠 POST/GET",
    gameDisruptor: "游戏破坏器",
    gameDisruptorDesc: "注入延迟并使实时会话崩溃",

    // Pricing
    power: "力量 ",
    plans: "计划",
    plansDesc: "选择您的主导级别",
    monthlyPlans: "月度计划",
    elitePlans: "精英计划",
    starterSurge: "入门激增",
    edgeStrike: "边缘打击",
    dualSurge: "双重激增",
    phantomForce: "幽灵力量",
    enterpriseReactor: "企业反应堆",
    hellstormProtocol: "地狱风暴协议",
    enterprise: "企业版",
    ultimate: "终极版",
    ultimateDesc: "最终进化。欢迎来到食物链顶端。",
    enterpriseDesc: "为全面主导而打造。专为严肃运营商设计。",
    enterpriseFeature1: "35M+ 请求/秒 Layer 7",
    enterpriseFeature2: "150+ Gbps L4 能力",
    enterpriseFeature3: "多目标并行处理",
    enterpriseFeature4: "API优化部署",
    enterpriseFeature5: "无冷却或速率限制",
    enterpriseFeature6: "优先执行",
    enterpriseFeature7: "专用支持渠道",
    ultimateFeature1: "45M+ 请求/秒 L7 洪水",
    ultimateFeature2: "200+ Gbps 原始 L4",
    ultimateFeature3: "VIP专用私有节点",
    ultimateFeature4: "无共享、节流或延迟",
    ultimateFeature5: "绕过 Cloudflare 和 DDOS-Guard",
    ultimateFeature6: "Layer7-KILLER 有效载荷",
    ultimateFeature7: "零延迟启动",
    getEnterprise: "获取企业版",
    getHellstorm: "获取地狱风暴",

    // CTA
    readyTo: "准备好",
    dominate: "主导",
    startYourDomination: "开始你的绝对控制之旅",
    contactTelegram: "在 Telegram 联系",

    // Footer
    killbyteSolution: "KILLBYTE 解决方案",
    allRightsReserved: "保留所有权利",

    // Auth Modal
    welcomeBack: "欢迎回来",
    createAccount: "创建账户",
    loginAccess: "登录以访问您的面板",
    joinKillbyte: "加入 KillByte Solutions",
    emailAddress: "电子邮件地址",
    password: "密码",
    confirmPassword: "确认密码",
    loading: "加载中...",
    loginBtn: "$ ./login.sh",
    registerBtn: "$ ./register.sh",
    noAccount: "没有账户？",
    haveAccount: "已有账户？",
    registerLink: "注册 →",
    loginLink: "← 登录",

    // Toasts
    error: "错误",
    success: "成功！",
    passwordMismatch: "密码不匹配",
    welcomeMsg: "欢迎来到 KillByte",
    loginSuccess: "登录成功",
    invalidCredentials: "无效的电子邮件或密码",
    registrationError: "注册错误。请重试。",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && ["en", "ru", "zh"].includes(saved)) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
