export type NavigationLink = {
  title: string;
  url: string;
};

export const listNavigation: NavigationLink[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Broker",
    url: "/broker",
  },
  {
    title: "Kalkulator",
    url: "#",
  },
  {
    title: "Klaim Rebate",
    url: "#",
  },
  {
    title: "Legal",
    url: "#",
  },
];

export const listNavigationBrokers: NavigationLink[] = [
  { title: "Profil", url: "#profil" },
  { title: "Ringkasan", url: "#ringkasan" },
  { title: "Jenis Akun", url: "#jenis-akun" },
  { title: "Spread & Komisi", url: "#spread-komisi" },
  { title: "Keunggulan", url: "#keunggulan" },
  { title: "Platform", url: "#platform" },
  { title: "Deposit & Withdraw", url: "#deposit-withdraw" },
  { title: "Kelebihan & Kekurangan", url: "#kelebihan-kekurangan" },
  { title: "Rating", url: "#rating" },
  { title: "FAQ", url: "#faq" },
];
