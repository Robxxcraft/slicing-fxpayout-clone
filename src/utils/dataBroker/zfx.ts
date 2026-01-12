import type { BrokerRanking, BrokerStruc } from "./typeDetailBroker";

const brokerName = "ZFX";
const brokerFounded = "2017 (bagian dari Zeal Group)";
const brokerRanking: BrokerRanking = {
  tier: "Global",
  title: "Multi-Asset ECN/STP Broker"
};

export const zfxDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "zfx.webp",
  registerUrl: "https://my.zm-area.com/reg/truely?agentnumber=Z940752S4",
  websiteUrl: "https://my.zm-area.com/reg/truely?agentnumber=Z940752S4",
  detailUrl: "zfx",
  statusRebate: "Manual Rebate",
  ranking: brokerRanking,
  badges: ["ECN/STP", "Multi-Asset", "High Leverage", "MT4/MT5"],
  overallScore: {
    rate: 4.2,
    communityUrl: "#",
  },
  detailDescription: "ZFX adalah broker Forex & CFD yang merupakan bagian dari Zeal Group, menyediakan trading di pasar global termasuk Forex, indeks, komoditas, logam, dan saham melalui infrastruktur ECN / STP yang transparan. Perusahaan ini teregulasi di Inggris (FCA) dan Seychelles (FSA), fokus pada eksekusi cepat, spread kompetitif, dan multi-asset trading.",
  cardDescription: "Broker ECN premium untuk scalper & EA. Likuiditas dalam & komisi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$15",
    leverage: "Hingga 1:2000 (tergantung akun & wilayah)",
    spread: "Mulai 0.2 pips (ECN)",
  },
  profile: {
    name: brokerName,
    entity: "Zeal Capital Market (Seychelles) Limited",
    group: "Zeal Group",
    ranking: brokerRanking,
    yearFounded: "±2017",
    brokerCategory: "Forex & CFD Broker",
    regulations: [
      { name: "FCA", country: "United Kingdom" },
      { name: "FSA", country: "Seychelles" },
    ]
  },
  summary: {
    minDeposit: "$15",
    types: ["Cent", "Standard STP", "ECN"],
    spread: "Mulai 0.2 pips pada akun ECN; akun standard/cent lebih lebar",
    commission: "ECN biasanya ada komisi (nilai tergantung instrumen)",
    leverage: "Hingga 1:2000 untuk beberapa akun/entitas (tetapi peraturan sementara dapat menurunkan leverage pada saat event ekonomi besar)",
    execution: "Cepat (MT4/MT5)",
    instruments: ["Forex", "Indeks", "Komoditas", "Logam", "Saham CFD"],
    depositWithdrawal: "Kartu, bank transfer, e-wallet; waktu tergantung metode"
  },
  accountTypes: [
    {
        name: "Cent/Mini",
        level: "Pemula",
        features: ["Min Deposit ≥ $15", "Spread Mulai ±0.2 pips", "Leverage Hingga 1:2000", "Eksekusi rata-rata ±480 ms", "Slippage: rendah (data pengujian)"]
    },
    {
        name: "Standard STP",
        level: "Trader retail",
        features: ["Min Deposit ≥ $50", "Spread Mulai ±1.3 – 1.5 pips", "Leverage Hingga 1:2000", "Eksekusi rata-rata ±480 ms", "Slippage: rendah (data pengujian)"]
    },
    {
        name: "ECN Account",
        level: "Pro, scalper, EA",
        features: ["Min Deposit ≥ $500", "Spread Mulai 0.2 pips", "Leverage Hingga 1:2000", "Eksekusi rata-rata ±480 ms", "Slippage: rendah (data pengujian)"]
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "ECN",
          spread: "0.2 – 0.4 pips (typical)"
        },
        {
          accountType: "Standard",
          spread: "~1.3 – 1.5 pips"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD (Gold)",
      spreads: [
        {
          accountType: "ECN",
          spread: "variabel rendah (but volatile)"
        },
        {
          accountType: "Standard",
          spread: "lebih lebar, tergantung likuiditas"
        },
      ]
    }
  ],
  keyAdvantages: ["Spread sangat kompetitif di akun ECN", "Regulasi & backing oleh Zeal Group", "Leverage tinggi tersedia (tergantung entitas)", "MT4/MT5 support penuh", "Pilihan akun untuk pemula sampai pro (cent → ECN)"],
  depositWithdrawal: {
    paymentMethods: [
      { 
        method: "Bank Transfer", 
        time:  {
          deposit: "1–3 hari",
          withdraw: "1–3 hari"
        },
        fee: "$0 dari ZFX; biaya pihak ketiga bisa berlaku" 
      },
      { 
        method: "Debit/Kredit Card", 
        time:  {
          deposit: "Instan",
          withdraw: "Instan"
        }, 
        fee: "$0 dari ZFX; biaya pihak ketiga bisa berlaku" 
      },
      { 
        method: "E-Wallet", 
        time:  {
          deposit: "Instan",
          withdraw: "Instan"
        }, 
        fee: "$0 dari ZFX; biaya pihak ketiga bisa berlaku" 
      },
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "Web Trading", icon: "zfx.webp" },
      { username: "iOS & Android", icon: "zfx.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 12 },
    { pair: "CRYPTO", estimate: 8 },
  ],
  advantages: ["Spread ECN kompetitif", "Leverage tinggi", "MT4 & MT5 tersedia", "Akun cent tersedia"],
  disadvantages: ["Minimum deposit ECN cukup tinggi", "Rebate IB tidak transparan di publik", "Ada laporan keluhan pengguna (perlu kehati-hatian)"],
  communityRating: {
    score: 4.2,
    quantityVote: 70,
    classifications: [
      { type: "Kecepatan Eksekusi", rate: 4.4 },
      { type: "Stabilitas Server", rate: 4.3 },
      { type: "Customer Support", rate: 4.0 },
    ]
  },
  faq: [
    {
      question: "Apakah ZFX aman?",
      answer: "ZFX beroperasi di bawah Zeal Group dan mencantumkan regulasi FCA & FSA untuk entitas grup; verifikasi entitas lokal diperlukan."
    },
    {
      question: "Berapa minimum deposit?",
      answer: "Mulai $15 untuk Cent/Mini; $50 untuk Standard; ECN umumnya $500+ (cek akun di region kamu)."
    },
    {
      question: "Apakah ada akun demo?",
      answer: "Ya, tersedia demo MT4/MT5 di situs ZFX."
    },
    {
      question: "Apakah ada program IB?",
      answer: "Ya, ada partnership / IB program; rebate detail di-negosiasi."
    },
  ]
}
