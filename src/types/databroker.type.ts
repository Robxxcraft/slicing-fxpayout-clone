export type EnumBrokerCategory = "all" | "local" | "international" | "pofirm" | "crypto";
export type EnumSortingBroker = "recommendation" | "newest" | "name_asc" | "name_desc" | "lowest_rebate" | "highest_rebate";
export type EnumPlatformBroker = "mt4" | "mt5" | "c_trader" | "trading_view" | "web_trader" | "pro_trader" | "ios_android" | "other";
export type RebateRange = {
  start: number;
  end: number;
};
