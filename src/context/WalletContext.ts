import React from "react";
import type { WalletUser } from "@/types/wallet.type";

type WalletContextType = {
  wallets: WalletUser[],
  setWallets: React.Dispatch<React.SetStateAction<WalletUser[]>>,
  fetchWallet: () => Promise<WalletUser[]>
};

export const WalletContext = React.createContext<WalletContextType | undefined>(undefined);
