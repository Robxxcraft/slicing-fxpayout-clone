import type { FormState } from "@/types/calculator";

export const checkValidCalculator = (vals: FormState) => {
  const errors: Partial<Record<keyof FormState, string>> = {};
  
  const key = "calculatorpage:card.errors";
  if (!vals.broker) errors.broker = `${key}.brokerRequired`;
  if (!vals.accountType) errors.accountType = `${key}.accountTypeRequired`;
  if (!vals.pair) errors.pair = `${key}.pairRequired`;
  if (vals.lots.trim() === "") errors.lots = `${key}.lotsRequired`;
  
  return errors;
};
