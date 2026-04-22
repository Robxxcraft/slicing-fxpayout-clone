import type { BankFormDetail } from "@/types/bank.type";
import { validateOnlyNumber } from "../formHelper";

export const checkValidBankForm = (vals: BankFormDetail) => {
  const errors: Partial<Record<keyof BankFormDetail, string>> = {};
  if (!vals.bank.trim()) errors.bank = "Bank tidak boleh kosong";
  
  if (!vals.accountNumber.trim()) {
    errors.accountNumber = "Nomor rekening tidak boleh kosong";
  } else if (!validateOnlyNumber(vals.accountNumber)) {
    errors.accountNumber = "Format nomor rekening tidak valid";
  }

  if (!vals.username.trim()) {
    errors.username = "Nama pemegang rekening tidak boleh kosong";
  }

  return errors;
};