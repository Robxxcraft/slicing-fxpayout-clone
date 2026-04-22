import React from "react";
import type { BankUser } from "@/types/bank.type";

type BankContextType = {
  bank: BankUser | null,
  setBank: React.Dispatch<React.SetStateAction<BankUser | null>>,
  fetchBank: () => Promise<void>
};

export const BankContext = React.createContext<BankContextType | undefined>(undefined);
