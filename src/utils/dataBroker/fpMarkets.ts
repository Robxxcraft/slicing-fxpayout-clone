import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "FP Markets";
const brokerFounded = "2005";
const brokerRanking: BrokerRanking = {
  tier: "Global",
  title: "Forex & CFD Broker Multi-Platform & ECN/STP"
};

export const fpMarketsDetail: BrokerStruc = {
  id_ib: "64952",
  contactSupport: "partners@fpmarkets.com",
  name: brokerName,
  profileImage: "fp-markets.webp",
  registerUrl: "https://portal.fpmarkets.com/register?redir=stv&fpm-affiliate-utm-source=IB&fpm-affiliate-agt=64952",
  websiteUrl: "https://portal.fpmarkets.com/register?redir=stv&fpm-affiliate-utm-source=IB&fpm-affiliate-agt=64952",
  detailUrl: "fp-markets",
  scheduleUrl: "/schedule",
  statusRebate: "Auto",
  ranking: brokerRanking,
  badges: ["Regulated Broker", "ECN/STP", "Low Spread", "Multi-Asset"],
  overallScore: {
    rate: 4.3,
    communityUrl: "https://www.trustpilot.com/review/fpmarkets.com",
  },
  detailDescription: "FP Markets (First Prudential Markets) adalah broker forex & CFD global yang berdiri sejak 2005, berkantor pusat di Sydney, Australia. Broker ini dikenal karena spread kompetitif, eksekusi cepat, akses ke ribuan instrumen, serta dukungan platform trading populer seperti MetaTrader dan cTrader. FP Markets juga menyediakan teknologi trading profesional seperti cTrader, VPS, dan alat analitik tingkat lanjut.",
  cardDescription: "Broker ECN Australia dengan eksekusi cepat & kondisi pro-trader.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$100",
    leverage: "Hingga 1:500 (tergantung regulator & entitas)",
    spread: ["Standard : mulai sekitar 1.0 pips", "Raw : mulai 0.0 pips"],
  },
  profile: {
    name: `${brokerName} (First Prudential Markets)`,
    slogan: "Trusted Global Forex & CFD Broker",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Forex & CFD Broker (ECN/STP model)",
    regulations: [
      { name: "ASIC", country: "Australia" },
      { name: "CySEC", country: "Cyprus" },
      { name: "FSCA", country: "Afrika Selatan" },
      { name: "FSA", country: "Seychelles" },
      { name: "CIMA", country: "Cayman Islands" },
    ]
  },
  summary: {
    minDeposit: "$100",
    types: ["Standard", "Raw"],
    spread: ["Standard : mulai sekitar 1.0 pips", "Raw : mulai 0.0 pips"],
    commission: "Raw ECN ±$6 per lot total (±$3 per sisi)",
    leverage: "Hingga 1:500 (tergantung regulator & entitas)",
    execution: "Cepat & tanpa requote",
    instruments: ["Forex", "Indeks", "Komoditas", "Logam", "Saham CFD", "ETF", "Obligasi", "Crypto (tergantung entitas)"],
    depositWithdrawal: "Bank transfer, kartu, e-wallet"
  },
  accountTypes: [
    {
        name: "Standard Account",
        level: "Retail Umum",
        features: ["Min deposit : $100", "Spread mulai ±1.0 pips", "Tanpa komisi", "Cocok untuk trader retail umum", ]
    },
    {
        name: "Raw ECN Account",
        level: "Pro",
        features: ["Min deposit : $100", "Spread mulai 0.0 pips", "Komisi ±$3 per sisi per lot", "Cocok scalping, robot, EA"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Raw ECN",
          spread: "mulai 0.0 – 0.2 pips"
        },
        {
          accountType: "Standard",
          spread: "±1.0 – 1.3 pips"
        },
      ]
    },
    {
      icon: "gbp-usd.svg",
      pair: "GBP/USD",
      spreads: [
        {
          accountType: "Raw ECN",
          spread: "±0.1 – 0.3 pips"
        },
        {
          accountType: "Standard",
          spread: "±1.2 – 1.5 pips"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Raw ECN",
          spread: "variabel rendah"
        },
        {
          accountType: "Standard",
          spread: "lebih lebar"
        },
      ]
    }
  ],
  keyAdvantages: ["Spread ECN sangat rendah", "Eksekusi cepat & stabil", "Likuiditas tinggi", "Ramah EA & scalping", "Platform trading lengkap", "Cocok untuk trader aktif"],
  depositWithdrawal: {
      paymentMethods: [
      { 
        method: "E-Wallet (PayPal, Neteller, Skrill dll)", 
        time: {
          deposit: "Instan – 3 hari kerja",
          withdraw: "Instan – 3 hari kerja"
        }, 
        fee: "Biasanya tanpa biaya broker" 
      },
      { 
        method: "Bank Transfer", 
        time: {
          deposit: "Instan – 3 hari kerja",
          withdraw: "Instan – 3 hari kerja"
        },  
        fee: "Biasanya tanpa biaya broker" 
      },
      { 
        method: "Kartu Debit/Kredit", 
        time: {
          deposit: "Instan – 3 hari kerja",
          withdraw: "Instan – 3 hari kerja"
        },  
        fee: "Biasanya tanpa biaya broker" 
      },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "cTrader", icon: "c-trader.webp" },
      { username: "TradingView integration", icon: "trading-view.webp" },
      { username: "Mobile App (iOS & Android)", icon: "fp-markets.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 4.4 },
    { pair: "XAU/USD", estimate: 4.4 },
    { pair: "CRYPTO", estimate: 4.4 },
  ],
  rebateRates: [
    { accountType: "Standard", pair: "XAU/USD", rebatePerLot: 4.40 },
    { accountType: "Standard", pair: "EUR/USD", rebatePerLot: 4.40 },
    { accountType: "Standard", pair: "CRYPTO", rebatePerLot: 4.40 },
  ],
  advantages: ["Spread sangat kompetitif (Raw ECN)", "Platform lengkap (MT4, MT5, cTrader)", "Tidak ada mark-up pada Raw account", "Regulasi kuat di banyak negara", "Cocok untuk trader manual, EA, scalping"],
  disadvantages: ["Minimum deposit $100 lebih tinggi dari beberapa broker ringan", "Leverage bisa dibatasi oleh regulator di wilayah tertentu", "Spread Standard lebih lebar dibanding ECN"],
  communityRating: {
    score: 4.3,
    quantityVote: 9.782,
    classifications: [
      { type: "Customer Support", rate: 4.4 },
      { type: "Fees & Spread", rate: 4.2 },
      { type: "Execution Speed", rate: 4.3 },
    ],
  },
  faq: [
    {
      question: "Apakah FP Markets aman?",
      answer: "Ya — teregulasi ASIC (Australia), CySEC (Siprus), FSCA (SA), FSA (Seychelles), dan CIMA."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Minimum deposit untuk trading live adalah $100."
    },
    {
      question: "Platform apa saja yang didukung",
      answer: "MT4, MT5, dan cTrader."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:500 untuk forex (tergantung entitas/regulator)."
    },
    {
      question: "Apakah ada akun ECN?",
      answer: "Ya — akun Raw ECN dengan spread mulai 0.0 pips + komisi."
    },
  ]
}