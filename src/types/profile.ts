import type { UserRole } from "@/types/user.type";

export type InputEditProfil = {
  username: string;
  role: UserRole
}

export type InputChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmationPassword: string;
}

export type LoadingState = {
  isLoad: boolean;
  place: "" | "change-password" | "edit-profile";
}