import type { BrokerStruc, BrokerRanking } from "./typeDetailBroker";

const brokerName = "Valetax";
const brokerFounded = "2021";
const brokerRanking: BrokerRanking = {
  tier: "Offshore/High-Leverage Broker",
  title: "Forex & CFD Global"
};

export const valetaxDetail: BrokerStruc = {
  id_ib: "5808172",
  contactSupport: "contact@valetax.com",
  name: brokerName,
  profileImage: "valetax.webp",
  registerUrl: "https://ma.valetax-indonesia.com/p/5808172",
  websiteUrl: "https://ma.valetax-indonesia.com/p/5808172",
  detailUrl: "valetax",
  scheduleUrl: "/schedule",
  statusRebate: "Auto",
  ranking: brokerRanking,
  badges: ["Low Minimum Deposit", "High Leverage", "MT4 & MT5 Supported", "ECN Account Available", "Global Forex & CFD Broker"],
  overallScore: {
    rate: 4.3,
    communityUrl: "https://www.trustpilot.com/review/valetax.com",
  },
  detailDescription: "Valetax adalah broker forex dan CFD global yang menawarkan berbagai jenis akun trading dengan leverage yang fleksibel dan spread kompetitif. Platform ini mendukung akses ke lebih dari 60 pasangan mata uang serta berbagai instrumen lain seperti logam, indeks, energi, dan kripto melalui platform populer MT4 dan MT5, cocok untuk trader pemula maupun berpengalaman.",
  cardDescription: "Broker ECN premium untuk scalper & EA. Likuiditas dalam & komisi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$1",
    leverage: "hingga 1:2000",
    spread: "Mulai 0.0 pips",
  },
  profile: {
    name: brokerName,
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Global Forex & CFD Broker",
    regulations: [
      { name: "FSC", country: "Mauritius" },
      { name: "St. Vincent and the Grenadines", country: "Saint Vincent and the Grenadines" },
    ]
  },
  summary: {
    minDeposit: "$1",
    types: ["Cent", "Standard", "ECN", "Booster", "Bonus", "PRO"],
    spread: "Mulai 0.0 pips",
    commission: "ECN: $4 per lot (beberapa akun bebas komisi)",
    leverage: "Hingga 1:2000",
    execution: "Eksekusi pasar cepat & stabil",
    instruments: ["Forex 60+ pairs", "logam", "indeks", "energi", "crypto"],
    depositWithdrawal: "Proses cepat-instan/4 jam untuk local/crypto (tergantung metode)"
  },
  accountTypes: [
    {
        name: "Cent Account",
        level: "Pemula",
        features: ["Min deposit : $1", "Spread : ±1.2 pips", "Komisi : 0", "Cocok untuk pemula"]
    },
    {
        name: "Standard Account",
        level: "Umum",
        features: ["Min deposit : ±$8–$10", "Spread : ±1.2 pips", "Komisi : 0"]
    },
    {
        name: "ECN Account",
        level: "Pro & Scalper",
        features: ["Min deposit : $50", "Spread : mulai 0.0 pips", "Komisi : ±$4 per lot"]
    },
    {
        name: "Booster Account",
        level: "Trader",
        features: ["Min deposit : ±$8", "Spread : ±2.0 pips", "Komisi : 0"]
    },
    {
        name: "Bonus Account",
        level: "Trader",
        features: ["Min deposit : ±$8", "Spread : ±2.0 pips", "Komisi : 0"]
    },
    {
        name: "Pro Account",
        level: "Advanced",
        features: ["Min deposit : $500", "Spread : ±0.6 pips", "Komisi : 0"]
    },
  ],
  tradingSpreads: [
    {
      pair: "EUR/USD",
      icon: "eur-usd.svg",
      spreads: [
        { accountType: "ECN/Raw", spread: "Mulai 0.0" },
        { accountType: "Standard", spread: "±1.2 - 2.0" },
        { accountType: "Booster", spread: "±1.2 - 2.0" },
        { accountType: "Bonus", spread: "±1.2 - 2.0" },
      ]
    },
    {
      pair: "XAU/USD",
      icon: "xau-usd.svg",
      spreads: [
        { accountType: "ECN/Raw", spread: "Mulai 0.0" },
        { accountType: "Standard", spread: "±1.2 - 2.0" },
        { accountType: "Booster", spread: "±1.2 - 2.0" },
        { accountType: "Bonus", spread: "±1.2 - 2.0" },
      ]
    }
  ],
  keyAdvantages: ["Minimum deposit sangat rendah mulai dari $1", "Spread kompetitif hingga 0.0 pips pada akun ECN", "Dukungan platform MT4, MT5, Web, Mobile", "Akses lebih dari 60+ pasangan forex dan beberapa kelas aset lainnya", "Dukungan 24/7 customer service"],
  depositWithdrawal: {
    paymentMethods: [
      { 
        method: "E-Wallet", 
        time: {
          deposit: "Instant",
          withdraw: "Instant"
        }, 
        fee: "$0" 
      },
      { 
        method: "Bank Transfer", 
        time: {
          deposit: "Instant",
          withdraw: "Instant"
        }, 
        fee: "$0" 
      },
      { 
        method: "Kartu Debit/Kredit", 
        time: {
          deposit: "Instant",
          withdraw: "Instant"
        }, 
        fee: "$0" 
      },
      { 
        method: "Crypto", 
        time: {
          deposit: "Instant",
          withdraw: "Instant"
        }, 
        fee: "$0" 
      }
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "Web & Mobile", icon: "valetax.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 11 },
    { pair: "XAU/USD", estimate: 16 },
    { pair: "CRYPTO", estimate: 13 },
  ],
  rebateRates: [
    { accountType: "Standard", pair: "XAU/USD", rebatePerLot: 16 },
    { accountType: "Standard", pair: "EUR/USD", rebatePerLot: 11 },
    { accountType: "Standard", pair: "CRYPTO", rebatePerLot: 13 },

    { accountType: "Booster", pair: "XAU/USD", rebatePerLot: 22 },
    { accountType: "Booster", pair: "EUR/USD", rebatePerLot: 16 },
    { accountType: "Booster", pair: "CRYPTO", rebatePerLot: 18 },

    { accountType: "Pro", pair: "XAU/USD", rebatePerLot: 7 },
    { accountType: "Pro", pair: "EUR/USD", rebatePerLot: 4 },
    { accountType: "Pro", pair: "CRYPTO", rebatePerLot: 5 },

    { accountType: "ECN", pair: "XAU/USD", rebatePerLot: 2 },
    { accountType: "ECN", pair: "EUR/USD", rebatePerLot: 2 },
    { accountType: "ECN", pair: "CRYPTO", rebatePerLot: 2 },
  ],
  advantages: [" Spread & Eksekusi Kompetitif", "Deposit Minimum Sangat Rendah", "Leverage Fleksibel Tinggi", "Dukungan Platform Lengkap", "Instrumen Perdagangan Variatif", "Beragam Jenis Akun", "Fitur Tambahan seperti Copy Trading (Menurut Beberapa Sumber)", "Opsi Deposit Lokal & 24/7 Support (Website Resmi)"],
  disadvantages: ["Regulasi headquarter berada di offshore (Mauritius & St. Vincent & Grenadines) → risiko lebih tinggi dibanding broker teregulasi di FCA/ASIC/CySEC.", "Terdapat beberapa ulasan negatif terkait kurangnya pengawasan dan risiko leverage tinggi."],
  communityRating: {
    score: 4.3,
    quantityVote: 151,
    classifications: [
      { type: "Platform & Tools", rate: 4.4 },
      { type: "Cost & Fees", rate: 4.2 },
      { type: "Support & Service", rate: 4.3 },
    ],
  },
  faq: [
    {
      question: "Apakah Valetax aman?",
      answer: "Valetax memiliki lisensi di Mauritius dan St. Vincent & Grenadines, tetapi regulasi ini tergolong offshore dan memiliki risiko lebih tinggi dibanding regulator kelas atas."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Minimum deposit mulai dari $1."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MT4, MT5, Web, dan Mobile."
    },
    {
      question: "Instrumen apa saja yang tersedia?",
      answer: "Forex 60+ pair, logam, indeks, energi, crypto."
    }
  ]
}