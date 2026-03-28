export type FormValidation = {
  broker: string;
  identityUsername: string;
  email: string;
  accountNumber: string;
  platform: string;
  handphoneNumber: string;
}
export type FormBank = {
  rebate: string;
  tempBank: string;
  bank: string;
  rekeningNumber: string;
  holdingUsername: string;
}

export type FormFeedback = {
  rating: number;
  username: string;
  location: string;
  review: string;
}

export type ModalResponse = "SUCCESS" | "ERROR" | null;