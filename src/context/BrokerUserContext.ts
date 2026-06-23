import type { BrokerUser } from "@/types/broker.type";
import type { MetaPage } from "@/types/metapage.type";
import type { StatusType } from "@/types/status.type";
import React from "react";

type BrokerUserContextType = {
  brokersUser: BrokerUser[];
  setBrokerUser: React.Dispatch<React.SetStateAction<BrokerUser[]>>;
  fetchBrokerUser: (
    force?: boolean,
    filters?: {
      page?: number;
      limit?: number;
      query?: string;
      status?: StatusType;
    }) => Promise<{error: boolean; message: string} | undefined>;
  metaPage: MetaPage
};

export const BrokerUserContext = React.createContext<BrokerUserContextType | undefined>(undefined);
