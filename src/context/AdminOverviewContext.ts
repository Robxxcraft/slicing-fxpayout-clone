import React from "react";

export type DataAdminOverview = {
  pendingWithdrawals: number;
  totalWithdrawals: number;
  pendingBanks: number;
  totalBanks: number;
  pendingRebates: number;
  totalRebates: number;
  pendingBrokers: number;
  totalBrokers: number;
  pendingTraders: number;
  traders: number;
  pendingAffiliators: number;
  affiliators: number;
  totalCommission: number;
  totalInternalCommisions: number;
};

type AdminOverviewContext = {
  dataAdminOverview: DataAdminOverview | null;
  setDataAdminOverview: React.Dispatch<React.SetStateAction<DataAdminOverview | null>>;
  fetchDataAdminOverview: (
    force?: boolean
    ) => Promise<{error: boolean; message: string} | undefined>;
};

export const AdminOverviewContext = React.createContext<AdminOverviewContext | undefined>(undefined);
