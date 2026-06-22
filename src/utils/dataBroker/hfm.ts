import { instrumentsKey, levelKey, platformsKey, regulationsKey, timeKey, titleKey, type BrokerRanking, type BrokerStruc } from "./typeDetailBroker";

const brokerName = "HFM";
const brokerId = "hfm";
const brokerFounded = "2010";
const brokerRanking: BrokerRanking = {
  tier: "Global",
  title: "Multi-Asset Forex & CFD Broker"
};
const minDeposit = 0;
const regionsWebsite = [
  { region: "Indonesia", url: "https://register.hfmtrade-ind.com/sv/en/new-live-account/?refid=30494425" },
];

export const hfmDetail: BrokerStruc = {
  id_ib: "30494425",
  contactSupport: "supportind@hfm.com",
  name: brokerName,
  profileImage: "hfm.webp",
  registerUrl: regionsWebsite,
  websiteUrl: regionsWebsite,
  detailUrl: brokerId,
  scheduleUrl: "/schedule",
  statusRebate: "Auto",
  ranking: brokerRanking,
  badges: [`${titleKey}.regulated_broker`, `${titleKey}.multi_asset`, `${titleKey}.mt4_mt5`, `${titleKey}.high_leverage`],
  overallScore: {
    rate: 4.3,
    communityUrl: "https://www.trustpilot.com/review/hfm.com",
  },
  detailDescription: `${brokerId}:description`,
  cardDescription: "Broker ECN premium untuk scalper & EA. Likuiditas dalam & komisi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: minDeposit,
    leverage: `${brokerId}:specification.leverage`,
    spread: `${brokerId}:specification.spread`,
  },
  profile: {
    name: `${brokerName} (HF Markets/HotForex)`,
    slogan:  `${brokerId}:profile.slogan`,
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: [`${titleKey}.multi_regulated`, `${titleKey}.forex_cfd`],
    regulations: [
      { name: "FCA", country: `${regulationsKey}.fca` },
      { name: "CySEC", country: `${regulationsKey}.cysec` },
      { name: "FSCA", country: `${regulationsKey}.fsca` },
      { name: "DFSA", country: `${regulationsKey}.dfsa` },
      { name: "FSA", country: `${regulationsKey}.fsa` },
      { name: "CMA", country: `${regulationsKey}.cma` },
    ]
  },
  summary: {
    minDeposit: minDeposit,
    types: ["Cent", "Zero Spread", "Pro", "Premium", "HFCopy"],
    spread: `${brokerId}:summary.spread`,
    commission: `${brokerId}:summary.commission`,
    leverage: `${brokerId}:summary.leverage`,
    execution: `${brokerId}:summary.execution`,
    instruments: [`${instrumentsKey}:forex`, `${instrumentsKey}:metal`, `${instrumentsKey}:commodity`, `${instrumentsKey}:stocks`, `${instrumentsKey}:indices`, `${instrumentsKey}:crypto`],
    depositWithdrawal: `${brokerId}:summary.depositWithdrawal`
  },
  accountTypes: [
    {
        name: "Cent Account",
        level: `${levelKey}:beginner`,
        features: `${brokerId}:accountTypes.0`  
    },
    {
        name: "Zero Spread Account",
        level: `${levelKey}:general`,
        features: `${brokerId}:accountTypes.1`  
    },
    {
        name: "Pro Account",
        level: `${levelKey}:news_trader`,
        features: `${brokerId}:accountTypes.2`  
    },
    {
        name: "Premium Account",
        level: `${levelKey}:advanced`,
        features: `${brokerId}:accountTypes.3`  
    },
    {
        name: "HFCopy Account",
        level: `${levelKey}:copy_trading`,
        features: `${brokerId}:accountTypes.4`  
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Zero Spread",
          spread: "0.0 – 0.2 pips"
        },
        {
          accountType: "Pro",
          spread: "±0.6 – 0.8 pips"
        },
        {
          accountType: "Premium",
          spread: "±1.4 – 1.7 pips"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Zero/Pro",
          spread: `${brokerId}:spread.0`
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
        fee: "$0" 
      },
      { 
        method: "common:methods.debit_credit_card", 
        time: { 
          deposit: `${timeKey}.interval_instant_1d_work`,
          withdraw: `${timeKey}.days_1_3_work` 
        },  
        fee: "$0" 
      },
      { 
        method: "common:methods.e_wallet", 
        time: { 
          deposit: `${timeKey}.interval_instant_1d_work`,
          withdraw: `${timeKey}.days_1_3_work` 
        },  
        fee: "$0" 
      },
      { 
        method: "common:methods.crypto", 
        time: { 
          deposit: `${timeKey}.interval_instant_1d_work`,
          withdraw: `${timeKey}.days_1_3_work` 
        },  
        fee: "$0" 
      },
    ],
    platforms: [
      { key: "mt4", username: `${platformsKey}.mt4`, icon: "meta-trader.webp" },
      { key: "mt5", username: `${platformsKey}.mt5`, icon: "meta-trader.webp" },
      { key: "other", username: `${platformsKey}.hfm_mobile`, icon: "hfm.webp" },
      { key: "web_trader", username: `${platformsKey}.web_trading`, icon: "hfm.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 3.2},
    { pair: "XAU/USD", estimate: 9},
    { pair: "CRYPTO", estimate: 0.80},
  ],
  rebateRates: [
    { accountType: "Cent", pair: "XAU/USD", rebatePerLot: 0.05 },
    { accountType: "Cent", pair: "EUR/USD", rebatePerLot: 0.04 },
    { accountType: "Cent", pair: "CRYPTO", rebatePerLot: 2 },

    { accountType: "Premium", pair: "XAU/USD", rebatePerLot: 5 },
    { accountType: "Premium", pair: "EUR/USD", rebatePerLot: 4 },
    { accountType: "Premium", pair: "CRYPTO", rebatePerLot: 2 },

    { accountType: "Zero", pair: "XAU/USD", rebatePerLot: 1 },
    { accountType: "Zero", pair: "EUR/USD", rebatePerLot: 0.5 },
    { accountType: "Zero", pair: "CRYPTO", rebatePerLot: 2.73 },

    { accountType: "Pro", pair: "XAU/USD", rebatePerLot: 1 },
    { accountType: "Pro", pair: "EUR/USD", rebatePerLot: 0.5 },
    { accountType: "Pro", pair: "CRYPTO", rebatePerLot: 1 },
  ],
  advantages: `${brokerId}:advantages`,
  disadvantages: `${brokerId}:disadvantages`,
  communityRating: {
    score: 4.3,
    quantityVote: 2.865,
    classifications: [
      { type: `${brokerId}:classifications.0`, rate: 4.5 },
      { type: `${brokerId}:classifications.1`, rate: 4.4 },
      { type: `${brokerId}:classifications.2`, rate: 4.3 },
    ],
  },
  faq: `${brokerId}:faqs`
}