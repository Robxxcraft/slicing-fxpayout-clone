const brokerDetailPageKey = "brokerdetailpage:data";
export const titleKey = `${brokerDetailPageKey}.title`;
export const regulationsKey = `${brokerDetailPageKey}.regulations`;
export const instrumentsKey = `${brokerDetailPageKey}.instruments`;
export const levelKey = `${brokerDetailPageKey}.level`;
export const timeKey = `${brokerDetailPageKey}.time`;
export const feeKey = `${brokerDetailPageKey}.fee`;
export const platformsKey = `${brokerDetailPageKey}.platforms`;

export type BrokerRanking = {
  tier: string;
  title: string;
}
export type OverallScore = {
  rate: number;
  communityUrl: string;
}
export type Specification = {
  yearFounded: string;
  minDeposit: string;
  leverage: string | string[];
  spread: string | string[];
}
export type ProfileDetailBroker = {
  name: string;
  slogan?: string;
  entity?: string;
  group?: string;
  ranking: BrokerRanking;
  yearFounded: string;
  brokerCategory: string | string[];
  model?: string;
  totalUser?: string;
  totalInstrument?: string;
  regulations: RegulationBroker[];
}
export type RegulationBroker = {
  name: string;
  country: string;
}
export type SummaryBroker = {
  minDeposit: string | string[];
  types: string[];
  spread: string | string[];
  commission: string;
  leverage: string | string[];
  execution: string;
  instruments: string[];
  depositWithdrawal: string;
}
export type SpreadStructure = {
  pair: string;
  icon: string;
  spreads: {
    accountType: string;
    spread: string;
  }[]
}
export type PaymentMethod = {
  method: string;
  time: {
    deposit: string;
    withdraw: string;
  };
  fee: string;
}
export type Platform = {
  username: string;
  icon: string;
}
export type RebateProgramType = {
  pair: string;
  estimate: number | {
    min: number;
    max: number;
  }
}[];
export type CommunityRatingStruc = {
  score: number;
  quantityVote: number;
  classifications?: {
    type: string;
    rate: number;
  }[];
  reviewHighlights?: string[];
}
export type FaqStructure = {
  question: string;
  answer: string;
}
export type AccountTypeStruc = {
  name: string;
  level: string;
  features: string,
  notes?: string;
}

export type RebateRate = {
  accountType: string;   
  pair: string;          
  rebatePerLot: number; 
};

// BROKER STRUC
export type BrokerStruc = { 
  id_ib: string;
  name: string;
  profileImage: string;
  contactSupport: string;
  registerUrl: string;
  websiteUrl: string;
  scheduleUrl?: string;
  statusRebate: "Auto" | "Manual";
  detailUrl: string;
  ranking: BrokerRanking;
  badges: string[];
  overallScore: OverallScore;
  detailDescription: string;
  cardDescription: string;
  specification: Specification;
  profile: ProfileDetailBroker;
  summary: SummaryBroker;
  accountTypes: AccountTypeStruc[];
  tradingSpreads: SpreadStructure[];
  keyAdvantages: string;
  depositWithdrawal: {
    paymentMethods: PaymentMethod[];
    platforms: Platform[];
  },
  rebateProgram: RebateProgramType,
  rebateRates: RebateRate[];
  advantages: string;
  disadvantages: string;
  communityRating: CommunityRatingStruc;
  faq: string;
}