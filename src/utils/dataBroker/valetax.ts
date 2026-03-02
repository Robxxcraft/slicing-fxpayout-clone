import { type BrokerStruc, type BrokerRanking, titleKey, regulationsKey, instrumentsKey, levelKey, timeKey, platformsKey } from "./typeDetailBroker";

const brokerName = "Valetax";
const brokerId = "valetax";
const brokerFounded = "2021";
const brokerRanking: BrokerRanking = {
  tier: "Offshore/High-Leverage Broker",
  title: "Forex & CFD Global"
};

export const valetaxDetail: BrokerStruc = {
  id_ib: "5808172",
  contactSupport: "contact@valetax.com",
  name: brokerName,
  profileImage: "valetax.webp",
  registerUrl: "https://ma.valetax-indonesia.com/p/5808172",
  websiteUrl: "https://ma.valetax-indonesia.com/p/5808172",
  detailUrl: brokerId,
  scheduleUrl: "/schedule",
  statusRebate: "Manual",
  ranking: brokerRanking,
  badges: [`${titleKey}.low_deposit`, `${titleKey}.high_leverage`, `${titleKey}.mt4_mt5`, `${titleKey}.ecn_account`, `${titleKey}.global_forex_cfd`],
  overallScore: {
    rate: 4.3,
    communityUrl: "https://www.trustpilot.com/review/valetax.com",
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
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: `${titleKey}.global_forex_cfd`,
    regulations: [
      { name: "FSC", country: `${regulationsKey}.fsc` },
      { name: "St. Vincent and the Grenadines", country: `${regulationsKey}.st_vincent_grenadines` },
    ]
  },
  summary: {
    minDeposit: "$1",
    types: ["Cent", "Standard", "ECN", "Booster", "Bonus", "PRO"],
    spread: `${brokerId}:summary.spread`,
    commission: `${brokerId}:summary.commission`,
    leverage: `${brokerId}:summary.leverage`,
    execution: `${brokerId}:summary.execution`,
    instruments: [`${instrumentsKey}:forex_60`, `${instrumentsKey}:metal`, `${instrumentsKey}:indices`, `${instrumentsKey}:energy`, `${instrumentsKey}:crypto`],
    depositWithdrawal: `${brokerId}:summary.depositWithdrawal`
  },
  accountTypes: [
    {
        name: "Cent Account",
        level: `${levelKey}:beginner`,
        features: `${brokerId}:accountTypes.0` 
    },
    {
        name: "Standard Account",
        level: `${levelKey}:general`,
        features: `${brokerId}:accountTypes.1` 
    },
    {
        name: "ECN Account",
        level: `${levelKey}:pro_scalper`,
        features: `${brokerId}:accountTypes.2` 
    },
    {
        name: "Booster Account",
        level: `${levelKey}:trader`,
        features: `${brokerId}:accountTypes.3`
    },
    {
        name: "Bonus Account",
        level: `${levelKey}:trader`,
        features: `${brokerId}:accountTypes.4` 
    },
    {
        name: "Pro Account",
        level: `${levelKey}:advanced`,
        features: `${brokerId}:accountTypes.5` 
    },
  ],
  tradingSpreads: [
    {
      pair: "EUR/USD",
      icon: "eur-usd.svg",
      spreads: [
        { accountType: "ECN/Raw", spread: `${brokerId}:spread.0` },
        { accountType: "Standard", spread: "±1.2 - 2.0" },
        { accountType: "Booster", spread: "±1.2 - 2.0" },
        { accountType: "Bonus", spread: "±1.2 - 2.0" },
      ]
    },
    {
      pair: "XAU/USD",
      icon: "xau-usd.svg",
      spreads: [
        { accountType: "ECN/Raw", spread: `${brokerId}:spread.0` },
        { accountType: "Standard", spread: "±1.2 - 2.0" },
        { accountType: "Booster", spread: "±1.2 - 2.0" },
        { accountType: "Bonus", spread: "±1.2 - 2.0" },
      ]
    }
  ],
  keyAdvantages: `${brokerId}:keyAdvantages`,
  depositWithdrawal: {
    paymentMethods: [
      { 
        method: "common:methods.e_wallet", 
        time: {
          deposit: `${timeKey}.instant`,
          withdraw: `${timeKey}.instant`
        }, 
        fee: "$0" 
      },
      { 
        method: "common:methods.bank_transfer", 
        time: {
          deposit: `${timeKey}.instant`,
          withdraw: `${timeKey}.instant`
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
        method: "common:methods.crypto", 
        time: {
          deposit: `${timeKey}.instant`,
          withdraw: `${timeKey}.instant`
        }, 
        fee: "$0" 
      }
    ],
    platforms: [
      { username: `${platformsKey}.mt4`, icon: "meta-trader.webp" },
      { username: `${platformsKey}.mt4`, icon: "meta-trader.webp" },
      { username: `${platformsKey}.web_mobile`, icon: "valetax.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 11 },
    { pair: "XAU/USD", estimate: 16 },
    { pair: "CRYPTO", estimate: 13 },
  ],
  rebateRates: [
    { accountType: "Standard", pair: "XAU/USD", rebatePerLot: 16 },
    { accountType: "Standard", pair: "EUR/USD", rebatePerLot: 11 },
    { accountType: "Standard", pair: "CRYPTO", rebatePerLot: 13 },

    { accountType: "Booster", pair: "XAU/USD", rebatePerLot: 22 },
    { accountType: "Booster", pair: "EUR/USD", rebatePerLot: 16 },
    { accountType: "Booster", pair: "CRYPTO", rebatePerLot: 18 },

    { accountType: "Pro", pair: "XAU/USD", rebatePerLot: 7 },
    { accountType: "Pro", pair: "EUR/USD", rebatePerLot: 4 },
    { accountType: "Pro", pair: "CRYPTO", rebatePerLot: 5 },

    { accountType: "ECN", pair: "XAU/USD", rebatePerLot: 2 },
    { accountType: "ECN", pair: "EUR/USD", rebatePerLot: 2 },
    { accountType: "ECN", pair: "CRYPTO", rebatePerLot: 2 },
  ],
  advantages: `${brokerId}:advantages`,
  disadvantages: `${brokerId}:disadvantages`,
  communityRating: {
    score: 4.3,
    quantityVote: 151,
    classifications: [
      { type: `${brokerId}:classifications.0`, rate: 4.4 },
      { type: `${brokerId}:classifications.1`, rate: 4.2 },
      { type: `${brokerId}:classifications.2`, rate: 4.3 },
    ],
  },
  faq: `${brokerId}:faqs`
}