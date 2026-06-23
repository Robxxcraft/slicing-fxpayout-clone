import type { UserTier } from "./user.type";

export type ContentTier = {
  title: string;
  earning: string;
  condition: string;
};
export type TypeTemplateTier = Record<UserTier, ContentTier>;