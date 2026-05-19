import React from "react";
import type { BankUser } from "@/types/bank.type";

type BankContextType = {
  banks: BankUser[],
  setBanks: React.Dispatch<React.SetStateAction<BankUser[]>>,
  fetchBank: () => Promise<BankUser[]>
};

export const BankContext = React.createContext<BankContextType | undefined>(undefined);
