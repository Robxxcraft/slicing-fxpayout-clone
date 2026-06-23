import { feeKey, instrumentsKey, levelKey, platformsKey, regulationsKey, timeKey, titleKey, type BrokerRanking, type BrokerStruc } from "./typeDetailBroker";

const brokerName = "Finex";
const brokerId = "finex";
const brokerFounded = "2012";
const brokerRanking: BrokerRanking = {
  tier: "Local/Regional",
  title: "Broker (Indonesia-Centric)"
};
const minDeposit = 10;
const regionsWebsite = [
  { region: "Indonesia", url: "https://track.finex.co.id/click?pid=5759&offer_id=12" },
];

export const finexDetail: BrokerStruc = {
  id_ib: "5759",
  contactSupport: "support@finex.com",
  name: brokerName,
  category: "local",
  profileImage: "finex.webp",
  registerUrl: regionsWebsite,
  websiteUrl: regionsWebsite,
  detailUrl: brokerId,
  scheduleUrl: "/schedule",
  statusRebate: "Manual",
  ranking: brokerRanking,
  badges: [`${titleKey}.tier_local`, `${titleKey}.regulated_broker`, `${titleKey}.low_deposit`, `${titleKey}.beginner_friendly`],
  overallScore: {
    rate: 4.3,
    communityUrl: "https://www.trustpilot.com/review/finex.co.id",
  },
  detailDescription: `${brokerId}:description`,
  cardDescription: "Broker global dengan fokus pada keamanan & eksekusi stabil.",
  specification: {
    yearFounded: brokerFounded,
    minDeposit: minDeposit,
    leverage: `${brokerId}:specification.leverage`,
    spread: `${brokerId}:specification.spread`,
  },
  profile: {
    name: `${brokerId}:profile.name`,
    slogan: `${brokerId}:profile.slogan`,
    ranking: brokerRanking,
    yearFounded: brokerFounded,
    brokerCategory: [`${titleKey}.forex_cfd`, `${titleKey}.indonesian_regulation`],
    regulations: [
      { name: "BAPPEBTI", country: `${regulationsKey}.finex_bappebti` },
    ]
  },
  summary: {
    minDeposit: minDeposit,
    types: ["Single Live Account"],
    spread: `${brokerId}:summary.spread`,
    commission: `${brokerId}:summary.commission`,
    leverage: `${brokerId}:summary.leverage`,
    execution: `${brokerId}:summary.execution`,
    instruments: [`${instrumentsKey}:forex`, `${instrumentsKey}:indices`, `${instrumentsKey}:metal`, `${instrumentsKey}:energy`, `${instrumentsKey}:stocks_cfd`],
    depositWithdrawal: `${brokerId}:summary.depositWithdrawal`
  },
  accountTypes: [
    {
        name: "Single Live Account",
        level: `${levelKey}:general`,
        features: `${brokerId}:accountTypes.0` 
    },
  ],
  tradingSpreads: [
    {
      icon: "eur-usd.svg",
      pair: "EUR/USD",
      spreads: [
        {
          accountType: "Standard",
          spread: "±0.5 – 1.0 pips (typical)"
        },
      ]
    },
    {
      icon: "xau-usd.svg",
      pair: "XAU/USD",
      spreads: [
        {
          accountType: "Standard",
          spread: `${brokerId}:spread.0`
        },
      ]
    },
    {
      icon: "aud-usd.svg",
      pair: "AUD/USD",
      spreads: [
        {
          accountType: "Standard",
          spread: "±0.7 – 1.2 pips (typical)"
        },
      ]
    }
  ],
  keyAdvantages: `${brokerId}:keyAdvantages`,
  depositWithdrawal: {
    paymentMethods: [
      { 
        method: "common:methods.bank_transfer_usd_idr", 
        time: {
          deposit: `${timeKey}.instant`,
          withdraw: `${timeKey}.around_20m_2h_80percent`
        }, 
        fee: `${feeKey}.zero_broker`
      },
      { 
        method: "common:methods.e_wallet", 
        time: {
          deposit: `${timeKey}.instant`,
          withdraw: `${timeKey}.around_20m_2h_80percent`
        }, 
        fee: `${feeKey}.zero_broker`
      },
      { 
        method: "common:methods.debit_credit_card", 
        time: {
          deposit: `${timeKey}.instant`,
          withdraw: `${timeKey}.around_20m_2h_80percent`
        }, 
        fee: `${feeKey}.zero_broker`
      },
    ],
    platforms: [
      { key: "mt5", username: `${platformsKey}.mt5`, icon: "meta-trader.webp" },
      { key: "web_trader", username: `${platformsKey}.web_trading`, icon: "finex.webp" },
      { key: "ios_android", username: `${platformsKey}.ios_android`, icon: "finex.webp" },
    ]
  },
  rebateProgram: [
    { pair: "EUR/USD", estimate: 3 },
    { pair: "XAU/USD", estimate: 5 },
    { pair: "AUD/USD", estimate: 3 },
  ],
  rebateRates: [
    { accountType: "Standard", pair: "XAU/USD", rebatePerLot: 3 },
    { accountType: "Standard", pair: "EUR/USD", rebatePerLot: 2.1 },
    { accountType: "Standard", pair: "CRYPTO", rebatePerLot: 2.1 },
  ],
  advantages: `${brokerId}:advantages`,
  disadvantages: `${brokerId}:disadvantages`,
  communityRating: {
    score: 4.3,
    quantityVote: 398,
    reviewHighlights: [`${brokerId}:reviewHighlights.0`, `${brokerId}:reviewHighlights.1`, `${brokerId}:reviewHighlights.2`, `${brokerId}:reviewHighlights.3`],
  },
  faq: `${brokerId}:faqs`
}