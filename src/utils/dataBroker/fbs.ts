import { type BrokerStruc, type BrokerRanking, titleKey, regulationsKey, instrumentsKey, levelKey, timeKey, platformsKey } from "./typeDetailBroker";

const brokerName = "FBS";
const brokerId = "fbs";
const brokerFounded = "2009";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global Forex & CFD Broker"
};

export const fbsDetail: BrokerStruc = {
  id_ib: "569605",
  contactSupport: "support@fbs.com",
  name: brokerName,
  profileImage: "fbs.webp",
  registerUrl: "https://fbs.partners/?ibl=569605&ibp=17852638",
  websiteUrl: "https://fbs.partners/?ibl=569605&ibp=17852638",
  detailUrl: brokerId,
  scheduleUrl: "/schedule",
  statusRebate: "Manual",
  ranking: brokerRanking,
  badges: [`${titleKey}.low_deposit`, `${titleKey}.high_leverage`, `${titleKey}.multi_asset`, `${titleKey}.beginner_friendly`],
  overallScore: {
    rate: 4.4,
    communityUrl: "https://www.trustpilot.com/review/fbs.com",
  },
  detailDescription: `${brokerId}:description`,
  cardDescription: "Broker ECN premium untuk scalper & EA. Likuiditas dalam & komisi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$1",
    leverage: `${brokerId}:specification.leverage`,
    spread: `${brokerId}:specification.spread`,
  },
  profile: {
    name: brokerName,
    slogan:  `${brokerId}:profile.slogan`,
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: [`${titleKey}.multi_regulated`, `${titleKey}.ecn_stp`],
    regulations: [
      { name: "ASIC", country: `${regulationsKey}.asic` },
      { name: "CySEC", country: `${regulationsKey}.cysec` },
      { name: "IFSC", country: `${regulationsKey}.ifsc` },
      { name: "FSCA", country: `${regulationsKey}.fsca` },
    ]
  },
  summary: {
    minDeposit: "$1",
    types: ["Cent", "Micro", "Standard", "Zero", "ECN"],
    spread: `${brokerId}:summary.spread`,
    commission: `${brokerId}:summary.commission`,
    leverage: `${brokerId}:summary.leverage`,
    execution: `${brokerId}:summary.execution`,
    instruments: [`${instrumentsKey}:forex`, `${instrumentsKey}:metal`, `${instrumentsKey}:indices`, `${instrumentsKey}:energy`, `${instrumentsKey}:stocks_cfd`, `${instrumentsKey}:crypto_cfd`],
    depositWithdrawal: `${brokerId}:summary.depositWithdrawal`
  },
  accountTypes: [
    {
        name: "Cent Account",
        level: `${levelKey}:beginner`,
        features: `${brokerId}:accountTypes.0` 
    },
    {
        name: "Micro Account",
        level: `${levelKey}:news_trader`,
        features: `${brokerId}:accountTypes.1` 
    },
    {
        name: "Standard Account",
        level: `${levelKey}:general`,
        features: `${brokerId}:accountTypes.2` 
    },
    {
        name: "Zero Spread Account",
        level: `${levelKey}:pro_scalper`,
        features: `${brokerId}:accountTypes.3` 
    },
    {
        name: "ECN Account",
        level: `${levelKey}:advanced`,
        features: `${brokerId}:accountTypes.4` 
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
  keyAdvantages: `${brokerId}:keyAdvantages`,
  depositWithdrawal: {
    paymentMethods: [
      { 
        method: "common:methods.bank_transfer", 
        time: {
          deposit: `${timeKey}.days_1_3_work`,
          withdraw: `${timeKey}.days_1_3_work`
        },
        fee: "$0" 
      },
      { 
        method: "common:methods.debit_credit_card", 
        time: {
          deposit: `${timeKey}.instant`,
          withdraw: `${timeKey}.instant`
        },
        fee: "$0" 
      },
      { 
        method: "common:methods.e_wallet", 
        time: {
          deposit: `${timeKey}.instant`,
          withdraw: `${timeKey}.instant`
        },
        fee: "$0" 
      },
      { 
        method: "common:methods.crypto", 
        time: {
          deposit: `${timeKey}.instant`,
          withdraw: `${timeKey}.instant`
        },
        fee: "$0" 
      },
    ],
    platforms: [
      { username: `${platformsKey}.mt4`, icon: "meta-trader.webp" },
      { username: `${platformsKey}.mt5`, icon: "meta-trader.webp" },
      { username: `${platformsKey}.web_trading`, icon: "fbs.webp" },
      { username: `${platformsKey}.ios_android`, icon: "fbs.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 3.61},
    { pair: "XAU/USD", estimate: 10},
    { pair: "CRYPTO", estimate: 2.5},
  ],
  rebateRates: [
    { accountType: "Cent", pair: "XAU/USD", rebatePerLot: 0.1 },
    { accountType: "Cent", pair: "EUR/USD", rebatePerLot: 0.04 },
    { accountType: "Cent", pair: "CRYPTO", rebatePerLot: 0.2 },

    { accountType: "Standard", pair: "XAU/USD", rebatePerLot: 10 },
    { accountType: "Standard", pair: "EUR/USD", rebatePerLot: 3.61 },
    { accountType: "Standard", pair: "CRYPTO", rebatePerLot: 2.36 },
  ],
  advantages: `${brokerId}:advantages`,
  disadvantages: `${brokerId}:disadvantages`,
  communityRating: {
    score: 4.4,
    quantityVote: 8.198,
    classifications: [
      { type: `${brokerId}:classifications.0`, rate: 4.5 },
      { type: `${brokerId}:classifications.1`, rate: 4.4 },
      { type: `${brokerId}:classifications.2`, rate: 4.3 },
    ],
  },
  faq: `${brokerId}:faqs`
}