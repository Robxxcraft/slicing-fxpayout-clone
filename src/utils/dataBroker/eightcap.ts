import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "Eightcap";
const brokerFounded = "2009";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global ECN Broker"
};

export const eightcapDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "eightcap.webp",
  registerUrl: "#",
  websiteUrl: "#",
  detailUrl: "eightcap",
  statusRebate: "Auto Rebate",
  ranking: brokerRanking,
  badges: ["Tier 1", "ECN Broker", "Low Spread", "Fast Execution"],
  overallScore: {
    rate: 4.4,
    communityUrl: "https://www.trustpilot.com/review/eightcap.com",
  },
  detailDescription: "Eightcap adalah broker global yang menyediakan layanan trading Forex dan CFD dengan spread rendah, eksekusi cepat, dan lebih dari 800 instrumen finansial termasuk Forex, indeks, logam, komoditas, saham CFD, dan cryptocurrency. Broker ini dikenal karena integrasi platform modern serta regulasi kuat dari beberapa otoritas tingkat atas.",
  cardDescription: "Broker ECN cepat, terintegrasi TradingView & kompatibel EA.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$100",
    leverage: "Hingga 1:500",
    spread: "Mulai 0.0 pips (Razor)",
  },
  profile: {
    name: brokerName,
    slogan: "Trade with Precision",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated, ECN/NDD Broker",
    regulations: [
      { name: "ASIC", country: "Australia" },
      { name: "FCA", country: "Inggris" },
      { name: "CySEC", country: "Siprus" },
      { name: "SCB", country: "The Bahamas" },
    ]
  },
  summary: {
    minDeposit: "$100",
    types: ["Standard", "Razor"],
    spread: "Mulai 0.0 pips (Razor)",
    commission: "Razor: $3.50 per lot per side",
    leverage: "Hingga 1:500",
    execution: "Cepat",
    instruments: ["Forex", "Indeks", "Komoditas", "Saham CFD", "Crypto CFD"],
    depositWithdrawal: "Cepat"
  },
  accountTypes: [
    {
        name: "Standard Account",
        level: "Umum",
        features: ["Spread mulai ±0.8 – 1.2 pips", "Tanpa komis", "Minimum deposit : $100"]
    },
    {
        name: "Razor Account",
        level: "Advanced",
        features: ["Spread mulai 0.0 pips", "Komisi rendah (±$3.50 per lot per side)", "Minimum deposit : $100"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Razor",
          spread: "0.0 – 0.2"
        },
        {
          accountType: "Standard",
          spread: "0.8 – 1.2"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Razor",
          spread: "0.1 – 0.3"
        },
        {
          accountType: "Standard",
          spread: "0.7 – 1.2"
        },
      ]
    }
  ],
  keyAdvantages: ["Spread ECN sangat rendah", "Eksekusi order cepat & stabil", "Regulasi kuat dari FCA & ASIC", "Platform trading lengkap", "Cocok untuk scalping & EA", "Likuiditas dalam"],
  depositWithdrawal: {
    paymentMethods: [
      { 
        method: "E-Wallet", 
        time: {
          deposit: "Instan",
          withdraw: "Instan"
        }, 
        fee: "$0" 
      },
      { 
        method: "Bank Transfer", 
        time: {
          deposit: "1–3 hari kerja",
          withdraw: "1–3 hari kerja"
        }, 
        fee: "$0" 
      },
      { 
        method: "Kartu Debit/Kredit", 
        time: {
          deposit: "Instan",
          withdraw: "Instan"
        }, 
        fee: "$0" 
      },
      { 
        method: "Crypto", 
        time: {
          deposit: "Instan",
          withdraw: "Instan"
        }, 
        fee: "$0" 
      }
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "TradingView", icon: "trading-view.webp" },
      { username: "WebTrader", icon: "eightcap.webp" },
      { username: "Mobile App (iOS & Android)", icon: "eightcap.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 10 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Spread rendah & eksekusi cepat", "Regulasi kuat", "Platform lengkap", "Opsi akun cocok untuk semua trader"],
  disadvantages: ["Minimum deposit relatif tinggi", "Instrumen non-CFD nyata terbatas", "Leverage lebih kecil dibanding broker offshore"],
  communityRating: {
    score: 4.4,
    quantityVote: 3.375,
    classifications: [
      { type: "Kecepatan Withdraw (WD)", rate: 4.5 },
      { type: "Stabilitas Server", rate: 4.4 },
      { type: "Customer Support", rate: 4.3 },
    ],
  },
  faq: [
    {
      question: "Apakah Eightcap aman?",
      answer: "Ya. Eightcap diregulasi oleh ASIC, FCA, CySEC, dan SCB."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Minimum deposit biasanya $100."
    },
    {
      question: "Apakah Eightcap cocok untuk scalping & EA",
      answer: "Ya. Terutama di akun Razor dengan spread rendah."
    },
    {
      question: "Apa platform yang didukung?",
      answer: "MT4, MT5, TradingView, WebTrader, Mobile App."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:500 tergantung regulator & wilayah."
    },
  ]
}