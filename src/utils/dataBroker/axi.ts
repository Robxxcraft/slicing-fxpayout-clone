import type { BrokerStruc, BrokerRanking } from "./typeDetailBroker"

const brokerName = "Axi";
const brokerFounded = "2007";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global ECN/STP Forex & CFD Broker"
};

export const axiDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "axi.webp",
  registerUrl: "#",
  websiteUrl: "#",
  detailUrl: "axi",
  statusRebate: "Auto Rebate",
  ranking: brokerRanking,
  badges: ["Tier 1", "ECN/STP Broker", "Low Spread", "Leverage Fleksibel"],
  overallScore: {
    rate: 4.5,
    communityUrl: "#",
  },
  detailDescription: "Axi adalah broker forex dan CFD internasional yang berdiri sejak 2007 dan dikenal sebagai salah satu broker ECN yang ramah trader di berbagai level. Axi menawarkan spread kompetitif, eksekusi cepat, dan platform trading kuat seperti MetaTrader 4 dan MetaTrader 5. Broker ini melayani trader di banyak negara dengan regulasi global dan layanan lengkap.",
  cardDescription: "Broker global dengan fokus pada keamanan & eksekusi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$0",
    leverage: "Hingga 1:500 (tergantung regulator)",
    spread: "Mulai 0.0 pips (Pro)",
  },
  profile: {
    name: brokerName,
    slogan: "Trade Unlocked",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated Forex & CFD Broker",
    regulations: [
      { name: "FCA", country: "United Kingdom" },
      { name: "ASIC", country: "Australia" },
      { name: "FSCA", country: "South Africa" },
    ]
  },
  summary: {
    minDeposit: "$0",
    types: ["Standard", "Pro ECN"],
    spread: "Mulai 0.0 – 0.2 pips (Pro ECN)",
    commission: "Pro ECN: ±$7 per lot (round-turn)",
    leverage: "Hingga 1:500 (tergantung regulator)",
    execution: "Cepat & stabil",
    instruments: ["Forex", "Indeks", "Komoditas", "Saham CFD", "Crypto CFD"],
    depositWithdrawal: "Banyak metode"
  },
  accountTypes: [
    {
        name: "Standard Account",
        level: "Umum",
        features: ["Min deposit : $0+ (direkomendasikan $200)", "Spread mulai ±1.0 pips", "Tanpa komisi"]
    },
    {
        name: "Pro ECN Account",
        level: "Advanced",
        features: ["Min deposit : ±$200", "Spread : mulai 0.0 – 0.2 pips", "Komisi kompetitif (~$7 per lot)"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Pro ECN",
          spread: "0.0 – 0.2 pips"
        },
        {
          accountType: "Standard",
          spread: "±1.0 – 1.3 pips"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Pro ECN",
          spread: "±0.1 – 0.3 pips"
        },
        {
          accountType: "Standard",
          spread: "±0.7 – 1.2 pips"
        },
      ]
    }
  ],
  keyAdvantages: ["Spread kompetitif & eksekusi cepat", "Regulasi kuat oleh ASIC & FCA", "Ramah scalping & EA", "Platform trading lengkap", "Biaya transparan & rendah"],
  depositWithdrawal: {
    paymentMethods: [
      { 
        method: "Bank Transfer", 
        time: {
          deposit: "Instan sampai 1 hari kerja",
          withdraw: "1–3 hari kerja"
        }, 
        fee: "Umumnya tanpa biaya broker (tergantung metode" 
      },
      { 
        method: "Kartu Debit/Kredit", 
        time: {
          deposit: "Instan sampai 1 hari kerja",
          withdraw: "1–3 hari kerja"
        }, 
        fee: "Umumnya tanpa biaya broker (tergantung metode" 
      },
      { 
        method: "E-Wallet", 
        time: {
          deposit: "Instan sampai 1 hari kerja",
          withdraw: "1–3 hari kerja"
        }, 
        fee: "Umumnya tanpa biaya broker (tergantung metode" 
      },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "WebTrader", icon: "axi.webp" },
      { username: "Mobile App (iOS & Android)", icon: "axi.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 4.5 },
    { pair: "XAU/USD", estimate: 6 },
    { pair: "AUD/USD", estimate: 4 },
  ],
  advantages: ["Spread rendah & eksekusi cepat", "Regulasi kuat (FCA/ASIC/FSCA)", "Platform trading populer", "Dukungan global"],
  disadvantages: ["Minimum efektif untuk ECN agak lebih tinggi", "Komisi per lot di Pro ECN"],
  communityRating: {
    score: 4.5,
    quantityVote: 72,
    classifications: [
      { type: "Execution & Spread", rate: 4.6 },
      { type: "Customer Support", rate: 4.4 },
      { type: "Deposit/Withdrawal", rate: 4.5 },
    ]
  },
  faq: [
    {
      question: "Apakah Axi aman?",
      answer: "Iya — diawasi oleh regulator besar seperti FCA, ASIC, FSCA (entitas berbeda sesuai wilayah)."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Tidak ada minimum resmi, namun direkomendasikan mulai $200 untuk eksekusi stabil."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MT4, MT5, Web, Mobile."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:500 tergantung regulator & entitas."
    },
    {
      question: "Apakah ada akun ECN?",
      answer: "Ya — Pro ECN dengan spread sangat rendah."
    },
  ]
}