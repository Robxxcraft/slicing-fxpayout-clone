export type ValidationData = {
  id: string;
  full_name: string;
  email: string;
  broker: string;
  platform: string;
  trading_account_number: string;
  phone_number: string;
  rebate: string;
  bank: string;
  bank_account_name: string;
  bank_account_number: string;
  created_at?: string;
  status?: "pending" | "approved" | "rejected"
}