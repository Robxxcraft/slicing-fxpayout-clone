import { feeKey, instrumentsKey, levelKey, platformsKey, regulationsKey, timeKey, titleKey, type BrokerRanking, type BrokerStruc } from "./typeDetailBroker";

const brokerName = "FP Markets";
const brokerId = "fp-markets";
const brokerFounded = "2005";
const brokerRanking: BrokerRanking = {
  tier: "Global",
  title: "Forex & CFD Broker Multi-Platform & ECN/STP"
};

export const fpMarketsDetail: BrokerStruc = {
  id_ib: "64952",
  contactSupport: "partners@fpmarkets.com",
  name: brokerName,
  profileImage: "fp-markets.webp",
  registerUrl: "https://portal.fpmarkets.com/register?redir=stv&fpm-affiliate-utm-source=IB&fpm-affiliate-agt=64952",
  websiteUrl: "https://portal.fpmarkets.com/register?redir=stv&fpm-affiliate-utm-source=IB&fpm-affiliate-agt=64952",
  detailUrl: brokerId,
  scheduleUrl: "/schedule",
  statusRebate: "Auto",
  ranking: brokerRanking,
  badges: [`${titleKey}.regulated_broker`, `${titleKey}.ecn_stp`, `${titleKey}.low_spread`, `${titleKey}.multi_asset`],
  overallScore: {
    rate: 4.3,
    communityUrl: "https://www.trustpilot.com/review/fpmarkets.com",
  },
  detailDescription: `${brokerId}:description`,
  cardDescription: "Broker ECN Australia dengan eksekusi cepat & kondisi pro-trader.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: "$100",
    leverage: `${brokerId}:specification.leverage`,
    spread: [`${brokerId}:specification.spread.0`, `${brokerId}:specification.spread.1`],
  },
  profile: {
    name: `${brokerName} (First Prudential Markets)`,
    slogan: `${brokerId}:profile.slogan`,
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: [`${titleKey}.forex_cfd`, `${titleKey}.ecn_stp`],
    regulations: [
      { name: "ASIC", country: `${regulationsKey}.asic` },
      { name: "CySEC", country: `${regulationsKey}.cysec` },
      { name: "FSCA", country: `${regulationsKey}.fsca` },
      { name: "FSA", country: `${regulationsKey}.fsa` },
      { name: "CIMA", country: `${regulationsKey}.cima` },
    ]
  },
  summary: {
    minDeposit: "$100",
    types: ["Standard", "Raw"],
    spread: [`${brokerId}:summary.spread.0`, `${brokerId}:summary.spread.1`],
    commission: `${brokerId}:summary.commission`,
    leverage: `${brokerId}:summary.leverage`,
    execution: `${brokerId}:summary.execution`, 
    instruments: [`${instrumentsKey}:forex`, `${instrumentsKey}:indices`, `${instrumentsKey}:commodity`, `${instrumentsKey}:metal`, `${instrumentsKey}:stocks_cfd`, `${instrumentsKey}:etf`, `${instrumentsKey}:obligation`, `${instrumentsKey}:crypto`],
    depositWithdrawal: `${brokerId}:summary.depositWithdrawal`
  },
  accountTypes: [
    {
        name: "Standard Account",
        level: `${levelKey}:general_retail`,
        features: `${brokerId}:accountTypes.0` 
    },
    {
        name: "Raw ECN Account",
        level: `${levelKey}:pro`,
        features: `${brokerId}:accountTypes.1` 
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Raw ECN",
          spread: `${brokerId}:spread.0`
        },
        {
          accountType: "Standard",
          spread: "±1.0 – 1.3 pips"
        },
      ]
    },
    {
      icon: "gbp-usd.svg",
      pair: "GBP/USD",
      spreads: [
        {
          accountType: "Raw ECN",
          spread: "±0.1 – 0.3 pips"
        },
        {
          accountType: "Standard",
          spread: "±1.2 – 1.5 pips"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Raw ECN",
          spread: `${brokerId}:spread.1`
        },
        {
          accountType: "Standard",
          spread: `${brokerId}:spread.2`
        },
      ]
    }
  ],
  keyAdvantages: `${brokerId}:keyAdvantages`,
  depositWithdrawal: {
      paymentMethods: [
      { 
        method: "common:methods.e_wallet", 
        time: { 
          deposit: `${timeKey}.interval_instant_3d_work`,
          withdraw: `${timeKey}.interval_instant_3d_work`
        }, 
        fee: `${feeKey}.zero_broker`
      },
      { 
        method: "common:methods.bank_transfer", 
        time: {
          deposit: `${timeKey}.interval_instant_3d_work`,
          withdraw: `${timeKey}.interval_instant_3d_work`
        },  
        fee: `${feeKey}.zero_broker`
      },
      { 
        method: "common:methods.debit_credit_card", 
        time: {
          deposit: `${timeKey}.interval_instant_3d_work`,
          withdraw: `${timeKey}.interval_instant_3d_work`
        },  
        fee: `${feeKey}.zero_broker`
      },
    ],
    platforms: [
      { username: `${platformsKey}.mt4`, icon: "meta-trader.webp" },
      { username: `${platformsKey}.mt5`, icon: "meta-trader.webp" },
      { username: `${platformsKey}.c_trader`, icon: "c-trader.webp" },
      { username: `${platformsKey}.trading_view`, icon: "trading-view.webp" },
      { username: `${platformsKey}.ios_android`, icon: "fp-markets.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 4.4 },
    { pair: "XAU/USD", estimate: 4.4 },
    { pair: "CRYPTO", estimate: 4.4 },
  ],
  rebateRates: [
    { accountType: "Standard", pair: "XAU/USD", rebatePerLot: 4.40 },
    { accountType: "Standard", pair: "EUR/USD", rebatePerLot: 4.40 },
    { accountType: "Standard", pair: "CRYPTO", rebatePerLot: 4.40 },
  ],
  advantages: `${brokerId}:advantages`,
  disadvantages: `${brokerId}:disadvantages`,
  communityRating: {
    score: 4.3,
    quantityVote: 9.782,
    classifications: [
      { type: `${brokerId}:classifications.0`, rate: 4.4 },
      { type: `${brokerId}:classifications.1`, rate: 4.2 },
      { type: `${brokerId}:classifications.2`, rate: 4.3 },
    ],
  },
  faq: `${brokerId}:faqs`
}