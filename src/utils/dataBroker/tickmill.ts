import { feeKey, instrumentsKey, levelKey, platformsKey, regulationsKey, timeKey, titleKey, type BrokerRanking, type BrokerStruc } from "./typeDetailBroker";

const brokerName = "Tickmill";
const brokerId = "tickmill";
const brokerFounded = "2014";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Forex & CFD ECN Broker"
};

export const tickmillDetail: BrokerStruc = {
  id_ib: "IB89045395",
  contactSupport: "support@tickmill.com",
  name: brokerName,
  profileImage: "tickmill.webp",
  registerUrl: "https://secure.itr-tickmill.com/?utm_campaign=ib_link&utm_content=IB89045395&utm_medium=Open+Account&utm_source=link&lp=https%3A%2F%2Fsecure.itr-tickmill.com%2Fid%2Fsign-up%2F",
  websiteUrl: "https://secure.itr-tickmill.com/?utm_campaign=ib_link&utm_content=IB89045395&utm_medium=Open+Account&utm_source=link&lp=https%3A%2F%2Fsecure.itr-tickmill.com%2Fid%2Fsign-up%2F",
  detailUrl: brokerId,
  scheduleUrl: "/schedule",
  statusRebate: "Auto",
  ranking: brokerRanking,
  badges: [`${titleKey}.tier_1`, `${titleKey}.ecn_broker`, `${titleKey}.thin_spread`, `${titleKey}.flexible_leverage`],
  overallScore: {
    rate: 4.4,
    communityUrl: "https://www.trustpilot.com/review/www.tickmill.com",
  },
  detailDescription: `${brokerId}:description`,
  cardDescription: "Broker ECN terkenal dengan komisi rendah dan rebate kompetitif.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$100",
    leverage: `${brokerId}:specification.leverage`,
    spread: `${brokerId}:specification.spread`,
  },
  profile: {
    name: brokerName,
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: [`${titleKey}.multi_regulated`, `${titleKey}.ecn_stp`],
    model: `${brokerId}:profile.model`,
    regulations: [
      { name: "FCA", country: `${regulationsKey}.fca` },
      { name: "CySEC", country: `${regulationsKey}.cysec` },
      { name: "FSCA", country: `${regulationsKey}.fsca` },
      { name: "FSA", country: `${regulationsKey}.fsa` },
    ]
  },
  summary: {
    minDeposit: "$100",
    types: ["Classic", "Pro", "VIP/Ultra"],
    spread: `${brokerId}:summary.spread`,
    commission: `${brokerId}:summary.commission`,
    leverage: `${brokerId}:summary.leverage`,
    execution: `${brokerId}:summary.execution`,
    instruments: [`${instrumentsKey}:forex`, `${instrumentsKey}:indices`, `${instrumentsKey}:commodity`, `${instrumentsKey}:energy`, `${instrumentsKey}:metal`, `${instrumentsKey}:stocks_cfd`],
    depositWithdrawal: `${brokerId}:summary.depositWithdrawal`
  },
  accountTypes: [
    {
        name: "Classic Account",
        level: `${levelKey}:general`,
        features: `${brokerId}:accountTypes.0`  
    },
    {
        name: "Pro Account",
        level: `${levelKey}:pro`,
        features: `${brokerId}:accountTypes.1`  
    },
    {
        name: "VIP/Ultra Account",
        level: `${levelKey}:trader`,
        features: `${brokerId}:accountTypes.2`  
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Pro/VIP",
          spread: "0.0 – 0.2 pips (ECN)"
        },
        {
          accountType: "Classic",
          spread: "±1.6 – 1.8 pips"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Pro/VIP",
          spread: "±0.1 – 0.3 pips"
        },
        {
          accountType: "Classic",
          spread: "±0.7 – 1.0 pips"
        },
      ]
    },
    {
      icon: "aud-usd.svg",
      pair: "AUD/USD",
      spreads: [
        {
          accountType: "Pro/VIP",
          spread: "±0.2 – 0.4 pips"
        },
        {
          accountType: "Classic",
          spread: "±1.4 – 1.6 pips"
        },
      ]
    }
  ],
  keyAdvantages: `${brokerId}:keyAdvantages`,
  depositWithdrawal: {
      paymentMethods: [
      { 
        method: "common:methods.debit_credit_card", 
        time: { 
          deposit: `${timeKey}.interval_instant_1d_work`,
          withdraw: `${timeKey}.days_1_3_work`
        },
        fee: `${feeKey}.zero_broker_depends_method`
      },
      { 
        method: "common:methods.bank_transfer", 
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
      { username: `${platformsKey}.web_trading`, icon: "tickmill.webp" },
      { username: `${platformsKey}.ios_android`, icon: "tickmill.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 8 },
    { pair: "AUD/USD", estimate: 0.80 },
  ],
  rebateRates: [
    { accountType: "Classic", pair: "XAU/USD", rebatePerLot: 8 },
    { accountType: "Classic", pair: "EUR/USD", rebatePerLot: 8 },
    { accountType: "Classic", pair: "CRYPTO", rebatePerLot: 0.8 },

    { accountType: "Raw", pair: "XAU/USD", rebatePerLot: 2 },
    { accountType: "Raw", pair: "EUR/USD", rebatePerLot: 2 },
    { accountType: "Raw", pair: "CRYPTO", rebatePerLot: 0.8 },
  ],
  advantages: `${brokerId}:advantages`,
  disadvantages: `${brokerId}:disadvantages`,
  communityRating: {
    score: 4.4,
    quantityVote: 1.078,
    classifications: [
      { type: `${brokerId}:classifications.0`, rate: 4.5 },
      { type: `${brokerId}:classifications.1`, rate: 4.4 },
      { type: `${brokerId}:classifications.2`, rate: 4.3 },
    ],
  },
  faq: `${brokerId}:faqs`
}