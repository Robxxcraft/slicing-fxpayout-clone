import type { FormWithdrawalRequest } from "@/types/withdrawal.type";
import { validateFloatFlexible } from "../formHelper";

export const checkValidWithdrawalForm = (vals: FormWithdrawalRequest) => {
  const errors: Partial<Record<keyof FormWithdrawalRequest, string>> = {};
  if (vals.amount.trim() === "") {
    errors.amount = "Jumlah penarikan tidak boleh kosong";
  } else if (!validateFloatFlexible(vals.amount)) {
    errors.amount = "Jumlah penarikan tidak valid";
  }
  
  return errors;
};