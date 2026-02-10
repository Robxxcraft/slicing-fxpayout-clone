export const formattingFullDate = (value: string | undefined) => {
  if (!value) return '';
  const date = new Date(value);
  const monthList = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];  

  const month = monthList[date.getMonth()];
  const year = date.getFullYear();  
  
  return `${date.getDate()} ${month} ${year}`;
}