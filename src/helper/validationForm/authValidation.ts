import type { FormLogin, FormRegister, FormUpdateProfile } from "@/types/auth.type";
import { validateOnlyNumber, validateValidEmail } from "../formHelper";
import type { FormChangePassword } from "@/pages/dashboard/common/ChangePasswordPage";

export const checkValidLoginInput = (vals: FormLogin) => {
  const errors: Partial<Record<keyof FormLogin, string>> = {};
  if (vals.email.trim() === "") {
    errors.email = "Email tidak boleh kosong";
  } else if (!validateValidEmail(vals.email)) {
    errors.email = "Format email tidak valid";
  }
  if (vals.password.trim() === "") errors.password = "Password tidak boleh kosong";

  return errors;
};

export const checkValidRegisterInput = (vals: FormRegister) => {
  const errors: Partial<Record<keyof FormRegister, string>> = {};
  if (vals.username.trim() === "") {
    errors.username = "Username tidak boleh kosong";
  } else if (vals.username.includes(" ")) {
    errors.username = "Username tidak boleh mengandung karakter spasi";
  } else if (vals.username.trim().length < 4 && vals.username.trim().length > 20) {
    errors.username = "Username harus terdiri dari 4 sampai 20 karakter";
  } 
  if (vals.email.trim() === "") {
    errors.email = "Email tidak boleh kosong";
  } else if (!validateValidEmail(vals.email)) {
    errors.email = "Format email tidak valid";
  }
  if (vals.password === "") {
    errors.password = "Password tidak boleh kosong";
  } else if (vals.password.length < 8) {
    errors.password = "Password minimal terdiri dari 8 karakter";
  }
  if (vals.password !== vals.password2) {
    errors.password2 = "Konfirmasi password tidak cocok dengan password di atas";
  }

  return errors;
};

export const checkValidProfileRegister = (vals: FormUpdateProfile) => {
  const errors: Partial<Record<keyof FormUpdateProfile, string>> = {};
  if (vals.username.trim() === "") {
    errors.username = "Username tidak boleh kosong";
  } else if (vals.username.includes(" ")) {
    errors.username = "Username tidak boleh mengandung karakter spasi";
  } else if (vals.username.trim().length < 4 && vals.username.trim().length > 20) {
    errors.username = "Username harus terdiri dari 4 sampai 20 karakter";
  } 
  if (vals.fullname.trim() === "") {
    errors.fullname = "Nama lengkap tidak boleh kosong";
  } else if (vals.fullname.length >= 100) {
    errors.fullname = "Nama lengkap tidak boleh lebih dari 100 karakter";
  }
  if (vals.gender !== "male" && vals.gender !== "female") {
    errors.gender = "Pilihan jenis kelamin tidak valid";
  }  
  if (vals.phoneNumber.trim() === "") {
    errors.phoneNumber = "Nomor telepon tidak boleh kosong";
  } else if (!validateOnlyNumber(vals.phoneNumber)) {
    errors.phoneNumber = "Nomor telepon tidak valid";
  }

  return errors;
};

export const checkValidChangePassword = (vals: FormChangePassword) => {
  const errors: Partial<Record<keyof FormChangePassword, string>> = {};
  if (vals.oldPassword.trim() === "") {
    errors.oldPassword = "Password tidak boleh kosong";
  } 

  if (vals.newPassword.trim() === "") {
    errors.newPassword = "Password baru tidak boleh kosong";
  } else if (vals.newPassword.length < 8) {
    errors.newPassword = "Password minimal terdiri dari 8 karakter";
  }

  if (vals.newPassword !== vals.confirmationPassword) {
    errors.confirmationPassword = "Konfirmasi password tidak cocok dengan password baru";
  }

  return errors;
};

export const checkValidAddPassword = (vals: FormChangePassword) => {
  const errors: Partial<Record<keyof FormChangePassword, string>> = {};
  if (vals.newPassword.trim() === "") {
    errors.newPassword = "Password baru tidak boleh kosong";
  } else if (vals.newPassword.length < 8) {
    errors.newPassword = "Password minimal terdiri dari 8 karakter";
  }

  if (vals.newPassword !== vals.confirmationPassword) {
    errors.confirmationPassword = "Konfirmasi password tidak cocok dengan password baru";
  }

  return errors;
};
