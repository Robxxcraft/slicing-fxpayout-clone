import type { StatusType } from "./status.type";

export type BankUser = {
  id: number,
  bank: string;
  accountNumber: string;
  username: string;
  status: StatusType
};

export type BankFormDetail = {
  bank: string;
  accountNumber: string;
  username: string;
};

export type ResponseBankUser = {
  id: number;
  account_number: string;
  account_name: string;
  name: string;
  status: string;
};

// ADMIN BANK
export type BankAdminManagement = {
  id: number;
  name: string;
  account_name: string;
  account_number: string;
  status: StatusType;
  full_name: string;
  created_at: string;
};

export type ResponseBankAdminManagement = {
  id: number;
  name: string;
  account_name: string;
  account_number: string;
  status: string;
  created_at: string;
  user: {
    full_name: string;
  };
};