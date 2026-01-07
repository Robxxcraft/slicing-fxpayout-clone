import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "Vantage";
const brokerFounded = "2009/2010";
const brokerRanking: BrokerRanking = {
  tier: "Global",
  title: "CFD & Forex Broker"
};

export const vantageDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "vantage.webp",
  registerUrl: "https://www.vantagemarketsea.com/id/open-live-account/?affid=MjA3OTY2Mzk=",
  websiteUrl: "https://www.vantagemarketsea.com/id/open-live-account/?affid=MjA3OTY2Mzk=",
  detailUrl: "vantage",
  ranking: brokerRanking,
  badges: ["Multi-Asset Trading", "ECN/STP", "Spread Kompetitif", "Regulasi Kuat"],
  overallScore: {
    rate: 4.3,
    communityUrl: "#",
  },
  detailDescription: "Vantage (juga dikenal sebagai Vantage Markets) adalah broker forex dan CFD internasional yang berdiri sejak 2009, menyediakan akses trading ke berbagai instrumen keuangan global termasuk forex, indeks, logam, komoditas, CFD saham, ETF, dan obligasi. Vantage menggabungkan platform trading populer seperti MetaTrader 4, MetaTrader 5, ProTrader, serta aplikasinya sendiri untuk memberi pengalaman trading yang kuat dan fleksibel.",
  cardDescription: "Broker ECN memiliki spread rendah, populer di Asia & Australia.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$50",
    leverage: "Hingga 1:500 (beberapa entitas Premium sampai 1:2000)",
    spread: "Mulai dari 0.0 pips (Raw / Pro)",
  },
  profile: {
    name: brokerName,
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Global Forex & CFD Broker",
    regulations: [
      { name: "ASIC", country: "Australia" },
      { name: "FCA", country: "United Kingdom" },
      { name: "FSCA", country: "Afrika Selatan" },
      { name: "CIMA", country: "Cayman Islands" },
      { name: "VFSC", country: "Vanuatu" },
    ]
  },
  summary: {
    minDeposit: "$50",
    types:["Standard STP", "Raw ECN", "Pro ECN", "Premium", "Cent", "Swap-Free"],
    spread: "Mulai dari 0.0 pips (Raw / Pro)",
    commission: "Mulai dari ±$3 per lot per sisi di Raw ECN",
    leverage: "Hingga 1:500 (beberapa entitas Premium sampai 1:2000)",
    execution: "Cepat & stabil via ECN/STP",
    instruments: ["Forex", "Indeks", "Logam", "Komoditas", "CFD Saham", "ETF", "Obligasi"],
    depositWithdrawal: "Banyak metode, biasanya tanpa biaya broker"
  },
  accountTypes: [
    {
        name: "Standard STP Account",
        level: "Umum",
        features: ["Min deposit : $50", "Spread : mulai ≈ 1.1 – 1.6 pips", "Komisi : $0"]
    },
    {
        name: "Raw ECN Account",
        level: "Trader",
        features: ["Min deposit : $50", "Spread : mulai 0.0 pips", "Komisi : ±$3 per lot per side"]
    },
    {
        name: "PRO ECN Account",
        level: "Trader",
        features: ["Min deposit : ±$50 – $10,000 (tergantung entitas)", "Spread : mulai 0.0 pips", " Komisi : ±$1.50 – $3 per lot per side"]
    },
    {
        name: "Premium / Cent / Swap-Free",
        level: "Trader",
        features: ["Varian akun tambahan", "Fitur sesuai kebutuhan trader berbeda"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Raw/Pro",
          spread: "mulai 0.0 pips"
        },
        {
          accountType: "Standard",
          spread: "±1.4 – 1.6 pips"
        },
      ]
    },
    {
      icon: "gbp-usd.svg",
      pair: "GBP/USD",
      spreads: [
        {
          accountType: "Raw/Pro",
          spread: "mulai ±0.3 – 0.5 pips"
        },
        {
          accountType: "Standard",
          spread: "±1.6 – 1.8 pips"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Raw/Pro",
          spread: "mulai ±0.3 – 0.5 pips"
        },
        {
          accountType: "Standard",
          spread: "±1.4 – 1.8 pips"
        },
      ]
    }
  ],
  keyAdvantages: ["Spread & eksekusi kompetitif", "Akses ke 1,000+ instrumen CFD", "Regulasi global kuat", "Opsi ECN & STP", "Perlindungan saldo negatif", "Integrasi copy trading (ZuluTrade, DupliTrade)", "Platform trading modern"],
  depositWithdrawal: {
      paymentMethods: [
      { 
        method: "Bank Transfer", 
        time: {
          deposit: "Instan – 3 hari kerja (tergantung metode)",
          withdraw: "Instan – 3 hari kerja (tergantung metode)" 
        }, 
        fee: "Biasanya tanpa biaya broker (biaya pihak ketiga bisa berlaku" 
      },
      { 
        method: "Kartu Debit/Kredit", 
        time: {
          deposit: "Instan – 3 hari kerja (tergantung metode)",
          withdraw: "Instan – 3 hari kerja (tergantung metode)" 
        }, 
        fee: "Biasanya tanpa biaya broker (biaya pihak ketiga bisa berlaku" 
      },
      { 
        method: "E-Wallet (PayPal, Neteller, Skrill, dst)", 
        time: {
          deposit: "Instan – 3 hari kerja (tergantung metode)",
          withdraw: "Instan – 3 hari kerja (tergantung metode)" 
        }, 
        fee: "Biasanya tanpa biaya broker (biaya pihak ketiga bisa berlaku" 
      },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "ProTrader", icon: "pro-trader.webp" },
      { username: "WebTrader", icon: "vantage.webp" },
      { username: "Mobile App (Android & iOS)", icon: "vantage.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 6 },
    { pair: "XAU/USD", estimate: 8 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Regulasi kuat di banyak yurisdiksi global", "Spread rendah di Raw ECN / Pro ECN", "Pilihan akun fleksibel sesuai strategi trader", "Platform lengkap & fitur trading canggih", "Tidak ada biaya deposit/withdraw dari broker"],
  disadvantages: [" Spread Standard bisa lebih tinggi dibanding ECN", "Komisi per lot tetap berlaku di Raw ECN", "Regulasi entitas berbeda tergantung wilayah klien"],
  communityRating: {
    score: 4.3,
    quantityVote: 77,
    classifications: [
      { type: "Platform & Tools", rate: 4.4 },
      { type: "Cost & Fees ", rate: 4.2 },
      { type: "Support & Service", rate: 4.3 },
    ]
  },
  faq: [
    {
      question: "Apakah Vantage aman?",
      answer: "Ya — teregulasi oleh ASIC, FCA, FSCA, CIMA & VFSC tergantung entitas."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Mulai dari $50 (tergantung akun & entitas)"
    },
    {
      question: "Platform apa yang didukung?",
      answer: "MT4, MT5, ProTrader, Web, dan Mobile."
    },
    {
      question: "Berapa leverage maksimal?",
      answer: "Hingga 1:500 (ada entitas Premium sampai 1:2000)."
    },
    {
      question: "Apakah ada akun ECN?",
      answer: "Ya — tersedia Raw ECN & Pro ECN dengan spread rendah dan komisi kompetitif."
    },
  ]
}