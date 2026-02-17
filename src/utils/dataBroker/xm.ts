import { feeKey, instrumentsKey, levelKey, platformsKey, regulationsKey, timeKey, titleKey, type BrokerRanking, type BrokerStruc } from "./typeDetailBroker";

const brokerName = "XM";
const brokerId = "xm";
const brokerFounded = "2009";
const brokerRanking: BrokerRanking = {
  tier: "Global",
  title: "Multi-Regulated Forex & CFD Broker"
};

export const xmDetail: BrokerStruc = {
  id_ib: "FDP7K",
  contactSupport: "support@xm.com",
  name: brokerName,
  profileImage: "xm.webp",
  registerUrl: "https://affs.click/4gFt7",
  websiteUrl: "https://affs.click/pcNLG",
  detailUrl: brokerId,
  scheduleUrl: "/schedule",
  statusRebate: "Manual",
  ranking: brokerRanking,
  badges: [`${titleKey}.multi_regulated`, `${titleKey}.low_spread`, `${titleKey}.ultra_fast_execution`, `${titleKey}.human_centered_broker`],
  overallScore: {
    rate: 4.3,
    communityUrl: "https://www.trustpilot.com/review/xm.com",
  },
  detailDescription: `${brokerId}:description`,
  cardDescription: "Broker global dengan akun XM Zero berkomisi tinggi sehingga rebate besar.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$5",
    leverage: `${brokerId}:specification.leverage`,
    spread: `${brokerId}:specification.spread`,
  },
  profile: {
    name: brokerName,
    slogan:  `${brokerId}:profile.slogan`,
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: `${titleKey}.forex_cfd`,
    totalInstrument: `${brokerId}:profile.total_instruments`,
    regulations: [
      { name: "ASIC", country: `${regulationsKey}.asic` },
      { name: "FCA", country: `${regulationsKey}.fca` },
      { name: "CySEC", country: `${regulationsKey}.cysec` },
      { name: "DFSA", country: `${regulationsKey}.dfsa` },
      { name: "IFSC", country: `${regulationsKey}.ifsc` },
      { name: "FSCA", country: `${regulationsKey}.fsca` },
    ]
  },
  summary: {
    minDeposit: "$5",
    types: ["Micro", "Standard", "Ultra Low"],
    spread: `${brokerId}:summary.spread`,
    commission: `${brokerId}:summary.commission`,
    leverage: `${brokerId}:summary.leverage`,
    execution: `${brokerId}:summary.execution`,
    instruments: [`${instrumentsKey}:forex`, `${instrumentsKey}:commodity`, `${instrumentsKey}:metal`, `${instrumentsKey}:indices`, `${instrumentsKey}:stocks_cfd`, `${instrumentsKey}:energy`, `${instrumentsKey}:crypto_cfd`, `${instrumentsKey}:turbo_instrument`],
    depositWithdrawal: `${brokerId}:summary.depositWithdrawal`
  },
  accountTypes: [
    {
        name: "Micro Account",
        level: `${levelKey}:beginner`,
        features: `${brokerId}:accountTypes.0` 
    },
    {
        name: "Standard Account",
        level: `${levelKey}:general`,
        features: `${brokerId}:accountTypes.1` 
    },
    {
        name: "Ultra Low Account",
        level: `${levelKey}:trader`,
        features: `${brokerId}:accountTypes.2`
    },
    {
        name: "Zero Account",
        level: `${levelKey}:trader`,
        features: `${brokerId}:accountTypes.3`,
        notes: `${brokerId}:accountNotes`
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
      ]
    }
  ],
  keyAdvantages: `${brokerId}:keyAdvantages`,
  depositWithdrawal: {
      paymentMethods: [
      { 
        method: "common:methods.local_bank", 
        time: {
          deposit: `${timeKey}.interval_instant_2d`,
          withdraw: `${timeKey}.interval_instant_2d`
        }, 
        fee: `${feeKey}.zero_broker`
      },
      { 
        method: "common:methods.debit_credit_card", 
        time: {
          deposit: `${timeKey}.interval_instant_2d`,
          withdraw: `${timeKey}.interval_instant_2d`
        },  
        fee: `${feeKey}.zero_broker`
      },
      { 
        method: "common:methods.e_wallet", 
        time: {
          deposit: `${timeKey}.interval_instant_2d`,
          withdraw: `${timeKey}.interval_instant_2d`
        },  
        fee: `${feeKey}.zero_broker`
      },
    ],
    platforms: [
      { username: `${platformsKey}.mt4`, icon: "meta-trader.webp" },
      { username: `${platformsKey}.mt5`, icon: "meta-trader.webp" },
      { username: `${platformsKey}.web_trading`, icon: "xm.webp" },
      { username: `${platformsKey}.ios_android`, icon: "xm.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 9 },
    { pair: "XAU/USD", estimate: 15 },
    { pair: "CRYPTO", estimate: 25 },
  ],
  rebateRates: [
    { accountType: "Micro", pair: "XAU/USD", rebatePerLot: 0.11 },
    { accountType: "Micro", pair: "EUR/USD", rebatePerLot: 0.06 },
    { accountType: "Micro", pair: "CRYPTO", rebatePerLot: 0.14 },
    
    { accountType: "Standard", pair: "XAU/USD", rebatePerLot: 11 },
    { accountType: "Standard", pair: "EUR/USD", rebatePerLot: 6 },
    { accountType: "Standard", pair: "CRYPTO", rebatePerLot: 14 },

    { accountType: "Ultra Low Micro", pair: "XAU/USD", rebatePerLot: 0.11 },
    { accountType: "Ultra Low Micro", pair: "EUR/USD", rebatePerLot: 0.06 },
    { accountType: "Ultra Low Micro", pair: "CRYPTO", rebatePerLot: 0.14 },

    { accountType: "Ultra Low Standard", pair: "XAU/USD", rebatePerLot: 4 },
    { accountType: "Ultra Low Standard", pair: "EUR/USD", rebatePerLot: 2 },
    { accountType: "Ultra Low Standard", pair: "CRYPTO", rebatePerLot: 4 },
  ],
  advantages: `${brokerId}:advantages`,
  disadvantages: `${brokerId}:disadvantages`,
  communityRating: {
    score: 4.3,
    quantityVote: 2.850,
    classifications: [
      { type: `${brokerId}:classifications.0`, rate: 4.4 },
      { type: `${brokerId}:classifications.1`, rate: 4.3 },
      { type: `${brokerId}:classifications.2`, rate: 4.2 },
    ],
  },
  faq: `${brokerId}:faqs`
}