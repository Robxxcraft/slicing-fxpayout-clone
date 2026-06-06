export const formattingRp = (amount: number) => {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return formatted.replace(/\s/g, "");
}; 

export const formattingUsd = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formattingEmptyCurrency = (amount: number, fractionDigits: number | undefined = 2) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount || 0);
};
