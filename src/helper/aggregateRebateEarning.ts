/* eslint-disable @typescript-eslint/no-explicit-any */
import { formattingFullDate } from "./formattingDate";

export const aggregateRebateByDate = (data: any[]) => {
  const result: Record<string, number> = {};  

  data.forEach((item) => {
    const date = formattingFullDate(item.date);
    const rebate = parseFloat(item.total_rebate);  

    if (!result[date]) result[date] = 0;
    result[date] += rebate;
  });  

  return result;
};

export const aggregateBrokerContribution = (data: any[]) => {
  const result: Record<string, number> = {};  

  data.forEach((item) => {
    const broker = item.broker.name;
    const rebate = parseFloat(item.total_rebate);  

    if (!result[broker]) result[broker] = 0;
    result[broker] += rebate;
  });  

  return result;
};
