import { feeKey, instrumentsKey, levelKey, platformsKey, regulationsKey, timeKey, titleKey, type BrokerRanking, type BrokerStruc } from "./typeDetailBroker";

const brokerName = "OctaFx";
const brokerId = "octafx";
const brokerFounded = "2011";
const brokerRanking: BrokerRanking = {
  tier: "Global",
  title: "Forex & CFD Broker"
};
const minDeposit = 50;
const regionsWebsite = [
  { region: "Global", url: "https://octa.click/bJLCLmX8zDZ?ib=47807098" },
];
 
export const octaFxDetail: BrokerStruc = {
  id_ib: "47807098",
  contactSupport: "support@octafx.com",
  name: brokerName,
  profileImage: "octafx.webp",
  registerUrl: regionsWebsite,
  websiteUrl: regionsWebsite,
  detailUrl: brokerId,
  scheduleUrl: "/schedule",
  statusRebate: "Manual",
  ranking: brokerRanking,
  badges: [`${titleKey}.multi_platform`, `${titleKey}.low_spread`, `${titleKey}.no_commission`, `${titleKey}.beginner_advanced_friendly`],
  overallScore: {
    rate: 4.3,
    communityUrl: "https://www.trustpilot.com/review/octafx.com",
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
    name: brokerName,
    slogan: `${brokerId}:profile.slogan`,
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: [`${titleKey}.forex_cfd`],
    totalUser: `${brokerId}:profile.totalUser`,
    totalInstrument: `${brokerId}:profile.totalInstrument`,
    regulations: [
      { name: "CySEC", country: `${regulationsKey}.cysec` },
    ]
  },
  summary: {
    minDeposit: minDeposit,
    types: ["MT4", "MT5", "OctaTrader"],
    spread: `${brokerId}:summary.spread`,
    commission: `${brokerId}:summary.commission`,
    leverage: `${brokerId}:summary.leverage`,
    execution: `${brokerId}:summary.execution`, 
    instruments: [`${instrumentsKey}:forex`, `${instrumentsKey}:metal`, `${instrumentsKey}:indices`, `${instrumentsKey}:commodity`, `${instrumentsKey}:crypto`, `${instrumentsKey}:stocks_cfd`],
    depositWithdrawal: `${brokerId}:summary.depositWithdrawal`
  },
  accountTypes: [
    {
        name: "Micro Account",
        level: `${levelKey}:beginner`,
        features: `${brokerId}:accountTypes.0`  
    },
    {
        name: "Pro Account",
        level: `${levelKey}:pro`,
        features: `${brokerId}:accountTypes.1`  
    },
    {
        name: "ECN Account",
        level: `${levelKey}:advanced`,
        features: `${brokerId}:accountTypes.2`  
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: `${brokerId}:spreadAccount.0`,
          spread: "±0.6 pips (typical)"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: `${brokerId}:spreadAccount.0`,
          spread: `${brokerId}:spread.0`
        },
      ]
    },
    {
      icon: "aud-usd.svg",
      pair: "AUD/USD",
      spreads: [
        {
          accountType: `${brokerId}:spreadAccount.0`,
          spread: "±0.7 pips (typical)"
        },
      ]
    },
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
        fee: `${feeKey}.zero_broker` 
      },
      { 
        method: "common:methods.debit_credit_card", 
        time: {
          deposit: `${timeKey}.interval_instant_1d_work`,
          withdraw: `${timeKey}.days_1_3_work`
        }, 
        fee: `${feeKey}.zero_broker` 
      },
      { 
        method: "common:methods.e_wallet", 
        time: {
          deposit: `${timeKey}.interval_instant_1d_work`,
          withdraw: `${timeKey}.days_1_3_work`
        }, 
        fee: `${feeKey}.zero_broker` 
      },
    ],
    platforms: [
      { key: "mt4", username: `${platformsKey}.mt4`, icon: "meta-trader.webp" },
      { key: "mt5", username: `${platformsKey}.mt5`, icon: "meta-trader.webp" },
      { key: "other", username: `${platformsKey}.octa_trader`, icon: "octafx.webp" },
      { key: "web_trader", username: `${platformsKey}.web_trading`, icon: "octafx.webp" },
      { key: "ios_android", username: `${platformsKey}.ios_android`, icon: "octafx.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 8 },
    { pair: "CRYPTO", estimate: 8 },
  ],
  rebateRates: [
    { accountType: "MT4", pair: "XAU/USD", rebatePerLot: 2 },
    { accountType: "MT4", pair: "EUR/USD", rebatePerLot: 2 },
    { accountType: "MT4", pair: "CRYPTO", rebatePerLot: 2 },

    { accountType: "MT5", pair: "XAU/USD", rebatePerLot: 2 },
    { accountType: "MT5", pair: "EUR/USD", rebatePerLot: 2 },
    { accountType: "MT5", pair: "CRYPTO", rebatePerLot: 2 },

    { accountType: "Octa Trader", pair: "XAU/USD", rebatePerLot: 2 },
    { accountType: "Octa Trader", pair: "EUR/USD", rebatePerLot: 2 },
    { accountType: "Octa Trader", pair: "CRYPTO", rebatePerLot: 2 },
  ],
  advantages: `${brokerId}:advantages`,
  disadvantages: `${brokerId}:disadvantages`,
  communityRating: {
    score: 4.3,
    quantityVote: 8.924,
    classifications: [
      { type: `${brokerId}:classifications.0`, rate: 4.2 },
      { type: `${brokerId}:classifications.1`, rate: 4.4 },
      { type: `${brokerId}:classifications.2`, rate: 4.3 },
    ],
  },
  faq: `${brokerId}:faqs`
}
