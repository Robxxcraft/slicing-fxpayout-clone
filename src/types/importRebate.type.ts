export type ImportRebateData = {
  broker: string;
  account_number: string;
  total_rebates: string;
  created_at: string;
};

export type ErrorImport = {
  message: string;
  count: number;
  detail: {
    row: number;
    message: string;
  }[];
};