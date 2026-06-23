import type { StatusType } from "./status.type";

export interface BankFormDetail {
  bank?: string;
  accountNumber: string;
  username?: string;
}

export interface CryptoFormDetail {
  token?: "USDT",
  network?: "BNB",
  accountNumber: string;
};

type BankUser = {
  method: "bank";
  id: number;
  status: StatusType;
  data: BankFormDetail;
};
type CryptoUser = {
  method: "crypto";
  id: number;
  status: StatusType;
  data: CryptoFormDetail;
}

export type WalletUser =
  | BankUser
  | CryptoUser;

export interface WalletFormDetail extends BankFormDetail, CryptoFormDetail {
  method: "bank" | "crypto";
};

export type ResponseBankUser = {
  id: number;
  account_number: string;
  account_name: string;
  name: string;
  status: string;
};
export type ResponseCryptoUser = {
  id: number;
  wallet_address: string;
  token: string;
  network: string;
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

// ADMIN CRYPTO
export type CryptoAdminManagement = {
  id: number;
  token: string;
  network: string;
  wallet_address: string;
  full_name: string;
  created_at: string;
};

export type ResponseCryptoAdminManagement = {
  id: number;
  wallet_address: string;
  created_at: string;
  user: {
    full_name: string;
  };
  token: string;
  network: string;
};

export type WalletAdminManagement =
  | BankAdminManagement
  | CryptoAdminManagement;
