import type { FormWithdrawalRequest } from "@/types/withdrawal.type";
import { validateFloatFlexible } from "../formHelper";

type CheckValidationWithdrawalFormProps = {
  validation: (schema: (vals: FormWithdrawalRequest) => Partial<Record<keyof FormWithdrawalRequest, string>>) => {
    isValidate: boolean;
    errorInput: string;
  };
  bank: string;
}

export const checkValidWithdrawalForm = ({
  validation,
  bank
}: CheckValidationWithdrawalFormProps) => {
  const resValidation = validation((vals: FormWithdrawalRequest) => {
    const errors: Partial<Record<keyof FormWithdrawalRequest, string>> = {};
    if (bank === "crypto" && vals.walletAddress.trim() === "") {
      errors.walletAddress = "Alamat wallet tidak boleh kosong";
    } 
    if (vals.amount.trim() === "") {
      errors.amount = "Jumlah penarikan tidak boleh kosong";
    } else if (!validateFloatFlexible(vals.amount)) {
      errors.amount = "Jumlah penarikan tidak valid";
    }
    
    return errors;
  });

  return resValidation;
};
