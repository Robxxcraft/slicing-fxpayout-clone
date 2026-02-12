import type { InputChangePassword, InputEditProfil } from "@/types/profile";

export const validateProfile = (vals: InputEditProfil) => {
  const errors: Partial<Record<keyof InputEditProfil, string>> = {};
  if (!vals.username.trim()) errors.username = "Username tidak boleh kosong";
  else if (vals.username.length > 20) errors.username = "Maksimal 20 karakter";
  else if (vals.username.includes(" ")) errors.username = "Username tidak boleh mengandung spasi";

  if (!vals.role) errors.role = "Role harus dipilih";
  return errors;
};

export const validatePassword = (vals: InputChangePassword) => {
  const errors: Partial<Record<keyof InputChangePassword, string>> = {};
  if (!vals.oldPassword) errors.oldPassword = "Password lama wajib diisi";
  if (vals.newPassword.trim() === "") errors.newPassword = "Password  baru tidak boleh kosong";
  if (vals.confirmationPassword.trim() === "") errors.confirmationPassword = "Konfirmasi password tidak boleh kosong";
  if (vals.newPassword.length < 8 || vals.newPassword.length > 12) {
    errors.newPassword = "Password harus 8-12 karakter";
  }
  if (vals.newPassword !== vals.confirmationPassword) {
    errors.confirmationPassword = "Konfirmasi password tidak cocok";
  }
  return errors;
};