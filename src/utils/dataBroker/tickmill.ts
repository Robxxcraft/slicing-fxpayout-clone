import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "Tickmill";
const brokerFounded = "2014";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global ECN Broker"
};

export const tickmillDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "tickmill.webp",
  registerUrl: "#",
  websiteUrl: "#",
  detailUrl: "tickmill",
  ranking: brokerRanking,
  badges: ["Tier 1", "ECN Broker", "Low Commission", "Fast Execution"],
  overallScore: {
    rate: 4.4,
    communityUrl: "#",
  },
  detailDescription: "Broker global dengan fokus pada biaya trading rendah dan eksekusi cepat. Tickmill dikenal sebagai broker ECN dengan komisi kompetitif, cocok untuk scalping, EA, dan trader aktif. Menyediakan akses ke Forex, Indeks, Komoditas, Saham CFD, dan Crypto CFD dengan kondisi trading transparan dan stabil.",
  cardDescription: "Broker ECN terkenal dengan komisi rendah dan rebate kompetitif.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$100",
    leverage: "Hingga 1:1000",
    spread: "Mulai 0.0 pips (Raw & TradingView Raw)",
  },
  profile: {
    name: brokerName,
    slogan: "Global Forex & CFD Broker",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated, ECN/NDD Broker",
    regulations: [
      { name: "FCA", country: "United Kingdom" },
      { name: "CySEC", country: "Siprus" },
      { name: "FSCA", country: "Afrika Selatan" },
      { name: "FSA", country: "Seychelles" },
      { name: "DFSA", country: "Dubai" },
    ]
  },
  summary: {
    minDeposit: "$100",
    type: "Classic, Raw, TradingView Raw",
    spread: "Mulai 0.0 pips (Raw & TradingView Raw)",
    commission: "Raw: $3 per lot per side",
    leverage: "Hingga 1:1000",
    execution: "Cepat",
    instruments: "Forex, Indeks, Komoditas, CFD Saham, Crypto CFD",
    depositWithdrawal: "Beragam metode (cepat tergantung metode)"
  },
  accountTypes: [
    {
        name: "Classic Account",
        level: "Umum",
        features: ["Deposit minimum: $100", "Spread mulai ±1.6 pips", "Tanpa komisi"]
    },
    {
        name: "Raw Account",
        level: "Pro",
        features: ["Deposit minimum: $100", "Spread mulai 0.0 pips", "Komisi : $3 per lot per side"]
    },
    {
        name: "TradingView Raw Account",
        level: "Trader",
        features: ["Deposit minimum: $100", "Spread mulai 0.0 pips", "Komisi : $3.5 per lot per side"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Raw",
          spread: "0.0 – 0.1"
        },
        {
          accountType: "Classic",
          spread: "±1.6"
        },
      ]
    },
    {
      icon: "eur-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Raw",
          spread: "0.1 – 0.3"
        },
        {
          accountType: "Classic",
          spread: "±0.7 – 1.2"
        },
      ]
    }
  ],
  keyAdvantages: ["Spread sangat rendah (ECN/Raw)", "Komisi kompetitif", "Eksekusi order cepat & stabil", "Regulasi kuat & global", "Opsi akun bebas swap (Islamic)", "Support MT4, MT5, TradingView"],
  depositWithdrawal: {
      paymentMethods: [
      { method: "Kartu Debit/Kredit", time: "1–8 hari kerja", fee: "$0 (ada kemungkinan biaya pihak ketiga)" },
      { method: "Bank Transfer", time: "1–7 hari kerja (tergantung bank)", fee: "$0 (ada kemungkinan biaya pihak ketiga)" },
      { method: "E-Wallet", time: "Tergantung Layanan", fee: "$0 (ada kemungkinan biaya pihak ketiga)" },
      { method: "Crypto", time: "Instan", fee: "$0 (ada kemungkinan biaya pihak ketiga)" },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "TradingView", icon: "trading-view.webp" },
      { username: "WebTrader", icon: "tickmill.webp" },
      { username: "Mobile App (iOS & Android)", icon: "tickmill.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 10 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Regulasi global kuat", "Spread rendah & komisi adil", "TradingView tersedia", "Opsi swap-free"],
  disadvantages: ["Deposit minimum lebih tinggi dibanding broker yang lebih kecil", "Spread Classic relatif lebar", "Penarikan bank bisa memakan waktu"],
  communityRating: {
    score: 4.4,
    withdrawalSpeed: 4.5,
    stability: 4.5,
    customerSupport: 4.4,
    quantityVote: 84
  },
  faq: [
    {
      question: "Apakah Tickmill aman?",
      answer: "Ya. Diawasi oleh FCA, CySEC, FSCA, DFSA, dan FSA."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Minimum deposit untuk semua akun live adalah $100."
    },
    {
      question: "Apakah ada akun bebas swap?",
      answer: "Ya, opsi akun Islamic tersedia."
    },
    {
      question: "Apa spread terendah?",
      answer: "Raw & TradingView Raw : mulai 0.0 pips."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:1000 (tergantung jenis akun & wilayah regulasi)."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MetaTrader 4, MetaTrader 5, TradingView"
    },
  ]
}