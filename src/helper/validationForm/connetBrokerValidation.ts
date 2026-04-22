import type { FormConnectBroker } from "@/types/broker.type";
import { validateOnlyNumber } from "../formHelper";

export const checkValidFormConnectBroker = (vals: FormConnectBroker) => {
  const errors: Partial<Record<keyof FormConnectBroker, string>> = {};
  if (!vals.broker) errors.broker = "Broker harus dipilih";
  
  if (!vals.accountNumber.trim()) {
    errors.accountNumber = "Nomor akun trading tidak boleh kosong";
  } else if (!validateOnlyNumber(vals.accountNumber)) {
    errors.accountNumber = "Format nomor akun trading tidak valid";
  }

  if (!vals.platform) {
    errors.platform = "Platform trading harus dipilih";
  } else if (!["MT4", "MT5"].includes(vals.platform)) {
    errors.platform = "Pilihan platform trading tidak valid";
  };

  return errors;
};