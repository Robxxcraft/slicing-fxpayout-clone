import type { UserGender } from "./user.type";

export type FormLogin = {
  email: string,
  password: string,
}

export type FormRegister = {
  username: string,
  email: string,
  password: string,
  password2: string,
}

export type FormUpdateProfile = {
  username: string;
  fullname: string;
  gender: UserGender;
  phoneNumber: string;
  referral: string | null;
}