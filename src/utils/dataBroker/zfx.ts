import { titleKey, instrumentsKey, levelKey, platformsKey, regulationsKey, timeKey, type BrokerRanking, type BrokerStruc, feeKey } from "./typeDetailBroker";

const brokerName = "ZFX";
const brokerId = "zfx";
const brokerFounded = "2017";
const brokerRanking: BrokerRanking = {
  tier: "Global",
  title: "Multi-Asset ECN/STP Broker"
};
const minDeposit = 15;

export const zfxDetail: BrokerStruc = {
  id_ib: "Z940752S4",
  contactSupport: "6287887786538",
  name: brokerName,
  profileImage: "zfx.webp",
  registerUrl: "https://my.zm-area.com/reg/truely?agentnumber=Z940752S4",
  websiteUrl: "https://my.zm-area.com/reg/truely?agentnumber=Z940752S4",
  detailUrl: brokerId,
  scheduleUrl: "/schedule",
  statusRebate: "Manual",
  ranking: brokerRanking,
  badges: [`${titleKey}.ecn_stp`, `${titleKey}.multi_asset`, `${titleKey}.high_leverage`, `${titleKey}.mt4_mt5`],
  overallScore: {
    rate: 4.2,
    communityUrl: "https://www.trustpilot.com/review/zfx.com",
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
    entity: "Zeal Capital Market (Seychelles) Limited",
    group: "Zeal Group",
    ranking: brokerRanking,
    yearFounded: "±2017",
    brokerCategory: [`${titleKey}.forex_cfd`],
    regulations: [
      { name: "FCA", country: `${regulationsKey}.fca` },
      { name: "FSA", country: `${regulationsKey}.fsa` },
    ]
  },
  summary: {
    minDeposit: minDeposit,
    types: ["Cent", "Standard STP", "ECN"],
    spread: `${brokerId}:summary.spread`,
    commission: `${brokerId}:summary.commission`,
    leverage: `${brokerId}:summary.leverage`,
    execution: `${brokerId}:summary.execution`,
    instruments: [`${instrumentsKey}:forex`, `${instrumentsKey}:indices`, `${instrumentsKey}:commodity`, `${instrumentsKey}:metal`, `${instrumentsKey}:stocks_cfd`],
    depositWithdrawal: `${brokerId}:summary.depositWithdrawal` 
  },
  accountTypes: [
    {
        name: "Cent/Mini",
        level: `${levelKey}:general`,
        features: `${brokerId}:accountTypes.0` 
    },
    {
        name: "Standard STP",
        level: `${levelKey}:trader_retail`,
        features: `${brokerId}:accountTypes.1` 
    },
    {
        name: "ECN Account",
        level: `${levelKey}:pro_scalper_ea`,
        features: `${brokerId}:accountTypes.2` 
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "ECN",
          spread: "0.2 – 0.4 pips (typical)"
        },
        {
          accountType: "Standard",
          spread: "~1.3 – 1.5 pips"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD (Gold)",
      spreads: [
        {
          accountType: "ECN",
          spread: `${brokerId}:spread.0`
        },
        {
          accountType: "Standard",
          spread: `${brokerId}:spread.1`
        },
      ]
    }
  ],
  keyAdvantages: `${brokerId}:keyAdvantages`,
  depositWithdrawal: {
    paymentMethods: [
      { 
        method: "common:methods.bank_transfer", 
        time:  {
          deposit: `${timeKey}.days_1_3`,
          withdraw: `${timeKey}.days_1_3`
        },
        fee: `${feeKey}.zero_broker_fees_third_party_may_apply`
      },
      { 
        method: "common:methods.debit_credit_card", 
        time:  {
          deposit: `${timeKey}.instant`,
          withdraw: `${timeKey}.instant`
        }, 
        fee: `${feeKey}.zero_broker_fees_third_party_may_apply`
      },
      { 
        method: "common:methods.e_wallet", 
        time:  {
          deposit: `${timeKey}.instant`,
          withdraw: `${timeKey}.instant`
        }, 
        fee: `${feeKey}.zero_broker_fees_third_party_may_apply`
      },
    ],
    platforms: [
      { key: "mt4", username: `${platformsKey}.mt4`, icon: "meta-trader.webp" },
      { key: "mt5", username: `${platformsKey}.mt5`, icon: "meta-trader.webp" },
      { key: "web_trader", username: `${platformsKey}.web_trading`, icon: "zfx.webp" },
      { key: "ios_android", username: `${platformsKey}.ios_android`, icon: "zfx.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 8 },
    { pair: "XAU/USD", estimate: 13 },
    { pair: "CRYPTO", estimate: 8 },
  ],
  rebateRates: [
    { accountType: "Mini", pair: "XAU/USD", rebatePerLot: 0.8 },
    { accountType: "Mini", pair: "EUR/USD", rebatePerLot: 0.8 },
    { accountType: "Mini", pair: "CRYPTO", rebatePerLot: 0.8 },

    { accountType: "Standard", pair: "XAU/USD", rebatePerLot: 13 },
    { accountType: "Standard", pair: "EUR/USD", rebatePerLot: 8 },
    { accountType: "Standard", pair: "CRYPTO", rebatePerLot: 8 },

    { accountType: "ECN", pair: "XAU/USD", rebatePerLot: 3 },
    { accountType: "ECN", pair: "EUR/USD", rebatePerLot: 3 },
    { accountType: "ECN", pair: "CRYPTO", rebatePerLot: 3 },
  ],
  advantages: `${brokerId}:advantages`,
  disadvantages: `${brokerId}:disadvantages`,
  communityRating: {
    score: 4.2,
    quantityVote: 70,
    classifications: [
      { type: "Kecepatan Eksekusi", rate: 4.4 },
      { type: "Stabilitas Server", rate: 4.3 },
      { type: "Customer Support", rate: 4.0 },
    ],
  },
  faq: `${brokerId}:faqs`
}
