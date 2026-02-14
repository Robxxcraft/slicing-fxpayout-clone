import type { FormValidation } from "@/types/validationForm";
import { validateOnlyNumber } from "../formHelper";

export const checkValidFormValidation = (vals: FormValidation) => {
  const errors: Partial<Record<keyof FormValidation, string>> = {};
  const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!vals.broker) errors.broker = "Broker harus dipilih";
  if (!vals.identityUsername.trim()) errors.identityUsername = "Nama lengkap tidak boleh kosong";
  if (vals.email.trim() === "") {
    errors.email = "Email tidak boleh kosong";
  } else if (!emailRegx.test(vals.email)) {
    errors.email = "Email tidak valid";
  }
  
  if (!vals.accountNumber.trim()) {
    errors.accountNumber = "Nomor akun tidak boleh kosong";
  } else if (!validateOnlyNumber(vals.accountNumber)) {
    errors.accountNumber = "Nomor akun tidak valid";
  }

  if (!vals.platform) errors.platform = "Platform harus dipilih";

  if (!vals.handphoneNumber.trim()) {
    errors.handphoneNumber = "Nomor HP tidak boleh kosong";
  } else if (!validateOnlyNumber(vals.handphoneNumber)) {
    errors.handphoneNumber = "Nomor HP tidak valid";
  }

  return errors;
};
