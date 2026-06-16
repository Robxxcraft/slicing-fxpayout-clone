import type { EnumPlatformBroker, RebateRange } from "@/types/databroker.type";

export const DEFAULT_PLATFORMS: EnumPlatformBroker[] = ["mt4","mt5","c_trader","pro_trader","trading_view","web_trader"];
export const DEFAULT_MIN_DEPOSIT: number = 100;
export const DEFAULT_REBATE: RebateRange = {
  start: 0,
  end: 50
};
