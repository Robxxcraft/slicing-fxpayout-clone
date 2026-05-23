import { WalletContext } from "@/context/WalletContext";
import { useContext } from "react";

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within BankProvider");
  }
  return context;
};
