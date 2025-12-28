import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "XM";
const brokerFounded = "2009";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global Broker"
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
  detailDescription: "XM adalah broker global yang beroperasi sejak 2009, dipercaya lebih dari 15 juta trader, menyediakan akses trading ke lebih dari 1,400+ instrumen finansial dengan spread ketat, eksekusi cepat, dan berbagai jenis akun yang fleksibel. XM menawarkan layanan trading Forex & CFD di Forex, Indeks, Komoditas, Saham, Energi, dan Crypto CFD.",
  cardDescription: "Broker global dengan akun XM Zero berkomisi tinggi sehingga rebate besar.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$5",
    leverage: "Hingga 1:1000",
    spread: "Mulai 0.6 – 1.7 pips (tergantung akun)",
  },
  profile: {
    name: brokerName,
    slogan: "Trading Made Simple",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated, Market Maker/STP",
    regulations: [
      { name: "ASIC", country: "Australia" },
      { name: "CySEC", country: "Eropa" },
      { name: "FCA", country: "Inggris" },
      { name: "DFSA", country: "Dubai" },
      { name: "IFSC", country: "Belize" },
      { name: "FSCA", country: "Afrika Selatan" },
    ]
  },
  summary: {
    minDeposit: "$5",
    type: "Micro, Standard, Ultra Low, Zero",
    spread: "Mulai 0.6 – 1.7 pips (tergantung akun)",
    commission: "Zero Account ≈ $7 per lot round-turn",
    leverage: "Hingga 1:1000",
    execution: "Cepat & tanpa requote",
    instruments: "Forex, Komoditas, Indeks, Saham CFD, Energi, Crypto CFD",
    depositWithdrawal: "Cepat, biaya rendah/bebas biaya"
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
          spread: "0.6 – 1.0"
        },
        {
          accountType: "Standard/Micro",
          spread: "±1.0 – 1.7"
        },
      ]
    },
    {
      icon: "eur-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Ultra Low",
          spread: "0.6 – 0.9"
        },
        {
          accountType: "Standard/Micro",
          spread: "±1.5 – 2.0"
        },
      ]
    }
  ],
  keyAdvantages: ["Low minimum deposit", "Spread kompetitif", "Leverage tinggi sampai 1:1000", "Multi-regulated broker", "Eksekusi cepat tanpa requote", "Akun swap-free/Islamic", "Akses ke 1,400+ instrumen"],
  depositWithdrawal: {
      paymentMethods: [
      { method: "Bank Transfer", time: "1–3 hari kerja", fee: "$0 (tergantung metode)" },
      { method: "Kartu Debit/Kredit", time: "Instan", fee: "$0 (tergantung metode)" },
      { method: "E-Wallet", time: "Instan", fee: "$0 (tergantung metode)" },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "WebTrader", icon: "xm.webp" },
      { username: "Mobile App (Android & iOS", icon: "xm.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 10 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Deposit sangat rendah ($5)", "Spread kompetitif di akun Ultra Low/Zero", "Leverage tinggi", "Multi-platform yang kuat"],
  disadvantages: [" Spread standar bisa lebih lebar dibanding ECN murni", "Komisi Zero sedikit tinggi", "Aset saham nyata tidak tersedia di beberapa entitas"],
  communityRating: {
    score: 4.3,
    withdrawalSpeed: 4.5,
    stability: 4.4,
    customerSupport: 4.5,
    quantityVote: 97
  },
  faq: [
    {
      question: "Apakah XM aman?",
      answer: "Ya — XM diregulasi oleh ASIC, CySEC, FCA, DFSA, IFSC, dan FSCA di berbagai entitas global."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "$5 – sangat rendah dibanding banyak broker lain."
    },
    {
      question: "Apa jenis akun yang tersedia?",
      answer: "Micro, Standard, Ultra Low, Zero (tergantung negara)."
    },
    {
      question: "Apakah ada akun swap-free?",
      answer: "Ya – tersedia untuk semua jenis akun."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:1000 tergantung regulator & wilayah."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MT4, MT5, WebTrader, Mobile"
    },
  ]
}