export const MONTH_MAP: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  Mei: 4,
  Jun: 5,
  Jul: 6,
  Agu: 7,
  Sep: 8,
  Okt: 9,
  Nov: 10,
  Des: 11
};

export const formatDateYYYYMMDD = (date: Date | string) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth()+1)
    .toString()
    .padStart(2,"0")}-${d.getDate()
    .toString()
    .padStart(2,"0")}`;
};

export const formattingFullDate = (value: string | undefined) => {
  if (!value) return "";
  const date = new Date(value);
  const monthList = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];  

  const month = monthList[date.getMonth()];
  const year = date.getFullYear();  
  
  return `${date.getDate()} ${month} ${year}`;
};

export const formattingFullDateTime = (value: string | undefined) => {
  if (!value) return "";
  const date = new Date(value);
  const fullDate = formattingFullDate(value);  
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${fullDate} ${hours}:${minutes}`;
};

