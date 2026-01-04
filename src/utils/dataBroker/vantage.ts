import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "Vantage";
const brokerFounded = "2009/2010";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global CFD & Forex Broker"
};

export const vantageDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "vantage.webp",
  registerUrl: "https://www.vantagemarketsea.com/id/open-live-account/?affid=MjA3OTY2Mzk=",
  websiteUrl: "#",
  detailUrl: "vantage",
  ranking: brokerRanking,
  badges: ["Tier 1", "CFD Broker", "Low Spread", "Fast Execution"],
  overallScore: {
    rate: 4.4,
    communityUrl: "#",
  },
  detailDescription: "Vantage adalah broker global multi-aset yang berdiri sejak sekitar 2009/2010 dan dikenal karena spread kompetitif, eksekusi cepat, serta akses ke lebih dari 1.000 instrumen CFD termasuk forex, indeks, komoditas, saham, ETF, dan crypto. Marketnya fokus pada kondisi trading transparan dan alat edukasi untuk semua tingkat trader",
  cardDescription: "Broker ECN memiliki spread rendah, populer di Asia & Australia.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$50",
    leverage: "Hingga 1:500 (varies by region)",
    spread: "Mulai 0.0 pips (Raw ECN)",
  },
  profile: {
    name: brokerName,
    slogan: "Trade Forex & CFDs with Precision",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated, ECN/STP CFD Broker",
    regulations: [
      { name: "ASIC", country: "Australia" },
      { name: "CIMA", country: "Cayman Islands" },
      { name: "VFSC", country: "Vanuatu Financial Services Commission" },
      { name: "FSCA", country: "Afrika Selatan" },
      { name: "FCA", country: "United Kingdom" },
    ]
  },
  summary: {
    minDeposit: "$50",
    type: "Standard STP, Raw ECN, PRO ECN",
    spread: "Mulai 0.0 pips (Raw ECN)",
    commission: "Raw ECN/PRO: kompetitif (tergantung jenis akun)",
    leverage: "Hingga 1:500 (varies by region)",
    execution: "Cepat/Ultra-fast",
    instruments: "Forex, Indeks, Komoditas, Saham CFD, ETF, Crypto CFD",
    depositWithdrawal: "Cepat & banyak metode"
  },
  accountTypes: [
    {
        name: "Standard STP Account",
        level: "Umum",
        features: ["Spread mulai sekitar 1.0 pips", "Tanpa komisi per trade", "Cocok untuk trader umum"]
    },
    {
        name: "Raw ECN Account",
        level: "Trader",
        features: ["Spread mulai 0.0 pips", "Komisi kompetitif", "Cocok untuk scalping & EA"]
    },
    {
        name: "PRO ECN Account",
        level: "Trader",
        features: ["Spread lebih ketat", "Komisi lebih rendah/optimal", "Ideal untuk trader volume besar"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Raw ECN",
          spread: "0.0 – 0.1"
        },
        {
          accountType: "Standard STP",
          spread: "±1.0 – 1.4"
        },
      ]
    },
    {
      icon: "eur-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Raw ECN",
          spread: "±0.1 – 0.3"
        },
        {
          accountType: "Standard STP",
          spread: "±0.7 – 1.2"
        },
      ]
    }
  ],
  keyAdvantages: ["Spread & eksekusi kompetitif", "Akses ke 1,000+ instrumen CFD", "Regulasi global kuat", "Opsi ECN & STP", "Perlindungan saldo negatif", "Integrasi copy trading (ZuluTrade, DupliTrade)", "Platform trading modern"],
  depositWithdrawal: {
      paymentMethods: [
      { method: "Bank Transfer", time: "1–3 hari kerja", fee: "$0 (tergantung metode)" },
      { method: "Kartu Debit/Kredit", time: "Instan – 3 hari kerja", fee: "$0 (tergantung metode)" },
      { method: "E-Wallet", time: "Instan", fee: "$0 (tergantung metode)" },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "ProTrader", icon: "pro-trader.webp" },
      { username: "TradingView", icon: "trading-view.webp" },
      { username: "Vantage Mobile App", icon: "vantage.webp" },
      { username: "ZuluTrade (integrasi)", icon: "zulu-trade.webp" },
      { username: "DupliTrade (integrasi)", icon: "dupli-trade.webp" },
      { username: "WebTrader", icon: "vantage.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 10 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Spread kompetitif & eksekusi cepat", "Akses instrumen global luas", "Regulasi multi-negara", "Platform trading modern"],
  disadvantages: ["Proteksi investor tidak merata di semua entitas", "Produk non-CFD (aset nyata) tidak tersedia", "Layanan pelanggan bisa lebih responsif"],
  communityRating: {
    score: 4.4,
    withdrawalSpeed: 4.4,
    stability: 4.5,
    customerSupport: 4.3,
    quantityVote: 77
  },
  faq: [
    {
      question: "Apakah Vantage aman?",
      answer: "Ya. Vantage diregulasi oleh ASIC, CIMA, VFSC, FSCA, dan FCA tergantung entitas."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Minimum deposit mulai dari $50."
    },
    {
      question: "Apa jenis akun yang tersedia?",
      answer: "Standard STP, Raw ECN, PRO ECN"
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MT4, MT5, ProTrader, TradingView, Mobile App, Zulutrade, DupliTrade."
    },
    {
      question: "Apa spread termurah?",
      answer: "Mulai 0.0 pips di akun Raw ECN."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:500 tergantung regulator & wilayah."
    },
  ]
}