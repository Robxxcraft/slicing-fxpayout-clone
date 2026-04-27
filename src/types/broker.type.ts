import type { StatusType } from "./status.type";

export type BrokerUser = {
  connectionId: number;
  brokerId: number;
  name: string;
  accountNumber: string;
  createdAt: string;
  totalRebate: number;
  status: StatusType;
};

export type FormConnectBroker = {
  broker: string;
  accountNumber: string;
  platform: string;
};

