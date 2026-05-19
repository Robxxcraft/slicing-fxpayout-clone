import type { StatusType } from "./status.type";

export interface ResponseRebateAPI {
  id: number;
  created_at: string;
  date: string;
  account_number: string;
  total_rebate: string;
  status: string;
  broker: { name: string }; 
}

// TRADER
export type TypeRebateTrader = {
  created_at: string;
  broker: string;
  account_number: string;
  rebate: number;
};

// ADMIN MANAGEMENT
export type RebateAdminManagement = {
  id: number;
  created_at: string;
  date: string;
  account_number: string;
  broker_name: string;
  total_rebate: number;
  status: StatusType;
};
