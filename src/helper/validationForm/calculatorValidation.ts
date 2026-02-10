import type { FormState } from "@/types/calculator";

export const checkValidCalculator = (vals: FormState) => {
  const errors: Partial<Record<keyof FormState, string>> = {};
  
  if (!vals.broker) errors.broker = "Broker harus dipilih";
  if (!vals.accountType) errors.accountType = "Tipe Akun harus dipilih";
  if (!vals.pair) errors.pair = "Pair harus dipilih";
  if (vals.lots.trim() === "") errors.lots = "Jumlah lots tidak boleh kosong";
  
  return errors;
};
