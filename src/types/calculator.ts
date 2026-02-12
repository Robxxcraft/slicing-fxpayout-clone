export type FormState = {
  broker: string;
  accountType: string;
  pair: string;
  lots: string;
}

export type RebateResult = {
  estimate: number;
  rebatesPerLot: number;
}