import type { UserBalance } from "@/types/user.type";
import React from "react";

type BalanceContextType = [
  UserBalance | null,
  React.Dispatch<React.SetStateAction<UserBalance | null>>,
];

const BalanceContext = React.createContext<BalanceContextType>([null, () => {}]);
export const BalanceProvider = BalanceContext.Provider;

export default BalanceContext;
