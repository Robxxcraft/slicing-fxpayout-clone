import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "HFM";
const brokerFounded = "2010";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global ECN Broker"
};

export const hfmDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "hfm.webp",
  registerUrl: "#",
  websiteUrl: "#",
  detailUrl: "hfm",
  ranking: brokerRanking,
  badges: ["Tier 1", "ECN Broker", "Low Spread", "Fast Execution"],
  overallScore: {
    rate: 4.3,
    communityUrl: "#",
  },
  detailDescription: "HFM (sebelumnya dikenal sebagai HotForex) adalah broker global yang berdiri sejak 2010, terkenal karena beragam jenis akun, spread kompetitif, dukungan platform trading lengkap, serta layanan yang cocok untuk pemula hingga profesional. HFM menyediakan akses ke Forex, Indeks, Komoditas, Logam, Energi, Saham CFD, dan Crypto CFD dengan kondisi trading yang transparan dan fleksibel.",
  cardDescription: "Broker ECN premium untuk scalper & EA. Likuiditas dalam & komisi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$5",
    leverage: "Hingga 1:1000",
    spread: "Mulai 0.0 pips (Zero)",
  },
  profile: {
    name: `${brokerName} (HotForex)`,
    slogan: "Trade with Confidence",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated, ECN/STP Broker",
    regulations: [
      { name: "FSCA", country: "South Africa" },
      { name: "FSC", country: "Mauritius" },
      { name: "DFSA", country: "Dubai" },
      { name: "FSA", country: "Seychelles" },
    ]
  },
  summary: {
    minDeposit: "$5",
    type: "Micro, Premium, Zero Spread, Auto",
    spread: "Mulai 0.0 pips (Zero)",
    commission: "Zero Account: ±$7 per lot (round-turn)",
    leverage: "Hingga 1:1000",
    execution: "Cepat",
    instruments: "Forex, Indeks, Komoditas, Logam, Energi, Saham CFD, Crypto CFD",
    depositWithdrawal: "Cepat & banyak metode"
  },
  accountTypes: [
    {
        name: "Micro Account",
        level: "Pemula",
        features: ["Min deposit : $5", "Spread rendah", "Cocok pemula"]
    },
    {
        name: "Premium Account",
        level: "Umum",
        features: ["Min deposit : $5", "Spread kompetitif", "Tanpa komisi"]
    },
    {
        name: "Zero Spread Account",
        level: "News Trader",
        features: ["Min deposit : $200", "Spread mulai 0.0 pips", "Komisi sekitar $7 per lot (round-turn)"]
    },
    {
        name: "Auto Account",
        level: "Advanced",
        features: ["Dirancang untuk copy trading / auto strategies", "Min deposit : $200"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Zero Account",
          spread: "0.0 – 0.1"
        },
        {
          accountType: "Standard / Premium",
          spread: "±1.2 – 1.6"
        },
      ]
    },
    {
      icon: "eur-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Zero Account",
          spread: "0.2 – 0.4"
        },
        {
          accountType: "Standard / Premium",
          spread: "±1.5 – 2.0"
        },
      ]
    }
  ],
  keyAdvantages: ["Spread kompetitif (terutama Zero)", "Diversifikasi akun lengkap", "Eksekusi cepat & stabil", "Platform trading lengkap", "Leverage tinggi sampai 1:1000", "Cocok pemula sampai profesional"],
  depositWithdrawal: {
    paymentMethods: [
      { method: "Bank Transfer", time: "1–3 hari kerja", fee: "$0" },
      { method: "Debit/Kredit Card", time: "Instan – cepat", fee: "$0" },
      { method: "E-Wallet", time: "Instan", fee: "$0" },
      { method: "Crypto", time: "Instan", fee: "$0" },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "WebTrader", icon: "hfm.webp" },
      { username: "Mobile App (iOS & Android)", icon: "hfm.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 10 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Spread & kondisi Zero sangat baik", "Banyak pilihan akun", "Eksekusi cepat", "Leverage tinggi", "Cocok untuk berbagai trader"],
  disadvantages: ["Spread standar agak lebih tinggi dibanding beberapa ECN", "Minimum deposit Zero & Auto lebih tinggi"],
  communityRating: {
    score: 4.3,
    withdrawalSpeed: 4.4,
    stability: 4.3,
    customerSupport: 4.3,
    quantityVote: 76
  },
  faq: [
    {
      question: "Apakah HFM aman?",
      answer: "Ya. HFM diawasi oleh regulator FSCA, FSC, DFSA, dan FSA (tergantung entitas)."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Mulai dari $5 (Micro / Premium), namun Zero & Auto biasanya $200."
    },
    {
      question: "Apa spread termurah?",
      answer: "Mulai 0.0 pips di Zero Spread Account."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:1000 tergantung regulator & wilayah."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MT4, MT5, WebTrader & Mobile App."
    },
  ]
}