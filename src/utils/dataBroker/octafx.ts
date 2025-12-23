import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "OctaFx";
const brokerFounded = "2011";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global ECN Broker"
};
 
export const octaFxDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "octafx.webp",
  registerUrl: "#",
  websiteUrl: "#",
  detailUrl: "octafx",
  ranking: brokerRanking,
  badges: ["Tier 1", "ECN Broker", "Low Spread", "Fast Execution"],
  overallScore: {
    rate: 4.5,
    communityUrl: "#",
  },
  detailDescription: "OctaFX adalah broker global yang berdiri sejak 2011, fokus pada spread rendah, eksekusi cepat, dan layanan trading yang ramah bagi semua level trader, termasuk pemula. OctaFX menyediakan akses ke Forex, Indeks, Komoditas, Logam, dan CFD lainnya dengan berbagai pilihan akun dan platform trading modern.",
  cardDescription: "Broker ECN premium untuk scalper & EA. Likuiditas dalam & komisi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$50",
    leverage: "Hingga 1:500",
    spread: "Mulai 0.0 pips (ECN/Pro)",
  },
  profile: {
    name: brokerName,
    slogan: "Trade with Confidence",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated, ECN/STP Broker",
    regulations: [
      { name: "CySEC", country: "Eropa" },
      { name: "FSA", country: "Saint Vincent and the Grenadines" },
    ]
  },
  summary: {
    minDeposit: "$50",
    type: "Micro, Pro, ECN",
    spread: "Mulai 0.0 pips (ECN/Pro)",
    commission: "ECN: ±$6–$7 per lot (round-turn)",
    leverage: "Hingga 1:500",
    execution: "Cepat",
    instruments: "Forex, Indeks, Komoditas, Logam, CFD Lainnya",
    depositWithdrawal: "Cepat & banyak metode"
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
          accountType: "ECN",
          spread: "0.0 – 0.1"
        },
        {
          accountType: "Pro",
          spread: "0.3 – 0.7"
        },
        {
          accountType: "Micro",
          spread: "±1.0 – 1.3"
        },
      ]
    },
    {
      icon: "eur-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "ECN",
          spread: "0.1 – 0.3"
        },
        {
          accountType: "Pro",
          spread: "0.8 – 1.2"
        },
        {
          accountType: "Micro",
          spread: "±1.5 – 2.0"
        },
      ]
    }
  ],
  keyAdvantages: ["Spread rendah terutama di ECN", "Eksekusi cepat & stabil", "Platform lengkap & modern", "Cocok untuk scalping & EA", "Leverage fleksibel", "Akun yang cocok pemula sampai pro"],
  depositWithdrawal: {
    paymentMethods: [
      { method: "Bank Transfer", time: "1–3 hari kerja", fee: "$0 (umumnya)" },
      { method: "Debit/Kredit Card", time: "Instan – cepat", fee: "$0 (umumnya)" },
      { method: "E-Wallet", time: "Instan", fee: "$0 (umumnya)" },
      { method: "Crypto", time: "Instan", fee: "$0 (umumnya)" },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "WebTrader", icon: "octafx.webp" },
      { username: "Mobile App (iOS & Android)", icon: "octafx.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 10 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Spread rendah & kompetitif", "Eksekusi cepat", "Platform lengkap", "Cocok pemula sampai profesional"],
  disadvantages: ["Regulasi utama di Saint Vincent & Grenadines (tidak sekuat FCA/ASIC)", "Spread Micro lebih tinggi dibanding ECN"],
  communityRating: {
    score: 4.5,
    withdrawalSpeed: 4.6,
    stability: 4.5,
    customerSupport: 4.4,
    quantityVote: 97
  },
  faq: [
    {
      question: "Apakah OctaFX aman?",
      answer: "Ya. OctaFX teregulasi oleh CySEC dan FSA (tergantung entitas & wilayah)."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Minimum deposit umumnya $50."
    },
    {
      question: "Apa jenis akun yang tersedia?",
      answer: "Micro, Pro, dan ECN."
    },
    {
      question: "Apakah OctaFX cocok untuk scalping & EA?",
      answer: "Ya. Terutama di akun ECN & Pro."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:500 tergantung regulator & wilayah."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MT4, MT5, WebTrader & Mobile App."
    },
  ]
}
