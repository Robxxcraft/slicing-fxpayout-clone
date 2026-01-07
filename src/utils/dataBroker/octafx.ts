import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "OctaFx";
const brokerFounded = "2011";
const brokerRanking: BrokerRanking = {
  tier: "Global",
  title: "Forex & CFD Broker"
};
 
export const octaFxDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "octafx.webp",
  registerUrl: "https://octa.click/bJLCLmX8zDZ?ib=47807098",
  websiteUrl: "https://octa.click/bJLCLmX8zDZ?ib=47807098",
  detailUrl: "octafx",
  ranking: brokerRanking,
  badges: ["Multi-Platform Trading", "Low Spread", "No Commission Deposit/Withdrawal", "Beginner & Advanced Friendly"],
  overallScore: {
    rate: 4.3,
    communityUrl: "#",
  },
  detailDescription: "OctaFX adalah broker forex dan CFD internasional yang telah beroperasi sejak 2011, memberikan akses ke pasar global termasuk forex, logam, indeks, komoditas, dan cryptocurrency. OctaFX dikenal karena spread rendah, biaya trading yang kompetitif tanpa komisi pada banyak instrumen, serta platform trading yang kuat seperti MetaTrader dan OctaTrader. OctaFX juga menyediakan fitur copy trading dan dukungan 24/7 untuk klien secara global.",
  cardDescription: "Broker ECN premium untuk scalper & EA. Likuiditas dalam & komisi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$50",
    leverage: "Hingga 1:500",
    spread: "Mulai ±0.6 pips",
  },
  profile: {
    name: brokerName,
    slogan: "Trusted Forex & CFD Broker",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Online Forex & CFD Broker",
    totalUser: "40+ juta trader di 180+ negara",
    totalInstrument: "Jumlah Instrumen : 300+ (Forex, saham CFD, logam, indeks, crypto)",
    regulations: [
      { name: "CySEC", country: "Cyprus" },
    ]
  },
  summary: {
    minDeposit: " $25 (disarankan $100)",
    types: ["MT4", "MT5", "OctaTrader"],
    spread: "Mulai ±0.6 pips",
    commission: "Tidak ada komisi non-trading (deposit/withdrawal gratis)",
    leverage: "Hingga 1:500 (tergantung instrumen & entitas)",
    execution: "Cepat & stabil",
    instruments: ["Forex", "logam", "indeks", "komoditas", "crypto", "saham CFD"],
    depositWithdrawal: "Banyak metode tanpa biaya non-trading"
  },
  accountTypes: [
    {
        name: "Micro Account",
        level: "Pemula",
        features: ["Min deposit : $50", "Spread mulai ±1.0 pips", "Cocok pemula"]
    },
    {
        name: "Pro Account",
        level: "Pro",
        features: ["Min deposit : $50", "Spread mulai ±0.3 – 0.8 pips", "Tanpa komisi"]
    },
    {
        name: "ECN Account",
        level: "Advanced",
        features: ["Min deposit : $100", "Spread mulai 0.0 pips", "Komisi kompetitif"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Semua jenis akun",
          spread: "±0.6 pips (typical)"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Semua jenis akun",
          spread: "variabel, lebih tinggi dari forex tergantung kondisi pasar"
        },
      ]
    },
    {
      icon: "aud-usd.svg",
      pair: "AUD/USD",
      spreads: [
        {
          accountType: "Semua jenis akun",
          spread: "±0.7 pips (typical)"
        },
      ]
    },
  ],
  keyAdvantages: ["Spread rendah (typical mulai 0.6 pips)", "Deposit & withdrawal bebas komisi (non-trading)", "Leverage fleksibel hingga 1:500", "Platform trading kuat (MT4, MT5, OctaTrader)", "Copy trading & fitur sosial", "Akses lebih dari 300 instrumen global", "Dukungan pelanggan 24/7"],
  depositWithdrawal: {
    paymentMethods: [
      { 
        method: "Bank Transfer", 
        time: {
          deposit: "Instan sampai 1 hari kerja",
          withdraw: "1–3 hari kerja"
        }, 
        fee: "Umumnya bebas biaya non-trading dari broker" 
      },
      { 
        method: "Debit/Kredit Card", 
        time: {
          deposit: "Instan sampai 1 hari kerja",
          withdraw: "1–3 hari kerja"
        }, 
        fee: "Umumnya bebas biaya non-trading dari broker" 
      },
      { 
        method: "E-Wallet", 
        time: {
          deposit: "Instan sampai 1 hari kerja",
          withdraw: "1–3 hari kerja"
        }, 
        fee: "Umumnya bebas biaya non-trading dari broker" 
      },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "OctaTrader (platform eksklusif)", icon: "octafx.webp" },
      { username: "WebTrader", icon: "octafx.webp" },
      { username: "Mobile App (iOS & Android)", icon: "octafx.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 6 },
    { pair: "XAU/USD", estimate: 8 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: [" Kondisi trading ramah biaya", "Spread kompetitif", "Platform lengkap (MT4, MT5, OctaTrader)", "Deposit & withdraw bebas komisi", "Banyak instrumen trading"],
  disadvantages: ["Tidak setinggi broker dengan regulasi top-tier seperti FCA/ASIC secara penuh di semua entitas", "Spread bisa melebar pada volatilitas tinggi", "Review pengguna ada yang menyebut masalah layanan tertentu (beberapa review mixed)"],
  communityRating: {
    score: 4.5,
    quantityVote: 97,
    classifications: [
      { type: "Customer Service", rate: 4.2 },
      { type: "Platform & Execution", rate: 4.4 },
      { type: "Costs & Spreads", rate: 4.3 },
    ]
  },
  faq: [
    {
      question: "Apakah OctaFX aman?",
      answer: "Ya, OctaFX beroperasi sejak 2011 dan teregulasi melalui entitas CySEC untuk wilayah Eropa."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "$25 (disarankan $100 untuk margin lebih sehat)."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MT4, MT5, OctaTrader, mobile & web."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:500 tergantung instrumen & wilayah."
    },
    {
      question: "Apakah ada akun demo?",
      answer: "Ya, OctaFX menyediakan demo gratis."
    },
  ]
}
