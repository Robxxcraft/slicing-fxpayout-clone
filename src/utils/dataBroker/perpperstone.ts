import { instrumentsKey, levelKey, platformsKey, regulationsKey, timeKey, titleKey, type BrokerRanking, type BrokerStruc } from "./typeDetailBroker";

const brokerName = "Pepperstone";
const brokerId = "pepperstone";
const brokerFounded = "2010";
const brokerRanking: BrokerRanking = {
  tier: "1",
  title: "Global ECN Broker"
};
const minDeposit = 0;
const regionsWebsite = [
  { region: "Global", url: "https://trk.pepperstonepartners.com/aff_c?offer_id=367&aff_id=42191" },
];


export const pepperstoneDetail: BrokerStruc = {
  id_ib: "42191",
  contactSupport: "support@pepperstone.com",
  name: brokerName,
  profileImage: "pepperstone.webp",
  registerUrl: regionsWebsite,
  websiteUrl: regionsWebsite,
  detailUrl: brokerId,
  scheduleUrl: "/schedule",
  statusRebate: "Manual",
  ranking: brokerRanking,
  badges: [`${titleKey}.tier_1`, `${titleKey}.ecn_broker`, `${titleKey}.raw_spread`, `${titleKey}.ultra_fast_execution`],
  overallScore: {
    rate: 4.5,
    communityUrl: "https://www.trustpilot.com/review/pepperstone.com",
  },
  detailDescription: `${brokerId}:description`,
  cardDescription: "Broker regulasi top dengan eksekusi sangat cepat dan kondisi raw spread.",
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
    brokerCategory: [`${titleKey}.multi_regulated`, `${titleKey}.ecn_ndd`],
    regulations: [
      { name: "ASIC", country: `${regulationsKey}.asic` },
      { name: "FCA", country: `${regulationsKey}.fca` },
      { name: "DFSA", country: `${regulationsKey}.dfsa` },
      { name: "BaFin", country: `${regulationsKey}.bafin` },
      { name: "CySEC", country: `${regulationsKey}.cysec` },
      { name: "SCB", country: `${regulationsKey}.scb` },
    ]
  },
  summary: {
    minDeposit: minDeposit,
    types: ["Standard", "Razor", "Pro"],
    spread: `${brokerId}:summary.spread`,
    commission: `${brokerId}:summary.commission`,
    leverage: `${brokerId}:summary.leverage`,
    execution: `${brokerId}:summary.execution`,
    instruments: [`${instrumentsKey}:forex`, `${instrumentsKey}:commodity`, `${instrumentsKey}:indices`, `${instrumentsKey}:stocks_cfd`, `${instrumentsKey}:crypto_cfd`],
    depositWithdrawal: `${brokerId}:summary.depositWithdrawal`
  },
  accountTypes: [
    {
        name: "Standard Account",
        level: `${levelKey}:general`,
        features: `${brokerId}:accountTypes.0`  
    },
    {
        name: "Razor Account",
        level: `${levelKey}:trader`,
        features: `${brokerId}:accountTypes.1`  
    },
    {
        name: "Pro Account",
        level: `${levelKey}:pro`,
        features: `${brokerId}:accountTypes.2`  
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Razor",
          spread: "0.0 – 0.1"
        },
        {
          accountType: "Standard",
          spread: "±1.0"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Razor",
          spread: "0.1 – 0.3"
        },
        {
          accountType: "Standard",
          spread: "±0.7 – 1.2"
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
          deposit: `${timeKey}.instant`,
          withdraw: `${timeKey}.instant`
        }, 
        fee: "$0" 
      },
      { 
        method: "common:methods.bank_transfer", 
        time: {
          deposit: `${timeKey}.days_1_3_work`,
          withdraw: `${timeKey}.days_1_3_work`
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
      },
    ],
    platforms: [
      { key: "mt4", username: `${platformsKey}.mt4`, icon: "meta-trader.webp" },
      { key: "mt5", username:`${platformsKey}.mt5`, icon: "meta-trader.webp" },
      { key: "c_trader", username: `${platformsKey}.c_trader`, icon: "c-trader.webp" },
      { key: "trading_view", username: `${platformsKey}.trading_view`, icon: "trading-view.webp" },
      { key: "web_trader", username: `${platformsKey}.web_trading`, icon: "pepperstone.webp" },
      { key: "ios_android", username: `${platformsKey}.ios_android`, icon: "pepperstone.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 2.40 },
    { pair: "XAU/USD", estimate: 2.40 },
    { pair: "CRYPTO", estimate: 2.40 },
  ],
  rebateRates: [
    { accountType: "Standard", pair: "XAU/USD", rebatePerLot: 2.40 },
    { accountType: "Standard", pair: "EUR/USD", rebatePerLot: 2.40 },
    { accountType: "Standard", pair: "CRYPTO", rebatePerLot: 2.40 },
  ],
  advantages: `${brokerId}:advantages`,
  disadvantages: `${brokerId}:disadvantages`,
  communityRating: {
    score: 4.5,
    quantityVote: 3.199,
    classifications: [
      { type: `${brokerId}:classifications.0`, rate: 5 },
      { type: `${brokerId}:classifications.1`, rate: 4.5 },
      { type: `${brokerId}:classifications.2`, rate: 4.5 },
    ],
  },
  faq: `${brokerId}:faqs`
}