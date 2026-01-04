import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "FP Markets";
const brokerFounded = "2005";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global ECN Broker"
};

export const fpMarketsDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "fp-markets.webp",
  registerUrl: "https://portal.fpmarkets.com/register?redir=stv&fpm-affiliate-utm-source=IB&fpm-affiliate-agt=64952",
  websiteUrl: "#",
  detailUrl: "fp-markets",
  ranking: brokerRanking,
  badges: ["Tier 1", "ECN Broker", "Low Spread", "Fast Execution"],
  overallScore: {
    rate: 4.6,
    communityUrl: "#",
  },
  detailDescription: "Broker global ternama yang telah beroperasi sejak 2005, memberikan pengalaman trading yang transparan, biaya rendah, dan eksekusi cepat. FP Markets dikenal karena spread ketat, platform lengkap, serta dukungan trading di Forex dan CFD di banyak instrumen keuangan.",
  cardDescription: "Broker ECN Australia dengan eksekusi cepat & kondisi pro-trader.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$100",
    leverage: "Hingga 1:500",
    spread: "Mulai 0.0 pips (Raw)",
  },
  profile: {
    name: brokerName,
    slogan: "Trade Global Markets",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated, ECN/Market Execution",
    regulations: [
      { name: "ASIC", country: "Australia" },
      { name: "CySEC", country: "Eropa" },
      { name: "FSCA", country: "Afrika Selatan" },
      { name: "FSA", country: "Seychelles" },
    ]
  },
  summary: {
    minDeposit: "$100",
    type: "Standard, Raw",
    spread: "Mulai 0.0 pips (Raw)",
    commission: "$6–$7 per lot (round-turn)",
    leverage: "Hingga 1:500",
    execution: "Cepat",
    instruments: "Forex, Gold, Indeks, Energi, Saham CFD, Crypto CFD",
    depositWithdrawal: "Cepat"
  },
  accountTypes: [
    {
        name: "Standard Account",
        level: "Umum",
        features: ["Tanpa komisi", "Spread rendah", "Cocok untuk trading manual", "Min deposit : $100"]
    },
    {
        name: "Raw Account (ECN)",
        level: "Pro",
        features: ["Spread mulai 0.0 pips", "Komisi rendah", "Eksekusi cepat", "Cocok untuk scalping & EA"]
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
          accountType: "Standard",
          spread: "1.0 – 1.2"
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
          accountType: "Standard",
          spread: "0.8 – 1.2"
        },
      ]
    }
  ],
  keyAdvantages: ["Spread ECN sangat rendah", "Eksekusi cepat & stabil", "Likuiditas tinggi", "Ramah EA & scalping", "Platform trading lengkap", "Cocok untuk trader aktif"],
  depositWithdrawal: {
      paymentMethods: [
      { method: "E-Wallet", time: "Instan", fee: "$0" },
      { method: "Bank Transfer", time: "1–3 hari kerja", fee: "$0" },
      { method: "Kartu Debit/Kredit", time: "1–3 hari kerja", fee: "$0" },
      { method: "Crypto", time: "Instan", fee: "$0" },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "cTrader", icon: "c-trader.webp" },
      { username: "TradingView", icon: "trading-view.webp" },
      { username: "WebTrader", icon: "fp-markets.webp" },
      { username: "Mobile App (iOS & Android)", icon: "fp-markets.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 10 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Regulasi kuat", "Spread rendah & transparan", "Platform sangat lengkap", "Cocok untuk EA & scalping"],
  disadvantages: ["Tidak menyediakan akun Cent", "Leverage dibatasi di wilayah tertentu"],
  communityRating: {
    score: 4.6,
    withdrawalSpeed: 4.5,
    stability: 4.6,
    customerSupport: 4.5,
    quantityVote: 88
  },
  faq: [
    {
      question: "Apakah FP Markets aman?",
      answer: "Ya. FP Markets diregulasi oleh ASIC, CySEC, FSCA, dan FSA."
    },
    {
      question: "Berapa minimum deposit FP Markets?",
      answer: "Minimum deposit adalah $100."
    },
    {
      question: "Apakah FP Markets cocok untuk EA & scalping?",
      answer: "Ya. FP Markets sangat ramah EA dan scalping."
    },
    {
      question: "Apakah FP Markets menyediakan akun Cent?",
      answer: "Tidak. FP Markets hanya menyediakan akun Standard dan Raw."
    },
    {
      question: "Berapa leverage maksimal FP Markets?",
      answer: "Hingga 1:500, tergantung entitas dan regulasi."
    },
    {
      question: "Platform apa saja yang didukung FP Markets?",
      answer: "MT4, MT5, cTrader, dan TradingView."
    },
  ]
}