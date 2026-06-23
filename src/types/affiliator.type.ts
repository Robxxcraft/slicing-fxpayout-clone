import type { UserTier } from "./user.type";

export type AffiliatorAdminManagement = {
  id: number;
  full_name: string;
  email: string;
  status: "pending" | "approved";
  created_at: string;
  total_referred: number;
  tier: UserTier;
};

export type ResponseAffiliatorManagement = {
  id: number;
  full_name: string;
  email: string;
  is_email_verified: boolean;
  created_at: string;
  total_referred: number;
  tier: string | null;
};
