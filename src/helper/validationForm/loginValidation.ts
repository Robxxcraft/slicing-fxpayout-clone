import type { FormLogin } from "@/types/login";

export const checkValidLoginInput = (vals: FormLogin) => {
  const errors: Partial<Record<keyof FormLogin, string>> = {};
  if (vals.username.trim() === "") errors.username = "Username tidak boleh kosong";
  if (vals.password.trim() === "") errors.password = "Password tidak boleh kosong";

  return errors;
};
