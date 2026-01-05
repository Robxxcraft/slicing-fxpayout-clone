import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "HFM";
const brokerFounded = "2010";
const brokerRanking: BrokerRanking = {
  tier: "Global",
  title: "Multi-Asset Forex & CFD Broker"
};

export const hfmDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "hfm.webp",
  registerUrl: "https://register.hfmtrade-ind.com/sv/en/new-live-account/?refid=30494425",
  websiteUrl: "#",
  detailUrl: "hfm",
  ranking: brokerRanking,
  badges: ["Regulated Broker", "Multi-Asset", "MT4/MT5", "Leverage Tinggi"],
  overallScore: {
    rate: 4.3,
    communityUrl: "#",
  },
  detailDescription: "HFM (HF Markets), sebelumnya dikenal sebagai HotForex, adalah broker multi-regulasi global yang berdiri sejak 2010 dan telah beroperasi lebih dari satu dekade di lebih dari 180 negara. Broker ini menyediakan layanan trading Forex, logam, komoditas, indeks, saham CFD, dan cryptocurrency dengan berbagai jenis akun dan platform trading termasuk MT4, MT5, dan aplikasi HFM.",
  cardDescription: "Broker ECN premium untuk scalper & EA. Likuiditas dalam & komisi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$5",
    leverage: "Hingga 1:2000",
    spread: "Mulai 0.0 pips (Zero)",
  },
  profile: {
    name: `${brokerName} (HF Markets/HotForex)`,
    slogan: " Trusted Global Forex & CFD Broker",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated Forex & CFD Broker",
    regulations: [
      { name: "FCA", country: "Inggris" },
      { name: "CySEC", country: "Siprus" },
      { name: "FSCA", country: "Afrika Selatan" },
      { name: "DFSA", country: "Dubai" },
      { name: "FSA", country: "Seychelles" },
      { name: "CMA", country: "Kenya" },
    ]
  },
  summary: {
    minDeposit: "$0 – tergantung akun",
    types: ["Cent", "Zero Spread", "Pro", "Premium", "HFCopy"],
    spread: "Mulai 0.0 pips (Zero)",
    commission: "Tergantung akun (Zero & Pro dapat komisi)",
    leverage: "Hingga 1:2000 (tergantung entitas/negara)",
    execution: "Cepat & kompetitif",
    instruments: ["Forex", "Metals", "Commodities", "Stocks", "Indices", "Crypto"],
    depositWithdrawal: "Bank, kartu, e-wallet, crypto"
  },
  accountTypes: [
    {
        name: "Cent Account",
        level: "Pemula",
        features: ["Min deposit : $0", "Spread : variable (mulai 1.4 pips)", "Leverage tinggi"]
    },
    {
        name: "Zero Spread Account",
        level: "Umum",
        features: ["Min deposit : $0", "Spread : 0.0", "Komisi : iya"]
    },
    {
        name: "Pro Account",
        level: "News Trader",
        features: ["Min deposit : ±$100", "Spread : ±0.6 pips"]
    },
    {
        name: "Premium Account",
        level: "Advanced",
        features: ["Min deposit : $0", "Spread : ±1.4 pips"]
    },
    {
        name: "HFCopy Account",
        level: "Copy Trading",
        features: ["Untuk copy trading/social trading"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Zero Spread",
          spread: "0.0 – 0.2 pips"
        },
        {
          accountType: "Pro",
          spread: "±0.6 – 0.8 pips"
        },
        {
          accountType: "Premium",
          spread: "±1.4 – 1.7 pips"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Zero/Pro",
          spread: "variabel (cenderung lebih besar)"
        },
      ]
    }
  ],
  keyAdvantages: ["Regulasi multi-yurisdiksi", "Spread kompetitif terutama di akun Zero", "Leverage maksimal tinggi", "Platform trading kuat (MT4, MT5, HFM App)", "Layanan support 24/5", "Cepat deposit & withdrawal"],
  depositWithdrawal: {
    paymentMethods: [
      { 
        method: "Bank Transfer", 
        time: { 
          deposit: "Instant - 1 hari kerja", 
          withdraw: " 1 - 3 hari kerja" 
        }, 
        fee: "$0" 
      },
      { 
        method: "Debit/Kredit Card", 
        time: { 
          deposit: "Instant - 1 hari kerja", 
          withdraw: " 1 - 3 hari kerja" 
        },  
        fee: "$0" 
      },
      { 
        method: "E-Wallet", 
        time: { 
          deposit: "Instant - 1 hari kerja", 
          withdraw: " 1 - 3 hari kerja" 
        },  
        fee: "$0" 
      },
      { 
        method: "Crypto", 
        time: { 
          deposit: "Instant - 1 hari kerja", 
          withdraw: " 1 - 3 hari kerja" 
        },  
        fee: "$0" 
      },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "HFM Mobile App", icon: "hfm.webp" },
      { username: "WebTrader", icon: "hfm.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: { min: 6, max: 8 }},
    { pair: "XAU/USD", estimate: { min: 8, max: 12 }},
    { pair: "AUD/USD", estimate: { min: 5, max: 7 }},
  ],
  advantages: ["Spread Zero sangat kompetitif", "Regulasi lengkap di berbagai negara", "Dukungan trading multi-platform", "Cocok untuk pemula hingga profesional"],
  disadvantages: ["Struktur regulasi berbeda untuk tiap entitas", "Spread akun standar bisa lebih tinggi", "Tidak semua promosi bonus/nodeposit tersedia"],
  communityRating: {
    score: { min: 4.3, max: 4.6 },
    quantityVote: 76,
    classifications: [
      { type: "Depo & Withdraw", rate: 4.5 },
      { type: "Support", rate: 4.4 },
      { type: "Platform & Trade", rate: 4.3 },
    ]
  },
  faq: [
    {
      question: "Apakah HFM aman?",
      answer: "Ya — teregulasi di banyak yurisdiksi besar (termasuk FCA & CySEC)."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Bisa dimulai dari $0 tergantung akun."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MT4, MT5, Web & HFM App."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:2000 (tergantung entitas dan wilayah)."
    },
    {
      question: "Apakah ada akun copy trading?",
      answer: "Ya — HFCopy"
    },
  ]
}