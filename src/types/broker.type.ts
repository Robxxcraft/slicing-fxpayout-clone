import type { StatusType } from "./status.type";

export type BrokerUser = {
  connectionId: number;
  brokerId: number;
  name: string;
  accountNumber: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
  status: StatusType;
};

export type FormConnectBroker = {
  broker: string;
  accountNumber: string;
  platform: string;
};

