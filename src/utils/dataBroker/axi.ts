import { type BrokerStruc, type BrokerRanking, titleKey, levelKey, timeKey, platformsKey, regulationsKey, instrumentsKey, feeKey } from "./typeDetailBroker"

const brokerName = "Axi";
const brokerId = "axi";
const brokerFounded = "2007";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global ECN/STP Forex & CFD Broker"
};

export const axiDetail: BrokerStruc = {
  id_ib: "4736053",
  contactSupport: "service@axi.com",
  name: brokerName,
  profileImage: "axi.webp",
  registerUrl: "https://www.axi.com/int/live-account?promocode=4736053",
  websiteUrl: "https://www.axi.com/int/live-account?promocode=4736053",
  detailUrl: brokerId,
  scheduleUrl: "/schedule",
  statusRebate: "Auto",
  ranking: brokerRanking,
  badges: [`${titleKey}.tier_1`, `${titleKey}.ecn_stp`, `${titleKey}.low_spread`, `${titleKey}.flexible_leverage`],
  overallScore: {
    rate: 4.5,
    communityUrl: "https://www.trustpilot.com/review/axi.com",
  },
  detailDescription: `${brokerId}:description`,
  cardDescription: "Broker global dengan fokus pada keamanan & eksekusi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$0",
    leverage: `${brokerId}:specification.leverage`,
    spread: `${brokerId}:specification.spread`,
  },
  profile: {
    name: brokerName,
    slogan: `${brokerId}:profile.slogan`,
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: [`${titleKey}.multi_regulated`, `${titleKey}.forex_cfd`],
    regulations: [
      { name: "FCA", country: `${regulationsKey}.fca` },
      { name: "ASIC", country: `${regulationsKey}.asic` },
      { name: "FSCA", country: `${regulationsKey}.fsca` },
    ]
  },
  summary: {
    minDeposit: "$0",
    types: ["Standard", "Pro ECN"],
    spread: `${brokerId}:summary.spread`,
    commission: `${brokerId}:summary.commission`,
    leverage: `${brokerId}:summary.leverage`,
    execution: `${brokerId}:summary.execution`,
    instruments: [`${instrumentsKey}:forex`, `${instrumentsKey}:indices`, `${instrumentsKey}:commodity`, `${instrumentsKey}:stocks_cfd`, `${instrumentsKey}:crypto_cfd`],
    depositWithdrawal: `${brokerId}:summary.depositWithdrawal`
  },
  accountTypes: [
    {
        name: "Standard Account",
        level: `${levelKey}:general`,
        features: `${brokerId}:accountTypes.0` 
    },
    {
        name: "Pro ECN Account",
        level: `${levelKey}:advanced`,
        features: `${brokerId}:accountTypes.1` 
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Pro ECN",
          spread: "0.0 – 0.2 pips"
        },
        {
          accountType: "Standard",
          spread: "±1.0 – 1.3 pips"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Pro ECN",
          spread: "±0.1 – 0.3 pips"
        },
        {
          accountType: "Standard",
          spread: "±0.7 – 1.2 pips"
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
          deposit: `${timeKey}.interval_instant_1d_work`,
          withdraw: `${timeKey}.days_1_3_work`
        }, 
        fee: `${feeKey}.zero_broker_depends_method`
      },
      { 
        method: "common:methods.debit_credit_card", 
        time: {
          deposit: `${timeKey}.interval_instant_1d_work`,
          withdraw: `${timeKey}.days_1_3_work`
        }, 
        fee: `${feeKey}.zero_broker_depends_method`
      },
      { 
        method: "common:methods.e_wallet", 
        time: {
          deposit: `${timeKey}.interval_instant_1d_work`,
          withdraw: `${timeKey}.days_1_3_work`
        }, 
        fee: `${feeKey}.zero_broker_depends_method`
      },
    ],
    platforms: [
      { username: `${platformsKey}.mt4`, icon: "meta-trader.webp" },
      { username: `${platformsKey}.mt5`, icon: "meta-trader.webp" },
      { username: `${platformsKey}.web_trading`, icon: "axi.webp" },
      { username: `${platformsKey}.ios_android`, icon: "axi.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 4.5 },
    { pair: "XAU/USD", estimate: 6 },
    { pair: "AUD/USD", estimate: 4 },
  ],
  rebateRates: [
    { accountType: "Standard", pair: "XAU/USD", rebatePerLot: 2.40 },
    { accountType: "Standard", pair: "EUR/USD", rebatePerLot: 2.40 },
    { accountType: "Standard", pair: "CRYPTO", rebatePerLot: 4 },
    
    { accountType: "Pro", pair: "XAU/USD", rebatePerLot: 2.40 },
    { accountType: "Pro", pair: "EUR/USD", rebatePerLot: 0.08 },
    { accountType: "Pro", pair: "CRYPTO", rebatePerLot: 4 },
  ],
  advantages: `${brokerId}:advantages`,
  disadvantages: `${brokerId}:disadvantages`, 
  communityRating: {
    score: 4.5,
    quantityVote: 5.271,
    classifications: [
      { type: `${brokerId}:classifications.0`, rate: 4.6 },
      { type: `${brokerId}:classifications.1`, rate: 4.4 },
      { type: `${brokerId}:classifications.2`, rate: 4.5 },
    ],
  },
  faq: `${brokerId}:faqs`
}