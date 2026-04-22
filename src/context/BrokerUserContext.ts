import type { BrokerUser } from "@/types/broker.type";
import React from "react";

type BrokerUserContextType = {
  brokersUser: BrokerUser[],
  setBrokerUser: React.Dispatch<React.SetStateAction<BrokerUser[]>>,
  fetchBrokerUser: (force?: boolean) => Promise<void>
};

export const BrokerUserContext = React.createContext<BrokerUserContextType | undefined>(undefined);
