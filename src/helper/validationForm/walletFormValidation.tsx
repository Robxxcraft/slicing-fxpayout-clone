import type { BankFormDetail, CryptoFormDetail } from "@/types/wallet.type";
import { validateOnlyNumber } from "../formHelper";

export const checkValidBankForm = (vals: BankFormDetail) => {
  const errors: Partial<Record<keyof BankFormDetail, string>> = {};
  if (vals.bank === undefined || !vals.bank.trim()) errors.bank = "Bank tidak boleh kosong";
  
  if (!vals.accountNumber.trim()) {
    errors.accountNumber = "Nomor rekening tidak boleh kosong";
  } else if (!validateOnlyNumber(vals.accountNumber)) {
    errors.accountNumber = "Format nomor rekening tidak valid";
  }

  if (vals.username === undefined || !vals.username.trim()) {
    errors.username = "Nama pemegang rekening tidak boleh kosong";
  }

  return errors;
};

export const checkValidCryptoForm = (vals: CryptoFormDetail) => {
  const errors: Partial<Record<keyof CryptoFormDetail, string>> = {};
  if (vals.token === undefined || !vals.token.trim()) errors.token = "token tidak boleh kosong";
  if (vals.network === undefined || !vals.network.trim()) errors.network = "Jaringan tidak boleh kosong";
  
  if (!vals.accountNumber.trim()) {
    errors.accountNumber = "Nomor rekening tidak boleh kosong";
  }

  return errors;
};