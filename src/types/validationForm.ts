export type FormValidation = {
  broker: string;
  identityUsername: string;
  email: string;
  accountNumber: string;
  tradingUsername: string;
  handphoneNumber: string;
}
export type FormBank = {
  rebate: string;
  tempBank: string;
  bank: string;
  rekeningNumber: string;
  holdingUsername: string;
}

export type ModalResponse = "SUCCESS" | "ERROR" | null;