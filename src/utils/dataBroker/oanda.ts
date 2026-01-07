import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "Oanda";
const brokerFounded = "1996";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global Forex & CFD Broker"
};

export const oandaDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "oanda.webp",
  registerUrl: "#",
  websiteUrl: "#",
  detailUrl: "oanda",
  ranking: brokerRanking,
  badges: ["Tier 1", "Regulated Broker", "Low Spread", "High Trust"],
  overallScore: {
    rate: 4.2,
    communityUrl: "#",
  },
  detailDescription: "OANDA adalah broker internasional yang berdiri sejak 1996, terkenal sebagai salah satu broker forex tertua dan paling tepercaya di dunia. OANDA fokus pada transparansi harga, teknologi trading canggih, dan pengalaman trading yang stabil. Broker ini menyediakan akses ke forex, indeks, komoditas, logam, dan CFD dengan spread yang kompetitif serta dukungan platform trading yang kuat.",
  cardDescription: "Broker global dengan fokus pada keamanan & eksekusi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$0 (no minimum)",
    leverage: "Hingga 1:50 (tergantung regulator & wilayah)",
    spread: "Mulai 0.6 pips (EUR/USD, variable)",
  },
  profile: {
    name: brokerName,
    slogan: "Trusted Global Forex Broker",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated Forex & CFD Broker",
    regulations: [
      { name: "FCA", country: "United Kingdom" },
      { name: "ASIC", country: "Australia" },
      { name: "IIROC", country: "Canada" },
      { name: "MAS", country: "Singapore" },
    ]
  },
  summary: {
    minDeposit: "$0 (no minimum)",
    types: ["Standard"],
    spread: "Mulai 0.6 pips (EUR/USD, variable)",
    commission: "Tanpa komisi pada akun standar",
    leverage: "Hingga 1:50 (tergantung regulator & wilayah)",
    execution: "Cepat & stabil",
    instruments: ["Forex", "Logam", "Indeks", "Komoditas", "CFD Saham"],
    depositWithdrawal: "Cepat & luas metode"
  },
  accountTypes: [
    {
        name: "Standard Account",
        level: "Umum",
        features: ["Tanpa komisi", "Spread mulai 0.6 pips (EUR/USD)", "Cocok untuk trader manual & pemula"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Standard",
          spread: "±0.6 – 1.2"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Standard",
          spread: "±1.5 – 2.5"
        },
      ]
    }
  ],
  keyAdvantages: ["Broker forex tertua & terpercaya", "Transparansi harga pasar tinggi", "Regulasi kuat dunia (FCA, ASIC, MAS, IIROC)", "Platform trading kuat & stabil", "Spread kompetitif untuk akun standar", "Akses ke banyak instrumen"],
  depositWithdrawal: {
      paymentMethods: [
      { 
        method: "Bank Transfer", 
        time: {
          deposit: "1–3 hari kerja",
          withdraw: "1–3 hari kerja"
        }, 
        fee: "$0 (umumnya)" 
      },
      { 
        method: "Debit/Kredit Card", 
        time: {
          deposit: "Instan – cepat",
          withdraw: "Instan – cepat"
        }, 
        fee: "$0 (umumnya)" 
      },
      { 
        method: "E-Wallet", 
        time: {
          deposit: "Instan",
          withdraw: "Instan"
        }, 
        fee: "$0 (umumnya)" 
      },
    ],
    platforms: [
      { username: "OANDA Trade (Web & Desktop)", icon: "oanda.webp" },
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "Mobile App (iOS & Android)", icon: "oanda.webp" },
      { username: "TradingView (connect via bridge)", icon: "trading-view.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 6 },
    { pair: "XAU/USD", estimate: 8 },
    { pair: "AUD/USD", estimate: 4 },
  ],
  advantages: ["Reputasi tinggi & terpercaya", "Spread kompetitif untuk akun standar", "Platform internal kuat & stabil", "Regulasi global teratas"],
  disadvantages: ["Tidak ada akun ECN/Raw spread tradisional", "Leverage lebih rendah dibanding broker lain"],
  communityRating: {
    score: 4.2,
    classifications: [
      { type: "Kecepatan Withdraw (WD)", rate: 4.4 },
      { type: "Stabilitas Server", rate: 4.3 },
      { type: "Customer Support", rate: 4.2 },
    ],
    quantityVote: 79
  },
  faq: [
    {
      question: "Apakah OANDA aman?",
      answer: "Ya. OANDA diawasi oleh FCA, ASIC, MAS, IIROC."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Tidak ada minimum resmi."
    },
    {
      question: "Apakah OANDA memiliki akun ECN?",
      answer: "Tidak — OANDA fokus pada akun standar."
    },
    {
      question: "Apa spread terendah?",
      answer: "Spread mulai sekitar 0.6 pips untuk EUR/USD."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:50 (tergantung regulator & wilayah)."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "OANDA Trade, MT4, Mobile, serta integrasi dengan TradingView."
    },
  ]
}