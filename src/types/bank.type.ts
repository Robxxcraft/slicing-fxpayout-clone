export type BankUser = {
  id: number,
  bank: string;
  accountNumber: string;
  username: string;
  status: "pending" | "approved" | "rejected"
}

export type BankFormDetail = {
  bank: string;
  accountNumber: string;
  username: string;
}