import { titleKey, instrumentsKey, levelKey, platformsKey, regulationsKey, timeKey, type BrokerRanking, type BrokerStruc } from "./typeDetailBroker";

const brokerName = "TMGM";
const brokerId = "tmgm";
const brokerFounded = "2013";
const brokerRanking: BrokerRanking = {
  tier: "",
  title: "Global Multi-Asset Broker - Forex & CFD Trading"
};
const minDeposit = 100;
const regionsWebsite = [
  { region: "Global", url: "https://portal.tmgm-tmc.com/register?node=MzA3NjUx&language=en" },
];

export const tmgmDetail: BrokerStruc = {
  id_ib: "IB1750254951D",
  contactSupport: "support@tmgm.com",
  name: brokerName,
  profileImage: "tmgm.webp",
  registerUrl: regionsWebsite,
  websiteUrl: regionsWebsite,
  detailUrl: brokerId,
  scheduleUrl: "/schedule",
  statusRebate: "Manual",
  ranking: brokerRanking,
  badges: [`${titleKey}.asic_regulated`, `${titleKey}.ecn_account`, `${titleKey}.mt4_mt5`, `${titleKey}.low_spread`, `${titleKey}.high_leverage`, `${titleKey}.copy_trading_supported`],
  overallScore: {
    rate: 4.5,
    communityUrl: "https://www.trustpilot.com/review/tmgm.com",
  },
  detailDescription: `${brokerId}:description`,
  cardDescription: "",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: minDeposit,
    leverage: `${brokerId}:specification.leverage`,
    spread: `${brokerId}:specification.spread`,
  },
  profile: {
    name: brokerName,
    slogan: `${brokerId}:profile.slogan`,
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: [`${titleKey}.ecn_stp_forex_cfd`],
    regulations: [
      { name: "ASIC", country: `${regulationsKey}.asic` },
      { name: "VFSC", country: `${regulationsKey}.vfsc` },
      { name: "FSC", country: `${regulationsKey}.fsc` },
      { name: "FSA", country: `${regulationsKey}.fsa` },
    ]
  },
  summary: {
    minDeposit: minDeposit,
    types: ["Classic", "Edge"],
    spread: `${brokerId}:summary.spread`,
    commission: `${brokerId}:summary.commission`,
    leverage: `${brokerId}:summary.leverage`,
    execution: `${brokerId}:summary.execution`,
    instruments: [`${instrumentsKey}:forex`, `${instrumentsKey}:gold`, `${instrumentsKey}:indices`, `${instrumentsKey}:energy`, `${instrumentsKey}:crypto`, `${instrumentsKey}:shares_cfd`],
    depositWithdrawal: `${brokerId}:summary.depositWithdrawal`
  },
  accountTypes: [
    {
        name: "Classic",
        level: `${levelKey}:general`,
        features: `${brokerId}:accountTypes.0` 
    },
    {
        name: "Edge",
        level: `${levelKey}:scalper_ea`,
        features: `${brokerId}:accountTypes.1` 
    }
  ],
  tradingSpreads: [
    {
      pair: "EUR/USD",
      icon: "eur-usd.svg",
      spreads: [
        { accountType: "Edge", spread: "0.0 pips" },
        { accountType: "Classic", spread: "~1.0 pips" },
      ]
    },
    {
      pair: "XAU/USD",
      icon: "xau-usd.svg",
      spreads: [
        { accountType: "Edge", spread: "0.0 - 0.2 pips" },
        { accountType: "Classic", spread: "~1.5+ pips" },
      ]
    }
  ],
  keyAdvantages: `${brokerId}:keyAdvantages`,
  depositWithdrawal: {
    paymentMethods: [
      { 
        method: "common:methods.bank_transfer", 
        time: {
          deposit: `${timeKey}.instant`,
          withdraw: `${timeKey}.one_day`
        }, 
        fee: "$0" 
      },
      { 
        method: "common:methods.local_transfer", 
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
          deposit: `${timeKey}.depends`,
          withdraw: `${timeKey}.depends`
        }, 
        fee: "$0" 
      }
    ],
    platforms: [
      { key: "mt4", username: `${platformsKey}.mt4`, icon: "meta-trader.webp" },
      { key: "mt5", username: `${platformsKey}.mt5`, icon: "meta-trader.webp" },
      { key: "other", username: `${platformsKey}.web_trading`, icon: "tmgm.webp" },
      { key: "other", username: `${platformsKey}.mobile_trading`, icon: "tmgm.webp" },
      { key: "other", username: `${platformsKey}.copy_trading`, icon: "copy-trading.webp" },
    ]
  },
  rebateProgram: [
    { pair: "XAU/USD", estimate: 18 },
    { pair: "EUR/USD", estimate: 9 },
    { pair: "FOREX", estimate: 1 },
  ],
  rebateRates: [
    { accountType: "STD-SWF-USD", pair: "XAU/USD", rebatePerLot: 18 },
    { accountType: "STD-SWF-USD", pair: "EUR/USD", rebatePerLot: 9 },
    { accountType: "STD-SWF-USD", pair: "CRYPTO", rebatePerLot: 1 },

    { accountType: "Edge-SF-USC", pair: "XAU/USD", rebatePerLot: 2 },
    { accountType: "Edge-SF-USC", pair: "EUR/USD", rebatePerLot: 2 },
    { accountType: "Edge-SF-USC", pair: "CRYPTO", rebatePerLot: 1 },

    { accountType: "Edge-SF-USD", pair: "XAU/USD", rebatePerLot: 2 },
    { accountType: "Edge-SF-USD", pair: "EUR/USD", rebatePerLot: 2 },
    { accountType: "Edge-SF-USD", pair: "CRYPTO", rebatePerLot: 1 },
  ],
  advantages: `${brokerId}:advantages`,
  disadvantages: `${brokerId}:disadvantages`,
  communityRating: {
    score: 4.5,
    quantityVote: 933,
    classifications: [
      { type: `${brokerId}:classifications.0`, rate: 4.4 },
      { type: `${brokerId}:classifications.1`, rate: 4.3 },
      { type: `${brokerId}:classifications.2`, rate: 4.2 },
    ],
  },
  faq: `${brokerId}:faqs`
}