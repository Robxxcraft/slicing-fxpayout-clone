import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "IC MARKETS";
const brokerFounded = "2007";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global ECN Broker"
};

export const icMarketDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "ic-markets.webp",
  registerUrl: "#",
  websiteUrl: "#",
  detailUrl: "ic-markets",
  statusRebate: "Auto Rebate",
  ranking: brokerRanking,
  badges: ["Tier 1", "ECN Broker", "Raw Spread", "Ultra-Fast Execution"],
  overallScore: {
    rate: 4.7,
    communityUrl: "#",
  },
  detailDescription: "Broker global asal Australia dengan eksekusi sangat cepat, spread ECN ultra rendah, serta likuiditas institusional. IC Markets dikenal sebagai broker favorit scalper, trader EA, dan trader volume besar. Menyediakan akses ke Forex, Gold, Indeks, Energi, Saham CFD, hingga Crypto CFD dengan kondisi trading stabil dan transparan.",
  cardDescription: "Broker global dengan eksekusi cepat & spread rendah. Akun Raw/Zero populer untuk rebate tinggi.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$200",
    leverage: "Hingga 1:500",
    spread: "Mulai 0.0 pips (Raw)",
  },
  profile: {
    name: brokerName,
    slogan: "True ECN Forex Broker",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated, ECN/Market Execution",
    regulations: [
      { name: "ASIC", country: "Australia" },
      { name: "CySEC", country: "Eropa" },
      { name: "FSA", country: "Seychelles" },
      { name: "SCB", country: "Bahamas" },
    ]
  },
  summary: {
    minDeposit: "$200",
    types: ["Standard", "Raw Spread", "cTrader Raw"],
    spread: "Mulai 0.0 pips (Raw)",
    commission: "$6–$7 per lot (round-turn)",
    leverage: "Hingga 1:500",
    execution: "< 40 ms",
    instruments: ["Forex", "Gold", "Crypto CFD", "Indeks", "Energi", "Saham"],
    depositWithdrawal: "Cepat"
  },
  accountTypes: [
    {
        name: "Standard Account",
        level: "Umum",
        features: ["Tanpa komisi", "Spread rendah", "Cocok untuk trading manual", "Min deposit : $200"]
    },
    {
        name: "Raw Spread Account (ECN)",
        level: "Pro",
        features: ["Spread mulai 0.0 pips", "Komisi rendah ($3–$3.5 per lot per side)", "Eksekusi sangat cepat", "Ideal untuk scalping & EA"]
    },
    {
        name: "cTrader Raw Account",
        level: "Trader",
        features: ["Spread 0.0 pips", "Komisi rendah", "Eksekusi ultra cepat", "Cocok untuk algo trader & scalper"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Raw",
          spread: "0.0 – 0.1"
        },
        {
          accountType: "Standard",
          spread: "0.8 – 1.0"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Raw",
          spread: "0.1 – 0.3"
        },
        {
          accountType: "Standard",
          spread: "0.8 – 1.2"
        },
      ]
    }
  ],
  keyAdvantages: ["Ultra-fast execution", "Spread ECN sangat rendah & stabil", "Likuiditas institusional", "Platform stabil & ringan", "Ramah EA & scalping", "Mendukung MT4, MT5, dan cTrader", "Slippage rendah", "Cocok untuk trader volume besar"],
  depositWithdrawal: {
      paymentMethods: [
      { 
        method: "E-Wallet", 
        time: {
          deposit: "Instan",
          withdraw: "Instan"
        }, 
        fee: "$0" 
      },
      { 
        method: "Bank Transfer", 
        time: {
          deposit: "1–2 hari kerja",
          withdraw: "1–2 hari kerja"
        }, 
        fee: "$0" 
      },
      { 
        method: "Crypto", 
        time: {
          deposit: "Instan",
          withdraw: "Instan"
        }, 
        fee: "$0" 
      },
      { 
        method: "Skrill/Neteller", 
        time: {
          deposit: "Instan",
          withdraw: "Instan"
        }, 
        fee: "$0" 
      },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "cTrader", icon: "c-trader.webp" },
      { username: "WebTrader", icon: "ic-markets.webp" },
      { username: "Mobile App (iOS & Android)", icon: "ic-markets.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 10 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Spread & eksekusi sangat stabil", "Likuiditas tinggi (ECN)", "Ramah EA & scalping", "Platform trading lengkap", "Regulasi kuat"],
  disadvantages: ["Tidak menyediakan akun Cent", "Minimum deposit relatif tinggi", "Leverage dibatasi di beberapa wilayah"],
  communityRating: {
    score: 4.7,
    quantityVote: 102,
    classifications: [
      { type: "Kecepatan Withdraw (WD)", rate: 5 },
      { type: "Stabilitas Server", rate: 5 },
      { type: "Customer Support", rate: 4.5 },
    ]
  },
  faq: [
    {
      question: "Apakah IC Markets aman?",
      answer: "Ya. IC Markets diregulasi oleh ASIC (Australia), CySEC (Eropa), dan regulator internasional lainnya."
    },
    {
      question: "Apakah IC Markets cocok untuk pemula?",
      answer: "Cocok untuk pemula yang sudah siap trading real, namun tidak menyediakan akun Cent."
    },
    {
      question: "Apakah IC Markets cocok untuk EA & scalping?",
      answer: "Ya. IC Markets sangat populer untuk EA, scalping, dan trading frekuensi tinggi."
    },
    {
      question: "Berapa minimum deposit di IC Markets?",
      answer: "Minimum deposit IC Markets adalah $200."
    },
    {
      question: "Apakah IC Markets menyediakan akun Cent?",
      answer: "Tidak. IC Markets hanya menyediakan akun Standard dan Raw (ECN)."
    },
    {
      question: "Berapa leverage maksimal IC Markets?",
      answer: "Hingga 1:500, tergantung regulasi dan entitas akun."
    },
    {
      question: "Seberapa cepat proses withdraw di IC Markets?",
      answer: "E-wallet dan crypto biasanya instan, bank transfer 1–2 hari kerja."
    },
    {
      question: "Platform apa saja yang didukung IC Markets?",
      answer: "MetaTrader 4 (MT4), MetaTrader 5 (MT5), dan cTrader."
    },
  ]
}