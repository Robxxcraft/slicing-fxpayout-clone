import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "XM";
const brokerFounded = "2009";
const brokerRanking: BrokerRanking = {
  tier: "Global",
  title: "Multi-Asset Forex & CFD Broker"
};

export const xmDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "xm.webp",
  registerUrl: "https://affs.click/4gFt7",
  websiteUrl: "#",
  detailUrl: "xm",
  ranking: brokerRanking,
  badges: ["Low Minimum Deposit", "Flexible Leverage", "Multi-Regulated"],
  overallScore: {
    rate: 4.3,
    communityUrl: "#",
  },
  detailDescription: "XM adalah broker global yang berdiri sejak 2009, menyediakan layanan trading Forex dan CFD di berbagai instrumen seperti forex, indeks, energi, logam, saham CFD, dan cryptocurrency. Broker ini dikenal karena minimum deposit yang sangat rendah, leverage fleksibel, serta support platform trading lengkap seperti MetaTrader 4 dan MetaTrader 5. XM melayani jutaan trader di seluruh dunia dan menawarkan berbagai jenis akun yang cocok untuk pemula maupun profesional.",
  cardDescription: "Broker global dengan akun XM Zero berkomisi tinggi sehingga rebate besar.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$5",
    leverage: "Hingga 1:1000",
    spread: "Mulai 0.6 – 1.7 pips",
  },
  profile: {
    name: brokerName,
    slogan: "Trading Made Simple",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-Regulated Forex & CFD Broker",
    totalInstrument: "1000+ (Forex, CFD Saham, Energi, Logam, dll)",
    regulations: [
      { name: "ASIC", country: "Australia" },
      { name: "FCA", country: "United Kingdom" },
      { name: "CySEC", country: "Cyprus" },
      { name: "DFSA", country: "Dubai" },
      { name: "IFSC", country: "Belize" },
      { name: "FSCA", country: "Afrika Selatan" },
    ]
  },
  summary: {
    minDeposit: "$5",
    types: ["Micro", "Standard", "Ultra Low", "Zero"],
    spread: "Mulai 0.6 – 1.7 pips",
    commission: "Zero Account ≈ $7 per lot round-turn",
    leverage: "Hingga 1:1000 (tergantung regulator & wilayah)",
    execution: "Cepat & tanpa requote",
    instruments: ["Forex", "Komoditas", "Indeks", "Saham CFD", "Energi", "Crypto CFD"],
    depositWithdrawal: "Banyak metode & cepat"
  },
  accountTypes: [
    {
        name: "Micro Account",
        level: "Pemula",
        features: ["Min deposit : $5", "Spread mulai ±1.0 pips", "Komisi : 0"]
    },
    {
        name: "Standard Account",
        level: "Umum",
        features: ["Min deposit : $5", "Spread mulai ±1.0 pips", "Komisi : 0"]
    },
    {
        name: "Ultra Low Account",
        level: "Trader",
        features: ["Min deposit : $5", "Spread mulai ±0.6 pips", "Komisi : 0"]
    },
    {
        name: "Zero Account",
        level: "Trader",
        features: ["Min deposit : $5", "Spread mulai 0.0 pips", "Komisi ≈ $7 per lot (round-turn)"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Ultra Low",
          spread: "±0.6 – 1.0"
        },
        {
          accountType: "Standard/Micro",
          spread: "±1.0 – 1.7"
        },
        {
          accountType: " Zero",
          spread: "0.0 – 0.4"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Ultra Low",
          spread: "±0.8 – 1.2"
        },
        {
          accountType: "Standard/Micro",
          spread: "±1.5 – 2.0"
        },
        {
          accountType: "Zero",
          spread: "±0.3 – 0.8 (komisi berlaku)"
        },
      ]
    }
  ],
  keyAdvantages: ["Minimum deposit sangat rendah", "Leverage fleksibel hingga 1:1000", "Teregulasi banyak otoritas global", "Platform lengkap (MT4/MT5)", "Instrumen trading sangat banyak (>1000)", "Eksekusi cepat tanpa requote"],
  depositWithdrawal: {
      paymentMethods: [
      { 
        method: "Bank Local", 
        time: {
          deposit: "Instan – 2 hari kerja",
          withdraw: "Instan – 2 hari kerja"
        }, 
        fee: "Umumnya tanpa biaya broker" 
      },
      { 
        method: "Kartu Debit/Kredit", 
        time: {
          deposit: "Instan – 2 hari kerja",
          withdraw: "Instan – 2 hari kerja"
        },  
        fee: "Umumnya tanpa biaya broker" 
      },
      { 
        method: "E-Wallet", 
        time: {
          deposit: "Instan – 2 hari kerja",
          withdraw: "Instan – 2 hari kerja"
        },  
        fee: "Umumnya tanpa biaya broker" 
      },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "WebTrader", icon: "xm.webp" },
      { username: "Mobile App (Android & iOS", icon: "xm.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 7 },
    { pair: "XAU/USD", estimate: 10 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Modal awal sangat rendah ($5)", "Spread kompetitif di akun Ultra Low & Zero", "Dukungan platform kuat (MT4, MT5)", "Regulasi global banyak", "Banyak instrumen trading"],
  disadvantages: ["Spread akun standar bisa lebih tinggi", "Komisi Zero tergolong standard ($7 per lot)", "Fitur edukasi tidak sekuat beberapa broker top"],
  communityRating: {
    score: 4.3,
    quantityVote: 97,
    classifications: [
      { type: "Customer Support", rate: 4.4 },
      { type: "Execution & Platforms", rate: 4.3 },
      { type: "Fees & Costs", rate: 4.2 },
    ]
  },
  faq: [
    {
      question: "Apakah XM aman?",
      answer: "Ya. XM teregulasi oleh beberapa otoritas besar seperti FCA, ASIC, CySEC, dsb."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Minimum deposit adalah $5."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MT4, MT5, WebTrader, Mobile."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:1000 tergantung negara/entitas."
    },
    {
      question: "Apakah ada akun demo?",
      answer: "Ya, tersedia demo untuk latihan trading."
    },
    {
      question: "Apakah ada akun swap-free/Islamic?",
      answer: "Ya, tersedia untuk entitas/regional tertentu."
    },
  ]
}