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
  brokerCategory: string;
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
export type RebateProgramType = string | {
  pair: string;
  estimate: number | {
    min: number;
    max: number;
  }
}[];
export type CommunityRatingStruc = {
  score: number | {
    min: number;
    max: number;
  };
  quantityVote: number;
  classifications?: {
    type: string;
    rate: number;
  }[],
  reviewHighlights?: string[]
}
export type FaqStructure = {
  question: string;
  answer: string;
}
export type AccountTypeStruc = {
  name: string;
  level: string;
  features: string[],
  notes?: string;
}

// BROKER STRUC
export type BrokerStruc = { 
  name: string;
  profileImage: string;
  registerUrl: string;
  websiteUrl: string;
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
  keyAdvantages: string[];
  depositWithdrawal: {
    paymentMethods: PaymentMethod[];
    platforms: Platform[];
  },
  rebateProgram: RebateProgramType,
  advantages: string[];
  disadvantages: string[];
  communityRating: CommunityRatingStruc;
  faq: FaqStructure[];
}