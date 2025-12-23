import type { BrokerStruc, BrokerRanking } from "./typeDetailBroker";

const brokerName = "Exness";
const brokerFounded = "2008";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Premium ECN Broker"
};

export const exnessDetail: BrokerStruc = {
  name: brokerName,
  profileImage: "exness.webp",
  registerUrl: "https://one.exnessonelink.com/a/8cegzmlbpk",
  websiteUrl: "#",
  detailUrl: "exness",
  ranking: brokerRanking,
  badges: ["Tier 1", "ECN Broker", "Akun Cent", "Ultra-Fast Execution"],
  overallScore: {
    rate: 4.8,
    communityUrl: "#",
  },
  detailDescription: "Broker global dengan eksekusi super cepat, spread rendah, serta pilihan akun yang sangat fleksibel termasuk akun CENT. Menyediakan akses ke Forex, Gold, Indeks, Energi, hingga CFD dengan kondisi stabil dan transparan. Didukung proses deposit-withdraw cepat serta platform trading modern untuk pemula hingga trader profesional.",
  cardDescription: "Broker ECN premium untuk scalper & EA. Likuiditas dalam & komisi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$10",
    leverage: "Hingga 1:2000+",
    spread: "Mulai 0.0 pips (Raw)",
  },
  profile: {
    name: brokerName,
    slogan: "Trade with accuracy, speed, and deep liquidity",
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: "Multi-regulated, ECN/Market Execution",
    regulations: [
      { name: "FSA", country: "Seychelles" },
      { name: "CySEC", country: "Eropa" },
      { name: "FSC", country: "Mauritius" },
      { name: "FSCA", country: "Afrika Selatan" },
      { name: "CBCS", country: "Curacao" },
      { name: "FCA (historis)", country: "United Kingdom" },
    ]
  },
  summary: {
    minDeposit: "$10",
    type: "Standard Cent, Standard, Raw Spread, Zero, Pro",
    spread: "Mulai 0.0 pips (Raw) — rata-rata sangat rendah",
    commission: "Raw/Zero: $3.5–$8 per lot (tergantung pair)",
    leverage: "Hingga 1:2000+ (smart leverage system)",
    execution: "0.01–0.04 detik (super cepat)",
    instruments: "Forex, Gold, Crypto CFD, Indeks, Energi, Saham",
    depositWithdrawal: "Super cepat (<1 menit untuk e-wallet/crypto)"
  },
  accountTypes: [
    {
        name: "Standard Cent (Akun Cent)",
        level: "Pemula",
        features: ["Cocok untuk pemula & testing strategi", "Lot Micro/Nano", "Leverage tinggi", "Spread mulai 0.3 pips", "Tanpa komisi", "Deposit minimum: $10", "Catatan: Tidak semua instrumen tersedia di akun Cent"]
    },
    {
        name: "Standard",
        level: "Umum",
        features: ["Spread rendah", "Tanpa komisi", "Cocok untuk trading manual", "Min deposit: $10"]
    },
    {
        name: "Raw Spread (ECN)",
        level: "Pro & Scalper",
        features: ["Spread 0.0 - 0.3 pips", "Komisi rendah ($3.5–$4 per lot per side)", "Eksekusi sangat cepat", "Ideal untuk scalping & EA"]
    },
    {
        name: "Zero Account",
        level: "News Trader",
        features: ["Spread 0.0 pada 30+ pasangan", "Komisi lebih besar", "Ideal untuk news trading & high-impact event"]
    },
    {
        name: "Pro Account",
        level: "Advanced",
        features: ["Tanpa komisi", "Spread sangat rendah", "Eksekusi instan", "Ideal untuk trader harian & swing"]
    },
  ],
  tradingSpreads: [
    {
      pair: "EUR/USD",
      icon: "eur-usd.svg",
      spreads: [
        { accountType: "Raw", spread: "0.0 - 0.1" },
        { accountType: "Zero", spread: "0.0" },
        { accountType: "Pro", spread: "0.3 - 0.7" },
        { accountType: "Standar", spread: "0.8 - 1.2" },
        { accountType: "Standar Cent", spread: "0.0" }
      ]
    },
    {
      pair: "XAU/USD",
      icon: "xau-usd.svg",
      spreads: [
        { accountType: "Raw", spread: "0.1 - 0.3" },
        { accountType: "Zero", spread: "0.0" },
        { accountType: "Pro", spread: "0.3 - 0.6" },
        { accountType: "Standar", spread: "0.0" },
        { accountType: "Standar Cent", spread: "0.0" }
      ]
    }
  ],
  keyAdvantages: [  "Ultra-fast execution (0.01–0.04 detik)",
  "Spread paling stabil di industri",
  "Platform sangat ringan dan stabil",
  "Withdraw tercepat di antara broker global populer",
  "Akun CENT (jarang di broker Tier 1)",
  "Likuiditas dalam & slippage rendah",
  "Unlimited leverage (region tertentu)",
  "Sangat cocok untuk scalping, EA, dan gold trader"],
  depositWithdrawal: {
    paymentMethods: [
      { method: "E-Wallet", time: "<1m (Instant)", fee: "$0" },
      { method: "Bank Transfer", time: "5–30 Menit", fee: "$0" },
      { method: "VA Lokal (ID)", time: "5–30 Menit", fee: "$0" },
      { method: "Crypto", time: "<1m (Instant)", fee: "$0" },
      { method: "Skrill/Neteller", time: "<1m (Instant)", fee: "$0" },
      { method: "Perfect Money", time: "<1m (Instant)", fee: "$0" }
    ],
    platforms: [
      { username: "MetaTrader 4 (MT4)", icon: "meta-trader.webp" },
      { username: "MetaTrader 5 (MT5)", icon: "meta-trader.webp" },
      { username: "Exness Terminal (Web-based)", icon: "exness.webp" },
      { username: "Copy Trading App", icon: "copy-trading.webp" },
      { username: "Exness Mobile App", icon: "exness-mobile.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 6 },
    { pair: "XAU/USD", estimate: 10 },
    { pair: "AUD/USD", estimate: 5 },
  ],
  advantages: ["Spread & eksekusi sangat stabil", "Withdraw super cepat", "Banyak metode deposit & withdraw", "Tersedia akun Cent untuk pemula", "Ramah EA & scalping", "Leverage besar dan fleksibel"],
  disadvantages: ["Komisi berbeda-beda per pair di akun Raw/Zero", "Leverage dibatasi pada beberapa regulasi", "Tidak semua instrumen tersedia di akun Cent"],
  communityRating: {
    score: 4.8,
    quantityVote: 121,
    withdrawalSpeed: 5,
    stability: 5,
    customerSupport: 4.5
  },
  faq: [
    {
      question: "Apakah Exness Aman?",
      answer: "Exness merupakan broker teregulasi oleh beberapa otoritas keuangan internasional, termasuk FSA, CySEC, FSCA, dan FSC. Perusahaan ini sudah beroperasi sejak 2008 dan dikenal transparan dalam menampilkan laporan keuangan serta statistik trading. Meski tidak berada di bawah regulasi Indonesia, Exness termasuk broker global yang banyak digunakan trader secara internasional."
    },
    {
      question: "Apakah Exness Menyediakan Akun Cent?",
      answer: "Ya. Exness menyediakan akun Standard Cent, yaitu akun dengan ukuran kontrak lebih kecil sehingga cocok untuk latihan, uji strategi, atau trading dengan risiko modal rendah."
    },
    {
      question: "Apakah Exness Cocok Untuk Pemula?",
      answer: "Cocok. Exness menawarkan akun Cent, spread stabil, proses transaksi mudah, serta platform populer seperti MT4/MT5. Kombinasi ini membantu pemula belajar kondisi market nyata dengan risiko yang lebih terukur."
    },
    {
      question: "Apakah Exness Cocok Untuk EA & Scalping?",
      answer: "Ya. Exness mendukung EA, robot trading, algoritma, dan strategi scalping tanpa batasan khusus. Spread yang ketat serta kecepatan eksekusi yang sangat cepat membuatnya sering digunakan untuk strategi intensif."
    },
    {
      question: "Seberapa Cepat Proses WD di Exness?",
      answer: "Umumnya sangat cepat. Banyak metode withdrawal e-wallet dan pembayaran lokal yang diproses dalam hitungan menit, tergantung metode yang digunakan dan kondisi sistem. Proses bisa lebih lama pada jam tertentu atau metode tertentu."
    },
  ]
}