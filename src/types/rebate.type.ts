import type { RebateStatusType } from "./status.type";

export interface ResponseRebateAPI {
  id: number;
  created_at: string;
  date: string;
  account_number: string;
  total_rebate: string;
  status: string;
  broker: { name: string }; 
  trader_earning: string;
  affiliate_earning: string;
  internal_earning: string;
}

// TRADER
export type TypeRebateTrader = {
  created_at: string;
  broker: string;
  account_number: string;
  rebate: number;
  status: RebateStatusType;
};

// ADMIN MANAGEMENT
export type RebateAdminManagement = {
  id: number;
  created_at: string;
  date: string;
  account_number: string;
  broker_name: string;
  total_rebate: number;
  status: RebateStatusType;
  trader_earning: number;
  affiliate_earning: number;
  internal_earning: number;
};

export type ResponseChangeStatusRebate = {
  message: string;
  total: string;
  successCount: number;
  failedCount: number;
  idsSuccess: number[];
  detailFailed: {
    id: number;
    error: string;
  }[];
}
