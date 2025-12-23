import type { BrokerStruc, BrokerRanking } from "./typeDetailBroker"

const brokerName = "Axi";
const brokerFounded = "2007";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global ECN Broker"
};

export const axiDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "axi.webp",
  registerUrl: "#",
  websiteUrl: "#",
  detailUrl: "axi",
  ranking: brokerRanking,
  badges: ["Tier 1", "ECN Broker", "Low Spread", "Fast Execution"],
  overallScore: {
    rate: 4.5,
    communityUrl: "#",
  },
  detailDescription: "Axi adalah broker global yang berdiri sejak 2007 dan dikenal karena eksekusi cepat, spread kompetitif, serta dukungan platform trading canggih. Axi fokus pada layanan yang transparan dan cocok untuk berbagai gaya trading termasuk scalping, EA, dan profesional. Menyediakan akses ke trading Forex, Indeks, Komoditas, Saham CFD, dan Crypto CFD.",
  cardDescription: "Broker global dengan fokus pada keamanan & eksekusi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$0 (direkomendasikan $200+)",
    leverage: "Hingga 1:500 (tergantung regulator)",
    spread: "Mulai 0.0 pips (Pro)",
  },
  profile: {
    name: brokerName,
    slogan: "Trade Unlocked",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated, ECN/NDD Broker",
    regulations: [
      { name: "ASIC", country: "Australia" },
      { name: "FCA", country: "United Kingdom" },
      { name: "FSCA", country: "South Africa" },
    ]
  },
  summary: {
    minDeposit: "$0 (direkomendasikan $200+)",
    type: "Standard, Pro ECN",
    spread: "Mulai 0.0 pips (Pro)",
    commission: "Pro ECN: ±$7 per lot (round-turn)",
    leverage: "Hingga 1:500 (tergantung regulator)",
    execution: "Cepat",
    instruments: "Forex, Indeks, Komoditas, Saham CFD, Crypto CFD",
    depositWithdrawal: "Cepat"
  },
  accountTypes: [
    {
        name: "Standard Account",
        level: "Umum",
        features: ["Tanpa komisi", "Spread mulai ±1.0 pips", "Min deposit : $0+ (direkomendasikan $200)"]
    },
    {
        name: "Pro ECN Account",
        level: "Advanced",
        features: ["Spread mulai 0.0 pips", "Komisi kompetitif (~$7 per lot)", "Cocok untuk scalping & EA"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Pro ECN",
          spread: "0.0 – 0.1"
        },
        {
          accountType: "Standard",
          spread: "±1.0 – 1.3"
        },
      ]
    },
    {
      icon: "eur-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Pro ECN",
          spread: "0.1 – 0.3"
        },
        {
          accountType: "Standard",
          spread: "±0.8 – 1.2"
        },
      ]
    }
  ],
  keyAdvantages: ["Spread kompetitif & eksekusi cepat", "Regulasi kuat oleh ASIC & FCA", "Ramah scalping & EA", "Platform trading lengkap", "Biaya transparan & rendah"],
  depositWithdrawal: {
    paymentMethods: [
      { method: "E-Wallet", time: "Instan", fee: "$0 (umumnya)" },
      { method: "Bank Transfer", time: "1–3 hari kerja", fee: "$0 (umumnya)" },
      { method: "Kartu Debit/Kredit", time: "Instan – cepat", fee: "$0 (umumnya)" }
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "WebTrader", icon: "axi.webp" },
      { username: "Mobile App (iOS & Android)", icon: "axi.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 10 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Eksekusi cepat & spread rendah", "Regulasi kuat & transparan", "Ramah EA & scalping", "Platform luas & stabil"],
  disadvantages: ["Minimum deposit efektif direkomendasikan lebih tinggi", "Spread standar tidak setinggi broker ECN murni"],
  communityRating: {
    score: 4.5,
    withdrawalSpeed: 4.5,
    stability: 4.6,
    customerSupport: 4.4,
    quantityVote: 72
  },
  faq: [
    {
      question: "Apakah Axi aman?",
      answer: "Ya. Diawasi oleh ASIC (Australia), FCA (UK) & FSCA (SA)."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Tidak ada minimum resmi, rekomendasi awal sekitar $200."
    },
    {
      question: "Apakah cocok untuk scalping & EA?",
      answer: "Ya. Akun Pro ECN cocok untuk scalping & EA."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:500, tergantung regulator & wilayah."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MT4, MT5, WebTrader & Mobile App."
    },
  ]
}