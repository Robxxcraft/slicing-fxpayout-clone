import type { BrokerStruc, BrokerRanking } from "./typeDetailBroker";

const brokerName = "FBS";
const brokerFounded = "2009";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global Forex & CFD Broker"
};

export const fbsDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "fbs.webp",
  registerUrl: "https://fbs.partners/?ibl=569605&ibp=17852638",
  websiteUrl: "https://fbs.partners/?ibl=569605&ibp=17852638",
  detailUrl: "fbs",
  statusRebate: "Auto Rebate",
  ranking: brokerRanking,
  badges: ["Low Minimum Deposit", "Leverage Tinggi", "Multi-Asset Trading", "Beginner Friendly"],
  overallScore: {
    rate: 4.4,
    communityUrl: "https://www.trustpilot.com/review/fbs.com",
  },
  detailDescription: "FBS adalah broker internasional yang berdiri sejak 2009, menyediakan layanan trading Forex dan CFD dengan kondisi trading yang kompetitif, berbagai jenis akun sesuai kebutuhan trader, serta eksekusi order yang cepat. FBS populer di kalangan trader pemula hingga profesional dengan program pendidikan, bonus, dan layanan pelanggan yang kuat",
  cardDescription: "Broker ECN premium untuk scalper & EA. Likuiditas dalam & komisi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$1",
    leverage: "Hingga 1:3000",
    spread: "Mulai 0.0 pips (Zero/ECN)",
  },
  profile: {
    name: brokerName,
    slogan: "Trade Forex Worldwide",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated, ECN/STP Broker",
    regulations: [
      { name: "ASIC", country: "Australia" },
      { name: "CySEC", country: "Eropa" },
      { name: "IFSC", country: "Belize" },
      { name: "FSCA", country: "South Africa" },
    ]
  },
  summary: {
    minDeposit: "$1",
    types: ["Cent", "Micro", "Standard", "Zero", "ECN"],
    spread: "Mulai 0.0 pips (Zero/ECN)",
    commission: "ECN: ±$6–$7 per lot (round-turn)",
    leverage: "Hingga 1:3000",
    execution: "Cepat",
    instruments: ["Forex", "Logam", "Indeks", "Energi", "Saham CFD", "Crypto CFD"],
    depositWithdrawal: "Cepat & banyak metode"
  },
  accountTypes: [
    {
        name: "Cent Account",
        level: "Pemula",
        features: ["Min deposit : $1", "Spread mulai ±1.0 pips", "Cocok pemula & latihan"]
    },
    {
        name: "Micro Account",
        level: "News Trader",
        features: ["Min deposit : $5", "Spread mulai ±1.0 pips", "Tanpa komisi"]
    },
    {
        name: "Standard Account",
        level: "Umum",
        features: ["Min deposit : $100", "Spread mulai ±0.5 – 1.2", "Tanpa komisi"]
    },
    {
        name: "Zero Spread Account",
        level: "Pro & Scalper",
        features: ["Min deposit : $500", "Spread mulai 0.0 pips", "Komisi sekitar $7 per lot"]
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
          accountType: "ECN/Zero",
          spread: "0.0 – 0.1"
        },
        {
          accountType: "Standard/Micro",
          spread: "±0.5 – 1.2"
        },
        {
          accountType: "Cent",
          spread: "±1.0 – 1.5"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "ECN/Zero",
          spread: "0.1 – 0.3"
        },
        {
          accountType: "Standard/Micro",
          spread: "±1.0 – 1.5"
        },
        {
          accountType: "Cent",
          spread: "±2.0 – 3.0"
        },
      ]
    }
  ],
  keyAdvantages: ["Spread rendah terutama di ECN/Zero", "Leverage tinggi hingga 1:3000", "Akun Cent untuk pemula", "Program bonus menarik", "Eksekusi cepat", "Platform lengkap"],
  depositWithdrawal: {
    paymentMethods: [
      { 
        method: "Bank Transfer", 
        time: {
          deposit: "1–3 hari kerja",
          withdraw: "1–3 hari kerja"
        },
        fee: "$0 (umumnya)" 
      },
      { 
        method: "Debit/Kredit Card", 
        time: {
          deposit: "Instan – cepat",
          withdraw: "Instan – cepat"
        },
        fee: "$0 (umumnya)" 
      },
      { 
        method: "E-Wallet", 
        time: {
          deposit: "Instan",
          withdraw: "Instan"
        },
        fee: "$0 (umumnya)" 
      },
      { 
        method: "Crypto", 
        time: {
          deposit: "Instan",
          withdraw: "Instan"
        },
        fee: "$0 (umumnya)" 
      },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "WebTrader", icon: "fbs.webp" },
      { username: "Mobile App (iOS & Android)", icon: "fbs.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 3.61},
    { pair: "XAU/USD", estimate: 10},
    { pair: "CRYPTO", estimate: 2.5},
  ],
  advantages: ["Minimum deposit sangat rendah", "Leverage sangat tinggi", "Spread kompetitif di akun ECN/Zero", "Akun Cent untuk trader pemula"],
  disadvantages: ["Spread akun non-ECN bisa lebih lebar", "Opsi instrumen non-CFD nyata tidak tersedia"],
  communityRating: {
    score: 4.4,
    quantityVote: 8.198,
    classifications: [
      { type: "Kecepatan Withdraw", rate: 4.5 },
      { type: "Stabilitas Server", rate: 4.4 },
      { type: "Customer Support", rate: 4.3 },
    ],
  },
  faq: [
    {
      question: "Apakah FBS aman?",
      answer: "Ya. FBS diregulasi oleh ASIC, CySEC, IFSC, dan FSCA tergantung entitas."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Minimum deposit mulai dari $1 (Cent Account)."
    },
    {
      question: "Apakah FBS cocok untuk pemula?",
      answer: "Ya. Akun Cent & layanan edukasi cocok untuk pemula."
    },
    {
      question: "Apakah ada akun ECN/Zero?",
      answer: "Ya. Tersedia Zero dan ECN dengan spread 0.0 pips."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:3000 tergantung regulator & wilayah."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MT4, MT5, WebTrader & Mobile App."
    },
  ]
}