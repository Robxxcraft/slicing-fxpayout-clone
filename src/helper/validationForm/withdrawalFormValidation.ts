import type { FormWithdrawalRequest } from "@/pages/dashboard/common/WithdrawalRequestPage";
import { validateFloatFlexible } from "../formHelper";

export const checkValidWithdrawalForm = (vals: FormWithdrawalRequest) => {
  const errors: Partial<Record<keyof FormWithdrawalRequest, string>> = {};
  if (vals.method.trim() === "") {
    errors.method = "Metode penarikan harus dipilih";
  } 
  if (vals.method === "crypto" && vals.walletAddress.trim() === "") {
    errors.walletAddress = "Alamat wallet tidak boleh kosong";
  } 
  if (vals.amount.trim() === "") {
    errors.amount = "Jumlah penarikan tidak boleh kosong";
  } else if (!validateFloatFlexible(vals.amount)) {
    errors.amount = "Jumlah penarikan tidak valid";
  }

  return errors;
};