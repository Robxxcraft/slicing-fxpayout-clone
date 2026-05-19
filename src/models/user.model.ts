/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UserProfile, UserRole } from "@/types/user.type";

export const UserModel = {
  isIncompleteProfile(authUser: UserProfile) {
    return !authUser.gender || !authUser.fullName || !authUser.phoneNumber;
  },

  isAdmin(role: UserRole) {
    return role === "admin";
  },

  isAffiliator(role: UserRole) {
    return role === "affiliator";
  },

  isTrader(role: UserRole) {
    return role === "user";
  },

  mapAuthUser(respData: Record<string, any>): UserProfile {
    const isHasPassword = respData.has_password;
    return {
      id: respData.id,
      username: respData.username,
      fullName: respData.full_name,
      email: respData.email,
      role: respData.role,
      phoneNumber: respData.phone_number,
      gender: respData.gender,
      profile: respData.profile,
      isGoogle: respData.is_google,
      isVerified: respData.is_email_verified,
      tier: respData.tier ? respData.tier : "standard",
      hasPassword: isHasPassword,

      affiliatorCode: this.isAffiliator(respData.role) ? respData.referral_code : undefined,
      referralCode: this.isTrader(respData.role) ? respData.referral_code : undefined
    }
  }
};