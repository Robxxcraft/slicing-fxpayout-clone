import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "Finex";
const brokerFounded = "2012";
const brokerRanking: BrokerRanking = {
  tier: "Local/Regional",
  title: "Broker (Indonesia-Centric)"
};

export const finexDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "finex.webp",
  registerUrl: "#",
  websiteUrl: "#",
  detailUrl: "finex",
  ranking: brokerRanking,
  badges: ["Tier Local", "Regulated Broker", "Low Deposit", "Beginner Friendly"],
  overallScore: {
    rate: 4.3,
    communityUrl: "#",
  },
  detailDescription: "Finex (PT Finex Bisnis Solusi Futures) adalah broker forex resmi Indonesia yang berdiri sejak 2012 dan diawasi oleh BAPPEBTI serta OJK melalui kerjasama dengan institusi kliring seperti PT KBI dan Jakarta Futures Exchange (JFX). Broker ini menyediakan akses trading ke berbagai instrumen seperti forex, indeks, logam, saham CFD, dan energi dengan kondisi trading yang kompetitif serta dukungan platform yang intuitif.",
  cardDescription: "Broker global dengan fokus pada keamanan & eksekusi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$10 (setoran awal)",
    leverage: "Hingga 1:500",
    spread: "Mulai ±0.5 pips (variabel)",
  },
  profile: {
    name: brokerName,
    slogan: "Trusted Indonesian Forex Broker",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated (BAPPEBTI, OJK), Futures & Forex Broker",
    regulations: [
      { name: "BAPPEBTI", country: "Indonesia (Licensed Futures Broker" },
      { name: "OJK", country: "Indonesia (Oversight for financial marketing)" },
      { name: "Anggota", country: "Jakarta Futures Exchange (JFX)" },
      { name: "Kliring", country: "PT Kliring Berjangka Indonesia (KBI)" },
    ]
  },
  summary: {
    minDeposit: "$10 (setoran awal)",
    type: "Standard/Single Live Account",
    spread: "Mulai ±0.5 pips (variabel)",
    commission: "±$1 per lot",
    leverage: "Hingga 1:500",
    execution: "Cepat",
    instruments: "Forex, Indeks, Logam, Energi, Saham CFD",
    depositWithdrawal: "Bank lokal & e-wallet"
  },
  accountTypes: [
    {
        name: "Live Account (Single)",
        level: "Umum",
        features: ["Min deposit : $10", "Spread variabel mulai ±0.5 pips", "Komisi : ±$1 per lot"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Standard",
          spread: "±0.5 – 1.2"
        },
      ]
    },
    {
      icon: "eur-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Standard",
          spread: "±1.5 – 2.5"
        },
      ]
    }
  ],
  keyAdvantages: ["Regulasi resmi BAPPEBTI & OJK", "Deposit awal rendah", "Leverage tinggi sampai 1:500", "Eksekusi cepat", "Instrumen trading beragam", "Platform populer (MT5)"],
  depositWithdrawal: {
    paymentMethods: [
      { method: "Bank Transfer (lokal)", time: "1–3 hari kerja", fee: "$0 – tergantung metode" },
      { method: "Debit/Kredit", time: "Instan – cepat", fee: "$0 – tergantung metode" },
      { method: "E-Wallet", time: "Instan", fee: "$0 – tergantung metode" },
    ],
    platforms: [
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "WebTrader", icon: "finex.webp" },
      { username: "Mobile App (iOS & Android)", icon: "finex.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 6 },
    { pair: "XAU/USD", estimate: 8 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Broker resmi Indonesia (BAPPEBTI & OJK)", "Deposit rendah & leverage tinggi", "Komisi rendah per lot", "Eksekusi cepat"],
  disadvantages: ["Spread bisa lebih tinggi dibanding broker ECN global", "Jenis akun terbatas"],
  communityRating: {
    score: 4.3,
    withdrawalSpeed: 4.5,
    stability: 4.4,
    customerSupport: 4.5,
    quantityVote: 68
  },
  faq: [
    {
      question: "Apakah Finex aman?",
      answer: "Ya. Finex teregulasi oleh BAPPEBTI & diawasi OJK di Indonesia."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Minimum deposit awal $10."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MetaTrader 5, WebTrader, Mobile."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:500."
    },
    {
      question: "Apakah ada akun demo",
      answer: "Ya — tersedia demo untuk latihan trading."
    },
  ]
}