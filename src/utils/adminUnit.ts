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

export type StatusImport = "UPLOAD" | "ERROR" | "SUCCESS" | null;