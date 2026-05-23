import type { StatusType } from "./status.type";

export type ResponseWithdrawalAPI = {
  id: number;
  user_id: number;
  bank_id: number | null;
  crypto_id: number | null;
  bank_name: string | null;
  bank_account_name: string | null;
  bank_account_number: string | null;
  crypto_network: string | null;
  crypto_token: string | null;
  crypto_wallet_address: string | null;
  amount_idr: number;
  amount_usd: number;
  currency: string;
  status: string;
  created_at: string;
  user: { full_name: string };
  bank: { 
    name: string, 
    account_name: string 
    account_number: string;
  } | null;
  crypto: {
    network: string;
    token: string;
    wallet_address: string;
  } | null;
};

// PENDING WITHDRAWAL
export type PendingWithdrawal = {
  withdrawalId: number;
  createdAt: string;
  method: string;
  walletAddress: string;
  currency: "USD" | "IDR";
  amount: number;
};

// HISTORY WITHDRAWAL
export type TransactionHistory = {
  withdrawal_id: number;
  created_at: string;
  method: string;
  wallet_address: string;
  currency: "USD" | "IDR";
  status: StatusType;
  amount: number;
};

// FORM REQUEST WITHDRAWAL
export type FormWithdrawalRequest = {
  amount: string;
};

// ADMIN MANAGEMENT
export type WithdrawalAdminManagement = {
  id: number;
  user_id: number;
  bank_id: number | null;
  method: "bank" | "crypto";
  bank_name: string;
  account_name: string;
  wallet_address: string;
  total: string;
  currency: "USD" | "IDR";
  status: StatusType;
  created_at: string;
};
