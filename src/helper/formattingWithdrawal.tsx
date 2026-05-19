export const formattingWithdrawalId = (withdrawalId: number) => {
  return `#WD-F${withdrawalId.toString().padStart(3, "X")}`
};

export const secureWalletAddress = (accountNumber: string) => {
  const lengthWalletAddress = accountNumber.length;
  return accountNumber.slice(-4).padStart(lengthWalletAddress, "*");
};

export const showLastFourWalletAddress = (accountNumber: string) => {
  return accountNumber.slice(-4);
};
