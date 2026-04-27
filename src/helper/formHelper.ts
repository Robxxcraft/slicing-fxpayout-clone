export const scrollToErrorInput = (errorField: string) => {
  const element = document.getElementById(errorField);
  element?.scrollIntoView({ block: "center" });
  element?.focus({ preventScroll: true });
}

export function validateOnlyNumber(input: string) {
  return /^\d+$/.test(input);
}

export function validateValidEmail(text: string) {
  const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegx.test(text); 
}

export const formattedUsd = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}
