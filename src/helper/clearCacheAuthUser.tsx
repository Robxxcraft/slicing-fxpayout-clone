import { removeLocalStorage } from "@/services/apiClient";

export const clearCacheAuthUser = () => {
  // admin card   
  removeLocalStorage("overview_admin");

  // trader rebate chart   
  removeLocalStorage("rebate_cache_7_days");
  removeLocalStorage("rebate_cache_30_days");
  removeLocalStorage("rebate_cache_90_days");
  // trader lifetime balance
  removeLocalStorage("lifetime_balance");

  // affiliator card trader overview
  removeLocalStorage("card_trader");
};
