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

// ADMIN MANAGEMENT
export type BrokerAdminManagement = {
  connection_id: number;
  full_name: string;
  broker_name: string;
  account_number: string;
  platform: string;
  status: StatusType;
  created_at: string;
};

export type ResponseBrokerAdminManagement = {
  id: number;
  broker: { name: string };
  account_name: string;
  account_number: string;
  platform: string;
  status: string;
  created_at: string;
  user: { full_name: string }
};
