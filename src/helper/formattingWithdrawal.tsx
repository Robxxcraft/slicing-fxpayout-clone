export const formattingWithdrawalId = (withdrawalId: number) => {
  return `#WD-F${withdrawalId.toString().padStart(3, "X")}`
};
