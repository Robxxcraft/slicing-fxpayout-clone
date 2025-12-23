export type BrokerRanking = {
  tier: string | null;
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
  spread: string;
}
export type ProfileDetailBroker = {
  name: string;
  slogan: string;
  ranking: BrokerRanking;
  yearFounded: string;
  brokerCategory: string;
  regulations: RegulationBroker[];
}
export type RegulationBroker = {
  name: string;
  country: string;
}
export type SummaryBroker = {
  minDeposit: string | string[];
  type: string;
  spread: string;
  commission: string;
  leverage: string | string[];
  execution: string;
  instruments: string;
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
  time: string | string[];
  fee: string;
}
export type Platform = {
  username: string;
  icon: string;
}
export type CommunityRatingStruc = {
  score: number;
  quantityVote: number;
  withdrawalSpeed: number;
  stability: number;
  customerSupport: number;
}
export type FaqStructure = {
  question: string;
  answer: string;
}
export type AccountTypeStruc = {
  name: string;
  level: string;
  features: string[]
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
  rebateProgram: {
    pair: string;
    estimate: number
  }[],
  advantages: string[];
  disadvantages: string[];
  communityRating: CommunityRatingStruc;
  faq: FaqStructure[];
}