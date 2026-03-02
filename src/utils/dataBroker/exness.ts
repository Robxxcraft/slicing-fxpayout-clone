import { titleKey, instrumentsKey, levelKey, platformsKey, regulationsKey, timeKey, type BrokerRanking, type BrokerStruc } from "./typeDetailBroker";

const brokerName = "Exness";
const brokerId = "exness";
const brokerFounded = "2008";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Premium ECN Broker"
};

export const exnessDetail: BrokerStruc = {
  id_ib: "8cegzmlbpk",
  contactSupport: "support@exness.com",
  name: brokerName,
  profileImage: "exness.webp",
  registerUrl: "https://one.exnessonelink.com/a/8cegzmlbpk",
  websiteUrl: "https://one.exnessonelink.com/a/8cegzmlbpk",
  detailUrl: brokerId,
  scheduleUrl: "/schedule",
  statusRebate: "Auto",
  ranking: brokerRanking,
  badges: [`${titleKey}.tier_1`, `${titleKey}.ecn_broker`, `${titleKey}.cent_account`, `${titleKey}.ultra_fast_execution`],
  overallScore: {
    rate: 4.8,
    communityUrl: "https://www.trustpilot.com/review/exness.com",
  },
  detailDescription: `${brokerId}:description`,
  cardDescription: "Broker ECN premium untuk scalper & EA. Likuiditas dalam & komisi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$50",
    leverage: `${brokerId}:specification.leverage`,
    spread: `${brokerId}:specification.spread`,
  },
  profile: {
    name: brokerName,
    slogan: `${brokerId}:profile.slogan`,
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: [`${titleKey}.multi_regulated`, `${titleKey}.ecn_market_execution`],
    regulations: [
      { name: "FSA", country: `${regulationsKey}.fsa` },
      { name: "CySEC", country: `${regulationsKey}.cysec` },
      { name: "FSC", country: `${regulationsKey}.fsc` },
      { name: "FSCA", country: `${regulationsKey}.fsca` },
      { name: "CBCS", country: `${regulationsKey}.cbcs` },
      { name: "FCA", country: `${regulationsKey}.fca` },
    ]
  },
  summary: {
    minDeposit: "$50",
    types: ["Standard Cent", "Standard", "Raw Spread", "Zero", "Pro"],
    spread: `${brokerId}:summary.spread`,
    commission: `${brokerId}:summary.commission`,
    leverage: `${brokerId}:summary.leverage`,
    execution: `${brokerId}:summary.execution`,
    instruments: [`${instrumentsKey}:forex`, `${instrumentsKey}:gold`, `${instrumentsKey}:crypto_cfd`, `${instrumentsKey}:indices`, `${instrumentsKey}:energy`, `${instrumentsKey}:stocks`],
    depositWithdrawal: `${brokerId}:summary.depositWithdrawal`
  },
  accountTypes: [
    {
        name: "Standard Cent",
        level: `${levelKey}:beginner`,
        features: `${brokerId}:accountTypes.0` 
    },
    {
        name: "Standard",
        level: `${levelKey}:general`,
        features: `${brokerId}:accountTypes.1` 
    },
    {
        name: "Raw Spread (ECN)",
        level: `${levelKey}:pro_scalper`,
        features: `${brokerId}:accountTypes.2` 
    },
    {
        name: "Zero Account",
        level: `${levelKey}:news_trader`,
        features: `${brokerId}:accountTypes.3` 
    },
    {
        name: "Pro Account",
        level: `${levelKey}:advanced`,
        features: `${brokerId}:accountTypes.4` 
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
        { accountType: "Standard", spread: "0.8 - 1.2" },
        { accountType: "Standard Cent", spread: "0.0" }
      ]
    },
    {
      pair: "XAU/USD",
      icon: "xau-usd.svg",
      spreads: [
        { accountType: "Raw", spread: "0.1 - 0.3" },
        { accountType: "Zero", spread: "0.0" },
        { accountType: "Pro", spread: "0.3 - 0.6" },
        { accountType: "Standard", spread: "0.0" },
        { accountType: "Standard Cent", spread: "0.0" }
      ]
    }
  ],
  keyAdvantages: `${brokerId}:keyAdvantages`,
  depositWithdrawal: {
    paymentMethods: [
      { 
        method: "common:methods.e_wallet", 
        time: {
          deposit: `${timeKey}.instant_1m`,
          withdraw: `${timeKey}.instant_1m`
        }, 
        fee: "$0" 
      },
      { 
        method: "common:methods.bank_transfer", 
        time: {
          deposit: `${timeKey}.interval_5_30`,
          withdraw: `${timeKey}.interval_5_30`
        }, 
        fee: "$0" 
      },
      { 
        method: "common:methods.indonesian_local_va", 
        time: {
          deposit: `${timeKey}.interval_5_30`,
          withdraw: `${timeKey}.interval_5_30`
        }, 
        fee: "$0" 
      },
      { 
        method: "common:methods.crypto", 
        time: {
          deposit: `${timeKey}.instant_1m`,
          withdraw: `${timeKey}.instant_1m`
        }, 
        fee: "$0" 
      },
      { 
        method: "common:methods.skrill_neteller", 
        time: {
          deposit: `${timeKey}.instant_1m`,
          withdraw: `${timeKey}.instant_1m`
        }, 
        fee: "$0" 
      },
      { 
        method: "common:methods.perfect_money", 
        time: {
          deposit: `${timeKey}.instant_1m`,
          withdraw: `${timeKey}.instant_1m`
        }, 
        fee: "$0" 
      }
    ],
    platforms: [
      { username: `${platformsKey}.mt4`, icon: "meta-trader.webp" },
      { username: `${platformsKey}.mt5`, icon: "meta-trader.webp" },
      { username: `${platformsKey}.exness_terminal`, icon: "exness.webp" },
      { username: `${platformsKey}.copy_trading`, icon: "copy-trading.webp" },
      { username: `${platformsKey}.exness_mobile`, icon: "exness-mobile.webp" },
    ]
  },
  rebateProgram: [
    { pair: "XAU/USD", estimate: 11.23 },
    { pair: "FOREX", estimate: 3.99 },
    { pair: "CRYPTO", estimate: 7.20 },
    { pair: "EUR/USD", estimate: 3.20 },
  ],
  rebateRates: [
    { accountType: "Standard", pair: "XAU/USD", rebatePerLot: 11.23 },
    { accountType: "Standard", pair: "GBP/USD", rebatePerLot: 3.99 },
    { accountType: "Standard", pair: "EUR/USD", rebatePerLot: 3.20 },
    { accountType: "Standard", pair: "CRYPTO", rebatePerLot: 7.20 },

    { accountType: "Pro", pair: "XAU/USD", rebatePerLot: 4.68 },
    { accountType: "Pro", pair: "GBP/USD", rebatePerLot: 1.75 },
    { accountType: "Pro", pair: "EUR/USD", rebatePerLot: 1.75 },
    { accountType: "Pro", pair: "CRYPTO", rebatePerLot: 3.14 },

    { accountType: "Raw Spread", pair: "XAU/USD", rebatePerLot: 2.70 },
    { accountType: "Raw Spread", pair: "GBP/USD", rebatePerLot: 2.00 },
    { accountType: "Raw Spread", pair: "EUR/USD", rebatePerLot: 2.00 },
    { accountType: "Raw Spread", pair: "CRYPTO", rebatePerLot: 3.00 },

    { accountType: "Zero", pair: "XAU/USD", rebatePerLot: 2.70 },
    { accountType: "Zero", pair: "GBP/USD", rebatePerLot: 2.00 },
    { accountType: "Zero", pair: "EUR/USD", rebatePerLot: 2.00 },
    { accountType: "Zero", pair: "CRYPTO", rebatePerLot: 3.00 },
  ],
  advantages: `${brokerId}:advantages`,
  disadvantages: `${brokerId}:disadvantages`,
  communityRating: {
    score: 4.8,
    quantityVote: 26.158,
    classifications: [
      { type: `${brokerId}:classifications.0`, rate: 5 },
      { type: `${brokerId}:classifications.1`, rate: 5 },
      { type: `${brokerId}:classifications.2`, rate: 4.5 },
    ],
  },
  faq: `${brokerId}:faqs`
}