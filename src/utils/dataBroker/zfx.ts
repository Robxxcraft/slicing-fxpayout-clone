import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "ZFX";
const brokerFounded = "2019 (brand ZFX di bawah Zeal Group)";
const brokerRanking: BrokerRanking = {
  tier: "Global",
  title: "Multi-Asset ECN Broker"
};

export const zfxDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "zfx.webp",
  registerUrl: "https://my.zm-area.com/reg/truely?agentnumber=Z940752S4",
  websiteUrl: "#",
  detailUrl: "zfx",
  ranking: brokerRanking,
  badges: ["ECN Broker", "Multi-Asset", "Institutional Liquidity", "EA Friendly"],
  overallScore: {
    rate: 4.4,
    communityUrl: "#",
  },
  detailDescription: "ZFX adalah broker global multi-aset yang berada di bawah Zeal Group, menyediakan akses trading ke pasar FX, Indeks, Komoditas, Saham CFD, dan Cryptocurrency. ZFX berfokus pada teknologi ECN, eksekusi ultra-cepat, serta transparansi harga dengan likuiditas institusional. Broker ini melayani trader ritel hingga profesional dengan infrastruktur teknologi internal milik Zeal Group.",
  cardDescription: "Broker ECN premium untuk scalper & EA. Likuiditas dalam & komisi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "≥ $15",
    leverage: ["Hingga 1:2000 (Cent)", "Hingga 1:500 (Standard)", "Hingga 1:400 (ECN)"],
    spread: "Mulai 0.2 pips (ECN)",
  },
  profile: {
    name: brokerName,
    slogan: "Akses Mudah ke Peluang Trading Global",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated, ECN/Market Execution",
    regulations: [
      { name: "FSA", country: "Seychelles (License SD027)" },
      { name: "Entitas", country: "Zeal Capital Market (Seychelles) Limited" },
      { name: "Group", country: "Zeal Group" },
    ]
  },
  summary: {
    minDeposit: ["Cent : ≥ $15", "Standard STP : ≥ $100", "ECN : ≥ $1,000"],
    type: "Cent, Standard STP, ECN",
    spread: "Mulai 0.2 pips (ECN)",
    commission: "ECN — berbasis volume",
    leverage: ["Hingga 1:2000 (Cent)", "Hingga 1:500 (Standard)", "Hingga 1:400 (ECN)"],
    execution: "Ultra-fast (microsecond matching)",
    instruments: "FX, Indeks, Komoditas, Saham CFD, Crypto",
    depositWithdrawal: "Banyak metode"
  },
  accountTypes: [
    {
        name: "Cent Account",
        level: "Pemula",
        features: ["Min Deposit ≥ $15", "Spread Mulai 1.5 pips", "Leverage Hingga 1:2000"]
    },
    {
        name: "Standard STP",
        level: "Trader retail",
        features: ["Min Deposit ≥ $100", "Spread Mulai 1.3 pips", "Leverage Hingga 1:500"]
    },
    {
        name: "ECN Account",
        level: "Pro, scalper, EA",
        features: ["Min Deposit ≥ $1,000", "Spread Mulai 0.2 pips", "Leverage Hingga 1:400"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "ECN",
          spread: "mulai 0.2"
        },
        {
          accountType: "Standard",
          spread: "mulai 1.3"
        },
      ]
    },
    {
      icon: "eur-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "ECN",
          spread: "variabel rendah"
        },
        {
          accountType: "Standard",
          spread: "variabel"
        },
      ]
    }
  ],
  keyAdvantages: ["Teknologi ECN milik Zeal Group", "Likuiditas multi-provider institusional", "Eksekusi ultra-cepat (<1 ms)", "Tanpa dealing desk", "Segregasi dana klien", "Cocok untuk EA & scalping"],
  depositWithdrawal: {
    paymentMethods: [
      { method: "Bank Transfer", time:  ["Deposit: Instan – 1 hari kerja", "Withdraw: 1–3 hari kerja"], fee: "Tergantung Metode" },
      { method: "Debit/Kredit Card", time: ["Deposit: Instan – 1 hari kerja", "Withdraw: 1–3 hari kerja"], fee: "Tergantung Metode" },
      { method: "E-Wallet (Alipay, WeChat Pay, dll)", time: ["Deposit: Instan – 1 hari kerja", "Withdraw: 1–3 hari kerja"], fee: "Tergantung Metode" },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "ZFX Terminal (Mobile App)", icon: "zfx.webp" },
      { username: "Web Trading", icon: "zfx.webp" },
      { username: "iOS & Android", icon: "zfx.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 6 },
    { pair: "XAU/USD", estimate: 10 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Teknologi ECN kuat", "Eksekusi sangat cepat", "Spread rendah di akun ECN", "Pilihan leverage fleksibel", "Cocok untuk trader profesional"],
  disadvantages: ["Min deposit ECN cukup tinggi", "Belum teregulasi regulator Eropa tier-1"],
  communityRating: {
    score: 4.4,
    withdrawalSpeed: 4.6,
    stability: 4.5,
    customerSupport: 4.3
  },
  faq: [
    {
      question: "Apakah ZFX aman?",
      answer: "Ya. ZFX berada di bawah regulasi FSA Seychelles dengan segregasi dana klien."
    },
    {
      question: "Apakah ZFX mendukung EA?",
      answer: "Ya. Sangat kompatibel untuk EA & scalping."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Mulai dari $15 (Cent), $100 (Standard), $1,000 (ECN)."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MT4, MT5, ZFX Terminal, Web, Mobile."
    },
  ]
}
