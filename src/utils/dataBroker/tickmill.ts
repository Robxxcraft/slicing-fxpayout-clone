import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "Tickmill";
const brokerFounded = "2014";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Forex & CFD ECN Broker"
};

export const tickmillDetail: BrokerStruc = {
  id_ib: "IB89045395",
  contactSupport: "support@tickmill.com",
  name: brokerName,
  profileImage: "tickmill.webp",
  registerUrl: "https://secure.itr-tickmill.com/?utm_campaign=ib_link&utm_content=IB89045395&utm_medium=Open+Account&utm_source=link&lp=https%3A%2F%2Fsecure.itr-tickmill.com%2Fid%2Fsign-up%2F",
  websiteUrl: "https://secure.itr-tickmill.com/?utm_campaign=ib_link&utm_content=IB89045395&utm_medium=Open+Account&utm_source=link&lp=https%3A%2F%2Fsecure.itr-tickmill.com%2Fid%2Fsign-up%2F",
  detailUrl: "tickmill",
  scheduleUrl: "/schedule",
  statusRebate: "Auto",
  ranking: brokerRanking,
  badges: ["Tier 1", "ECN", "Spread Tipis", "Leverage Fleksibel"],
  overallScore: {
    rate: 4.4,
    communityUrl: "https://www.trustpilot.com/review/www.tickmill.com",
  },
  detailDescription: "Tickmill adalah broker forex dan CFD global yang berdiri sejak 2014, dikenal karena biaya trading yang rendah (spread tipis & komisi rendah), eksekusi cepat, serta dukungan platform populer seperti MetaTrader 4 dan MetaTrader 5. Tickmill melayani trader di banyak negara dengan fokus pada pengalaman trading profesional dan efisien.",
  cardDescription: "Broker ECN terkenal dengan komisi rendah dan rebate kompetitif.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$100",
    leverage: "Hingga 1:1000 (region dependent)",
    spread: "Mulai 0.0 – 0.3 pips (Pro/VIP)",
  },
  profile: {
    name: brokerName,
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-Regulated ECN/STP Broker",
    model: "ECN trading",
    regulations: [
      { name: "FCA", country: "United Kingdom" },
      { name: "CySEC", country: "Cyprus" },
      { name: "FSCA", country: "South Africa" },
      { name: "FSA", country: "Seychelles" },
    ]
  },
  summary: {
    minDeposit: "$100",
    types: ["Classic", "Pro", "VIP/Ultra"],
    spread: "Mulai 0.0 – 0.3 pips (Pro/VIP)",
    commission: "±$3 per lot per sisi (Pro / Ultra account)",
    leverage: "Hingga 1:1000 (region dependent)",
    execution: "Cepat",
    instruments: ["Forex", "Indeks", "Komoditas", "Energi", "Logam", "Saham CFD"],
    depositWithdrawal: "Bank transfer, debit/kredit, e-wallet"
  },
  accountTypes: [
    {
        name: "Classic Account",
        level: "Umum",
        features: ["Deposit minimum: $100", "Spread mulai ±1.6 pips", "Tanpa komisi"]
    },
    {
        name: "Pro Account",
        level: "Pro",
        features: ["Deposit minimum: $100", "Spread mulai 0.0 – 0.3 pips", "Komisi : $3 per lot per sisi"]
    },
    {
        name: "VIP/Ultra Account",
        level: "Trader",
        features: ["Min deposit lebih tinggi", "Spread sangat tipis", "Komisi : ±$2.5 – $3 per lot per sisi"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Pro/VIP",
          spread: "0.0 – 0.2 pips (ECN)"
        },
        {
          accountType: "Classic",
          spread: "±1.6 – 1.8 pips"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Pro/VIP",
          spread: "±0.1 – 0.3 pips"
        },
        {
          accountType: "Classic",
          spread: "±0.7 – 1.0 pips"
        },
      ]
    },
    {
      icon: "aud-usd.svg",
      pair: "AUD/USD",
      spreads: [
        {
          accountType: "Pro/VIP",
          spread: "±0.2 – 0.4 pips"
        },
        {
          accountType: "Classic",
          spread: "±1.4 – 1.6 pips"
        },
      ]
    }
  ],
  keyAdvantages: ["Spread sangat rendah (ECN/Raw)", "Komisi kompetitif", "Eksekusi order cepat & stabil", "Regulasi kuat & global", "Opsi akun bebas swap (Islamic)", "Support MT4, MT5, TradingView"],
  depositWithdrawal: {
      paymentMethods: [
      { 
        method: "Debit/Credit Card", 
        time: {
          deposit: "Instan – 1 hari kerja",
          withdraw: "1 – 3 hari kerja"
        },
        fee: "Tergantung metode (umumnya broker tidak mengenakan biaya)"
      },
      { 
        method: "Bank Transfer", 
        time: {
          deposit: "Instan – 1 hari kerja",
          withdraw: "1 – 3 hari kerja"
        }, 
        fee: "Tergantung metode (umumnya broker tidak mengenakan biaya)"
      },
      { 
        method: "E-Wallet", 
        time: {
          deposit: "Instan – 1 hari kerja",
          withdraw: "1 – 3 hari kerja"
        },
        fee: "Tergantung metode (umumnya broker tidak mengenakan biaya)"
      },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "WebTrader", icon: "tickmill.webp" },
      { username: "Mobile App (iOS & Android)", icon: "tickmill.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 8 },
    { pair: "AUD/USD", estimate: 0.80 },
  ],
  rebateRates: [
    { accountType: "Classic", pair: "XAU/USD", rebatePerLot: 8 },
    { accountType: "Classic", pair: "EUR/USD", rebatePerLot: 8 },
    { accountType: "Classic", pair: "BTC/USD", rebatePerLot: 0.8 },

    { accountType: "Raw", pair: "XAU/USD", rebatePerLot: 2 },
    { accountType: "Raw", pair: "EUR/USD", rebatePerLot: 2 },
    { accountType: "Raw", pair: "BTC/USD", rebatePerLot: 0.8 },
  ],
  advantages: ["Spread ECN sangat rendah", "Komisi kompetitif", "Eksekusi cepat & stabil", "Regulasi kuat di banyak wilayah", "Platform trading lengkap"],
  disadvantages: ["Min deposit $100 relatif lebih tinggi dibanding broker lain", "Komisi berlaku pada akun Pro/VIP", "Leverage bisa dibatasi oleh regulator"],
  communityRating: {
    score: 4.4,
    quantityVote: 1.078,
    classifications: [
      { type: "Execution & Spread", rate: 4.5 },
      { type: "Customer Support ", rate: 4.4 },
      { type: "Deposit / Withdrawal", rate: 4.3 },
    ],
  },
  faq: [
    {
      question: "Apakah Tickmill aman?",
      answer: "Ya — teregulasi FCA, CySEC, FSCA & FSA."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Minimum deposit adalah $100."
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MT4, MT5, Web & Mobile."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:1000 tergantung regulator."
    },
    {
      question: "Apakah ada akun ECN?",
      answer: "Ya — Pro & VIP dengan spread rendah."
    }
  ]
}