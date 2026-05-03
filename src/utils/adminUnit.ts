export const HEADER_MAPPING: Record<string, string> = {
  "Nama Lengkap": "full_name",
  "Email": "email",
  "Broker": "broker",
  "Platform Trading": "platform",
  "Nomor Akun": "trading_account_number",
  "No HP": "phone_number",
  "Rebate": "rebate",
  "Bank": "bank",
  "Nama Rekening": "bank_account_name",
  "Nomor Rekening": "bank_account_number",
  "Tanggal": "created_at",
  "Status": "status"
};

export const HEADER_REBATE_IMPORT: Record<string, string> = {
  "Broker": "broker",	
  "Nomor Akun": "account_number",
  "Total Rebate": "total_rebates",
  "Tanggal": "created_at"
};

export type StatusImport = "UPLOAD" | "ERROR" | "SUCCESS" | null;