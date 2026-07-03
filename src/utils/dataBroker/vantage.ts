import { feeKey, instrumentsKey, levelKey, platformsKey, regulationsKey, timeKey, titleKey, type BrokerRanking, type BrokerStruc } from "./typeDetailBroker";

const brokerName = "Vantage";
const brokerId = "vantage";
const brokerFounded = "2009/2010";
const brokerRanking: BrokerRanking = {
  tier: "Global",
  title: "CFD & Forex Broker"
};
const minDeposit = 50;
const regionsWebsite = [
  { region: "Global", url: "https://www.vantagemarketsea.com/id/open-live-account/?affid=MjA3OTY2Mzk=" },
];

export const vantageDetail: BrokerStruc = {
  id_ib: "EJSu0LiT",
  contactSupport: "support@vantagemarkets.com",
  name: brokerName,
  profileImage: "vantage.webp",
  registerUrl: regionsWebsite,
  websiteUrl: regionsWebsite,
  detailUrl: brokerId,
  scheduleUrl: "/schedule",
  statusRebate: "Manual",
  ranking: brokerRanking,
  badges: [`${titleKey}.multi_asset_trading`, `${titleKey}.ecn_stp`, `${titleKey}.competitive_spread`, `${titleKey}.strong_regulation`],
  overallScore: {
    rate: 4.3,
    communityUrl: "https://www.trustpilot.com/review/vantagemarkets.com",
  },
  detailDescription: `${brokerId}:description`,
  cardDescription: "Broker ECN memiliki spread rendah, populer di Asia & Australia.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: minDeposit,
    leverage: `${brokerId}:specification.leverage`,
    spread: `${brokerId}:specification.spread`,
  },
  profile: {
    name: brokerName,
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: [`${titleKey}.global_forex_cfd`],
    regulations: [
      { name: "ASIC", country: `${regulationsKey}.asic` },
      { name: "FCA", country: `${regulationsKey}.fca` },
      { name: "FSCA", country: `${regulationsKey}.fsca` },
      { name: "CIMA", country: `${regulationsKey}.cima` },
      { name: "VFSC", country: `${regulationsKey}.vfsc` },
    ]
  },
  summary: {
    minDeposit: minDeposit,
    types:["Standard STP", "Raw ECN", "Pro ECN", "Premium", "Cent", "Swap-Free"],
    spread: `${brokerId}:summary.spread`,
    commission: `${brokerId}:summary.commission`,
    leverage: `${brokerId}:summary.leverage`,
    execution: `${brokerId}:summary.execution`,
    instruments: [`${instrumentsKey}:forex`, `${instrumentsKey}:indices`, `${instrumentsKey}:metal`, `${instrumentsKey}:commodity`, `${instrumentsKey}:stocks_cfd`, `${instrumentsKey}:etf`, `${instrumentsKey}:obligation`],
    depositWithdrawal: `${brokerId}:summary.depositWithdrawal`
  },
  accountTypes: [
    {
        name: "Standard STP Account",
        level: `${levelKey}:general`,
        features: `${brokerId}:accountTypes.0`  
    },
    {
        name: "Raw ECN Account",
        level: `${levelKey}:trader`,
        features: `${brokerId}:accountTypes.1`  
    },
    {
        name: "PRO ECN Account",
        level: `${levelKey}:trader`,
        features: `${brokerId}:accountTypes.2`  
    },
    {
        name: "Premium / Cent / Swap-Free",
        level: `${levelKey}:trader`,
        features: `${brokerId}:accountTypes.3`  
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Raw/Pro",
          spread: `${brokerId}:spread.0`
        },
        {
          accountType: "Standard",
          spread: "±1.4 – 1.6 pips"
        },
      ]
    },
    {
      icon: "gbp-usd.svg",
      pair: "GBP/USD",
      spreads: [
        {
          accountType: "Raw/Pro",
          spread: `${brokerId}:spread.1`
        },
        {
          accountType: "Standard",
          spread: "±1.6 – 1.8 pips"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Raw/Pro",
          spread: `${brokerId}:spread.2`
        },
        {
          accountType: "Standard",
          spread: "±1.4 – 1.8 pips"
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
          deposit: `${timeKey}.interval_instant_3d_work`,
          withdraw: `${timeKey}.interval_instant_3d_work` 
        }, 
        fee: `${feeKey}.zero_broker_fees_third_party_may_apply`
      },
      { 
        method: "common:methods.debit_credit_card", 
        time: {
          deposit: `${timeKey}.interval_instant_3d_work`,
          withdraw: `${timeKey}.interval_instant_3d_work` 
        }, 
        fee: `${feeKey}.zero_broker_fees_third_party_may_apply`
      },
      { 
        method: "common:methods.e_wallet", 
        time: {
          deposit: `${timeKey}.interval_instant_3d_work`,
          withdraw: `${timeKey}.interval_instant_3d_work` 
        }, 
        fee: `${feeKey}.zero_broker_fees_third_party_may_apply`
      },
    ],
    platforms: [
      { key: "mt4", username: `${platformsKey}.mt4`, icon: "meta-trader.webp" },
      { key: "mt5", username: `${platformsKey}.mt5`, icon: "meta-trader.webp" },
      { key: "pro_trader", username: `${platformsKey}.pro_trader`, icon: "pro-trader.webp" },
      { key: "web_trading", username: `${platformsKey}.web_trading`, icon: "vantage.webp" },
      { key: "ios_android", username: `${platformsKey}.ios_android`, icon: "vantage.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 7.20 },
    { pair: "XAU/USD", estimate: 10.4 },
    { pair: "AUD/USD", estimate: 1.60 },
  ],
  rebateRates: [
    { accountType: "Standard STP", pair: "XAU/USD", rebatePerLot: 10 },
    { accountType: "Standard STP", pair: "EUR/USD", rebatePerLot: 5 },
    { accountType: "Standard STP", pair: "CRYPTO", rebatePerLot: 1.5 },
    
    { accountType: "Raw ECN", pair: "XAU/USD", rebatePerLot: 1.6 },
    { accountType: "Raw ECN", pair: "EUR/USD", rebatePerLot: 1.19 },
    { accountType: "Raw ECN", pair: "CRYPTO", rebatePerLot: 1.6 },
  ],
  advantages: `${brokerId}:advantages`,
  disadvantages: `${brokerId}:disadvantages`,
  communityRating: {
    score: 4.3,
    quantityVote: 11.568,
    classifications: [
      { type: `${brokerId}:classifications.0`, rate: 4.4 },
      { type: `${brokerId}:classifications.1`, rate: 4.2 },
      { type: `${brokerId}:classifications.2`, rate: 4.3 },
    ],
  },
  faq: `${brokerId}:faqs`
}