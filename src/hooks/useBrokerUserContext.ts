import { BrokerUserContext } from "@/context/BrokerUserContext";
import { useContext } from "react";

export const useBrokerUserContext = () => {
  const context = useContext(BrokerUserContext);
  if (!context) {
    throw new Error("useBrokerUserContext must be used within BankProvider");
  }
  return context;
};