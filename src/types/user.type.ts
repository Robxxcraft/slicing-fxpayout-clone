export type UserProfile = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  hasPassword: boolean;
  role: UserRole;
  phoneNumber: string;
  gender: UserGender;
  profile: string;
  isGoogle: boolean;
  isVerified: boolean;
  tier: UserTier;
  referralCode?: string; // khusus trader
  affiliatorCode?: string; // khusus affiliator
};

export type UserRole = "admin" | "user" | "affiliator";
export type UserTier = "standard" | "active" | "vip";
export type UserGender = "male" | "female";
export type UserBalance = {
  userId: number;
  balance: number;
  currency: "USD" | "IDR";
};
