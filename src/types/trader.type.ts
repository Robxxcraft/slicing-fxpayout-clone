import type { UserTier } from "./user.type";

export type TradersAdminManagement = {
  id: number;
  full_name: string;
  email: string;
  status: "pending" | "approved";
  created_at: string;
  total_balance: number;
  tier: UserTier;
};

export type ResponseTradersAdminManagement = {
  id: number;
  full_name: string;
  email: string;
  is_email_verified: boolean;
  created_at: string;
  total_balance: number;
  tier: string | null;
};
