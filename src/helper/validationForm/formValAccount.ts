import type { FormValidation } from "@/types/validationForm";
import { validateOnlyNumber } from "../formHelper";

export const checkValidFormValidation = (vals: FormValidation) => {
  const errors: Partial<Record<keyof FormValidation, string>> = {};
  const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const key = "validationpage:card.validationForm.errors";
  if (!vals.broker) errors.broker = `${key}.brokerRequired`;
  if (!vals.identityUsername.trim()) errors.identityUsername = `${key}.usernameRequired`;
  if (vals.email.trim() === "") {
    errors.email = `${key}.emailRequired`;
  } else if (!emailRegx.test(vals.email)) {
    errors.email = `${key}.emailInvalid`;
  }
  
  if (!vals.accountNumber.trim()) {
    errors.accountNumber = `${key}.accountNumberRequired`;
  } else if (!validateOnlyNumber(vals.accountNumber)) {
    errors.accountNumber = `${key}.accountNumberInvalid`;
  }

  if (!vals.platform) errors.platform = `${key}.platformRequired`;

  if (!vals.handphoneNumber.trim()) {
    errors.handphoneNumber = `${key}.handphoneNumberRequired`;
  } else if (!validateOnlyNumber(vals.handphoneNumber)) {
    errors.handphoneNumber = `${key}.handphoneNumberInvalid`;
  }

  return errors;
};
