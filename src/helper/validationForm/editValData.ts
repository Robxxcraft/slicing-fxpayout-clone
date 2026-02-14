import type { ValidationData } from "@/models/validationData";
import { validateOnlyNumber } from "../formHelper";

export const checkValidForm = (vals: ValidationData) => {
  const errors: Partial<Record<keyof ValidationData, string>> = {};
  if (!vals.full_name.trim()) errors.full_name = "Nama lengkap tidak boleh kosong";
  if (vals.email.trim() === "") {
    errors.email = "Email tidak boleh kosong";
  } else if (!vals.email.includes("@")) {
    errors.email = "Email tidak valid";
  }
  if (!vals.broker) errors.broker = "Broker harus dipilih";
  if (!vals.platform.trim()) errors.platform = "Nama akun tidak boleh kosong";
  
  if (!vals.trading_account_number.trim()) {
    errors.trading_account_number = "Nomor akun tidak boleh kosong";
  } else if (!validateOnlyNumber(vals.trading_account_number)) {
    errors.trading_account_number = "Nomor akun tidak valid";
  }
  if (!vals.phone_number.trim()) {
    errors.phone_number = "Nomor HP tidak boleh kosong";
  } else if (!validateOnlyNumber(vals.phone_number)) {
    errors.phone_number = "Nomor HP tidak valid";
  }

  if (!vals.rebate) errors.rebate = "Rebate harus dipilih";
  if (!vals.bank.trim()) errors.bank = "Nama bank tidak boleh kosong";
  if (!vals.bank_account_name.trim()) errors.bank_account_name = "Nama pemegang rekening tidak boleh kosong";
  
  if (!vals.bank_account_number.trim()) {
    errors.bank_account_number = "Nomor rekening tidak boleh kosong";
  } else if (!validateOnlyNumber(vals.bank_account_number)) {
    errors.bank_account_number = "Nomor rekening tidak valid";
  }

  return errors;
}