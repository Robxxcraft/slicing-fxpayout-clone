import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "Pepperstone";
const brokerFounded = "2010";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global ECN Broker"
};

export const pepperstoneDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "pepperstone.webp",
  registerUrl: "#",
  websiteUrl: "#",
  detailUrl: "pepperstone",
  ranking: brokerRanking,
  badges: ["Tier 1", "ECN Broker", "Raw Spread", "Ultra-Fast Execution"],
  overallScore: {
    rate: 4.5,
    communityUrl: "#",
  },
  detailDescription: "Broker global dengan eksekusi cepat, spread rendah, dan kondisi trading profesional. Pepperstone dikenal sebagai broker favorit untuk scalping, EA, dan trader aktif, dengan akses ke Forex, Gold, Indeks, Energi, Saham CFD, dan Crypto CFD. Didukung platform trading modern serta proses deposit–withdraw yang cepat dan transparan.",
  cardDescription: "Broker regulasi top dengan eksekusi sangat cepat dan kondisi raw spread.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$0 (tanpa minimum)",
    leverage: "Hingga 1:500",
    spread: "Mulai 0.0 pips (Razor)",
  },
  profile: {
    name: brokerName,
    slogan: "Award-Winning Global Forex Broker",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated, ECN/NDD Broker",
    regulations: [
      { name: "ASIC", country: "Australia" },
      { name: "FCA", country: "Inggris" },
      { name: "DFSA", country: "Dubai" },
      { name: "BaFin", country: "Jerman" },
      { name: "CySEC", country: "Siprus" },
      { name: "SCB", country: "Bahamas" },
    ]
  },
  summary: {
    minDeposit: "$0 (tanpa minimum)",
    type: "Standard, Razor, Pro",
    spread: "Mulai 0.0 pips (Razor)",
    commission: "Razor: $6–$7 per lot (round-turn)",
    leverage: "Hingga 1:500",
    execution: "Cepat",
    instruments: "Forex, Komoditas, Indeks, Saham CFD, Crypto CFD",
    depositWithdrawal: "Cepat & banyak metode"
  },
  accountTypes: [
    {
        name: "Standard Account",
        level: "Umum",
        features: ["Spread mulai ±1.0 pips", "Tanpa komisi"]
    },
    {
        name: "Razor Account",
        level: "Trader",
        features: ["Spread mulai 0.0 pips", "Komisi $3.50 per side (±$7 round-turn)"]
    },
    {
        name: "Pro Account",
        level: "Pro",
        features: ["Kondisi trading profesional", "Leverage fleksibel"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Razor",
          spread: "0.0 – 0.1"
        },
        {
          accountType: "Standard",
          spread: "±1.0"
        },
      ]
    },
    {
      icon: "eur-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Razor",
          spread: "0.1 – 0.3"
        },
        {
          accountType: "Standard",
          spread: "±0.7 – 1.2"
        },
      ]
    }
  ],
  keyAdvantages: ["Spread ECN sangat rendah", "Eksekusi order cepat", "Regulasi tingkat atas (FCA, ASIC)", "Dukungan MT4, MT5, cTrader, TradingView", "Ramah scalping & EA", "Tidak ada biaya inaktif/biaya akun"],
  depositWithdrawal: {
      paymentMethods: [
      { method: "E-Wallet", time: "Instan", fee: "$0" },
      { method: "Bank Transfer", time: "1–3 hari kerja", fee: "$0" },
      { method: "Crypto", time: "Instan", fee: "$0" },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "cTrader", icon: "c-trader.webp" },
      { username: "TradingView", icon: "trading-view.webp" },
      { username: "WebTrader", icon: "pepperstone.webp" },
      { username: "Mobile App (iOS & Android)", icon: "pepperstone.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 10 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Spread rendah & eksekusi stabil", "Regulasi kuat dan internasional", "Platform lengkap (MT4, MT5, cTrader, TradingView)"],
  disadvantages: ["Instrumen non-CFD nyata terbatas", "Support 24/7 tidak tersedia untuk semua wilayah", "Leverage bisa dibatasi tergantung lokasi"],
  communityRating: {
    score: 4.5,
    withdrawalSpeed: 5,
    stability: 4.5,
    customerSupport: 4.5
  },
  faq: [
    {
      question: "Apakah Pepperstone aman?",
      answer: "Ya. Diawasi oleh FCA, ASIC, DFSA, BaFin, CySEC, SCB."
    },
    {
      question: "Apakah ada minimum deposit?",
      answer: "Tidak ada minimum deposit resmi, tapi disarankan setoran awal ~$200."
    },
    {
      question: "Apakah cocok untuk scalping & EA?",
      answer: "Ya, sangat cocok terutama di akun Razor."
    },
    {
      question: "Apa spread paling rendah?",
      answer: "Mulai 0.0 pips pada akun Razor."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:500, tergantung regulator & wilayah."
    },
    {
      question: "Berapa biaya deposit/withdraw?",
      answer: "Sebagian besar metode: $0."
    },
  ]
}