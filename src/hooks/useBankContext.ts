import { BankContext } from "@/context/BankContext";
import { useContext } from "react";

export const useBankContext = () => {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error("useBankContext must be used within BankProvider");
  }
  return context;
};
