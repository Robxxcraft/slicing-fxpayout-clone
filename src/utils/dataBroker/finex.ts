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
  scheduleUrl: "/schedule",
  statusRebate: "Manual Rebate",
  ranking: brokerRanking,
  badges: ["Tier Local", "Regulated Broker", "Low Deposit", "Beginner Friendly"],
  overallScore: {
    rate: 4.3,
    communityUrl: "https://www.trustpilot.com/review/finex.co.id",
  },
  detailDescription: "Finex (PT Finex Bisnis Solusi Futures) adalah broker forex resmi Indonesia yang berdiri sejak 2012 dan diawasi oleh BAPPEBTI serta OJK melalui kerjasama dengan institusi kliring seperti PT KBI dan Jakarta Futures Exchange (JFX). Broker ini menyediakan akses trading ke berbagai instrumen seperti forex, indeks, logam, saham CFD, dan energi dengan kondisi trading yang kompetitif serta dukungan platform yang intuitif.",
  cardDescription: "Broker global dengan fokus pada keamanan & eksekusi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$10",
    leverage: "Hingga 1:500 (Forex & logam; indeks/energi berbeda)",
    spread: "Mengambang, mulai sekitar 0.5 pip (typical)",
  },
  profile: {
    name: `PT Finex Bisnis Solusi Futures (${brokerName})`,
    slogan: "(tidak spesifik, brand lokal)",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Forex & CFD Broker teregulasi Indonesia",
    regulations: [
      { name: "BAPPEBTI", country: "Retail Forex License (47/BAPPEBTI/SI/04/2013)" },
    ]
  },
  summary: {
    minDeposit: "$10",
    types: ["Single Live Accoun"],
    spread: "Mulai ±0.5 pips (variabel)",
    commission: "±$1 per lot",
    leverage: "Hingga 1:500 (Forex & Logam)",
    execution: "Cepat",
    instruments: ["Forex", "Indeks", "Logam", "Energi", "Saham CFD"],
    depositWithdrawal: "Bank lokal & e-wallet"
  },
  accountTypes: [
    {
        name: "Single Live Account",
        level: "Umum",
        features: ["Min deposit : $10", "Spread  mulai 0.5 pips", "Komisi : ±$1 per lot", "Leverage : hingga 1:500", "Instrumen trading lengkap"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Standard",
          spread: "±0.5 – 1.0 pips (typical)"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Standard",
          spread: "variabel; umumnya lebih tinggi dibanding Forex"
        },
      ]
    },
    {
      icon: "aud-usd.svg",
      pair: "AUD/USD",
      spreads: [
        {
          accountType: "Standard",
          spread: "±0.7 – 1.2 pips (typical)"
        },
      ]
    }
  ],
  keyAdvantages: ["Regulasi resmi BAPPEBTI & OJK", "Deposit awal rendah", "Leverage tinggi sampai 1:500", "Eksekusi cepat", "Instrumen trading beragam", "Platform populer (MT5)"],
  depositWithdrawal: {
    paymentMethods: [
      { 
        method: "Bank Transfer (USD/IDR)", 
        time: {
          deposit: "Instan / cepat",
          withdraw: "Sekitar 20 menit – 2 jam (80% kasus)"
        }, 
        fee: "Biasanya $0 dari broker" 
      },
      { 
        method: "E-Wallet", 
        time: {
          deposit: "Instan / cepat",
          withdraw: "Sekitar 20 menit – 2 jam (80% kasus)"
        }, 
        fee: "Biasanya $0 dari broker" 
      },
      { 
        method: "Debit/Kredit", 
        time: {
          deposit: "Instan / cepat",
          withdraw: "Sekitar 20 menit – 2 jam (80% kasus)"
        }, 
        fee: "Biasanya $0 dari broker" 
      },
    ],
    platforms: [
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "WebTrader", icon: "finex.webp" },
      { username: "Mobile App (iOS & Android)", icon: "finex.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 3 },
    { pair: "XAU/USD", estimate: 5 },
    { pair: "AUD/USD", estimate: 3 },
  ],
  advantages: ["Broker resmi teregulasi BAPPEBTI", "Deposit rendah ($10)", "Spread & komisi relatif kompetitif", "Akses ke banyak instrumen", "Eksekusi cepat & dukungan bank lokal"],
  disadvantages: ["Hanya satu tipe akun live", "Fitur edukasi & riset lebih sederhana dibanding broker global", "MT5 saja (tanpa MT4)"],
  communityRating: {
    score: 4.3,
    quantityVote: 398,
    reviewHighlights: ["Cepat dalam proses deposit/withdraw", "Biaya trading rendah", "MT5 nyaman dipakai", "Cocok untuk pemula & menengah"],
  },
  faq: [
    {
      question: "Apakah Finex aman & legal?",
      answer: "Ya. Finex terdaftar & berlisensi BAPPEBTI di Indonesia."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Minimum deposit awal $10."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MetaTrader 5."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:500 untuk forex & logam."
    },
    {
      question: "Apakah Finex punya akun demo?",
      answer: "Ya — tersedia demo untuk latihan."
    },
    {
      question: "Apa spread terendahnya?",
      answer: "Mulai ±0.5 pips untuk EUR/USD."
    },
    {
      question: "Apakah ada program afiliasi / rebate?",
      answer: "Ya — tersedia model partner/afiliasi, detail rebate dibicarakan di portal partner."
    },
  ]
}